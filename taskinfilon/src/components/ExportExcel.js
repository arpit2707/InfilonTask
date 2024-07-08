import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../slices/studentSlice";
import { fetchResult } from "../slices/resultSlice";
import * as XLSX from "xlsx";

const ExportExcel = ({ studentId }) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const results = useSelector((state) => state.results.results);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    if (students.length > 0) {
      students.forEach((student) => {
        dispatch(fetchResult(student._id));
      });
    }
  }, [dispatch, students]);

  const exportToExcel = () => {
    const data = students.map((student) => {
      const result = results.find((result) => result.studentId === student._id);
      return {
        StudentName: student.name,
        ...result?.marks,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");
    XLSX.writeFile(workbook, "student_results.xlsx");
  };

  return (
    <div>
      <h2>Export to Excel</h2>
      <button onClick={exportToExcel}>Export</button>
    </div>
  );
};

export default ExportExcel;
