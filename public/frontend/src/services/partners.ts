import { baseApiSlice } from "./base";


export const biayaApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBiaya: builder.query({
      query: () => "/rekanan"
    })
  })
})

export const { useGetBiayaQuery } = biayaApi;