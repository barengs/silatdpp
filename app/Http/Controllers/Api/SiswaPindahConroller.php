<?php

namespace App\Http\Controllers\Api;

use Validator;
use App\Models\SiswaPindah;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Resources\ApiResource;
use App\Http\Controllers\Controller;

class SiswaPindahConroller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = SiswaPindah::latest()->get();
        return new ApiResource(true, 'semua data siswa pindah', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validasi = Validator::make($request->all(), [
            'nama_siswa' => 'required',
            'nis' => 'required',
            'sekolah_asal_id' => 'required',
            'sekolah_tujuan_id' => 'required',
            'tingkat_kelas' => 'required',
            'nama_wali' => 'required',
            'alamat_wali' => 'required',
            'kontak_wali' => 'required',
        ]);

        if ($validasi->fails()) {
            return response()->json($validasi->errors(), 422);
        }

        $user = JWTAuth::parseToken()->authenticate();

        $fileName = null;

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time() . '-' . $file->getClientOriginalName();
            $filePath = $file->move('documents/siswa_pindah', $fileName);

            $save = SiswaPindah::create([
                'sekolah_asal_id' => $request->sekolah_asal_id,
                'sekolah_tujuan_id' => $request->sekolah_asal_id,
                'nama_siswa' => $request->nama_siswa,
                'nis' => $request->nis,
                'jenis_kelamin' => $request->jenis_kelamin,
                'nama_wali' => $request->nama_wali,
                'alamat_wali' => $request->alamat_wali,
                'kontak_wali' => $request->kontak_wali,
                'file' => $fileName,
                'user_id' => $user->id,
            ]);

            if ($save) {
                return new ApiResource(true, 'pengajuan berhasil disimpan', $save);
            } else {
                return new ApiResource(false, 'gagal membuat pengajuan', '');
            }
        } else {
            return response()->json('harus mengisi file', 422);
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
