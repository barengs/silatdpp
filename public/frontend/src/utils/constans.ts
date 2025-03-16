export const INSTITUTION_DEFAULT_DATA = {
  id: "",
  nama: "",
  alamat: "",
  kontak: "",
  created_at: "",
  updated_at: ""
}



export const GUEST_BOOK_DEFAULT_DATA = {
  id: "",
  nama_tamu: "",
  alamat: "",
  no_telpon: "",
  institusi_tamu_id: "",
  divisi_id: "",
  keperluan: "",
  user_id: "",
  institusi: INSTITUTION_DEFAULT_DATA,
  divisi: {}

}


export const BUDGET_DEFAULT_DATA = {
  id: "",
  biaya: "",
  created_at: "",
  updated_at: ""
}

export const DEFAULT_STAFF_DATA = {
  id: "",
  name: "",
  email: "",
  email_verified_at: null,
  created_at: "",
  updated_at: "",
  role: [""]
}


export const DEFAULT_PROFILE_DATA = {
  id: "",
  name: "",
  email: "",
  email_verified_at: "",
  created_at: "",
  updated_at: "",
  profile: "",
  roles: [
    {
      id: "",
      name: "",
      guard_name: "",
      created_at: "",
      updated_at: "",
      pivot: {
        model_type: "",
        model_id: "",
        role_id: ""
      }
    }
  ]
}


export const DEFAULT_TRANSPORTATION = {
  id: "",
  nama: "",
  jenis: "",
  created_at: "",
  updated_at: ""
}

export const DEFAULT_DIVISION_DATA = {
  id: "",
  nama: "",
  created_at: "",
  updated_at: ""
}

export const DEFAULT_PARTNERS_DATA = {
  id: "",
  nama: "",
  alamat: "",
  kota: "",
  created_at: "",
  updated_at: ""
}

export const DEFAULT_BUDGET_DATA = {
  id: "",
  name: "",
  created_at: "",
  updated_at: ""
}


export const DEFAULT_PERMISSION_DATA = {
  id: "",
  name: "",
  guard_name: "",
  created_at: "",
  updated_at: ""
}


export const DEFAULT_ROLE_DATA = {
  id: "",
  name: "",
  guard_name: "",
  created_at: "",
  updated_at: ""
}


export const DEFAULT_SPPD_DATA = {
  id: "",
  user_id: "",
  maksud_kegiatan: "",
  tempat_berangkat: "",
  tanggal_kegiatan: "",
  alat_transportasi_id: "",
  tempat_tujuan: "",
  lama_perjalanan: "",
  tanggal_berangkat: "",
  tanggal_kembali: "",
  biaya_id: "",
  created_at: "",
  updated_at: "",
  user: {
    id: "",
    name: "",
    email: "",
    email_verified_at: "",
    created_at: "",
    updated_at: ""
  },
  approval: "",
  dokumens: [],
  history: [
    {
      id: "",
      nama: "",
      created_at: "",
      updated_at: "",
      pivot: {
        sppd_pengajuan_id: "",
        history_id: ""
      }
    }
  ]
}


export const DEFAULT_RECOMENDATION_DATA = {
  id: "",
  noreg: "",
  rekanan_id: "",
  user_id: "",
  institusi_id: "",
  nama_pejabat: "",
  nip_pejabat: "",
  nama_pejabat_pengganti: "",
  nip_pejabat_pengganti: "",
  alamat_pejabat_pengganti: "",
  jabatan: "",
  konten: "",
  status: "",
  created_at: "",
  updated_at: ""
};


export const DEFAULT_CERTIFICATE_DATA = {
  id: "",
  institusi_id: "",
  nomor_ijazah: "",
  nama_siswa: "",
  nis: "",
  perubahan: "",
  alasan: "",
  file: "",
  user_id: "",
  status: "",
  created_at: "",
  updated_at: "",
};

export const DEFAULT_NEWS_DATA = {
  id: "",
  judul: "",
  isi:  "",
  gambar: ""
}

export const DEFAULT_STUDENT_TRANSFER_DATA = {
  "id": "",
  "sekolah_asal_id": "",
  "sekolah_tujuan_id": "",
  "nama_siswa": "",
  "nis": "",
  "jenis_kelamin": "",
  "tingkat_kelas": "",
  "nama_wali": "",
  "alamat_wali": "",
  "kontak_wali": "",
  "status": "",
  "file": "",
  "created_at": "",
  "updated_at": ""
}
