import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResult } from "../slices/resultSlice";
import { useParams, useLocation } from "react-router-dom";
import jsPDF from "jspdf";

const ResultPdf = (props) => {
  const { studentId } = props;
  const dispatch = useDispatch();
  const results = useSelector((state) => state.results.results);
  const pdfRef = useRef("");

  useEffect(() => {
    dispatch(fetchResult(studentId));
  }, [dispatch, studentId]);

  const generatePDF = () => {
    const result = results.find((result) => result.studentId === studentId);
    if (result && pdfRef.current) {
      const doc = new jsPDF();
      doc.text("Student Result", 20, 20);
      doc.text(`Student ID: ${studentId}`, 20, 30);
      Object.entries(result.marks).forEach(([subject, mark], index) => {
        doc.text(`${subject}: ${mark}`, 20, 40 + index * 10);
      });
      doc.save("result.pdf");
    }
  };

  return (
    <div>
      <h2>Generate PDF</h2>
      <div ref={pdfRef}></div>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

export default ResultPdf;
