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

// GET : Récupérer un rendez-vous par son ID
Route::middleware('auth:sanctum')->get('/appointment/{id}', 'AppointmentController@show');

// DELETE : Supprime un rendez-vous ainsi que son rapport lié par l'ID du RDV
Route::middleware('auth:sanctum')->delete('/appointment/{id}', 'AppointmentController@destroy');

// PUT : Mettre à jour un RDV
Route::middleware('auth:sanctum')->put('/appointment/{id}', 'AppointmentController@update');

// GET : Lister tous les comptes-rendus de tous les rendez-vous de l'utilisateur connecté
Route::middleware('auth:sanctum')->get('/reports', 'ReportController@index');

// PUT : Mettre à jour un rapport
Route::middleware('auth:sanctum')->put('/report/{id}', 'ReportController@update');

// GET : Récupérer un rapport par son ID
Route::middleware('auth:sanctum')->get('/report/{id}', 'ReportController@show');

// GET : Lister tous les clients
Route::middleware('auth:sanctum')->get('/customers', 'CustomerController@index');

// GET : Récupérer un client par son ID
Route::middleware('auth:sanctum')->get('/customer/{id}', 'CustomerController@show');

// DELETE : Supprime un client par son ID
Route::middleware('auth:sanctum')->delete('/customer/{id}', 'CustomerController@destroy');

// PUT : Mettre à jour un client
Route::middleware('auth:sanctum')->put('/customer/{id}', 'CustomerController@update');

// GET : Lister toute les options globales
Route::middleware('auth:sanctum')->get('/settings', 'SettingController@index');

