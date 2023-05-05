import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./reducers/loginSlice";
import deviceSlice from "./reducers/deviceSlice";
import addMemberSlice from "./reducers/addMemberSlice";

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    device: deviceSlice.reducer,
    addMember: addMemberSlice.reducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
