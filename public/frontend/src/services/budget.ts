import { baseApiSlice } from "./base";


export const budgetApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBudgets: builder.query({
      query: () => "/biaya"
    })
  })
})

export const { useGetBudgetsQuery } = budgetApi;