import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import AdminLogin from "./components/AdminLogin";
import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";
import StudentResult from "./components/StudentResult";
import ExportExcel from "./components/ExportExcel";
import ResultPdf from "./components/ResultPdf";
import Home from "./components/Home";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/edit-student/:id" element={<EditStudent />} />
          <Route path="/results/:studentId" element={<StudentResult />} />
          <Route path="/generate-pdf/:studentId" element={<ResultPdf />} />
          <Route path="/export-excel" element={<ExportExcel />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
