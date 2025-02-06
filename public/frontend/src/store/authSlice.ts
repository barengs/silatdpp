import { createSlice } from '@reduxjs/toolkit';




const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.data;

      return state
    },
    clearToken: (state) => {
      state.user = {};
      state.token = null;

      return state;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
