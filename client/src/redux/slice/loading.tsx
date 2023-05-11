import { createSlice } from "@reduxjs/toolkit";

interface LoadingState {
  isLoading: boolean;
  isSearchLoading: boolean;
  isMyLoading: boolean;
  isLikeLoading: boolean;
}

const initialLoadingState: LoadingState = {
  isLoading: true,
  isSearchLoading: true,
  isMyLoading: true,
  isLikeLoading: true,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState: initialLoadingState,
  reducers: {
    mainDiaryFulfilled(state) {
      state.isLoading = false;
    },
    mainDiaryRejected(state) {
      state.isLoading = true;
    },
    searchDiaryFulfilled(state) {
      state.isSearchLoading = false;
    },
    searchDiaryRejected(state) {
      state.isSearchLoading = true;
    },
    myDiaryFulfilled(state) {
      state.isMyLoading = false;
    },
    myDiaryRejected(state) {
      state.isMyLoading = true;
    },
    likeDiaryFulfilled(state) {
      state.isLikeLoading = false;
    },
    likeDiaryRejected(state) {
      state.isLikeLoading = true;
    },
  },
});

export const {
  mainDiaryFulfilled,
  mainDiaryRejected,
  searchDiaryFulfilled,
  searchDiaryRejected,
  myDiaryFulfilled,
  myDiaryRejected,
  likeDiaryFulfilled,
  likeDiaryRejected,
} = loadingSlice.actions;
export default loadingSlice;
