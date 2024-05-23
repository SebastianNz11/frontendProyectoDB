import { FormularioRegistro } from "./FormularioRegistro";
import { TablaRegistro } from "../components/TablaRegistro";
import { Navbar } from "./Navbar";
import { useState } from "react";

export const Registro = () => {
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [rol, setRol] = useState("");
  const [editar, setEditar] = useState(false);
  const [errors, setErrors] = useState("");

  const clear = () => {
    setNombre("");
    setContrasenia("");
    setRol("");
  };

  // Función para enviar usuarios al backend
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("http://localhost:4000/api/registro", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ nombre, contrasenia, rol }),
      });
      if (!response.ok) {
        throw new Error("Error al enviar los datos");
      }

      // Limpiar los campos del formulario después de enviarlo
      setNombre("");
      setContrasenia("");
      setRol("");
    } catch (error) {
      setErrors(error.message);
    }
  };

  // Función para obtener usuario
  const handleEditar = async (id) => {
    console.log(id);
    try {
      const respuesta = await fetch(`http://localhost:4000/api/registro/${id}`);

      if (!respuesta.ok) {
        throw new Error("Error al obtener los datos del servidor");
      }

      const datosRespuesta = await respuesta.json();
      setId(datosRespuesta.id_usuario);
      setNombre(datosRespuesta.nombre);
      setContrasenia(datosRespuesta.contrasenia);
      setRol(datosRespuesta.rol);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/registro/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ nombre, contrasenia, rol }),
      });
      if (!response.ok) {
        throw new Error("Error al obtener los datos del servidor");
      }

      setId("");
      setNombre("");
      setContrasenia("");
      setRol("");
    } catch (error) {
      console.log(error);
    }
  };

  // Funcion para eliminar usuarios
  const handleDelete = async (id) => {
    try {
      const respuesta = await fetch(
        `http://localhost:4000/api/registro/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!respuesta.ok) {
        throw new Error("Error al eliminar el registro");
      }

      console.log("Registro eliminado exitosamente");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container d-flex justify-content-center p-5">
        <div className="row p-4">
          <div className="col-4 p-5">
            <FormularioRegistro
              setNombre={setNombre}
              setContrasenia={setContrasenia}
              setRol={setRol}
              nombre={nombre}
              contrasenia={contrasenia}
              rol={rol}
              editar={editar}
              handleSubmit={handleSubmit}
              handleUpdate={handleUpdate}
              id={id}
              setEditar={setEditar}
              clear={clear}
            />
          </div>
          <div className="col-8">
            <TablaRegistro
              setEditar={setEditar}
              handleEditar={handleEditar}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
};
