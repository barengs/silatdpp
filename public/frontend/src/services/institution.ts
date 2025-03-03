import { baseApiSlice } from "./base";


export const institutionApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInstitutions: builder.query({
      query: () => "/institusi",
      providesTags: ["Institutions"]
    }),
    updateInstitution: builder.mutation({
      query: ({ idItem, form }) => ({
        url: `/institusi/${idItem}`,
        method: "PUT",
        body: form
      }),
      invalidatesTags: ["Institutions"]
    })
  })
})

export const { useGetInstitutionsQuery, useUpdateInstitutionMutation } = institutionApi;