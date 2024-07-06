import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  softDeleteStudent,
  hardDeleteStudent,
} from "../slices/studentSlice";
import { Link } from "react-router-dom";

const StudentList = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div>
      <h2>Student List</h2>
      <Link to="/add-student">Add Student</Link>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            <Link to={`/results/${student._id}`}>{student.name}</Link>
            <Link to={`/edit-student/${student._id}`}>Edit</Link>
            <button onClick={() => dispatch(softDeleteStudent(student._id))}>
              Soft Delete
            </button>
            <button onClick={() => dispatch(hardDeleteStudent(student._id))}>
              Hard Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
