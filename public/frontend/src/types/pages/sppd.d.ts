

export interface SppdDataType {
    id: string;
    user_id: string;
    maksud_kegiatan: string;
    tempat_berangkat: string;
    tanggal_kegiatan: string;
    alat_transportasi_id: string;
    tempat_tujuan: string;
    lama_perjalanan: string;
    tanggal_berangkat: string;
    tanggal_kembali: string;
    tingkat_biaya_id: string;
    created_at: string;
    updated_at: string;
    user: {
      id: string;
      name: string;
      email: string;
      email_verified_at: string;
      created_at: string;
      updated_at: string;
    };
    approval: string;
    dokumens: string[];
    history: {
      id: string;
      nama: string;
      created_at: string;
      updated_at: string;
      pivot: {
        sppd_pengajuan_id: string;
        history_id: string;
      };
    }[];
  };
  


export interface SppdPropsType {
    data: SppdDataType[]
}
