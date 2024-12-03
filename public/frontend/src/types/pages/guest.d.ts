export interface GuestBookGetInstance {
    id: number,
    nama_tamu: string,
    alamat: string,
    no_telpon: string,
    institusi_tamu_id: 0,
    divisi_id: 0,
    keperluan: string,
    user_id: 0,
}



export interface GuestBookProps {
    data: GuestBookGetInstance[]
}