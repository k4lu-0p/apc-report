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

// POST : S'identifier
Route::post('/login', 'SecurityController@login');

// GET : Lister tous les utilisateurs
Route::middleware('auth:sanctum')->get('/users', 'UserController@index');

// GET : Lister tous les rendez-vous de l'utilisateur connecté
Route::middleware('auth:sanctum')->get('/appointments', 'AppointmentController@index');

// POST : Créer et enregistrer un rendez-vous
Route::middleware('auth:sanctum')->post('/appointment', 'AppointmentController@store');

// GET : Lister tous les comptes-rendus de tous les rendez-vous de l'utilisateur connecté
Route::middleware('auth:sanctum')->get('/reports', 'ReportController@index');

// GET : Lister tous les clients
Route::middleware('auth:sanctum')->get('/customers', 'CustomerController@index');
