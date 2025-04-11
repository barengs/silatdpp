<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MitraResource;
use App\Models\Mitra;
use Illuminate\Http\Request;
use Validator;

class MitraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Mitra::all();
        return new MitraResource(true, 'semua data mitra', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = Validator::make($request->all(), [
            'nama' => 'required',
            'alamat' => 'required',
        ]);

        if ($validated->fails()) {
            return response()->json($validated->errors(), 422);
        }

        $mitra = Mitra::create([
            'nama' => $request->nama,
            'alamat' => $request->alamat,
            'kota' => $request->kota,
        ]);
        if ($mitra) {
            return new MitraResource(true, 'data berhasil di tambah', $mitra);
        } else {
            return new MitraResource(false, 'gagal menambah data', null);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $mitra = Mitra::find($id);
        if ($mitra) {
            return new MitraResource(true, 'detail data mitra', $mitra);
        } else {
            return new MitraResource(false, 'data tidak di temukan', null);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $mitra = Mitra::find($id);
        if ($mitra) {
            $mitra->update([
                'nama' => $request->nama,
                'alamat' => $request->alamat,
                'kota' => $request->kota,
            ]);
            return new MitraResource(true, 'data berhasil di update', $mitra);
        } else {
            return new MitraResource(false, 'data tidak di temukan', null);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $mitra = Mitra::find($id);
        if ($mitra) {
            $mitra->delete();
            return new MitraResource(true, 'data berhasil di hapus', null);
        } else {
            return new MitraResource(false, 'data tidak di temukan', null);
        }
    }
}
