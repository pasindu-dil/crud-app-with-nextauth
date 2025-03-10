<?php

use App\Http\Controllers\API\V1\Auth\LoginController;
use App\Http\Controllers\API\V1\CountryController;
use App\Http\Controllers\API\V1\NetworkController;
use App\Http\Controllers\API\V1\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::get('/auth/redirect', [LoginController::class, 'redirectToProvider']);
// Route::post('/auth/callback', [LoginController::class, 'handleCallback']);
Route::post('/auth/login', [LoginController::class, 'handleUserLogin']);

// Route::post('/countries', [CountryController::class, 'store']);

// Route::group(['middleware' => ['auth:api']], function () {
//     Route::get('/user', [UserController::class, 'index']);
//     Route::resource('/networks', NetworkController::class);
//     // Route::resource('/countries', CountryController::class);
// });

Route::middleware('auth:api')->group(function () {
    Route::post('/countries', [CountryController::class, 'store']);
});
