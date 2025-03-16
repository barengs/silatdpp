import { baseApiSlice } from "./base";


export const userApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => "/karyawan"
    })
  })
})

export const { useGetAllUserQuery } = userApi;