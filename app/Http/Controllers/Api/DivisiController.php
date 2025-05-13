<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DivisiResource;
use App\Models\Divisi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DivisiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return 'hello';
        $divisi = Divisi::all();

        return new DivisiResource(true, 'List data divisi', $divisi);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $divisi = Divisi::create([
            'nama' => $request->nama,
        ]);

        if ($divisi) {
            return new DivisiResource(true, 'Berhasil input data divisi!', $divisi);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Divisi $divisi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = Divisi::find($id);
        $data->nama = $request->nama;
        $data->update();

        return new DivisiResource(true, 'Berhasi update data', $data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Divisi $divisi)
    {
        //
    }
}
