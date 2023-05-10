import { createSlice } from "@reduxjs/toolkit";

interface CurrentUserInfo {
  nickname: string;
  ImageUrl: string | null;
  userId: number;
  email: string;
}

interface LoadingState {
  isLogin: string | null;
  currentUserInfo: CurrentUserInfo;
}

const initialLoadingState: LoadingState = {
  isLogin: localStorage.getItem("accessToken"),
  currentUserInfo: JSON.parse(localStorage.getItem("CURRENT_USER")!),
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialLoadingState,
  reducers: {
    login(state) {
      state.isLogin = localStorage.getItem("accessToken");
    },
    userInfo(state) {
      state.currentUserInfo = JSON.parse(localStorage.getItem("CURRENT_USER")!);
    },
  },
});

export const { login, userInfo } = loginSlice.actions;
export default loginSlice;
