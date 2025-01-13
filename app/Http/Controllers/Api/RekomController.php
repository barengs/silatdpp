<?php

namespace App\Http\Controllers\Api;

use App\Models\Rekom;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\RekomResource;
use Illuminate\Support\Facades\Validator;

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
            'rekanan_id' => 'required',
            'institusi_id' => 'required',
            'alamat_pejabat_pengganti' => 'required',
            'jabatan' => 'required',
            'konten' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([$validator->errors()], 422);
        }

        $data = Rekom::create($request->all());

        if ($data) {
            return new RekomResource(true, 'data berhasil di simpan', $data);
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
