import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "./authService"; // Assuming you have a module exporting login function
import { toast } from "react-toastify";

const initialState = {
  isAdmin: false,
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

export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async (userData, thunkApi) => {
    try {
      const response = await authServices.adminLogin(userData);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getStatus = createAsyncThunk(
  "auth/getStatus",
  async (_, thunkApi) => {
    try {
      const response = await authServices.getStatus();
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
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoggedIn = true;
          state.user = action.payload.user;
          console.log(action.payload);
          toast.success(action.payload.message);
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        toast.error(action.payload.message);
      })
      // adminLogin
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isAdmin = true;
        state.isLoggedIn = true;
        state.user = action.payload.userData;
        console.log(action.payload.userData);
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(getStatus.fulfilled, (state, action) => {
        if (action.payload.success) {
          if (action.payload.role === "admin") {
            state.isAdmin = true;
          }
          state.isLoggedIn = true;
        }
      })
      .addCase(getStatus.rejected, (state, action) => {
        state.isLoggedIn = false;
        console.log(action.payload);
      });
  },
});

export const { RESET_AUTH } = authSlice.actions;

export default authSlice.reducer;
