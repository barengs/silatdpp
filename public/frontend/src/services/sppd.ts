import { baseApiSlice } from "./base";


export const sppdApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSppds: builder.query({
      query: () => "/sppd"
    })
  })
})

export const { useGetSppdsQuery } = sppdApi;