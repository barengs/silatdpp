<?php

namespace App\Http\Controllers\Api;

use App\Models\Ijazah;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Resources\ApiResource;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class IjazahConroller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Ijazah::latest()->get();

        return new ApiResource(true, 'data pengajuan perubahan ijazah', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validasi = Validator::make($request->all(), [
            'institusi_id' => 'required',
            'nomor_ijazah' => 'required',
            'nama_siswa' => 'required',
            'nis' => 'required',
            'perubahan' => 'required',
            'alasan' => 'required',
            'file' => 'required',
        ]);

        if ($validasi->fails()) {
            return response()->json($validasi->errors(), 422);
        }

        $user = JWTAuth::parseToken()->authenticate();

        $fileName = null;

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time() . '-' . $file->getClientOriginalName();
            $filePath = $file->storeAs('documents/ijazah', $fileName);

            $save = Ijazah::create([
                'institusi_id' => $request->institusi_id,
                'nomor_ijazah' => $request->nomor_ijazah,
                'nama_siswa' => $request->nama_siswa,
                'nis' => $request->nis,
                'perubahan' => $request->perubahan,
                'alasan' => $request->alasan,
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
        $data = Ijazah::findOrFail($id);
        return new ApiResource(true, 'detil pengajuan', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $ajuan = Ijazah::findOrFail($id);
        $ajuan->institusi_id = $request->institusi_id;
        $ajuan->nomor_ijazah = $request->nomor_ijazah;
        $ajuan->nama_siswa = $request->nama_siswa;
        $ajuan->nis = $request->nis;
        $ajuan->perubahan = $request->perubahan;
        $ajuan->alasan = $request->alasan;
        $ajuan->status = $request->status;

        $ajuan->update();

        return new ApiResource(true, 'berhasil merubah pengajuan', $ajuan);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
