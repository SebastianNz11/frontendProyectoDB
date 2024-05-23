import { useState } from "react";
import { FormularioPacientes } from "./FormularioPacientes";
import { Navbar } from "./Navbar";
import { TablaPacientes } from "./TablaPacientes";

export const Pacientes = () => {
  const [errors, setErrors] = useState("");
  const [editar, setEditar] = useState(false);
  const [datos, setDatos] = useState("");

  const handleInsert = async (data) => {
    try {
      const { nombre, apellido, correo, telefono, direccion, dpi } = data;
      const info = await fetch("http://localhost:4000/api/pacientes", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ nombre, apellido, correo, telefono, direccion, dpi }),
      });
      if (!info.ok) {
        throw new Error("Error al enviar los datos");
      }
    } catch (error) {
      setErrors(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const respuesta = await fetch(`http://localhost:4000/api/pacientes/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        throw new Error("Error al eliminar paciente");
      }

      console.log("Paciente eliminado exitosamente");
    } catch (error) {
      setErrors(error.message);
    }
  };

  const getPacienteById = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/pacientes/${id}`);
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

  const updatePaciente = async (data) => {
    try {
      const { id_paciente, nombre, apellido, correo, telefono, direccion, dpi } = data;
      const datos = await fetch(
        `http://localhost:4000/api/pacientes/${id_paciente}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            apellido,
            correo,
            telefono,
            direccion,
            dpi,
          }),
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
      <div className="container justify-content-center">
        <div className="row p-4 col-12">
          <div className="col-12 p-5">
            <FormularioPacientes
              handleInsert={handleInsert}
              editar={editar}
              setEditar={setEditar}
              datos={datos}
              updatePaciente={updatePaciente}
            />
          </div>
          <div className="col-12 ps-4">
            <TablaPacientes
              handleDelete={handleDelete}
              getPacienteById={getPacienteById}
              setEditar={setEditar}
            />
          </div>
        </div>
      </div>
    </>
  );
};
