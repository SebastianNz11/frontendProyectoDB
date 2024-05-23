import { useState } from "react";
import { FormularioRecepcionistas } from "./FormularioRecepcionistas";
import { Navbar } from "./Navbar";
import { TablaRecepcionistas } from "./TablaRecepcionistas";

export const Recepcionistas = () => {
  const [errors, setErrors] = useState("");
  const [editar, setEditar] = useState(false);
  const [datos, setDatos] = useState(null);

  // Función para insertar recepcionistas
  const handleInsert = async (data) => {
    try {
      const { nombre, apellido, no_identificacion } = data;
      const info = await fetch("http://localhost:4000/api/recepcionistas", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ nombre, apellido, no_identificacion }),
      });
      if (!info.ok) {
        throw new Error("Error al enviar los datos");
      }
    } catch (error) {
      setErrors(error.message);
    }
  };

  // Función para eliminar recepcionistas
  const handleDelete = async (id) => {
    try {
      const respuesta = await fetch(
        `http://localhost:4000/api/recepcionistas/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!respuesta.ok) {
        throw new Error("Error al eliminar recepcionista");
      }

      console.log("Recepcionista eliminado exitosamente");
    } catch (error) {
      setErrors(error.message);
    }
  };

  // Traer información de un recepcionista
  const getRecepcionistaById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/recepcionistas/${id}`
      );
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

  const updateRecepcionista = async (data) => {
    try {
      const { id_recepcionista, nombre, apellido, no_identificacion } = data;
      const datos = await fetch(
        `http://localhost:4000/api/recepcionistas/${id_recepcionista}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ nombre, apellido, no_identificacion }),
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
            <FormularioRecepcionistas
              handleInsert={handleInsert}
              editar={editar}
              setEditar={setEditar}
              datos={datos}
              updateRecepcionista={updateRecepcionista}
            />
          </div>
          <div className="col-8 ps-5">
            <TablaRecepcionistas
              handleDelete={handleDelete}
              getRecepcionistaById={getRecepcionistaById}
              setEditar={setEditar}
            />
          </div>
        </div>
      </div>
    </>
  );
};
