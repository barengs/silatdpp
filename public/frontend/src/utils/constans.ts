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
  biaya: "",
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