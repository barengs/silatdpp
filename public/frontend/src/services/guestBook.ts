import { baseApiSlice } from "./base";


export const guestBookApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGuestBooks: builder.query({
      query: () => "/buku-tamu",
      providesTags: ["GuestBooks"]
    }),
    deleteGuestBook: builder.mutation({
      query: ({ idItem }) => ({
        url: `/buku-tamu/${idItem}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GuestBooks"]
    }),
  })
})

export const { useGetGuestBooksQuery, useDeleteGuestBookMutation } = guestBookApi;