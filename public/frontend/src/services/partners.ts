import { baseApiSlice } from "./base";


export const partnerApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPartners: builder.query({
      query: () => "/mitra",
      providesTags: ["Partners"]
    }),
    updatePartner: builder.mutation({
      query: ({ idItem, form }) => ({
        url: `/mitra/${idItem}`,
        method: 'PUT',
        body: new URLSearchParams(form)
      }),
      invalidatesTags: ["Partners"]
    })
  })
})

export const { useGetPartnersQuery, useUpdatePartnerMutation } = partnerApi;