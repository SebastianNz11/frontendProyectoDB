import { useState } from "react";
import { FormularioEnfermeros } from "./FormularioEnfermeros";
import { Navbar } from "./Navbar";
import {TablaEnfermeros} from "./TablaEnfermeros"

export const Enfermeros = () => {
  const [errors, setErrors] = useState("");
  const [editar, setEditar] = useState(false);
  const [datos, setDatos] = useState(null);

  // Función para insertar enfermeros
  const handleInsert = async (data) => {
    try {
      const { nombre, apellido, identificacion } = data;
      const info = await fetch("http://localhost:4000/api/enfermeros", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ nombre, apellido, identificacion }),
      });
      if (!info.ok) {
        throw new Error("Error al enviar los datos");
      }
    } catch (error) {
      setErrors(error.message);
    }
  };

  // Función para eliminar enfermeros
  const handleDelete = async (id) => {
    try {
      const respuesta = await fetch(
        `http://localhost:4000/api/enfermeros/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!respuesta.ok) {
        throw new Error("Error al eliminar enfermero");
      }

      console.log("Enfermero eliminado exitosamente");
    } catch (error) {
      setErrors(error.message);
    }
  };

  // Traer información de un enfermero
  const getEnfermeroById = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/enfermeros/${id}`);
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

  const updateEnfermero = async (data) => {
    try {
      const { id_enfermero, nombre, apellido, identificacion } = data;
      const datos = await fetch(
        `http://localhost:4000/api/enfermeros/${id_enfermero}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ nombre, apellido, identificacion }),
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
            <FormularioEnfermeros
              handleInsert={handleInsert}
              editar={editar}
              setEditar={setEditar}
              datos={datos}
              updateEnfermero={updateEnfermero}
            />
          </div>
          <div className="col-8 ps-5">
          <TablaEnfermeros
              handleDelete={handleDelete}
              getEnfermeroById={getEnfermeroById}
              setEditar={setEditar}
            />
          </div>
        </div>
      </div>
    </>
  );
};
