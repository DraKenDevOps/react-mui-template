import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import env from "../../utilities/environment";
import { LocalKeys } from '../../utilities/localKeys'

export const applicationApi = createApi({
    reducerPath: "applicationApi",
    tagTypes: ["applicationApi"],
    baseQuery: fetchBaseQuery({
        baseUrl: env.BASE_API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(LocalKeys.TOKEN_KEY);
            if (token) headers.set(LocalKeys.HEADER_KEY, "Bearer " + token);
            return headers;
        },
    }),

    endpoints: ({ query, mutation }) => ({
        getFemaleApplication: query({
            query: (page) => ({
                url: `application_forms/female?page=${page}`,
                method: 'GET'
            }),
            providesTags: ['applicationApi']
        }),
        getFemaleApplicationOption: mutation({
            query: (page) => ({
                url: `application_forms/female?page=${page}`,
                method: 'GET'
            }),
            invalidatesTags: ['applicationApi']
        }),
        getFemaleDateRange: mutation<{}, { page: number, dob_start: any, dob_end: any }>({
            query: ({ page, dob_start, dob_end }) => ({
                url: `application/dob/female?page=${page}`,
                method: 'POST',
                body: {
                    dob_start: dob_start,
                    dob_end: dob_end
                }
            }),
            invalidatesTags: ['applicationApi']
        })
    })
})

export const {
    useGetFemaleApplicationQuery,
    useGetFemaleApplicationOptionMutation,
    useGetFemaleDateRangeMutation
} = applicationApi