import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
  message: string;
  types: "success" | "error" | "warning" | "info" | "";
}

const initialState: AlertState = {
  message: "",
  types: "",
};

const alertSlice = createSlice({
  name: "alert",
  initialState: initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<{ message: string; type: "success" | "error" | "warning" | "info" }>) => {
      state.message = action.payload.message;
      state.types = action.payload.type;

      return state
    },
    hideAlert: (state) => {
      state.message = "";
      state.types = "";

      return state
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
