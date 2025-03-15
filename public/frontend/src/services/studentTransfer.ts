import { baseApiSlice } from "./base";


export const studentTransferApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudentTransfer: builder.query({
      query: () => "/pindahan/siswa"
    })
  })
})

export const { useGetStudentTransferQuery } = studentTransferApi;