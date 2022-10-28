<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function index(Request $request)
    {

    }

    public function getAllUsers()  //Obtiene todos los usuarios
    {
        $usuarios = User::with([
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
        ])
        ->join('model_has_roles as mhr', 'mhr.model_id', 'users.id')
        ->orderBy('mhr.role_id', 'ASC')
        ->get([
            'id', 'dni', 'first_name', 'last_name', 'phone', 'email',
            'canton_id'
        ]);


        return response()->json(['status' => 'success', 'usuarios' => $usuarios]);
    }


    public function getUserSuper()  //Obtiene los usuarios Supervisores
    {
        $supervisores = User::with([
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
            },
        ])->where('user_id', 2)
            ->get([
                'id', 'dni', 'first_name', 'last_name', 'phone', 'email',
                'canton_id'
            ]);

        return response()->json(['status' => 'success', 'supervisores' => $supervisores]);
    }

    public function getUserCoord()
    {
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
            },
        ])->where('user_id', 3)
            ->get([
                'id', 'dni', 'first_name', 'last_name', 'phone', 'email',
                'canton_id'
            ]);

        return response()->json(['status' => 'success', 'coordinadores' => $coordinadores]);
    }

    public function getUserAdmin()
    {
        $administradores = User::with([
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
            },
        ])->where('user_id', 1)
            ->get([
                'id', 'dni', 'first_name', 'last_name', 'phone', 'email',
                'canton_id'
            ]);

        return response()->json(['status' => 'success', 'administradores' => $administradores]);
    }

    public function store(UserRequest $request)
    {
        try {
            $user = User::create($request->validated());
            $user->password = $request->dni;
            $user->assignRole($request->roles);
            $user->parroquias()->attach($request->parroquia_id);

            if ($request->has('recinto_id')) {
                $user->recintos()->attach($request->recinto_id);
            }

            $user->save();
            return response()->json(['status' => 'success', 'msg' => 'Guardado con éxito']);
        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json([$th->getMessage()]);
        }
    }

    public function update(UserUpdateRequest $request, $id)
    {
        $user = User::find($id);
        if ($user) {
            $user->update($request->validated());

            if ($request->filled('roles')) {
                $user->roles()->detach();
                $user->assignRole($request->roles);
            }

            $user->parroquias()->sync($request->parroquia_id);

            if ($request->filled('recinto_id')) {
                $user->recintos()->sync($request->recinto_id);
            }

            $user->save();

            return response()->json(['status' => 'success', 'msg' => 'Actualizado con éxito']);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'Usuario No encontrado']);
        }
    }


    public function destroy($id)
    {
        $user = User::find($id);

        if ($user) {
            $user->roles()->detach();
            $user->parroquias()->detach();
            $user->recintos()->detach();
            $user->delete();
            return response()->json(['status' => 'success', 'msg' => 'Eliminado']);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'El usuario no ha sido encontrado']);
        }
    }
}
