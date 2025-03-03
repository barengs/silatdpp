import { baseApiSlice } from "./base";


export const permissionApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPermissions: builder.query({
      query: () => "/hak-akses",
      providesTags: ["Permissions"]
    }),
    updatePermission: builder.mutation({
      query: ({ idItem, form }) => ({
        url: `/hak-akses/${idItem}`,
        method: 'PUT',
        body: new URLSearchParams(form).toString()
      }),
      invalidatesTags: ["Permissions"]
    })
  })
})

export const { useGetPermissionsQuery, useUpdatePermissionMutation } = permissionApi;