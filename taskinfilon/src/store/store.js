import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../slices/adminSlice";
import studentReducer from "../slices/studentSlice";
import resultReducer from "../slices/resultSlice";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    students: studentReducer,
    results: resultReducer,
  },
});

export default store;
