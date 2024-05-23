import { useState } from "react";
import { FormularioDiagnosticos } from "./FormularioDiagnosticos";
import { Navbar } from "./Navbar";
import { TablaDiagnosticos } from "./TablaDiagnosticos";

export const Diagnosticos = () => {
  const [errors, setErrors] = useState("");
  const [editar, setEditar] = useState(false);
  const [datos, setDatos] = useState(null);

  // Función para insertar diagnósticos
  const handleInsert = async (data) => {
    try {
      const {
        id_medico,
        id_procedimiento_med,
        id_paciente,
        fecha_diagnostico,
        detalle_medicamento,
      } = data;
      const info = await fetch("http://localhost:4000/api/diagnosticos", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id_medico,
          id_procedimiento_med,
          id_paciente,
          fecha_diagnostico,
          detalle_medicamento,
        }),
      });
      if (!info.ok) {
        throw new Error("Error al enviar los datos");
      }
    } catch (error) {
      setErrors(error.message);
    }
  };

  // Función para eliminar diagnósticos
  const handleDelete = async (id) => {
    try {
      const respuesta = await fetch(
        `http://localhost:4000/api/diagnosticos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!respuesta.ok) {
        throw new Error("Error al eliminar diagnóstico");
      }

      console.log("Diagnóstico eliminado exitosamente");
    } catch (error) {
      setErrors(error.message);
    }
  };

  // Traer información de un diagnóstico
  const getDiagnosticoById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/diagnosticos/${id}`
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

  const updateDiagnostico = async (data) => {
    try {
      const {
        id_diagnostico,
        id_medico,
        id_procedimiento_med,
        id_paciente,
        fecha_diagnostico,
        detalle_medicamento,
      } = data;
      const datos = await fetch(
        `http://localhost:4000/api/diagnosticos/${id_diagnostico}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id_medico,
            id_procedimiento_med,
            id_paciente,
            fecha_diagnostico,
            detalle_medicamento,
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
            <FormularioDiagnosticos
              handleInsert={handleInsert}
              editar={editar}
              setEditar={setEditar}
              datos={datos}
              updateDiagnostico={updateDiagnostico}
            />
          </div>
          <div className="col-12 ps-5">
            <TablaDiagnosticos
              handleDelete={handleDelete}
              getDiagnosticoById={getDiagnosticoById}
              setEditar={setEditar}
            />
          </div>
        </div>
      </div>
    </>
  );
};
