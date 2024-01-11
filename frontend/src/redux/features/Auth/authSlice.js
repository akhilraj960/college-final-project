import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "./authService"; // Assuming you have a module exporting login function

const initialState = {
  isLoggedIn: false,
  user: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkApi) => {
    try {
      const response = await authServices.login(userData);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET_AUTH(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      localStorage.setItem('token',action.payload.token)
      
    });
  },
});

export const { RESET_AUTH } = authSlice.actions;

export default authSlice.reducer;
