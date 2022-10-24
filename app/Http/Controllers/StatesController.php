<?php

namespace App\Http\Controllers;

use App\Models\Canton;
use App\Models\Parroquia;
use App\Models\Recinto;
use Illuminate\Http\Request;

class StatesController extends Controller
{
    public function loadCantones()
    {
        $cantones = Canton::get(['id', 'nombre_canton']);
        return response()->json(['status' => 'success', 'cantones' => $cantones]);
    }

    public function loadParroquias(Request $request)
    {
        $parroquias = Parroquia::where('canton_id', $request->canton_id)->get(['id', 'canton_id', 'nombre_parroquia']);
        return response()->json(['status' => 'success', 'parroquias' => $parroquias]);
    }
    public function loadParroquiasAll(Request $request)
    {
        $parroquias = Parroquia::get(['id',  'nombre_parroquia']);
        return response()->json(['status' => 'success', 'parroquias' => $parroquias]);
    }
    public function loadRecintos(Request $request)
    {
        $recintos = Recinto::where('parroquia_id', $request->parroquia_id)->get(['id', 'parroquia_id', 'nombre_recinto']);
        return response()->json(['status' => 'success', 'recintos' => $recintos]);
    }

    public function loadRecintoAll()
    {
        $recintos = Recinto::get(['id', 'parroquia_id', 'nombre_recinto']);

        return response()->json(['status' => 'success', 'recintos' => $recintos]);
    }
}
