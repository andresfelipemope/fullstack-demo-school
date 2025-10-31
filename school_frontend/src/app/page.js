
"use client";
import { useState, useEffect } from "react";  

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_BASE_URL = "http://localhost:8000";

const loadStudents = async () => {
  const res = await fetch(`${API_BASE_URL}/students/`);
  const data = await res.json();
  return data;
}


export default function Home() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents().then((data) => {
      setStudents(data);
    });
  }, []);

  return (
    <div>
      <h1>Students</h1>
      <ul>
        {students.map((student) => (
          <li key={student.code}>{student.full_name}</li>
        ))}
      </ul>
    </div>
  );
}
