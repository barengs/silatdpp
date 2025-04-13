<?php

namespace App\Http\Controllers\Api;

use App\Models\Berita;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Resources\ApiResource;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class BeritaConroller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Berita::latest()->get();
        return new ApiResource(true, 'semua data berita', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validasi = Validator::make($request->all(), [
            'judul' => 'required',
            'isi' => 'required',
            'gambar' => 'required',
        ]);

        if ($validasi->fails()) {
            return response()->json($validasi->errors(), 422);
        }

        $fileName = null;
        $user = JWTAuth::parseToken()->authenticate();

        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');
            $fileName = time() . '-' . Str::slug($file->getClientOriginalName());
            $filePath = $file->storeAs('documents/berita', $fileName);

            $save = Berita::create([
                'judul' => $request->judul,
                'isi' => $request->isi,
                'gambar' => $fileName,
                'slug' => Str::slug($request->judul),
                'user_id' => $user->id,
            ]);

            return new ApiResource(true, 'berita berhasil ditambahkan', $save);
        } else {
            return response()->json('gambar harus di isi');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = Berita::find($id);
        return new ApiResource(true, 'data berita', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = Berita::find($id);
        $data->update($request->all());
        return new ApiResource(true, 'data berhasil di update', $data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
