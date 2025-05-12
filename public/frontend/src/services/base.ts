import { storeType } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApiSlice = createApi({
    reducerPath: "persistedApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as storeType).auth.token

            headers.set('Authorization', `Bearer ${token}`)
        }
    }),
    tagTypes: ["Divisions", "Institutions", "Transportations", "Budgets", "Partners", "GuestBooks", "Permissions", "Roles", "Certificates", "News"],
    endpoints: () => ({})
})