import { baseApiSlice } from "./base";


export const budgetApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBudgets: builder.query({
      query: () => "/biaya",
      providesTags: ["Budgets"]
    }),
    updateBudget: builder.mutation({
      query: ({ idItem, form }) => ({
        url: `/biaya/${idItem}`,
        method: 'PUT',
        body: form
      }),
      invalidatesTags: ["Budgets"]
    })
  })
})

export const { useGetBudgetsQuery, useUpdateBudgetMutation } = budgetApi;