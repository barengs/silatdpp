<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Karyawan;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use App\Http\Resources\KaryawanResource;
use Illuminate\Support\Facades\Validator;

class KaryawanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = User::with('role')->withWhereHas('karyawan')->get();
        $data->roles = $data->getRoleNames();
        if ($data->isEmpty()) {
            return response()->json([
                'message' => 'Data tidak ditemukan',
            ], 404);
        }
        return new KaryawanResource(true, 'data karyawan', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'gender' => 'required',
            'otoritas' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        if (!$user) {
            return response()->json([
                'message' => 'Gagal menambahkan akun user',
            ], 500);
        }
        $user->assignRole($request->otoritas);

        if ($request->hasFile('photo')) {
            $path = public_path('documents/profile');

            if (!File::exists($path)) {
                File::makeDirectory($path, 0775, true, true);
            }

            $file = $request->file('photo');
            $filename = time() . '.' . Str::slug($file->getClientOriginalExtension());
            $file->move($path, $filename);
        } else {
            $request->photo = null;
        }

        try {
            //code...
            $karyawan = Karyawan::create([
                'user_id' => $user->id,
                'nip' => $request->nip,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'nick_name' => $request->nick_name,
                'address' => $request->address,
                'gender' => $request->gender,
                'phone' => $request->phone,
                'photo' => $filename,
            ]);

            return new KaryawanResource(true, 'data karyawan berhasil ditambahkan', $karyawan);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menambahkan data karyawan',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $karyawan = User::with(['karyawan', 'role'])->where('id', $id)->first();
        if ($karyawan) {
            $karyawan->roles = $karyawan->getRoleNames();
            $karyawan->permissions = $karyawan->getAllPermissions();
            return new KaryawanResource(true, 'detail data karyawan', $karyawan);
        } else {
            return new KaryawanResource(false, 'data karyawan tidak di temukan', null);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = User::find($id);
        $user = $data->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        if (!$user) {
            return new KaryawanResource(false, 'gagal mengupdate pengguna', null);
        }
        $profile = Karyawan::where('user_id', $data->id)->first();
        if (!$profile) {
            return new KaryawanResource(false, 'data profile tidak di temukan', null);
        }

        if ($request->hasFile('photo')) {
            if ($profile->photo) {
                $path = public_path('documents/profile/' . $profile->photo);
                if (File::exists($path)) {
                    File::delete($path);
                }
            }
            $file = $request->file('photo');
            $filename = time() . '.' . Str::slug($file->getClientOriginalExtension());
            $file->move($path, $filename);
        } else {
            $filename = $profile->photo;
        }
        try {
            //code...
            $profile->update([
                'nip' => $request->nip,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'nick_name' => $request->nick_name,
                'address' => $request->address,
                'gender' => $request->gender,
                'phone' => $request->phone,
                'photo' => $filename,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengupdate data karyawan',
                'error' => $e->getMessage(),
            ], 500);
        }
        return new KaryawanResource(true, 'data karyawan berhasil diupdate', $profile);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = User::find($id);
        if (!$data) {
            return new KaryawanResource(false, 'gagal menghapus pengguna', null);
        }
        $profile = Karyawan::where('user_id', $data->id)->first();
        if ($profile) {
            if ($profile->photo) {
                $path = public_path('documents/profile/' . $profile->photo);
                if (File::exists($path)) {
                    File::delete($path);
                }
            }
            $profile->delete();
        }
        $data->delete();
        return new KaryawanResource(true, 'data karyawan berhasil dihapus', null);
    }
}
