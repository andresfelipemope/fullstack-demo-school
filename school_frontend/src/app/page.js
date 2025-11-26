"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";

const API_BASE_URL = "http://localhost:8000";

export default function Home() {
  const {
  register,
  reset,
  handleSubmit,
  watch,
  formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      code: "",
    },
  });
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState("");
  const [ordering, setOrdering] = useState("full_name");
  const [pageInfo, setPageInfo] = useState({next: null, previous: null});
  const hasNextPage = Boolean(pageInfo.next);
  const hasPreviousPage = Boolean(pageInfo.previous);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const loadStudents = async () => {
    console.log("Haciendo búsqueda de... ", query)
    const url = `${API_BASE_URL}/students/?search=${query}&ordering=${ordering}&page=${page}`
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  const orderingClickHandler = (button) => {
    if (button === 'name_button') {
      if (ordering === 'full_name') setOrdering('-full_name')
      else setOrdering('full_name')
    } else {
      if (ordering === 'code') setOrdering('-code')
      else setOrdering('code')
    }
  }

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    loadStudents().then((data) => {
      setStudents(data.results);
      setPageInfo({next:data.next, previous:data.previous})
    });
  }, [query, ordering, page]);

  const onSubmit = async (data) => {
    console.log("Submitting data: ", data);
    const response = await fetch(`${API_BASE_URL}/students/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
    )
    if (response.ok) {
      const newStudent = await response.json();
      loadStudents().then((data) => {
      setStudents(data.results);
    });
      // setStudents([newStudent,...students]);
      reset();
      toast.success("Estudiante agregado con éxito");
      setOpen(false);
    }
    else {
      const errorData = await response.json();
      console.error("Error adding student: ", errorData);

      let errorMessage = "";

      for(const key in errorData) {
        errorMessage += `${key}: ${errorData[key]}\n`;
      }

      toast.error("Error al agregar el estudiante", {
        description: errorMessage,
      });
    }
  }

  return (
    <Card className="w-130 mx-auto mt-4">
      <CardHeader>
        <CardTitle>Students</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} />
          <Button variant="outline" onClick={() => { orderingClickHandler("name_button") }}>
            {ordering === 'full_name' ? <ArrowDownIcon /> : <ArrowUpIcon />}
          </Button>
          <Button variant="outline" onClick={() => { orderingClickHandler("code_button") }}>
            {ordering === 'code' ? <ArrowDownIcon /> : <ArrowUpIcon />}
          </Button>
        </div>

        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <div className="p-4 h-fit overflow-y-auto">
          <ul>
            {students && students.length > 0 ?(students.map((student) => (
              <li key={student.code} className="text-md font-medium my-2 flex flex-row justify-between" title={student.email}>
                <a href={`/${student.code}`}>
                  {student.full_name}
                </a>
                <div>
                  {student.code}
                </div>
              </li>
            )))
            :
              <p>No hay alumnos</p>
            }
          </ul>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" 
                onClick={()=>{hasPreviousPage && setPage(page-1)}}
                className={!hasPreviousPage ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" 
                onClick={()=>{hasNextPage && setPage(page+1)}}
                className={!hasNextPage ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <div className="flex justify-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger onClick={()=>{setOpen(true)}} className="m-2 p-2 rounded-xl bg-black text-white">
              Agregar Estudiante
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Peticion para agregar un nuevo estudiante</DialogTitle>
                <DialogDescription>
                  Asegurate que todos los campos esten llenos
                </DialogDescription>
              </DialogHeader>

                <Field className="mt-4">
                  <FieldLabel htmlFor="full_name" >Nombre completo</FieldLabel>
                  <Input id="full_name" placeholder="Ingresa el nombre" {...register("full_name", { required: true })}></Input>
                </Field>
                <Field className="mt-4">
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" placeholder="Ingresa el email" {...register("email", { required: true })}></Input>
                </Field>
                <Field className="mt-4">
                  <FieldLabel htmlFor="code">Código</FieldLabel>
                  <Input id="code" placeholder="Ingresa el código" {...register("code", { required: true })}></Input>
                </Field>

                <DialogFooter className="sm:justify-center">
                  <DialogClose asChild>
                    <Button className="my-2" variant="secondary" onClick={handleSubmit(onSubmit)}>
                      Agregar estudiante
                    </Button>
                  </DialogClose>
                </DialogFooter>

            </DialogContent>
          </Dialog>

          
        </div>
      </CardContent>
    </Card>

  );
}