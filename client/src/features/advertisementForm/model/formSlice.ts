import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormData, FormState } from "./types";

const initialState: FormState = {
  activeStep: 0,
  formData: {} as FormData,
};
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setActiveStep(state, action: PayloadAction<number>) {
      state.activeStep = action.payload;
    },
    updateFormData(state, action: PayloadAction<Partial<FormData>>) {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
    resetForm(state) {
      state.activeStep = 0;
      state.formData = { ...initialState.formData }; // Вернуть полную структуру
    },
  },
});

export const { setActiveStep, updateFormData, resetForm } = formSlice.actions;
export default formSlice.reducer;
