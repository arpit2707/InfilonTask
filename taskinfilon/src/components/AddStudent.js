import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "../slices/studentSlice";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [marks, setMarks] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudent({ name, email, phone, marks }));
    setName("");
    setMarks({});
  };

  const handleMarkChange = (subject, value) => {
    setMarks({ ...marks, [subject]: Number(value) });
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
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
          <div>
            <label>Subject 3</label>
            <input
              type="number"
              value={marks["Subject3"] || ""}
              onChange={(e) => handleMarkChange("Subject3", e.target.value)}
            />
          </div>
          <div>
            <label>Subject 2</label>
            <input
              type="number"
              value={marks["Subject4"] || ""}
              onChange={(e) => handleMarkChange("Subject4", e.target.value)}
            />
          </div>
          <div>
            <label>Subject 2</label>
            <input
              type="number"
              value={marks["Subject5"] || ""}
              onChange={(e) => handleMarkChange("Subject5", e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
