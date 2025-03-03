import { baseApiSlice } from "./base";


export const certificateApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCertificates: builder.query({
      query: () => "/ijazah",
      providesTags: ["Certificates"]
    }),
    updateCertificate: builder.mutation({
      query: ({ idItem, form }) => ({
        url: `/ijazah/${idItem}`,
        method: 'PUT',
        body: new URLSearchParams(form).toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }),
      invalidatesTags: ["Certificates"]
    })
  })
})

export const { useGetCertificatesQuery, useUpdateCertificateMutation } = certificateApi;