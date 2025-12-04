import { IUser } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/users",
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => "/",
      providesTags: ["Users"]
    }),
    getUserById: builder.query<IUser, string>({
      query: (id: string) => `/${id}`,
    }),
    createUser: builder.mutation<IUser, IUser>({
      query: (user: IUser) => ({
        url: "/",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"]
    }),
    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Users"]
    })
  }),
});

export const { useGetUsersQuery, useCreateUserMutation, useDeleteUserMutation } = userApi;

export default userApi;
