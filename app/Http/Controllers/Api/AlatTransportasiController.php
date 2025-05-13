<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\AlatTransportasi;
use App\Http\Resources\ApiResource;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class AlatTransportasiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = AlatTransportasi::all();

        return new ApiResource(true, 'data transportasi', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required',
            'jenis' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $transportasi = AlatTransportasi::create($request->all());

        if ($transportasi) {
            return new ApiResource(true, 'berhasil simpan data', $transportasi);
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
        $data = AlatTransportasi::find($id);
        $data->update($request->all());

        return new ApiResource(true, 'berhasil update data', $data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
