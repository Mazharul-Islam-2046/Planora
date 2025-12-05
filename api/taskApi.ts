import { ITask } from "@/types/task";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const taskApi = createApi({
    reducerPath: "taskApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/tasks",
    }),
    tagTypes: ["Tasks"],
    endpoints: (builder) => ({
        getTasks: builder.query<ITask[], void>({
            query: () => "/",
            providesTags: ["Tasks"]
        }),
        getTaskById: builder.query<ITask, string>({
            query: (id: string) => `/${id}`,
        }),
        createTask: builder.mutation<ITask, ITask>({
            query: (task: ITask) => ({
                url: "/",
                method: "POST",
                body: task,
            }),
            invalidatesTags: ["Tasks"]
        }),
        deleteTask: builder.mutation({
            query: (id: string) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Tasks"]
        }),
        updateTask: builder.mutation<ITask, ITask>({
            query: (task: ITask) => ({
                url: `/${task.id}`,
                method: "PATCH",
                body: task,
            }),
            invalidatesTags: ["Tasks"]
        }),
    }),
})

export const { useGetTasksQuery, useGetTaskByIdQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = taskApi

export default taskApi