<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SppdPengajuanResource;
use App\Models\DokumenKegiatan;
use App\Models\SppdHistory;
use App\Models\SppdPengajuan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

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
        $sppd = SppdPengajuan::with('user')->with('approval')->with('dokumens')->with('history')->latest()->paginate(10);

        return new SppdPengajuanResource(true, 'List Pengajuan SPPD', $sppd);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        // Validasi inputan dari front end
        $validator = Validator::make($request->all(), [
            
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

        $user = JWTAuth::user();
        // simpan data
        $sppd = SppdPengajuan::create([
            'user_id' => $user->id,
            'maksud_kegiatan' => $request->maksud_kegiatan,
            'tempat_berangkat' => $request->tempat_berangkat,
            'tanggal_kegiatan' => $request->tanggal_kegiatan,
            'alat_transportasi_id' => $request->alat_transportasi_id,
            'tempat_tujuan' => $request->tempat_tujuan,
            'lama_perjalanan' => $request->lama_perjalanan,
            'tanggal_berangkat' => $request->tanggal_berangkat,
            'tanggal_kembali' => $request->tanggal_kembali,
            'tingkat_biaya_id' => $request->tingkat_biaya_id,
        ]);

        if ($sppd) {
            SppdHistory::create([
                'sppd_pengajuan_id' => $sppd->id,
                'history_id' => 1,
            ]);
        }

        if ($request->hasFile('files')){
            // validasi
            // $allowFileExtention = ['pdf', 'jpg', 'jpeg'];
            $files = $request->file('files');
            
            foreach ($files as $file) {
                $fileName = time() . '-' . $file->getClientOriginalName();
                $filePath = $file->move('documents', $fileName);

                $doc = DokumenKegiatan::create([
                    'sppd_pengajuan_id' => $sppd->id,
                    'nama_dokumen' => $fileName,
                    'alamat_dokumen' => $filePath,
                    'tipe_dokumen' => $file->clientExtension(),
                ]);
            }

            $data = SppdPengajuan::where('id', $sppd->id)->with('dokumens')->first();

            return new SppdPengajuanResource(true, 'Berhasil input Pengajuan SPPD!', $data);
            
        } else {
            return response()->json(['status' => false]);
        }
        
    //     if ($sppd) {

    //     } else {
    //     }
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
