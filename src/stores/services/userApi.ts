import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalKeys } from "../../utilities/localKeys";
import env from "../../utilities/environment";

export const userApi = createApi({
    reducerPath: "userApi",
    tagTypes: ["userApi"],

    baseQuery: fetchBaseQuery({
        baseUrl: env.BASE_API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(LocalKeys.TOKEN_KEY);
            if (token) headers.set(LocalKeys.HEADER_KEY, "Bearer " + token);
            return headers;
        },
    }),

    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ ...body }) => ({
                url: `auth/login`,
                method: "POST",
                body,
            }),
        }),

        verify: builder.mutation({
            query: ({ ...body }) => ({
                url: `auth/verify`,
                method: "POST",
                body,
            }),
        }),

        register: builder.mutation({
            query: ({ ...body }) => ({
                url: `auth/register`,
                method: "POST",
                body,
            }),
        }),

        me: builder.mutation({
            query: () => ({
                url: `auth/me`,
                method: "POST",
            }),
        }),

        getUsers: builder.query({
            query: () => ({
                url: "users",
                method: "GET",
            }),
            providesTags: ["userApi"],
        }),

        updateMyProfile: builder.mutation({
            query: ({ ...body }) => ({
                url: "/users/update/profile",
                method: "POST",
                body
            }),
            invalidatesTags: ["userApi"],
        }),

        addUser: builder.mutation({
            query: ({ ...body }) => ({
                url: "users/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["userApi"],
        }),

        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}/delete`,
                method: "DELETE",
            }),
            invalidatesTags: ["userApi"],
        }),

        updateStatus: builder.mutation({
            query: ({ ...body }) => ({
                url: `/users/${body.u_id}/update/status`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ["userApi"],
        }),

        updateUser: builder.mutation({
            query: ({ ...body }) => ({
                url: `/users/update/`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ["userApi"],
        }),



        verifyEmail: builder.mutation({
            query: ({ ...body }) => ({
                url: `/auth/email-send-pin`,
                method: "POST",
                body
            }),
            invalidatesTags: ["userApi"],
        }),

    }),
});

export const { useGetUsersQuery,
    useRegisterMutation,
    useUpdateUserMutation,
    useUpdateStatusMutation,
    useDeleteUserMutation,
    useUpdateMyProfileMutation,
    useMeMutation,
    useAddUserMutation,
    useLoginMutation,
    useVerifyMutation,
    useVerifyEmailMutation,
} = userApi;
