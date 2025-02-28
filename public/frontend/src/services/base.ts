import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApiSlice = createApi({
    reducerPath: "persistedApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
    }),
    endpoints: () => ({})
})