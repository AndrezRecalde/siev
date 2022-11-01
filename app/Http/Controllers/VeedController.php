<?php

namespace App\Http\Controllers;

use File;
use App\Http\Requests\VeedRequest;
use App\Http\Requests\VeedUpdateRequest;
use App\Models\Veed;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class VeedController extends Controller
{
    public function store(VeedRequest $request)
    {
        $veed = Veed::create($request->validated());

        if ($request->file('cedula_frontal')) {
            $veed->cedula_frontal = $request->file('cedula_frontal');
            $filename_f = $veed->cedula_frontal->getClientOriginalName();
            $save_path = '/veedores/dni/' . $veed->dni . '/uploads/';
            $public_path_f = $save_path . $filename_f;
            $path = Storage::putFileAs(
                'public' . $save_path,
                $veed->cedula_frontal,
                $filename_f
            );
            if (!$path) {
                DB::rollback();
                return response()->json(array("status" => "error", 'message' => 'Hubo un error al cargar el archivo'));
            }
            $veed->cedula_frontal = $public_path_f;
        }
        if ($request->file('cedula_reverso')) {
            $veed->cedula_reverso = $request->file('cedula_reverso');
            $filename_r = $veed->cedula_reverso->getClientOriginalName();
            $save_path = '/veedores/dni/' . $veed->dni . '/uploads/';
            $public_path_r = $save_path . $filename_r;
            $path = Storage::putFileAs(
                'public' . $save_path,
                $veed->cedula_reverso,
                $filename_r
            );
            if (!$path) {
                DB::rollback();
                return response()->json(array("status" => "error", 'message' => 'Hubo un error al cargar el archivo'));
            }
            $veed->cedula_reverso = $public_path_r;
        }

        $veed->save();
        return ['status' => 'success', 'message' => 'veedor registrado'];

    }

    public function update(VeedUpdateRequest $request, $id)
    {
        $veed = Veed::find($id);

        if ($veed) {

            if ($request->hasFile('cedula_frontal') || $request->hasFile('cedula_reverso')) {
                if ($request->hasFile('cedula_frontal')) {
                    $filename_f = $veed->cedula_frontal;

                    if ($filename_f) {
                        Storage::disk('public')->delete($filename_f);
                    }
                    $veed->fill($request->validated());
                    $veed->cedula_frontal = $request->file('cedula_frontal');
                    $filename_f = $veed->cedula_frontal->getClientOriginalName();
                    $save_path = '/veedores/dni/' . $veed->dni . '/uploads/';
                    $public_path_f = $save_path . $filename_f;
                    $path = Storage::putFileAs(
                        'public' . $save_path,
                        $veed->cedula_frontal,
                        $filename_f
                    );
                    if (!$path) {
                        \DB::rollback();
                        return response()->json(array("status" => "error", 'message' => 'Hubo un error al actualizar'));
                    }
                    $veed->cedula_frontal = $public_path_f;
                }

                if ($request->hasFile('cedula_reverso')) {
                    $filename_r = $veed->cedula_reverso;

                    if ($filename_r) {
                        Storage::disk('public')->delete($filename_r);
                    }

                    $veed->fill($request->validated());
                    $veed->cedula_reverso = $request->file('cedula_reverso');
                    $filename_r = $veed->cedula_reverso->getClientOriginalName();
                    $save_path = '/veedorees/dni/' . $veed->dni . '/uploads/';
                    $public_path_r = $save_path . $filename_r;
                    $path = Storage::putFileAs(
                        'public' . $save_path,
                        $veed->cedula_reverso,
                        $filename_r
                    );
                    if (!$path) {
                        \DB::rollback();
                        return response()->json(array("status" => "error", 'message' => 'Hubo un error al actualizar'));
                    }
                    $veed->cedula_reverso = $public_path_r;
                }
                $res = $veed->save();
            } else {

                if (!$request->filled('cedula_frontal')) {
                    if ($veed->cedula_frontal) {
                        Storage::disk('public')->delete($veed->cedula_frontal);
                        $veed->cedula_frontal = '';
                    }
                }

                if (!$request->filled('cedula_reverso')) {
                    if ($veed->cedula_reverso) {
                        Storage::disk('public')->delete($veed->cedula_reverso);
                        $veed->cedula_reverso = '';
                    }
                }


                $res = $veed->update(array_filter($request->validated()));
            }
        } else {
            return response()->json(['status' => 'error', 'msg' => 'Veedor no encontrado']);
        }

        if ($res) {
            return response()->json(['status' => 'success', 'message' => 'Veedor actualizado']);
        }

    }
}
