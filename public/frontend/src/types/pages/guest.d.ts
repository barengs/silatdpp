export interface GuestBookGetInstance {
    id: number,
    nama_tamu: string,
    alamat: string,
    no_telpon: string,
    institusi_tamu_id: string,
    divisi_id: string,
    keperluan: string,
    user_id: string,
}



export interface GuestBookProps {
    data: GuestBookGetInstance[]
}

export interface InstitutionsDataTypes {
    id: number,
    nama: string,
    alamat: string,
    kontak: string,
    created_at: string,
    updated_at: string
}