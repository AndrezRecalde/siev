<?php

namespace App\Http\Controllers;

use App\Http\Requests\VeedorRequest;
use App\Http\Requests\VeedorUpdateRequest;
use App\Models\Veedor;
use File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class VeedorController extends Controller
{

    public function store(VeedorRequest $request)
    {
        $veedor = Veedor::create($request->validated());

        if ($request->file('cedula_frontal')) {
            $veedor->cedula_frontal = $request->file('cedula_frontal');
            $filename_f = $veedor->cedula_frontal->getClientOriginalName();
            $save_path = '/veedores/dni/' . $veedor->dni . '/uploads/';
            $public_path_f = $save_path . $filename_f;
            $path = Storage::putFileAs(
                'public' . $save_path,
                $veedor->cedula_frontal,
                $filename_f
            );
            if (!$path) {
                DB::rollback();
                return response()->json(array("status" => "error", 'message' => 'Hubo un error al cargar el archivo'));
            }
            $veedor->cedula_frontal = $public_path_f;
        }
        if ($request->file('cedula_reverso')) {
            $veedor->cedula_reverso = $request->file('cedula_reverso');
            $filename_r = $veedor->cedula_reverso->getClientOriginalName();
            $save_path = '/veedores/dni/' . $veedor->dni . '/uploads/';
            $public_path_r = $save_path . $filename_r;
            $path = Storage::putFileAs(
                'public' . $save_path,
                $veedor->cedula_reverso,
                $filename_r
            );
            if (!$path) {
                DB::rollback();
                return response()->json(array("status" => "error", 'message' => 'Hubo un error al cargar el archivo'));
            }
            $veedor->cedula_reverso = $public_path_r;
        }

        $veedor->save();
        return ['status' => 'success', 'message' => 'veedor registrado'];
    }

    public function update(VeedorUpdateRequest $request, $id)
    {
        $veedor = Veedor::find($id);

        if ($veedor) {

            if ($request->hasFile('cedula_frontal') || $request->hasFile('cedula_reverso')) {
                if ($request->hasFile('cedula_frontal')) {
                    $filename_f = $veedor->cedula_frontal;

                    if ($filename_f) {
                        Storage::disk('public')->delete($filename_f);
                    }
                    $veedor->fill($request->validated());
                    $veedor->cedula_frontal = $request->file('cedula_frontal');
                    $filename_f = $veedor->cedula_frontal->getClientOriginalName();
                    $save_path = '/veedores/dni/' . $veedor->dni . '/uploads/';
                    $public_path_f = $save_path . $filename_f;
                    $path = Storage::putFileAs(
                        'public' . $save_path,
                        $veedor->cedula_frontal,
                        $filename_f
                    );
                    if (!$path) {
                        \DB::rollback();
                        return response()->json(array("status" => "error", 'message' => 'Hubo un error al actualizar'));
                    }
                    $veedor->cedula_frontal = $public_path_f;
                }

                if ($request->hasFile('cedula_reverso')) {
                    $filename_r = $veedor->cedula_reverso;

                    if ($filename_r) {
                        Storage::disk('public')->delete($filename_r);
                    }

                    $veedor->fill($request->validated());
                    $veedor->cedula_reverso = $request->file('cedula_reverso');
                    $filename_r = $veedor->cedula_reverso->getClientOriginalName();
                    $save_path = '/veedores/dni/' . $veedor->dni . '/uploads/';
                    $public_path_r = $save_path . $filename_r;
                    $path = Storage::putFileAs(
                        'public' . $save_path,
                        $veedor->cedula_reverso,
                        $filename_r
                    );
                    if (!$path) {
                        \DB::rollback();
                        return response()->json(array("status" => "error", 'message' => 'Hubo un error al actualizar'));
                    }
                    $veedor->cedula_reverso = $public_path_r;
                }
                $res = $veedor->save();
            } else {

                if (!$request->filled('cedula_frontal')) {
                    if ($veedor->cedula_frontal) {
                        Storage::disk('public')->delete($veedor->cedula_frontal);
                        $veedor->cedula_frontal = '';
                    }
                }

                if (!$request->filled('cedula_reverso')) {
                    if ($veedor->cedula_reverso) {
                        Storage::disk('public')->delete($veedor->cedula_reverso);
                        $veedor->cedula_reverso = '';
                    }
                }


                $res = $veedor->update(array_filter($request->validated()));
            }
        } else {
            return response()->json(['status' => 'error', 'msg' => 'Veedor no encontrado']);
        }

        if ($res) {
            return response()->json(['status' => 'success', 'message' => 'Veedor actualizado']);
        }
    }

    public function show(Request $request)
    {
        $veedor = DB::select('CALL sp_view_veedor(?)', [$request->id]);
        if ($veedor) {
            return response()->json(['status' => 'success', 'veedor' => $veedor[0]]);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No Existe el veedor']);
        }
    }

    public function destroy(Request $request)
    {
        $veedor = Veedor::find($request->id);

        if ($veedor) {
            if ($veedor->cedula_frontal || $veedor->cedula_reverso) {
                File::deleteDirectory(storage_path('app/public') . '/veedores/dni/' . $veedor->dni);
                $veedor->delete();
                return response()->json(['status' => 'success', 'message' => 'Eliminado']);
            } else {
                $veedor->delete();
                return response()->json(['status' => 'success', 'message' => 'Eliminado']);
            }
        } else {
            return response()->json(['status' => 'error', 'msg' => 'Veedor no encontrado']);
        }
    }

    public function search(Request $request)
    {
        $search = Veedor::from('veedores as v')
            ->select(DB::raw('v.id, v.dni, v.phone, CONCAT(v.first_name, " ", v.last_name) as nombres,
                    re.nombre_recinto, p.nombre_parroquia, c.nombre_canton,
                    CONCAT(u.first_name, " ", u.last_name) as coordinador,
                    CONCAT(us.first_name, " ", us.last_name) as supervisor'))
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
            ->get();

        if (sizeof($search) >= 1) {
            return response()->json(['status' => 'success', 'search' => $search]);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No existen veedores en esa zona']);
        }
    }

    public function getVeedoresxRecinto(Request $request)
    {
        $veedores = DB::select('CALL getVeedoresxRecinto(?)', [$request->recinto_id]);

        return response()->json(['status' => 'success', 'veedores' => $veedores]);
    }
}
