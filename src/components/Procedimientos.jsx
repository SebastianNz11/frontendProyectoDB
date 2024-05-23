import { useState } from "react";
import { FormularioProcedimientos } from "./FormularioProcedimientos";
import { Navbar } from "./Navbar";
import { TablaProcedimientos } from "./TablaProcedimientos";

export const Procedimientos = () => {
  const [errors, setErrors] = useState("");
  const [editar, setEditar] = useState(false);
  const [datos, setDatos] = useState(null);

  // Función para insertar procedimientos
  const handleInsert = async (data) => {
    try {
      const { descripcion, duracion, costo } = data;
      const info = await fetch("http://localhost:4000/api/procedimientos", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ descripcion, duracion, costo }),
      });
      if (!info.ok) {
        throw new Error("Error al enviar los datos");
      }
    } catch (error) {
      setErrors(error.message);
    }
  };

  // Función para eliminar procedimientos
  const handleDelete = async (id) => {
    try {
      const respuesta = await fetch(
        `http://localhost:4000/api/procedimientos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!respuesta.ok) {
        throw new Error("Error al eliminar procedimiento");
      }

      console.log("Procedimiento eliminado exitosamente");
    } catch (error) {
      setErrors(error.message);
    }
  };

  // Traer información de un procedimiento
  const getProcedimientoById = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/procedimientos/${id}`);
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

  const updateProcedimiento = async (data) => {
    try {
      const { id_procedimiento_med, descripcion, duracion, costo } = data;
      const datos = await fetch(
        `http://localhost:4000/api/procedimientos/${id_procedimiento_med}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ descripcion, duracion, costo }),
        }
      );

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
            <FormularioProcedimientos
              handleInsert={handleInsert}
              editar={editar}
              setEditar={setEditar}
              datos={datos}
              updateProcedimiento={updateProcedimiento}
            />
          </div>
          <div className="col-8 ps-5">
            <TablaProcedimientos
              handleDelete={handleDelete}
              getProcedimientoById={getProcedimientoById}
              setEditar={setEditar}
            />
          </div>
        </div>
      </div>
    </>
  );
};
