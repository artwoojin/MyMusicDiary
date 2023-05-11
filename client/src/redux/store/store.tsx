import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "../slice/loading";
import loginSlice from "../slice/login";
import themeSlice from "../slice/theme";

const store = configureStore({
  reducer: {
    loadingReducer: loadingSlice.reducer,
    loginReducer: loginSlice.reducer,
    themeReducer: themeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
