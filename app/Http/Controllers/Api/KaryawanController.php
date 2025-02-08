<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\KaryawanResource;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class KaryawanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('profile')->get();
        $userRole = $users->map(function ($user) {
            return [
                'user' => $user,
                'role' => $user->getRoleNames(),
            ];
        });
        // $users->getRoleNames();
        return new KaryawanResource(true, 'semua data karyawan', $userRole);
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
            $profile = UserProfile::create([
                'user_id' => $user->id,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'nick_name' => $request->nick_name,
                'gender' => $request->gender,
                'address' => $request->address,
            ]);
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
