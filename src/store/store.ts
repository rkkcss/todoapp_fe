import { configureStore } from "@reduxjs/toolkit";
import loginSliceReducer from "../redux/userSlice";
import tasksSliceReducer from "../redux/taskSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["error"],
};

const persistConfigTasks = {
  key: "tasks",
  storage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, loginSliceReducer);
const tasksReducer = persistReducer(persistConfigTasks, tasksSliceReducer);

const store = configureStore({
  reducer: {
    userStore: persistedReducer,
    taskStore: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { persistor };
export default store;

export type UserStore = ReturnType<typeof store.getState>;
export type TaskStore = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
