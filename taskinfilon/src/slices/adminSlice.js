import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../apiconfig";

export const loginAdmin = createAsyncThunk(
  "admin/login",
  async (credentials) => {
    try {
      const response = await axios.post(`${API}/api/admin/login`, credentials);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: { token: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;
