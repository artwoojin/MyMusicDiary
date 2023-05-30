import { createSlice } from "@reduxjs/toolkit";

interface Theme {
  isChange: string | null;
}

const initialLoadingState: Theme = {
  isChange: localStorage.getItem("theme") || "light",
};

const themeSlice = createSlice({
  name: "login",
  initialState: initialLoadingState,
  reducers: {
    currentMode(state) {
      state.isChange = localStorage.getItem("theme");
    },
    changeLightMode(state) {
      state.isChange = "light";
      localStorage.setItem("theme", state.isChange);
    },
    changeDarkMode(state) {
      state.isChange = "dark";
      localStorage.setItem("theme", state.isChange);
    },
  },
});

export const { currentMode, changeLightMode, changeDarkMode } = themeSlice.actions;
export default themeSlice;
