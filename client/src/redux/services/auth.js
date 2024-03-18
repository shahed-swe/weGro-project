import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authentication = createApi({
    reducerPath: 'authentication',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://172.210.25.180:5001/api/auth', // Replace with your actual base URL
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authentication;
