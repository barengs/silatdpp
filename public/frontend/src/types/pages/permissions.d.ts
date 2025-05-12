export type PermissionDataType = {
    id: string,
    name: string,
    guard_name: string,
    created_at: string,
    updated_at: string
}

export interface PermissionPageProps {
    data: PermissionDataType[]
}