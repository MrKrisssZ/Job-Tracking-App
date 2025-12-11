<?php

use App\Http\Controllers\JobController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// TODO: what will happen when no middleware for jobcontroller -- result: all users gonna share the same job records
// the middleware is the ware before reaching to the contoller. The middleware here is for checking if there is token or the token valid.
Route::middleware('auth:api')->group(function () {
    Route::get('/me',  [AuthController::class, 'getCurrentUser']);
    Route::apiResource('jobs', JobController::class);
});
