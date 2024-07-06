import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../slices/studentSlice";
import { addResult, fetchResult, editResult } from "../slices/resultSlice";
import { useParams } from "react-router-dom";

const StudentResult = () => {
  const { studentId } = useParams();
  console.log(studentId);
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
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
    setMarks({ ...marks, [subject]: value });
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
        {Object.keys(marks).map((subject) => (
          <div key={subject}>
            <label>{subject}</label>
            <input
              type="number"
              value={marks[subject] || ""}
              onChange={(e) => handleChange(subject, e.target.value)}
            />
          </div>
        ))}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default StudentResult;
