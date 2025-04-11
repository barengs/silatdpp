<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApiResource;
use App\Models\Rekanan;
use Illuminate\Http\Request;

class RekananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Rekanan::all();
        return new ApiResource(true, 'semua data rekanan', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $create = Rekanan::create([
            'nama' => $request->nama,
            'alamat' => $request->alamat,
            'kota' => $request->kota,
        ]);
        if ($create) {
            return new ApiResource(true, 'data berhasil di tambah', $create);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = Rekanan::findOrFail($id);
        return new ApiResource(true, 'detil rekanan', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = Rekanan::findOrFail($id);
        $update = $data->update([
            'nama' => $request->nama,
            'alamat' => $request->alamat,
            'kota' => $request->kota
        ]);
        if ($update) {
            return new ApiResource(true, 'berhasil update data', $data);
        } else {
            return response()->json('gagal melakukan update data');
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
