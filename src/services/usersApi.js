import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

let token;

const usersHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
};

const baseUrl = 'https://benion-tech-server.herokuapp.com';

const createRequest = (url) => ({ url, headers: usersHeaders });

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => createRequest('/benion-users/all-users')
        })
    })
});

export const { useGetUsersQuery } = usersApi;