import { createSlice } from "@reduxjs/toolkit";

interface LoadingState {
  isLogin: string | null;
}

const initialLoadingState: LoadingState = {
  isLogin: localStorage.getItem("accessToken"),
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialLoadingState,
  reducers: {
    login(state) {
      state.isLogin = localStorage.getItem("accessToken");
    },
  },
});

export const { login } = loginSlice.actions;
export default loginSlice;
