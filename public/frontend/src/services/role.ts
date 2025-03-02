
import { baseApiSlice } from "./base";


export const roleApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    geRoles: builder.query({
      query: () => "/tugas"
    })
  })
})

export const { useGeRolesQuery } = roleApi;