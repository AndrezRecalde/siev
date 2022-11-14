<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EstadisticaController extends Controller
{
    public function getGraficoCantones()
    {
        $sum_cantones = DB::table('recintos as r')
                        ->select(DB::raw('SUM(r.num_juntas) as total_juntas,
                                         COUNT(v.id) as total_veed,
                                        c.nombre_canton'))
                        ->join('parroquias as p', 'p.id', 'r.parroquia_id')
                        ->join('cantones as c', 'c.id', 'p.canton_id')
                        ->leftJoin('veedores as v', 'v.recinto__id', 'r.id')
                        ->groupBy('c.nombre_canton')
                        ->get();

        return response()->json(['status' => 'success', 'sum_cantones' => $sum_cantones]);
    }

    public function getGraficoParroquia()
    {
        $sum_parroquias = DB::table('recintos as r')
                        ->select(DB::raw('p.id,SUM(r.num_juntas) as total_juntas,
                                         COUNT(v.id) as total_veed,
                                         r.parroquia_nombre,
                                         c.nombre_canton'))
                        ->join('parroquias as p', 'p.id', 'r.parroquia_id')
                        ->join('cantones as c', 'c.id', 'p.canton_id')
                        ->leftJoin('veedores as v', 'v.recinto__id', 'r.id')
                        ->orderBy('c.nombre_canton', 'ASC')
                        ->groupBy('r.parroquia_nombre', 'p.id', 'c.nombre_canton')
                        ->get();

        return response()->json(['status' => 'success', 'sum_parroquias' => $sum_parroquias]);
    }
}
