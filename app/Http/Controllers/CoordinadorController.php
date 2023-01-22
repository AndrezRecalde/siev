<?php

namespace App\Http\Controllers;

use App\Http\Requests\CoordinadorRequest;
use App\Http\Requests\CoordinadorUpdateRequest;
use App\Models\Coordinador;
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

    public function store(CoordinadorRequest $request)
    {
        try {
            $coordinador = Coordinador::create($request->validated());
            $coordinador->assignRole($request->roles);

            $coordinador->parroquias()->attach($request->parroquia_id);

            if ($request->has('recinto_id')) {
                $coordinador->recintos()->attach($request->recinto_id);
            }

            $coordinador->save();
            return response()->json(['status' => 'success', 'msg' => 'Guardado con éxito']);
        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json([$th->getMessage()]);
        }
    }

    public function update(CoordinadorUpdateRequest $request, $id)
    {
        $coordinador = Coordinador::find($id);
        $user = User::find($id);

        if ($coordinador) {
            $coordinador->update($request->validated());

            if ($request->has('roles')) {
                $user->roles()->detach();
                $user->assignRole($request->roles);
            }

            $coordinador->parroquias()->sync($request->parroquia_id);

            if ($request->has('recinto_id')) {
                $coordinador->recintos()->sync($request->recinto_id);
            }

            $coordinador->save();

            return response()->json(['status' => 'success', 'msg' => 'Actualizado con éxito']);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'Usuario No encontrado']);
        }
    }

    public function searchCoordinador(Request $request)
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

        if (sizeof($coordinadores) >= 1) {
            return response()->json(['status' => 'success', 'coordinadores' => $coordinadores]);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No existen coordinadores en esa zona']);
        }
    }
}
