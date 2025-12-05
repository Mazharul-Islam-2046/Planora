import { ISubtask } from "@/types/subtask";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const subtaskApi = createApi({
    reducerPath: "subtaskApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/subtasks",
    }),
    tagTypes: ["Subtasks"],
    endpoints: (builder) => ({
        getSubtasks: builder.query<ISubtask[], void>({
            query: () => "/",
            providesTags: ["Subtasks"]
        }),
        getSubtaskById: builder.query<ISubtask, string>({
            query: (id: string) => `/${id}`,
        }),
        createSubtask: builder.mutation<ISubtask, ISubtask>({
            query: (subtask: ISubtask) => ({
                url: "/",
                method: "POST",
                body: subtask,
            }),
            invalidatesTags: ["Subtasks"]
        }),
        deleteSubtask: builder.mutation({
            query: (id: string) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Subtasks"]
        }),
        updateSubtask: builder.mutation<ISubtask, ISubtask>({
            query: (subtask: ISubtask) => ({
                url: `/${subtask.id}`,
                method: "PATCH",
                body: subtask,
            }),
            invalidatesTags: ["Subtasks"]
        }),
    }),
})


export const { useGetSubtasksQuery, useGetSubtaskByIdQuery, useCreateSubtaskMutation, useDeleteSubtaskMutation, useUpdateSubtaskMutation } = subtaskApi

export default subtaskApi