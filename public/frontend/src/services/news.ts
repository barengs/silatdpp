import { baseApiSlice } from "./base";


export const newsApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNews: builder.query({
      query: () => "/berita",
      providesTags: ["News"]
    }),
    updateNews: builder.mutation({
      query: ({ idItem, form }) => ({
        url: `/berita/${idItem}`,
        method: "PUT",
        body: form
      }),
      invalidatesTags: ["News"]
    })
  })
})

export const { useGetAllNewsQuery, useUpdateNewsMutation } = newsApi;