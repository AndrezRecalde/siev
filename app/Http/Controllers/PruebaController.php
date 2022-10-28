<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Veedor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PruebaController extends Controller
{
    public function getTotalJuntasCoords()
    {
        $user = User::with([
            'recintos' => function ($query) {
                $query->select('id', 'nombre_recinto');
            }
        ])->where('id', 3)->first();

        $totales = [];
        $index = 0;

        foreach ($user->recintos as $recintototal) {
            $totales[$index] = $recintototal->id;
            $index += 1;
        }

        $total = DB::table('recintos')->select(DB::raw('SUM(recintos.num_juntas) as total_juntas'))->whereIn('recintos.id', $totales)->get();

        return $total;
    }

    public function getVeedoresParr()
    {
        $profile = User::with([
            'canton' => function ($query) {
                $query->select('id', 'nombre_canton');
            },
            'parroquias' => function ($query) {
                $query->select('id', 'nombre_parroquia');
            },
            'recintos' => function ($query) {
                $query->select('id', 'nombre_recinto', 'num_juntas');
            },
            'roles' => function ($query) {
                $query->select('id', 'name');
            },
            'user'  =>  function ($query) {
                $query->select('id', 'first_name');
            }
        ])->where('id', Auth::user()->id)
            ->first();

        $totales = [];
        $index = 0;

        foreach ($profile->parroquias as $parro) {
            $totales[$index] = $parro->id;
            $index += 1;
        }

        $veedores = Veedor::from('veedores as v')
            ->select(DB::raw('v.id, v.dni, v.first_name, v.last_name, v.phone,
                                    v.email, v.observacion, p.nombre_parroquia as parroquia,
                                    p.id as parroquia_id,
                                    r.nombre_recinto as origen, re.nombre_recinto as destino,
                                    r.id as recinto_id, re.id as recinto__id,
                                    users.first_name as responsable'))
            ->join('recintos as r', 'r.id', 'v.recinto_id')
            ->join('recintos as re', 're.id', 'v.recinto__id')
            ->join('parroquias as p', 're.parroquia_id', 'p.id')
            ->join('users', 'users.id', 'v.user_id')
            ->whereIn('p.id', $totales)->get();


        return $veedores;
    }


    public function getSupers()
    {
        $upers_tot = User::with(['veedores'])
            ->join('model_has_roles as mhr', 'mhr.model_id', 'users.id')
            ->where('mhr.role_id', 2)
            ->get();
    }
}
