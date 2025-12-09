<?php

use App\Http\Controllers\JobController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// TODO: what will happen when no middleware for jobcontroller
Route::middleware('auth:api')->group(function () {
    // Route::get('/me',  [AuthController::class, 'me']);
    Route::apiResource('jobs', JobController::class);
});
