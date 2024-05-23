import { useState } from "react";
import { FormularioCitas } from "./FormularioCitas";
import { Navbar } from "./Navbar";
import { TablaCitas } from "./TablaCitas";

export const Citas = () => {
  const [errors, setErrors] = useState("");
  const [editar, setEditar] = useState(false);
  const [datos, setDatos] = useState(null);

  // Función para insertar citas
  const handleInsert = async (data) => {
    try {
      const {
        id_paciente,
        id_medico,
        id_enfermero,
        id_recepcionista,
        fecha_cita,
        hora_cita,
      } = data;
      const info = await fetch("http://localhost:4000/api/citas", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id_paciente,
          id_medico,
          id_enfermero,
          id_recepcionista,
          fecha_cita,
          hora_cita,
        }),
      });
      if (!info.ok) {
        throw new Error("Error al enviar los datos");
      }
    } catch (error) {
      setErrors(error.message);
    }
  };

  // Función para eliminar citas
  const handleDelete = async (id) => {
    try {
      const respuesta = await fetch(`http://localhost:4000/api/citas/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        throw new Error("Error al eliminar cita");
      }

      console.log("Cita eliminada exitosamente");
    } catch (error) {
      setErrors(error.message);
    }
  };

  // Traer información de una cita
  const getCitaById = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/citas/${id}`);
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

  const updateCita = async (data) => {
    try {
      const {
        id_cita,
        id_paciente,
        id_medico,
        id_enfermero,
        id_recepcionista,
        fecha_cita,
        hora_cita,
      } = data;
      const datos = await fetch(`http://localhost:4000/api/citas/${id_cita}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id_paciente,
          id_medico,
          id_enfermero,
          id_recepcionista,
          fecha_cita,
          hora_cita,
        }),
      });

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
            <FormularioCitas
              handleInsert={handleInsert}
              editar={editar}
              setEditar={setEditar}
              datos={datos}
              updateCita={updateCita}
            />
          </div>
          <div className="col-12 ps-5">
            <TablaCitas
              handleDelete={handleDelete}
              getCitaById={getCitaById}
              setEditar={setEditar}
            />
          </div>
        </div>
      </div>
    </>
  );
};
