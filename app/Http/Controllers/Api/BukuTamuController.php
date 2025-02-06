<?php

namespace App\Http\Controllers\Api;

use App\Models\BukuTamu;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\BukuTamuResource;
use App\Models\InstitusiTamu;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class BukuTamuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tamu = BukuTamu::with('institusi_tamu')->with('divisi')->latest()->paginate(10);

        return new BukuTamuResource(true, 'List data buku tamu', $tamu);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
		$institusi = null;

        $validator = Validator::make($request->all(), [
			'nama_tamu' => 'required',
			'alamat'	=> 'required',
			'no_telpon'	=> 'required',
			'institusi_tamu_id' => 'required',
			'keperluan'	=> 'required',
		]);

		if ($validator->fails()) {
			return response()->json($validator->errors(), 422);
		}

		// cek jika institusi tamu berupa nama baru
		if (strlen($request->institusi_tamu_id) > 3) {
			
			$institusiBaru = InstitusiTamu::create([
				'nama' => $request->institusi_tamu_id,
				'alamat' => $request->alamat_institusi,
				'kontak' => $request->kontak_institusi,
			]);

			$institusi = $institusiBaru->id;
		}else {
			$institusi = $request->isntitusi_tamu_id;
		}

		$tamu = BukuTamu::create([
			'nama_tamu'	=> $request->nama_tamu,
			'alamat'	=> $request->alamat,
			'no_telpon'	=> $request->no_telpon,
			'institusi_tamu_id' => $institusi,
			'divisi_id'	=> $request->divisi_id,
			'keperluan'	=> $request->keperluan,
			'user_id'	=> Auth::id(),
		]);

		if ($tamu) {
			return new BukuTamuResource(true, 'Tamu berhasil di simpan!', $tamu);
		}else {
			return response()->json([
				'status' => false,
				'message' => 'gagal input data'
			]);
		}
    }

    /**
     * Display the specified resource.
     */
    public function show(BukuTamu $bukuTamu)
    {
        $tamu = BukuTamu::find($bukuTamu->id);

        return new BukuTamuResource(true, 'Data tamu', $tamu);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BukuTamu $bukuTamu)
    {
        // validasi input
				$validator = Validator::make($request->all(), [
					'nama_tamu' => 'required',
					'alamat'		=> 'required',
					'no_telpon'	=> 'required',
					'keperluan'	=> 'required',
				]);
				// jika ada kegagalan
				if ($validator->fails()){
					return response()->json($validator->errors(), 422);
				}
				// ambil data berdasarkan id
				$tamu = BukuTamu::find($bukuTamu->id);
				// update data tamu
				$tamu->update([
					'nama_tamu'	=> $request->nama_tamu,
					'alamat'		=> $request->alamat,
					'no_telpon'	=> $request->no_telpon,
					'institusi_tamu_id' => $request->institusi_tamu,
					'divisi_id'	=> $request->divisi_id,
					'keperluan'	=> $request->keperluan,
					'user_id'		=> 1,
				]);

				return new BukuTamuResource(true, 'Berhasil update', $tamu);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BukuTamu $bukuTamu)
    {
        $tamu = BukuTamu::find($bukuTamu->id);

				$tamu->delete();
				
				return new BukuTamuResource(true, 'Berhasil delete tamu', $tamu);
    }
}
