import { baseApiSlice } from "./base";


export const divisionApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDivisions: builder.query({
      query: () => "/divisi",
      providesTags: ['Divisions']
    }),
    getDivisionById: builder.query({
      query: (id) => `/divisi/${id}`
    }),
    updateDivision: builder.mutation({
      query: ({ id, ...updatedData}) => ({
        url: `/divisi/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ['Divisions']
    })
  })
})

export const { useGetDivisionsQuery, useGetDivisionByIdQuery } = divisionApi;