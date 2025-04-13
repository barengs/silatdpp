<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\KaryawanResource;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use PhpParser\Node\Stmt\TryCatch;

class KaryawanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('profile')->with('roles')->get();
        // $userRole = $users->map(function ($user) {
        //     return [
        //         'user' => $user,
        //         'role' => $user->getRoleNames(),
        //     ];
        // });
        // $users->getRoleNames();
        return new KaryawanResource(true, 'semua data karyawan', $users);
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
            'password' => Hash::make($request->get('password')),
        ]);

        if ($user) {
            $user->assignRole($request->otoritas);
            if ($request->hasFile('photo')) {
                $path = public_path('documents/profile');
                if (!is_dir($path)) {
                    File::makeDirectory($path, 0775, true, true);
                }
                $file = $request->file('photo');
                $fileName = time() . '-' . $file->getClientOriginalName();
                $filePath = $file->move('documents/profile', $fileName);
                $user->profile_photo_path = $fileName;
            }
            $profile = UserProfile::create([
                'user_id' => $user->id,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'nick_name' => $request->nick_name,
                'gender' => $request->gender,
                'address' => $request->address,
                'photo' => $fileName ?? null,
                'phone' => $request->phone,
                'nip' => $request->nip,
            ]);
            if ($profile) {
                $user->profile = $profile;
            } else {
                return new KaryawanResource(false, 'gagal membuat profile', '');
            }
            return new KaryawanResource(true, 'Berhasil daftakan pengguna', $user);
        } else {
            return new KaryawanResource(false, 'gagal mendaftarkan pengguna', '');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $karyawan = User::with('profile')->with('roles')->where('id', $id)->first();
        if ($karyawan) {
            $karyawan->roles = $karyawan->getRoleNames();
            $karyawan->permissions = $karyawan->getAllPermissions();
            return new KaryawanResource(true, 'detail data karyawan', $karyawan);
        } else {
            return new KaryawanResource(false, 'data tidak di temukan', null);
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
            'password' => Hash::make($request->get('password')),
        ]);
        if (!$user) {
            return new KaryawanResource(false, 'gagal mengupdate pengguna', null);
        }
        $profile = UserProfile::where('user_id', $data->id)->first();
        if ($profile) {
            try {
                $profile->update([
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'nick_name' => $request->nick_name,
                    'gender' => $request->gender,
                    'address' => $request->address,
                    'phone' => $request->phone,
                    'nip' => $request->nip,
                ]);
            } catch (\Exception $e) {
                return new KaryawanResource(false, 'gagal mengupdate profile', $e->getMessage());
            }
        } else {
            return new KaryawanResource(false, 'data profile tidak di temukan', null);
        }
        return new KaryawanResource(true, 'data berhasil di update', $data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
