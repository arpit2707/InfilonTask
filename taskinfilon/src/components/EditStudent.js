import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, editStudent } from "../slices/studentSlice";
import { useParams } from "react-router-dom";

const EditStudent = ({ match }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState("");
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    const student = students.find((student) => student._id === id);
    if (student) {
      console.log(student);
      setName(student.name);
    }
  }, [students, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editStudent({ id, name, email, phone }));
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <label className="mt-3">Name</label>
        <input
          className="mt-1 border border-solid border-2 rounded"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="mt-3">Email</label>
        <input
          className="mt-1 border border-solid border-2 rounded"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="mt-3">Phone</label>
        <input
          className="mt-1 border border-solid border-2 rounded"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button className="mt-3 btn btn-primary" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
