import { baseApiSlice } from "./base";


export const guestBookApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGuestBooks: builder.query({
      query: () => "/buku-tamu"
    }),
  })
})

export const { useGetGuestBooksQuery } = guestBookApi;