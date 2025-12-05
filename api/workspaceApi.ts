import { IWorkspace } from "@/types/workspace";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { get } from "http";


const workspaceApi = createApi({
    reducerPath: "workspaceApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/workspaces",
    }),
    tagTypes: ["Workspaces"],
    endpoints: (builder) => ({
        getWorkspaces: builder.query<IWorkspace[], void>({
            query: () => "/",
            providesTags: ["Workspaces"]
        }),
        getWorkspaceById: builder.query<IWorkspace, string>({
            query: (id: string) => `/${id}`,
        }),
        createWorkspace: builder.mutation<IWorkspace, IWorkspace>({
            query: (workspace: IWorkspace) => ({
                url: "/",
                method: "POST",
                body: workspace,
            }),
            invalidatesTags: ["Workspaces"]
        }),
        deleteWorkspace: builder.mutation({
            query: (id: string) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Workspaces"]
        })
    }),
})