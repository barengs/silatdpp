export type InstitutionsDataTypes = {
    id: string,
    nama: string,
    alamat: string,
    kontak: string,
    created_at: string,
    updated_at: string
}

export interface InstituionProps {
    data: InstitutionsDataTypes[]
}