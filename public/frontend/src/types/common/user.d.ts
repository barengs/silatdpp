export interface UserCredentialType {
    user: {
        id: string,
        name: string,
        email: string,
        email_verified_at: null,
        created_at: string,
        updated_at: string
    },
    roles: string[]
}