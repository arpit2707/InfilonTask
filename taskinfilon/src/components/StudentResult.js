import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchResult, addResult, editResult } from "../slices/resultSlice";
import ResultPdf from "../components/ResultPdf";
import ExportExcel from "../components/ExportExcel";

const StudentResult = () => {
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const results = useSelector((state) => state.results.results);
  const [marks, setMarks] = useState({});

  useEffect(() => {
    dispatch(fetchResult(studentId));
  }, [dispatch, studentId]);

  useEffect(() => {
    const result = results.find((result) => result.studentId === studentId);
    if (result) {
      setMarks(result.marks);
    }
  }, [results, studentId]);

  const handleChange = (subject, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [subject]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = results.find((result) => result.studentId === studentId);
    if (result) {
      dispatch(editResult({ id: result._id, result: { marks } }));
    } else {
      dispatch(addResult({ studentId, marks }));
    }
  };

  return (
    <div>
      <h2>Student Result</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="english">
          English
          <input
            name="english"
            value={marks.English || ""}
            onChange={(e) => handleChange("English", e.target.value)}
            placeholder="English"
          />
        </label>
        <label htmlFor="hindi">
          Hindi
          <input
            name="hindi"
            value={marks.Hindi || ""}
            onChange={(e) => handleChange("Hindi", e.target.value)}
            placeholder="Hindi"
          />
        </label>
        <label htmlFor="maths">
          Maths
          <input
            name="maths"
            value={marks.Maths || ""}
            onChange={(e) => handleChange("Maths", e.target.value)}
            placeholder="Maths"
          />
        </label>
        <label htmlFor="science">
          Science
          <input
            name="science"
            value={marks.Science || ""}
            onChange={(e) => handleChange("Science", e.target.value)}
            placeholder="Science"
          />
        </label>
        <button type="submit">Save</button>
      </form>
      <ResultPdf studentId={studentId} />
      <ExportExcel studentId={studentId} />
    </div>
  );
};

export default StudentResult;
