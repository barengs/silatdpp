

export interface SppdDataType {
    id: number;
    user_id: number;
    nama_kegiatan: string;
    tempat_kegiatan: string;
    tanggal_kegiatan: string;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        created_at: string;
        updated_at: string;
    };
    approval: any | null;
    dokumens: any[];
}


export interface SppdPropsType {
    data: SppdDataType[]
}
