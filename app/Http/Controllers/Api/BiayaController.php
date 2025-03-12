<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApiResource;
use App\Models\Biaya;
use Illuminate\Http\Request;

class BiayaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Biaya::all();
        return new ApiResource(true, 'semua data biaya', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = Biaya::create([
            'name' => $request->name,
        ]);

        return new ApiResource(true, 'berhasil simpan data', $data);
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
        $data = Biaya::findOrFail($id);
        $data->name = $request->name;
        $update = $data->update();
        if ($update) {
            return new ApiResource(true, 'berhasil update data', $data);
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
