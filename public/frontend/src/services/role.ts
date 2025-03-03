
import { baseApiSlice } from "./base";


export const roleApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: () => "/tugas"
    })
  })
})

export const { useGetRolesQuery } = roleApi;