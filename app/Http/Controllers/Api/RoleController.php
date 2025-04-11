<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Resources\ApiResource;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::all();
        return new ApiResource(true, 'daftar data role', $roles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $role = Role::create([
            'name' => $request->name,
            'guard_name' => $request->guard == '' ? 'web' : $request->guard,
        ]);

        if ($role) {
            $permission = $role->syncPermission($request->permission);
            return new ApiResource(true, 'Tugas berhasil di tambahkan!', $role);
        } else {
            return new ApiResource(false, 'gagal membuat Tugas', $role);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $role = Role::where('id', $id) - with('permissions')->first();
        if ($role) {
            return new ApiResource(true, 'detail data role', $role);
        } else {
            return new ApiResource(false, 'data tidak di temukan', null);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = Role::findOrFail($id);

        $data->update([
            'name' => $request->name,
        ]);
        return new ApiResource(true, 'Tugas berhasil di ubah!', $data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function permissionRole(Request $request, string $id)
    {
        $role = Role::findOrFail($id);
        $role->syncPermission($request->permission);

        return new ApiResource(true, 'berhsil sinkron tugas ke hak akses!', $role);
    }
}
