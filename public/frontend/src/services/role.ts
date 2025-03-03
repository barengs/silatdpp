
import { baseApiSlice } from "./base";


export const roleApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: () => "/tugas",
      providesTags: ["Roles"]
    }),
    updateRole: builder.mutation({
      query: ({ itemId, form }) => ({
        url: `/tugas/${itemId}`,
        method: 'PUT',
        body: form
      }),

      invalidatesTags: ["Roles"]
    })
  })
})

export const { useGetRolesQuery, useUpdateRoleMutation } = roleApi;