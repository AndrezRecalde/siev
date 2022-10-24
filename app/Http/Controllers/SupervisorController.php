<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Veedor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SupervisorController extends Controller
{
    public function index()  /* Obtener perfil con sus Coordinadores */
    {
        /* $user = Auth::guard('api')->user(); */

        $supervisor = User::with([
            'canton' => function ($query) {
                $query->select('id', 'nombre_canton');
            },
            'parroquias' => function ($query) {
                $query->select('id', 'nombre_parroquia');
            },
            'recintos' => function ($query) {
                $query->select('id', 'nombre_recinto');
            },
            'roles' => function ($query) {
                $query->select('id', 'name');
            }
        ])->where('id', 4)
        ->first();

        $coordinadores = User::with([
            'canton' => function ($query) {
                $query->select('id', 'nombre_canton');
            },
            'parroquias' => function ($query) {
                $query->select('id', 'nombre_parroquia');
            },
            'recintos' => function ($query) {
                $query->select('id', 'nombre_recinto');
            },
            'roles' => function ($query) {
                $query->select('id', 'name');
            }
        ])->where('user_id', 4)
        ->get();

        return response()->json(['status' => 'success', 'supervisor' => $supervisor, 'coordinadores' => $coordinadores]);
    }
}
