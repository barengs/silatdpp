<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\InstitusiTamuResource;
use App\Models\InstitusiTamu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InstitusiTamuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $institusi = InstitusiTamu::latest();

        return new InstitusiTamuResource(true, 'List data institusi', $institusi);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama'      => 'required',
            'alamat'    => 'required',
            'kontak'    => 'required',
        ]);

        if ($validator->fails())
        {
            return response()->json($validator, 422);
        }

        $institusi = InstitusiTamu::create([
            'nama'      => $request->nama,
            'alamat'    => $request->alamat,
            'kontak'    => $request->kontak,
        ]);

        if ($institusi) {
            return new InstitusiTamuResource(true, 'Input data Institusi berhasil!', $institusi);
        } else {
            return response()->json($institusi);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(InstitusiTamu $institusiTamu)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InstitusiTamu $institusiTamu)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InstitusiTamu $institusiTamu)
    {
        //
    }
}
