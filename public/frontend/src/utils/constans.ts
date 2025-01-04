// FOR DEVELOPMENT PURPOSE



export const INSTITUTION_DEFAULT_DATA = {
  id: null,
  nama: "",
  alamat: "",
  kontak: "",
  created_at: "",
  updated_at: ""
}


export const DEFAULT_USER_DATA = {
  id: 0,
  name: "",
  email: "",
  email_verified_at: null,
  created_at: "",
  updated_at: ""
}


export const GUEST_BOOK_DEFAULT_DATA = {
  id: "0",
  nama_tamu: "",
  alamat: "",
  no_telpon: "",
  institusi_tamu_id: "",
  divisi_id: "",
  keperluan: "",
  user_id: "",
  institusi_tamu: INSTITUTION_DEFAULT_DATA,
  divisi: {}
  
}


export const BUDGET_DEFAULT_DATA = {
  id: "",
  biaya: "",
  created_at: "",
  updated_at: ""
}