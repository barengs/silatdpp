<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SppdPengajuanResource;
use App\Models\DokumenKegiatan;
use App\Models\SppdApproval;
use App\Models\SppdHistory;
use App\Models\SppdPengajuan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
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
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $role = $user->getRoleNames();
        // dd($role);
        if ($role == 'admin' || $role == 'superadmin' || $role == 'kabid' || $role == 'kadis') {
            $sppd = SppdPengajuan::with(['user', 'documents', 'approval', 'history'])->paginate(10);
            return new SppdPengajuanResource(true, 'List Pengajuan SPPD', $sppd);
        }
        $sppd = SppdPengajuan::with(['user', 'approval', 'history'])->where('user_id', $user->id)->paginate(10);

        return new SppdPengajuanResource(true, 'List Pengajuan SPPD', $sppd);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // Validasi inputan dari front end
        $validator = Validator::make($request->all(), [
            'maksud_kegiatan' => 'required',
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
            'biaya_id' => $request->biaya_id,
        ]);

        if ($sppd) {
            SppdHistory::create([
                'sppd_pengajuan_id' => $sppd->id,
                'history_id' => 1,
            ]);
        }

        if ($request->hasFile('files')) {
            // validasi
            // $allowFileExtention = ['pdf', 'jpg', 'jpeg'];
            $files = $request->file('files');
            // dd($files);
            foreach ($files as $file) {
                $fileName = time() . '-' . $file->getClientOriginalName();
                $filePath = $file->move('documents/sppd', $fileName);
                // https://silatdpp.barengsaya.com/documents/sppd/file_name.ext
                // dd($filePath);
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
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $data = SppdPengajuan::where('id', $id)->with('user')->with('approval')->with('dokumens')->with('history')->first();
        return new SppdPengajuanResource(true, 'Detail Pengajuan SPPD', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = SppdPengajuan::find($id);
        $sppd = $data->update($request->all());
        $check_file = DokumenKegiatan::where('sppd_pengajuan_id', $data->id)->get();

        if ($check_file) {
            $path = public_path('documents/sppd/');
            foreach ($check_file as $file) {
                if (File::exists("{$path}" . "{$file->alamat_dokumen}")) {
                    File::delete("{$path}" . "{$file->alamat_dokumen}");
                }
            }
        }

        if ($request->hasFile('files')) {
            $files = $request->file('files');

            foreach ($files as $file) {
                $fileName = time() . '-' . $file->getClientOriginalName();
                $filePath = $file->move('documents/sppd', $fileName);

                $doc = DokumenKegiatan::create([
                    'sppd_pengajuan_id' => $sppd->id,
                    'nama_dokumen' => $fileName,
                    'alamat_dokumen' => $filePath,
                    'tipe_dokumen' => $file->clientExtension(),
                ]);
            }
        }

        return new SppdPengajuanResource(true, 'Data berhasil di update', $sppd);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SppdPengajuan $sppdPengajuan)
    {
        //
    }

    public function proses($id)
    {
        $data = SppdPengajuan::find($id);
        $approval = SppdApproval::create([
            'sppd_pengajuan_id' => $data->id,
            'user_id' => Auth::user()->id,
            'tanggal_disetujui' => Carbon::now(),
        ]);

        SppdHistory::create([
            'sppd_pengajuan_id' => $data->id,
            'history_id' => 2,
        ]);

        $sppd = SppdPengajuan::where('id', $data->id)->with(['user', 'dokumens', 'approval', 'history', 'biaya', 'alat_transportasi'])->first();

        return new SppdPengajuanResource(true, 'Berhasil di setujui', $data);
    }

    public function approval($id)
    {
        $data = SppdPengajuan::find($id);
        $approval = SppdApproval::create([
            'sppd_pengajuan_id' => $data->id,
            'user_id' => Auth::user()->id,
            'tanggal_disetujui' => Carbon::now(),
        ]);

        SppdHistory::create([
            'sppd_pengajuan_id' => $data->id,
            'history_id' => 3,
        ]);

        $sppd = SppdPengajuan::where('id', $data->id)->with(['user', 'dokumens', 'approval', 'history', 'biaya', 'alat_transportasi'])->first();

        return new SppdPengajuanResource(true, 'Berhasil di setujui', $data);
    }
}
