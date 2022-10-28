<?php

namespace App\Http\Controllers;

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
}
