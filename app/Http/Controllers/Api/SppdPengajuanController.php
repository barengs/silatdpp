<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SppdPengajuanResource;
use App\Models\DokumenKegiatan;
use App\Models\SppdPengajuan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class SppdPengajuanController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index']]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sppd = SppdPengajuan::with('user')->with('approval')->with('dokumens')->latest()->paginate(10);

        return new SppdPengajuanResource(true, 'List Pengajuan SPPD', $sppd);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        // Validasi inputan dari front end
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'nama_kegiatan' => 'required',
            'tempat_kegiatan' => 'required',
            'tanggal_kegiatan' => 'required',
            'files' => 'required',
            'files.*' => 'mimes:png,jpg,jpeg,pdf',
        ]);

        // cek jika hasil validasi error
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // simpan data
        $sppd = SppdPengajuan::create([
            'user_id' => Auth::user()->id,
            'nama_kegiatan' => $request->nama_kegiatan,
            'tempat_kegiatan' => $request->tempat_kegiatan,
            'tanggal_kegiatan' => $request->tanggal_kegiatan,
        ]);

        
        if ($sppd) {

            if ($request->hasFile('files')){
                // validasi
                // $allowFileExtention = ['pdf', 'jpg', 'jpeg'];
                $files = $request->file('files');
                
                foreach ($files as $file) {
                    DokumenKegiatan::create([
                        'sppd_pengajuan_id' => $sppd->id,
                        'nama_dokumen' => $file->hasName(),
                        'alamat_dokumen' => $file->store('documents'),
                        'tipe_dokumen' => $file->getClientOriginalExtention(),
                    ]);
                }

                $doc = DokumenKegiatan::find($sppd->id);
    
                return new SppdPengajuanResource(true, 'Berhasil input Pengajuan SPPD!', $sppd->merge($doc));
                
            }
        } else {
            return response()->json(['status' => false]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(SppdPengajuan $sppdPengajuan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SppdPengajuan $sppdPengajuan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SppdPengajuan $sppdPengajuan)
    {
        //
    }
}
