import { FormularioRegistro } from "./FormularioRegistro";
import { TablaRegistro } from "../components/TablaRegistro";
import { Navbar } from "./Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Registro = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [rol, setRol] = useState("");
  const [editar, setEditar] = useState(false);
  const [errors, setErrors] = useState("");
  const [dataListado, setdataListado] = useState([])

  const clear = () => {
    setNombre("");
    setContrasenia("");
    setRol("");
  };

  useEffect(() => {
    fetchDataUsuarios()
  }, []);

  const fetchDataUsuarios = async () => {
    try {
      //const response = await fetch("http://localhost:4000/api/registro");
      const response = await fetch("http://localhost:4000/api/registro", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      // console.log(response.status)
      // if (response.status == 401) {
      //   setAuth({ isAuthenticated: false, role: null });
      //   navigate("/");
      //   throw new Error("Autenticarse");
      // }
      if (!response.ok) {
        throw new Error("No se pudieron obtener los datos");
      }

      const data = await response.json();
      // Ordenar los datos por ID en orden descendente
      data.sort((a, b) => b.id_usuario - a.id_usuario);
      setdataListado(data);
    } catch (error) {
      setError(error.message);
    }
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
      fetchDataUsuarios()
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
              data={dataListado}
              handleEditar={handleEditar}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
};
