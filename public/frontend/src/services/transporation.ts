import { baseApiSlice } from "./base";


export const transportationApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransportations: builder.query({
      query: () => "/transportasi",
      providesTags: ["Transportations"]
    }),
    updateTransportation: builder.mutation({
      query: ({ idItem, form}) => ({
        url: `/transportasi/${idItem}`,
        method: "PUT",
        body: new URLSearchParams(form)
      }),
      invalidatesTags: ["Transportations"] 
    })
  })
})

export const { useGetTransportationsQuery, useUpdateTransportationMutation } = transportationApi;