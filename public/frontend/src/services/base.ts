import { createApi, fetchBaseQuery, RootState } from "@reduxjs/toolkit/query/react";

export const baseApiSlice = createApi({
    reducerPath: "persistedApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
        prepareHeaders: (headers, {getState, endpoint}) => {
            const token = (getState() as RootState).auth.token
            const needsAuth = ['updateDivision']

            if (token && needsAuth.includes(endpoint)) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        }
    }),
    tagTypes: ["Divisions"],
    endpoints: () => ({})
})