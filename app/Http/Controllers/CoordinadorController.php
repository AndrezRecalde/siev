<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Veedor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CoordinadorController extends Controller
{
    public function index()
    {
        $coordinador = User::with([
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
        ])->where('id', 5)
            ->first();

        $veedores = Veedor::from('veedores as v')
            ->select(DB::raw('v.id, v.first_name, v.last_name, v.phone, v.email, v.observacion,
                              p.nombre_parroquia as parroquia, r.nombre_recinto as origen, re.nombre_recinto as destino'))
            ->join('parroquias as p', 'p.id', 'v.parroquia_id')
            ->join('recintos as r', 'r.id', 'v.recinto_id')
            ->join('recintos as re', 're.id', 'v.recinto_id')
            ->where('user_id', 5)
            ->get();
        return response()->json(['status' => 'success', 'coordinador' => $coordinador, 'veedores' => $veedores]);
    }
}
