<?php

namespace App\Http\Controllers;

use App\Exports\CoordsExport;
use App\Exports\SupersExport;
use App\Exports\VeedoresExport;
use App\Models\User;
use App\Models\Veedor;
use PDF;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

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
                    CONCAT(u.first_name, " ", u.last_name) as coordinador,
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
            ->coordinador($request->user__id)
            ->orderBy('c.id', 'ASC')
            ->get();
        $pdf = PDF::loadView('pdf.veedores.search', ['veedores' => $veedores]);
        return $pdf->setPaper('a4', 'landscape')->download('veedores2023.pdf');

    }

    public function filterExportacionExcel(Request $request)
    {
        return Excel::download(new VeedoresExport(
            $request->canton_id,
            $request->parroquia_id,
            $request->recinto__id,
            $request->user_id
        ), 'veedores.xlsx');
    }

    public function filterExportacionCoords(Request $request)
    {
        $coordinadores = User::from('users as u')
            ->select(DB::raw('u.id, u.dni, CONCAT(u.first_name, " ", u.last_name) as nombres,
                                        u.phone, u.dni, r.name as role,
                                        c.nombre_canton, p.nombre_parroquia, re.nombre_recinto '))
            ->join('recinto_user as ru', 'ru.user_id', 'u.id')
            ->join('recintos as re', 're.id', 'ru.recinto_id')
            ->join('parroquias as p', 're.parroquia_id', 'p.id')
            ->join('cantones as c', 'p.canton_id', 'c.id')
            ->join('model_has_roles as mhr', 'mhr.model_id', 'u.id')
            ->join('roles as r', 'r.id', 'mhr.role_id')
            ->where('r.id','3')
            ->canton($request->canton_id)
            ->parroquia($request->parroquia_id)
            ->recinto($request->recinto_id)
            ->get();

            $pdf = PDF::loadView('pdf.coords.search', ['coordinadores' => $coordinadores]);
            return $pdf->setPaper('a4', 'landscape')->download('coordinadores.pdf');
    }

    public function filterExportacionExcelCoords(Request $request)
    {
        return Excel::download(new CoordsExport(
            $request->canton_id,
            $request->parroquia_id,
            $request->recinto__id,
        ), 'coordinadores.xlsx');
    }

    public function filterExportacionSupers(Request $request)
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

            $pdf = PDF::loadView('pdf.supers.search', ['supervisores' => $supervisores]);
            return $pdf->setPaper('a4', 'landscape')->download('supervisores.pdf');
    }

    public function filterExportacionExcelSupers(Request $request)
    {
        return Excel::download(new SupersExport(
            $request->canton_id,
            $request->parroquia_id,
        ), 'supervisores.xlsx');
    }

}
