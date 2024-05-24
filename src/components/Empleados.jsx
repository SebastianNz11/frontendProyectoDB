import { useEffect, useState } from "react";
import { FormularioEmpleados } from "./FormularioEmpleados";
import { Navbar } from "./Navbar";
import { TablaEmpleados } from "./TablaEmpleados";

export const Empleados = () => {
  const [errors, setErrors] = useState("");
  const [editar, setEditar] = useState(false);
  const [datos, setDatos] = useState(null);
  const [listado, setListado] = useState([])



  useEffect(() => {
    fetchDataEmpleados();
  }, []);

  const fetchDataEmpleados = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/empleados");
      if (!response.ok) {
        throw new Error("No se pudieron obtener los datos");
      }

      const data = await response.json();
      // Ordenar los datos por ID en orden descendente
      data.sort((a, b) => b.id_empleado - a.id_empleado);
      setListado(data);
    } catch (error) {
      //setError(error.message);
    }
  };

  //funcion para insertar empleados
  const handleInsert = async (data) => {
    try {
      const { nombre, apellido, empleado, salario } = data;
      const info = await fetch("http://localhost:4000/api/empleados", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ nombre, apellido, empleado, salario }),
      });
      if (!info.ok) {
        throw new Error("Error al enviar los datos");
      }
      fetchDataEmpleados();
    } catch (error) {
      setErrors(error.message);
    }
  };

  //funcion para eliminar empleados
  const handleDelete = async (id) => {
    try {
      const respuesta = await fetch(
        `http://localhost:4000/api/empleados/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!respuesta.ok) {
        throw new Error("Error al eliminar empleado");
      }

      console.log("Empleado eliminado exitosamente");
      fetchDataEmpleados();

    } catch (error) {
      setErrors(error.message);
    }
  };

  //traer informacion de un empleado
  const getEmpleadoById = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/empleados/${id}`);
      if (!response.ok) {
        throw new Error("No se pudieron obtener los datos");
      }

      const data = await response.json();
      setDatos(data);
      console.log(data);
    } catch (error) {
      setErrors(error.message);
    }
  };

  const updateEmpleados = async (data) => {
    try {
      const { id_empleado, nombre, apellido, empleado, salario } = data;
      const datos = await fetch(
        `http://localhost:4000/api/empleados/${id_empleado}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ nombre, apellido, empleado, salario }),
        }
      );
      fetchDataEmpleados();

      if (!datos.ok) {
        throw new Error("Error al obtener los datos del servidor");
      }
    } catch (error) {
      setErrors(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container d-flex justify-content-center">
        <div className="row p-4 col-12">
          <div className="col-4 p-5">
            <FormularioEmpleados
              handleInsert={handleInsert}
              editar={editar}
              setEditar={setEditar}
              datos={datos}
              updateEmpleados={updateEmpleados}
            />
          </div>
          <div className="col-8 ps-5">
            <TablaEmpleados
              handleDelete={handleDelete}
              getEmpleadoById={getEmpleadoById}
              setEditar={setEditar}
              data={listado}
            />
          </div>
        </div>
      </div>
    </>
  );
};
