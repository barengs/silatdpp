<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\InstitusiResource;
use App\Models\Institusi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InstitusiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $institusi = Institusi::all();

        return new InstitusiResource(true, 'List data institusi', $institusi);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required',
            'alamat' => 'required',
            'kontak' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator, 422);
        }

        $institusi = Institusi::create([
            'nama' => $request->nama,
            'alamat' => $request->alamat,
            'kontak' => $request->kontak,
        ]);

        if ($institusi) {
            return new InstitusiResource(true, 'Input data Institusi berhasil!', $institusi);
        } else {
            return response()->json($institusi);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Institusi $institusiTamu)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Institusi $institusiTamu)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Institusi $institusiTamu)
    {
        //
    }
}
