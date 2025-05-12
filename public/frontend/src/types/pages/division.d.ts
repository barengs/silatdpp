export type DivisionDataType = {
    id: string,
    nama: string,
    created_at: string,
    updated_at: string
}

export interface DivisionProps {
    data: DivisionDataType[]
}