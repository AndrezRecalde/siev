<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CoordinadorController;
use App\Http\Controllers\EstadisticaController;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\PruebaController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StatesController;
use App\Http\Controllers\SupervisorController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VeedController;
use App\Http\Controllers\VeedorController;
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

Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::get('/refresh', [AuthController::class, 'refresh']);


    Route::get('usuarios', [UserController::class, 'getAllUsers']);
    Route::get('supervisores', [UserController::class, 'getUserSuper']);
    Route::get('coordinadores', [UserController::class, 'getUserCoord']);
    Route::get('administradores', [UserController::class, 'getUserAdmin']);

    Route::post('/create/usuarios', [UserController::class, 'store']);
    Route::post('/update/usuarios/{id}', [UserController::class, 'update']);
    Route::post('/delete/usuario/{id}', [UserController::class, 'destroy']);

    Route::post('/create/admin/coordinador', [CoordinadorController::class, 'store']);
    Route::post('/update/admin/coordinador/{id}', [CoordinadorController::class, 'update']);

    Route::get('/show/supervisor', [SupervisorController::class, 'index']);
    Route::get('/show/coordinador', [CoordinadorController::class, 'index']);


    Route::post('/create/veedores', [VeedorController::class, 'store']);
    Route::post('/update/veedores/{id}', [VeedorController::class, 'update']);
    Route::get('/show/veedor/{id}', [VeedorController::class, 'show']);
    Route::post('/delete/veedor/{id}', [VeedorController::class, 'destroy']);

    Route::post('/create/veed', [VeedController::class, 'store']);
    Route::post('/update/veed/{id}', [VeedController::class, 'update']);

    Route::get('cantones', [StatesController::class, 'loadCantones']);
    Route::post('parroquias', [StatesController::class, 'loadParroquias']);
    Route::post('recintos', [StatesController::class, 'loadRecintos']);
    Route::get('/all/recintos', [StatesController::class, 'loadRecintoAll']);
    Route::get('/all/parroquias', [StatesController::class, 'loadParroquiasAll']);



    Route::get('roles', [RoleController::class, 'index']);


    Route::get('prueba', [PruebaController::class, 'getTotalJuntasCoords']);
    Route::get('prueba2', [PruebaController::class, 'getVeedoresParr']);

    Route::post('search', [VeedorController::class, 'search']);


    Route::post('/pdf/exportacion/veedores', [PDFController::class, 'filterExportacion']);

    Route::post('/excel/exportacion/veedores', [PDFController::class, 'filterExportacionExcel']);

    Route::post('/search/coordinadores', [CoordinadorController::class, 'searchCoordinador']);

    Route::post('/pdf/exportacion/coordinadores', [PDFController::class, 'filterExportacionCoords']);
    Route::post('/excel/exportacion/coordinadores', [PDFController::class, 'filterExportacionExcelCoords']);
});



Route::get('/pdf/veedores', [PDFController::class, 'getVeedores']);

Route::get('prueba3', [PruebaController::class, 'getSupersWithVeeds']);

Route::get('getGraficoCantones', [EstadisticaController::class, 'getGraficoCantones']);
Route::get('getGraficoParroquia', [EstadisticaController::class, 'getGraficoParroquia']);
