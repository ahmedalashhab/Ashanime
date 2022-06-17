import { configureStore } from "@reduxjs/toolkit";
import animeReducer from "./search-slice";
import { useDispatch } from "react-redux";
import notificationReducer from "./notification-slice";

export const store = configureStore({
  reducer: {
    anime: animeReducer,
    notification: notificationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
