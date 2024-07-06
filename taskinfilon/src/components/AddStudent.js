import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "../slices/studentSlice";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [marks, setMarks] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudent({ name, marks }));
    setName("");
    setMarks({});
  };

  const handleMarkChange = (subject, value) => {
    setMarks({ ...marks, [subject]: value });
  };

  return (
    <div>
      <h2>Add Student</h2>
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
          <h3>Enter Marks</h3>
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
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
