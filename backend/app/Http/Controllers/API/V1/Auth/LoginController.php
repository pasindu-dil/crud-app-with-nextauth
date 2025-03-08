<?php

namespace App\Http\Controllers\API\V1\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    public function redirectToProvider()
    {
        $redirectUrl = Socialite::driver('google')->stateless()->redirect()->getTargetUrl();

        return response()->json([
            'redirect_url' => $redirectUrl,
        ]);
    }

    public function handleCallback()
    {
        $user = Socialite::driver('google')->stateless()->user();

        $token = $user->token;

        $user = User::updateOrCreate(
            [
                'email' => $user->email
            ],
            [
                'name' => $user->name,
                'email' => $user->email,
                'provider' => 'google',
                'provider_id' => $user->id,
                'avatar' => $user->avatar,
                'remember_token' => $token,
                'password' => "NULL",
            ]
        );

        $authToken = $user->createToken('api')->plainTextToken;

        Auth::login($user);

        return response()->json([
            'user' => $user,
            'token' => $authToken,
        ]);
    }

    public function handleUserLogin(Request $request)
    {
        try {
            $email = $request->email;
            $password = $request->password;

            $user = User::where('email', $email)->first();

            if (!$user || !Hash::check($password, $user->password)) {
                return response()->json([
                    'message' => 'Invalid credentials',
                ], 401);
            }

            $authToken = $user->createToken('api')->plainTextToken;

            return response()->json([
                'sucess' => true,
                'user' => $user,
                'token' => $authToken,
                'message' => 'Login successful',
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], 500);
        }
    }
}
