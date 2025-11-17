import { User } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/users",
    }),
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => "/",
        }),
        
    })
})

export const { useGetUsersQuery } = userApi;

export default userApi;