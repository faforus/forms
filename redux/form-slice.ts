import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FormState = {
  name: string;
  surname: string;
  email: string;
  telephone: string;
  age: number | null;
  postal: string;
  sliderOne: number;
  sliderTwo: number;
  job: string;
  checkboxes: string[];
};

type Payload = {
  field: keyof FormState;
  value: string | number | string[];
};

const formSlice = createSlice({
  name: "form",
  initialState: {
    name: "",
    surname: "",
    email: "",
    telephone: "",
    age: null,
    postal: "",
    sliderOne: 100000,
    sliderTwo: 100000,
    job: "",
    checkboxes: [],
  } as FormState,
  reducers: {
    updateField: (state, action: PayloadAction<Payload>) => {
      const { field, value } = action.payload;
      if (typeof value === "string") {
        (state as any)[field] = value;
      } else if (typeof value === "number") {
        (state as any)[field] = value;
      } else {
        (state as any)[field] = value;
      }
    },
  },
});

export const { updateField } = formSlice.actions;
export default formSlice.reducer;
