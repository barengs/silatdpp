<?php

namespace App\Http\Controllers\Api;

use App\Models\TingkatBiaya;
use Illuminate\Http\Request;
use App\Http\Resources\ApiResource;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class TingkatBiayaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = TingkatBiaya::all();

        return new ApiResource(true, 'data tingkatan biaya', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'biaya' => 'required',
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $biaya = TingkatBiaya::create($request->all());

        if ($biaya) {
            return new ApiResource(true,'berhasil simpan data biaya', $biaya);
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
