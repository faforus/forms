import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "./page-slice";
import formSlice from "./form-slice";

const store = configureStore({
  reducer: { page: pageSlice, form: formSlice },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
