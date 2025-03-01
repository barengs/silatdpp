import { baseApiSlice } from "./base";


export const transportationApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransportations: builder.query({
      query: () => "/transportasi"
    })
  })
})

export const { useGetTransportationsQuery } = transportationApi;