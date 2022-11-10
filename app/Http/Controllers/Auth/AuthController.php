<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use App\Models\User;
use App\Models\Veedor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;



class AuthController extends Controller
{

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('dni', 'password'))) {
            return response()->json([
                'message' => 'Invalid login details'
            ], 401);
        }
        $user = User::where('dni', $request['dni'])->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([

            'access_token' => $token,

            'token_type' => 'Bearer',

            'user' => $user->with([
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
                'user' => function ($query) {
                    $query->select('id', 'first_name');
                }
            ])->where('id', Auth::user()->id)
                ->first(['id', 'dni', 'first_name', 'last_name', 'phone', 'email', 'canton_id', 'user_id']),
        ]);
    }

    public function refresh()
    {
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user'      =>  $user->with([
                'roles' => function ($query) {
                    $query->select('name');
                },
                'canton'   =>  function ($query) {
                    $query->select('nombre_canton');
                },
                'parroquias'   =>  function ($query) {
                    $query->select('nombre_parroquia');
                },
                'recintos'   =>  function ($query) {
                    $query->select('nombre_recinto');
                },
            ])->where('id', Auth::user()->id)
                ->first(),
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status'    =>  'success',
            'message'   =>  'Successfully logged out',
        ], 200);
    }

    public function profile(Request $request)
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

        $roles = $profile['roles'];

        if ($roles[0]->name === 'Administrador') {

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
                }
            ])->join('model_has_roles as mhr', 'mhr.model_id', 'users.id')
                ->where('mhr.role_id', 1)
                ->get();

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
                }
            ])->join('model_has_roles as mhr', 'mhr.model_id', 'users.id')
                ->where('mhr.role_id', 2)
                ->get();

            $coordinadores = User::with([
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
                'veedores'
            ])->join('model_has_roles as mhr', 'mhr.model_id', 'users.id')
                ->where('mhr.role_id', 3)
                ->get();

            $veedores = Veedor::from('veedores as v')
                ->select(DB::raw('v.id, v.dni, v.first_name, v.last_name, v.phone, v.email, v.observacion, v.user_id,
                              p.nombre_parroquia as parroquia, CONCAT(users.first_name," ",users.last_name) as responsable, r.nombre_recinto as origen, re.nombre_recinto as destino,
                              p.id as parroquia_id, r.id as recinto_id, re.id as recinto__id'))
                ->join('parroquias as p', 'p.id', 'v.parroquia_id')
                ->join('recintos as r', 'r.id', 'v.recinto_id')
                ->join('recintos as re', 're.id', 'v.recinto__id')
                ->join('users', 'users.id', 'v.user_id')
                ->get();

            $juntas = DB::table('recintos')->select(DB::raw('SUM(recintos.num_juntas) as total_juntas'))->first();


            return response()->json([
                'status'    => 'success',
                'profile'   =>  $profile,
                'administradores' =>    $administradores,
                'supervisores'  =>  $supervisores,
                'coordinadores' =>  $coordinadores,
                'veedores'      =>  $veedores,
                'juntas'    =>  (int)$juntas->total_juntas
            ]);
        } else if ($roles[0]->name === 'Supervisor') {

            $coordinadores = User::with([
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
                'veedores'
            ])->join('model_has_roles as mhr', 'mhr.model_id', 'users.id')
                ->where('user_id', Auth::user()->id)
                ->get();

            $totales = [];
            $index = 0;

            foreach ($profile->parroquias as $parroquiatotal) {
                $totales[$index] = $parroquiatotal->id;
                $index += 1;
            }

            $juntas = DB::table('recintos')->select(DB::raw('SUM(recintos.num_juntas) as total_juntas'))->whereIn('recintos.parroquia_id', $totales)->first();

            $veedores = Veedor::from('veedores as v')
                ->select(DB::raw('v.id, v.dni, v.first_name, v.last_name, v.phone,
                                    v.email, v.observacion, v.user_id, p.nombre_parroquia as parroquia,
                                    p.id as parroquia_id,
                                    r.nombre_recinto as origen, re.nombre_recinto as destino,
                                    r.id as recinto_id, re.id as recinto__id,
                                    CONCAT(users.first_name," ",users.last_name) as responsable'))
                ->join('recintos as r', 'r.id', 'v.recinto_id')     //DONDE VIVE
                ->join('recintos as re', 're.id', 'v.recinto__id')  //DONDE VOTA
                ->join('parroquias as p', 're.parroquia_id', 'p.id')
                ->join('cantones as c', 'p.canton_id', 'c.id')
                ->join('users', 'users.id', 'v.user_id')
                ->where('p.id', $profile->parroquias[0]->id)->get();

            return response()->json([
                'status'    =>  'success',
                'profile'   =>  $profile,
                'coordinadores' =>  $coordinadores,
                'veedores'      =>  $veedores,
                'juntas'    =>  (int)$juntas->total_juntas
            ]);
        } else {
            $veedores = Veedor::from('veedores as v')
                ->select(DB::raw('v.id, v.dni, v.first_name, v.last_name, v.phone, v.email, v.observacion, v.user_id,
                              p.nombre_parroquia as parroquia, r.nombre_recinto as origen, re.nombre_recinto as destino,
                              p.id as parroquia_id, r.id as recinto_id, re.id as recinto__id,
                              CONCAT(users.first_name," ",users.last_name) as responsable'))
                ->join('parroquias as p', 'p.id', 'v.parroquia_id')
                ->join('recintos as r', 'r.id', 'v.recinto_id')
                ->join('recintos as re', 're.id', 'v.recinto__id')
                ->join('users', 'users.id', 'v.user_id')
                ->where('v.user_id', Auth::user()->id)
                ->get();

            $totales = [];
            $index = 0;

            foreach ($profile->recintos as $recintototal) {
                $totales[$index] = $recintototal->id;
                $index += 1;
            }

            $juntas = DB::table('recintos')->select(DB::raw('SUM(recintos.num_juntas) as total_juntas'))->whereIn('recintos.id', $totales)->first();

            return response()->json([
                'status'    =>  'success',
                'profile'   =>  $profile,
                'veedores'  =>  $veedores,
                'juntas'    =>  (int)$juntas->total_juntas
            ]);
        }

        /*         return response()->json(['status' => 'success', 'profile' => $profile]);
 */
    }
}
