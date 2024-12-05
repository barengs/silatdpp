<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SppdPengajuanResource;
use App\Models\SppdPengajuan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class SppdPengajuanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sppd = SppdPengajuan::latest()->paginate(10);

        return new SppdPengajuanResource(true, 'List Pengajuan SPPD', $sppd);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // cek jika user login
        if (!Auth::check())
        {
            return response()->json([
                'status' => false,
                'message' => 'Anda belum login'
            ]);
        }
        // Validasi inputan dari front end
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'nama_kegiatan' => 'required',
            'tempat_kegiatan' => 'required',
            'tanggal_kegiatan' => 'required',
        ]);

        // cek jika hasil validasi error
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // simpan data
        $sppd = SppdPengajuan::create([
            'user_id' => Auth::user()->id,
            'nama_kegiatan' => $request->nama_kegiatan,
            'tempat_kegiatan' => $request->tempat_kegiatan,
            'tanggal_kegiatan' => $request->tanggal_kegiatan,
        ]);

        if ($sppd) {
            return new SppdPengajuanResource(true, 'Berhasil input Pengajuan SPPD!', $sppd);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(SppdPengajuan $sppdPengajuan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SppdPengajuan $sppdPengajuan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SppdPengajuan $sppdPengajuan)
    {
        //
    }
}
