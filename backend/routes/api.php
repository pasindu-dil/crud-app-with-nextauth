<?php

use App\Http\Controllers\API\V1\Auth\LoginController;
use App\Http\Controllers\API\V1\CountryController;
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

Route::get('/auth/redirect', [LoginController::class, 'redirectToProvider']);
Route::post('/auth/callback', [LoginController::class, 'handleCallback']);
Route::post('/auth/login', [LoginController::class, 'handleUserLogin']);

Route::get('/countries', [CountryController::class, 'index']);

Route::middleware('auth:api')->group(function () {
    Route::post('/countries', [CountryController::class, 'store']);
});
