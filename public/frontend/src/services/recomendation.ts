import { baseApiSlice } from "./base";


export const recomendationApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecomendations: builder.query({
      query: () => "/rekom",
      providesTags: ["Budgets"]
    }),
    updateRecomendation: builder.mutation({
      query: ({ idItem, form }) => ({
        url: `/rekom/${idItem}`,
        method: 'PUT',
        body: form
      }),
      invalidatesTags: ["Budgets"]
    })
  })
})

export const { useGetRecomendationsQuery, useUpdateRecomendationMutation } = recomendationApi;