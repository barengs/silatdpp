<?php

namespace App\Http\Controllers\Api;

use App\Models\Rekanan;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\RekananResource;
use Illuminate\Support\Facades\Validator;

class RekananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Rekanan::all();

        return new RekananResource(true, 'semau data rekanan!', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required',
            'alamat' => 'required',
            'kota' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator, 422);
        }

        $rekan = Rekanan::create($request->all());

        return new RekananResource(true, 'data berhasil di simpan', $rekan);
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
