import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.data.id
      state.isAuthenticated = true;

      return state
    },
    clearToken: (state) => {
      state.userId = null;
      state.token = null;
      state.isAuthenticated = false;

      return state;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
