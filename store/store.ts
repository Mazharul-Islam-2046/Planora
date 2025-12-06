import subtaskApi from '@/api/subtaskApi';
import taskApi from '@/api/taskApi';
import userApi from '@/api/userApi';
import workspaceApi from '@/api/workspaceApi';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [workspaceApi.reducerPath]: workspaceApi.reducer,
    [subtaskApi.reducerPath]: subtaskApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      userApi.middleware,
      taskApi.middleware,
      workspaceApi.middleware,
      subtaskApi.middleware
    ),
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;