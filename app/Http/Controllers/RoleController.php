<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::orderBy('id','ASC')->get(['id', 'name']);
        return response()->json(['status' => 'success', 'roles' => $roles]);
    }
}
