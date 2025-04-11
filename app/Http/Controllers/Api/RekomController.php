<?php

namespace App\Http\Controllers\Api;

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
        $data = Rekom::latest()->paginate(10);

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
            'rekanan_id' => $request->rekanan_id,
            'institusi_id' => $request->institusi_id,
            'alamat_pejabat_pengganti' => $request->alamat_pejabat_pengganti,
            'jabatan' => $request->jabatan,
            'konten' => $request->konten,
        ]);

        if ($data) {
            return new RekomResource(true, 'data berhasil di simpan', $data);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = Rekom::find($id);
        return new RekomResource(true, 'data rekom', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $update = Rekom::find($id);
        $update->update($request->all());
        return new RekomResource(true, 'data berhasil di update', $update);
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
}
