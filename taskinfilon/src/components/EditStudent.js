import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, editStudent } from "../slices/studentSlice";

const EditStudent = ({ match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const [name, setName] = useState("");
  const [marks, setMarks] = useState({});

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    const student = students.find((student) => student._id === id);
    if (student) {
      setName(student.name);
      setMarks(student.marks || {});
    }
  }, [students, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editStudent({ id, name, marks }));
  };

  const handleMarkChange = (subject, value) => {
    setMarks({ ...marks, [subject]: value });
  };

  return (
    <div>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <h3>Edit Marks</h3>
          <div>
            <label>Subject 1</label>
            <input
              type="number"
              value={marks["Subject1"] || ""}
              onChange={(e) => handleMarkChange("Subject1", e.target.value)}
            />
          </div>
          <div>
            <label>Subject 2</label>
            <input
              type="number"
              value={marks["Subject2"] || ""}
              onChange={(e) => handleMarkChange("Subject2", e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditStudent;
