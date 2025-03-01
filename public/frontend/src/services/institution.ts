import { baseApiSlice } from "./base";


export const institutionApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInstitutions: builder.query({
      query: () => "/institusi"
    })
  })
})

export const { useGetInstitutionsQuery } = institutionApi;