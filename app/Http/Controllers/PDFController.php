<?php

namespace App\Http\Controllers;

use App\Models\Veedor;
use PDF;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PDFController extends Controller
{
    public function getUsers()
    {
        # code...
    }

    public function getVeedores()
    {
        $veedores = DB::table('veedores as v')
        ->join('users', 'users.id', '=', 'v.user_id')
        ->join('parroquias as p', 'v.parroquia_id', '=', 'p.id')
        ->join('cantones as c', 'c.id', 'p.canton_id')
        ->join('recintos as r', 'v.recinto_id', 'r.id')
        ->join('recintos as re', 'v.recinto__id', 're.id')
        ->select(DB::raw('v.dni, CONCAT(v.first_name, " ", v.last_name) as nombres, c.nombre_canton as canton,
                        r.nombre_recinto as origen, re.nombre_recinto as destino, v.phone, v.email'))
        ->orderBy('canton', 'ASC')
        ->get();

        $pdf =  PDF::loadView('pdf.veedores.all', ['veedores' => $veedores]);
        return $pdf->setPaper('a4', 'landscape')->stream('distrib-veedores.pdf');

    }

    public function filterExportacion(Request $request)
    {
        $veedores = Veedor::from('veedores as v')
            ->select(DB::raw('v.id, v.dni, v.phone, v.email,
                    CONCAT(v.first_name, " ", v.last_name) as nombres,
                    r.nombre_recinto as origen,
                    re.nombre_recinto as destino,
                    p.nombre_parroquia as parroquia,
                    c.nombre_canton as canton,
                    CONCAT(us.first_name, " ", us.last_name) as supervisor'))
            ->join('recintos as r', 'v.recinto_id', 'r.id')
            ->join('recintos as re', 're.id', 'v.recinto__id')
            ->join('parroquias as p', 'p.id', 're.parroquia_id')
            ->join('cantones as c', 'c.id', 'p.canton_id')
            ->join('users as u', 'u.id', 'v.user_id')
            ->join('users as us', 'us.id', 'u.user_id')
            ->canton($request->canton_id)
            ->parroquia($request->parroquia_id)
            ->recinto($request->recinto__id)
            ->usuario($request->user_id)
            ->orderBy('c.id', 'ASC')
            ->get();
        $pdf = PDF::loadView('pdf.veedores.search', ['veedores' => $veedores]);
        return $pdf->setPaper('a4', 'landscape')->download('veedores2023.pdf');

    }
}
