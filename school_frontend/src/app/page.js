
"use client";
import { useState, useEffect } from "react";  

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_BASE_URL = "http://localhost:8000";

const loadStudents = async (search = "", ordering = "") => {
  const res = await fetch(`${API_BASE_URL}/students/?search=${search}&ordering=${ordering}`);
  const data = await res.json();
  return data;
}


export default function Home() {
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [orderingText, setOrderingText] = useState("");

  useEffect(() => {
    loadStudents(searchText, orderingText).then((data) => {
      setStudents(data);
    });
  }, [searchText, orderingText]);

  // const handlerEnter = (e) => {
  //   if(e.key === "Enter"){
  //     loadStudents(searchText).then((data) => {
  //       setStudents(data);
  //     });
  //   }
  // };

  return (
    <div className="bg-blue-300 min-h-screen">
      <h1 className="bg-blue-200 text-center p-2 text-3xl font-lobster font-black">Students</h1>
      <input className="border-2 rounded-full m-2 p-2" 
            type="text" name="nombre" placeholder="Introduce tu nombre"
            onChange={(e)=>setSearchText(e.target.value)}></input>
      <label>Ordenar por: </label>
      <select onChange={(e) => {setOrderingText(e.target.value)}} className="border-2 rounded-full p-2 m-2">
        <option value="full_name">Nombre ⬆️</option>
        <option value="-full_name">Nombre ⬇️</option>
        <option value="code">Codigo ⬆️</option>
        <option value="-code">Codigo ⬇️</option>
      </select>
      <ul className="flex flex-wrap">
        {students.map((student) => (
          <li className="bg-blue-200 w-fit flex items-center m-2 p-2 font-delius
          text-2xl rounded-full" key={student.code}>{student.full_name}</li>
        ))}
      </ul>
    </div>
  );
}
