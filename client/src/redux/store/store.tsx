import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "../slice/loading";

const store = configureStore({
  reducer: {
    loadingReducer: loadingSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
