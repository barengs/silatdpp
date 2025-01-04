export interface GuestBookGetInstance {
    id: string,
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