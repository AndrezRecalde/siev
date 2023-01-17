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

    public function searchSupervisor(Request $request)
    {
        $supervisores = User::from('users as u')
            ->select(DB::raw('u.id, u.dni, CONCAT(u.first_name, " ", u.last_name) as nombres,
                                        u.phone, r.name as role,
                                        c.nombre_canton, p.nombre_parroquia'))
            ->join('cantones as c', 'c.id', 'u.canton_id')
            ->join('parroquia_user as pu', 'pu.user_id', 'u.id')
            ->join('parroquias as p', 'p.id', 'pu.parroquia_id')
            ->join('model_has_roles as mhr', 'mhr.model_id', 'u.id')
            ->join('roles as r', 'r.id', 'mhr.role_id')
            ->where('r.id','2')
            ->canton($request->canton_id)
            ->parroquia($request->parroquia_id)
            ->get();

        if (sizeof($supervisores) >= 1) {
            return response()->json(['status' => 'success', 'supervisores' => $supervisores]);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No existen supervisores en esa zona']);
        }
    }
}
