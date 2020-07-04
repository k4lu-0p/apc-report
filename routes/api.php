<?php

use Illuminate\Http\Request;
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

// GET : Lister tous les utilisateurs
Route::middleware('auth:sanctum')->get('/users', 'UserController@index');

// GET : Lister les comptes-rendus
Route::middleware('auth:sanctum')->get('/reports', 'ReportController@index');

// POST : S'identifier
Route::post('/login', 'SecurityController@login');
