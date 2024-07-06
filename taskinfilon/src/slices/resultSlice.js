import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../apiconfig";

export const fetchResult = createAsyncThunk(
  "results/fetchResult",
  async (studentId) => {
    const response = await axios.get(`${API}/api/results/${studentId}`);
    return response.data;
  }
);

export const addResult = createAsyncThunk(
  "results/addResult",
  async (result) => {
    const response = await axios.post(`${API}/api/results`, result);
    return response.data;
  }
);

export const editResult = createAsyncThunk(
  "results/editResult",
  async ({ id, result }) => {
    const response = await axios.put(`${API}/api/results/${id}`, result);
    return response.data;
  }
);

const resultSlice = createSlice({
  name: "results",
  initialState: { results: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResult.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchResult.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results.push(action.payload);
      })
      .addCase(fetchResult.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addResult.fulfilled, (state, action) => {
        state.results.push(action.payload);
      })
      .addCase(editResult.fulfilled, (state, action) => {
        const index = state.results.findIndex(
          (result) => result._id === action.payload._id
        );
        state.results[index] = action.payload;
      });
  },
});

export default resultSlice.reducer;
