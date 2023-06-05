import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "page",
  initialState: { pageNumber: 0, loaded: false },
  reducers: {
    nextPage(state) {
      state.pageNumber++;
    },
    prevPage(state) {
      state.pageNumber--;
    },
    loadingFinished(state) {
      state.loaded = true;
    },
  },
});

export const pageActions = pageSlice.actions;

export default pageSlice.reducer;
