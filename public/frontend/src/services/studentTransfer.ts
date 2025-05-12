import { baseApiSlice } from "./base";


export const studentTransferApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudentTransfer: builder.query({
      query: () => "/pindahan/siswa"
    }),

    updateStudentTransfer: builder.mutation({
      query: ({ idItem, form }) => ({
        url: `/pindahan/siswa/${idItem}`,
        method: "PUT",
        body: new URLSearchParams(form)
      })
    })
  })
})

export const { useGetStudentTransferQuery, useUpdateStudentTransferMutation } = studentTransferApi;