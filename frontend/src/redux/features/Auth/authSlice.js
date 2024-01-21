import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "./authService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  isSuccess: false,
  message: "",
  isAdmin: false,
  isLoggedIn: false,
  user: null,
};

const handleErrors = (state, action) => {
  state.isLoading = false;

  if (action.payload) {
    // Assuming your API response has a data property
    const { data } = action.payload;

    if (data) {
      if (data.success) {
        state.isSuccess = true;
        toast.success(data.message);
      } else {
        state.isSuccess = false;
        toast.error(data.message);
      }
    }
  } else {
    toast.error("An unexpected error occurred.");
  }
};

export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async (userData, thunkAPI) => {
    try {
      const response = await authServices.adminLogin(userData);
      return response;
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getStatus = createAsyncThunk(
  "auth/getstatus",
  async (_, thunkAPI) => {
    try {
      const response = await authServices.getStatus();
      return response;
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET_AUTH(state) {
      state.isAdmin = false;
      state.isLoggedIn = false;
      state.isSuccess = false;
      state.message = "";
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ADMIN LOGIN STARTS
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.data.success;
        state.message = action.payload.data.message;
        if (state.isSuccess) {
          state.isLoggedIn = true;
          state.isAdmin = true;
          state.user = action.payload.data.adminData;
          toast.success(state.message);
          localStorage.setItem("token", action.payload.data.token);
        } else {
          toast.error(state.message);
        }
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      })
      // ADMIN LOGIN ENDS

      // GET STATUS STARTS
      .addCase(getStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.data.success;
        if (state.isSuccess) {
          state.isLoggedIn = true;
        }
        if (state.isSuccess && action.payload.data.role === "admin") {
          state.isAdmin = true;
        }
      })
      .addCase(getStatus.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      });
    // GET STATUS ENDS
  },
});

export const { RESET_AUTH } = authSlice.actions;

export default authSlice.reducer;
