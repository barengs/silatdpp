import { baseApiSlice } from "./base";


export const divisionApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDivisions: builder.query({
      query: () => "/divisi"
    }),
    getDivisionById: builder.query({
      query: (id) => `/divisi/${id}`
    }),
  })
})

export const { useGetDivisionsQuery, useGetDivisionByIdQuery } = divisionApi;