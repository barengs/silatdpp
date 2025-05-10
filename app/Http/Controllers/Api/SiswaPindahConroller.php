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
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = JWTAuth::user();
        $role = $user->getRoleNames();
        if ($role == 'superadmin' || $role == 'administrasi' || $role == 'kabid' || $role == 'kadis') {
            $data = SiswaPindah::latest()->get();
            return new ApiResource(true, 'semua data siswa pindah', $data);
        }
        $data = SiswaPindah::with('user_id', $user->id)->latest()->get();

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
            $filePath = $file->move('documents/siswa_pindah', $fileName);

            $save = SiswaPindah::create([
                'sekolah_asal_id' => $request->sekolah_asal_id,
                'sekolah_tujuan_id' => $request->sekolah_asal_id,
                'nama_siswa' => $request->nama_siswa,
                'nis' => $request->nis,
                'jenis_kelamin' => $request->jenis_kelamin,
                'tingkat_kelas' => $request->tingkat_kelas,
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
        $data = SiswaPindah::findOrFail($id);
        $data->load('sekolah_asal', 'sekolah_tujuan');
        if ($data) {
            return new ApiResource(true, 'detail data siswa pindah', $data);
        } else {
            return new ApiResource(false, 'data tidak di temukan', null);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = SiswaPindah::findOrFail($id);
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time() . '-' . $file->getClientOriginalName();
            $filePath = $file->move('documents/siswa_pindah', $fileName);

            $update = $data->update([
                'sekolah_asal_id' => $request->sekolah_asal_id,
                'sekolah_tujuan_id' => $request->sekolah_asal_id,
                'nama_siswa' => $request->nama_siswa,
                'nis' => $request->nis,
                'jenis_kelamin' => $request->jenis_kelamin,
                'tingkat_kelas' => $request->tingkat_kelas,
                'nama_wali' => $request->nama_wali,
                'alamat_wali' => $request->alamat_wali,
                'kontak_wali' => $request->kontak_wali,
                'file' => $fileName,
            ]);

            if ($update) {
                return new ApiResource(true, 'berhasil update data', $data);
            } else {
                return new ApiResource(false, 'gagal update data', '');
            }
        } else {
            $update = $data->update([
                'sekolah_asal_id' => $request->sekolah_asal_id,
                'sekolah_tujuan_id' => $request->sekolah_asal_id,
                'nama_siswa' => $request->nama_siswa,
                'nis' => $request->nis,
                'jenis_kelamin' => $request->jenis_kelamin,
                'tingkat_kelas' => $request->tingkat_kelas,
                'nama_wali' => $request->nama_wali,
                'alamat_wali' => $request->alamat_wali,
                'kontak_wali' => $request->kontak_wali,
            ]);

            if ($update) {
                return new ApiResource(true, 'berhasil update data', $data);
            } else {
                return new ApiResource(false, 'gagal update data', '');
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
