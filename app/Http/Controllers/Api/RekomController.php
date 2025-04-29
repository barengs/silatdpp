<?php

namespace App\Http\Controllers\Api;

use App\Models\RekomApproval;
use App\Models\RekomHistory;
use Carbon\Carbon;
use Str;
use App\Models\Rekom;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\RekomResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Testing\Fakes\Fake;
use Tymon\JWTAuth\Facades\JWTAuth;

class RekomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Rekom::with(['user', 'approval'])->get();

        return new RekomResource(true, 'semua data rekom', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_pejabat' => 'required',
            'nama_pejabat_pengganti' => 'required',
            'nip_pejabat' => 'required',
            'nip_pejabat_pengganti' => 'required',
            'mitra_id' => 'required',
            'institusi_id' => 'required',
            'alamat_pejabat_pengganti' => 'required',
            'jabatan' => 'required',
            'konten' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([$validator->errors()], 422);
        }

        $docNumb = Str::upper(Str::random(5)) . fake()->randomNumber(4);

        $user = JWTAuth::parseToken()->authenticate();

        $data = Rekom::create([
            'noreg' => $docNumb,
            'user_id' => $user->id,
            'nama_pejabat' => $request->nama_pejabat,
            'nip_pejabat' => $request->nip_pejabat,
            'nama_pejabat_pengganti' => $request->nama_pejabat_pengganti,
            'nip_pejabat_pengganti' => $request->nip_pejabat_pengganti,
            'mitra_id' => $request->mitra_id,
            'institusi_id' => $request->institusi_id,
            'alamat_pejabat_pengganti' => $request->alamat_pejabat_pengganti,
            'jabatan' => $request->jabatan,
            'konten' => $request->konten,
        ]);

        if ($data) {
            RekomHistory::create([
                'rekom_id' => $data->id,
                'history_id' => 1,
            ]);
            return new RekomResource(true, 'data berhasil di simpan', $data);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = Rekom::where('id', $id)->with(['mitra', 'institusi', 'user', 'approval', 'history'])->first();
        if ($data) {
            return new RekomResource(true, 'detail data rekom', $data);
        } else {
            return new RekomResource(false, 'data tidak di temukan', null);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $update = Rekom::find($id);
        if (!$update) {
            return new RekomResource(false, 'data tidak di temukan', null);
        }
        $update->update([
            'nama_pejabat' => $request->nama_pejabat,
            'nip_pejabat' => $request->nip_pejabat,
            'nama_pejabat_pengganti' => $request->nama_pejabat_pengganti,
            'nip_pejabat_pengganti' => $request->nip_pejabat_pengganti,
            'mitra_id' => $request->mitra_id,
            'institusi_id' => $request->institusi_id,
            'alamat_pejabat_pengganti' => $request->alamat_pejabat_pengganti,
            'jabatan' => $request->jabatan,
            'konten' => $request->konten,
        ]);
        if ($update) {
            return new RekomResource(true, 'data berhasil di update', $update);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = Rekom::find($id);
        $data->delete();
        return new RekomResource(true, 'data berhasil di hapus', $data);
    }

    public function proses($id)
    {
        $rekom = Rekom::findOrFail($id);
        $rekom->update([
            'status' => 'proses',
        ]);
        RekomHistory::create([
            'rekom_id' => $rekom->id,
            'history_id' => 2,
        ]);
        $rekom->load(['mitra', 'institusi', 'user', 'approval', 'history']);
        return new RekomResource(true, 'data berhasil di proses', $rekom);
    }

    public function approval($id)
    {
        $rekom = Rekom::findOrFail($id);
        $rekom->update([
            'status' => 'disetujui',
        ]);
        RekomHistory::create([
            'rekom_id' => $rekom->id,
            'history_id' => 3,
        ]);

        RekomApproval::create([
            'rekom_id' => $rekom->id,
            'user_id' => JWTAuth::parseToken()->authenticate()->id,
            'tanggal_disetujui' => Carbon::now(),
        ]);

        $rekom->load(['mitra', 'institusi', 'user', 'approval', 'history']);

        return new RekomResource(true, 'data berhasil di setujui', $rekom);
    }
}
