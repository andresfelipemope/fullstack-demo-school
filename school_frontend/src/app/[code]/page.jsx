"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";

export default function estudiante({params}){
    const {code} = use(params);
    const url = `http://127.0.0.1:8000/students/?search=${code}`
    const [datos, setDatos] = useState();
    
    useEffect(()=>{
        const fetchEstudiante = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setDatos(data.results[0]);
        };

        fetchEstudiante();
    }, []);

    if(!datos) return (  
      <div className="flex justify-center p-4 font-delius text-2xl">
        Cargando Personaje....
      </div>
    );
    
    return (
      <Card className="w-120 mx-auto p-2 mt-4">
        <CardHeader className="text-center">
          <CardTitle>
            {datos.full_name} - {datos.id}
          </CardTitle>
        </CardHeader>

        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <CardContent className="text-center">
          <Card className="bg-gray-300 mx-auto text-center p-4 m-4">
            Codigo: {datos.code}
          </Card>
          <Card className="text-center bg-gray-300 mx-auto p-4 m-4">
            Correo: {datos.email}
          </Card>
          <Card className="text-center bg-gray-300 mx-auto p-4 m-4">
            Grupo: {datos.group}
          </Card>

          <Link href="/">
            <Button className="my-2 bg-black text-white" variant="outline">
              Regresar
            </Button>
          </Link>  
        </CardContent>
      </Card>
    );

}