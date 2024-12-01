<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        // validasi
        $validator = Validator::make($request->all(), [
            'name'  => 'required',
            'email' => 'required|email|unique:users',
            'password'  => 'required|min:8|confirmed'
        ]);

        // if validasi gagal
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // buat user baru
        $user = User::create([
            'name'  => $request->name,
            'email' => $request->email,
            'password'  => bcrypt($request->password)
        ]);

        // bila user baru terbuat
        if ($user) {
            return response()->json([
                'success' => true,
                'user'  => $user,
            ], 201);
        }

        // bila user baru gagal
        return response()->json([
            'success' => false,
        ], 409);
    }
}
