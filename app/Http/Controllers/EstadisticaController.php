<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EstadisticaController extends Controller
{
    public function getGraficoCantones()
    {
        $sum_cantones = DB::select('CALL getGraficoCantones()');

        return response()->json(['status' => 'success', 'sum_cantones' => $sum_cantones]);
    }

    public function getGraficoParroquia()
    {
        $sum_parroquias = DB::select('CALL getGraficoParroquia()');

        return response()->json(['status' => 'success', 'sum_parroquias' => $sum_parroquias]);
    }

    public function getGraficoxParroquia(Request $request)
    {
        $sum_parroquias = DB::select('CALL getGraficoxParroquia(?)', [$request->canton_id]);

        return response()->json(['status' => 'success', 'sum_parroquias' => $sum_parroquias]);

    }

    public function getGraficoRecinto(Request $request)
    {
        $sum_recintox = DB::select('CALL getRecinto(?)', [$request->parroquia_id]);

        return response()->json(['status' => 'success', 'sum_recintox' => $sum_recintox]);

    }
}
