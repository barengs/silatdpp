export default interface STAFF_DATA_TYPE {
    id: string,
    name: string,
    email: string,
    email_verified_at: string,
    created_at: string,
    updated_at: string,
    role: string[]
  }


export type PROFILE_DATA_TYPE = {
    id: string,
    name: string,
    email: string,
    email_verified_at: string,
    created_at: string,
    updated_at: string,
    profile: string,
    roles: [
      {
        id: string,
        name: string,
        guard_name: string,
        created_at: string,
        updated_at: string,
        pivot: {
          model_type: string,
          model_id: string,
          role_id: string
        }
      }
    ]
  }