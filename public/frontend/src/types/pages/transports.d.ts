
export type TransportDataType = {
    id: string,
    nama: string,
    jenis: string,
    created_at: string,
    updated_at: string
}
export interface TransportPropsType {
    data: TransportDataType[]
}