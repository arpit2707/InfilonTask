import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../apiconfig";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(`${API}/api/students`);
    console.log("DATA", response.data);
    return response.data;
  }
);

export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (student) => {
    const response = await axios.post(`${API}/api/students`, {
      name: student.name,
      marks: student.marks,
    });
    return response.data;
  }
);

export const editStudent = createAsyncThunk(
  "students/editStudent",
  async ({ id, student }) => {
    const response = await axios.put(`${API}/api/students/${id}`, student);
    return response.data;
  }
);

export const softDeleteStudent = createAsyncThunk(
  "students/softDeleteStudent",
  async (id) => {
    const response = await axios.delete(`${API}/api/students/${id}`);
    return response.data;
  }
);

export const hardDeleteStudent = createAsyncThunk(
  "students/hardDeleteStudent",
  async (id) => {
    const response = await axios.delete(`${API}/api/students/hard/${id}`);
    return response.data;
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState: { students: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(editStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(
          (student) => student._id === action.payload._id
        );
        state.students[index] = action.payload;
      })
      .addCase(softDeleteStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(
          (student) => student._id === action.meta.arg
        );
        state.students.splice(index, 1);
      })
      .addCase(hardDeleteStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(
          (student) => student._id === action.meta.arg
        );
        state.students.splice(index, 1);
      });
  },
});

export default studentSlice.reducer;
