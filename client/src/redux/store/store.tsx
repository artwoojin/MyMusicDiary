import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "../slice/loading";
import loginSlice from "../slice/login";

const store = configureStore({
  reducer: {
    loadingReducer: loadingSlice.reducer,
    loginReducer: loginSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
