import { useState } from "react";
import { FormularioMedicos } from "./FormularioMedicos";
import { Navbar } from "./Navbar";
import { TablaMedicos } from "./TablaMedicos";

export const Medicos = () => {
  const [errors, setErrors] = useState("");
  const [editar, setEditar] = useState(false);
  const [datos, setDatos] = useState("");

  const handleInsert = async (data) => {
    try {
      const { nombre, apellido, no_colegiado, especialidad } = data;
      const info = await fetch("http://localhost:4000/api/medicos", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ nombre, apellido, no_colegiado, especialidad }),
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
      const respuesta = await fetch(`http://localhost:4000/api/medicos/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        throw new Error("Error al eliminar médico");
      }

      console.log("Médico eliminado exitosamente");
    } catch (error) {
      setErrors(error.message);
    }
  };

  const getMedicoById = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/medicos/${id}`);
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

  const updateMedico = async (data) => {
    try {
      const { id_medico, nombre, apellido, no_colegiado, especialidad } = data;
      const datos = await fetch(
        `http://localhost:4000/api/medicos/${id_medico}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            apellido,
            no_colegiado,
            especialidad,
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
            <FormularioMedicos
              handleInsert={handleInsert}
              editar={editar}
              setEditar={setEditar}
              datos={datos}
              updateMedico={updateMedico}
            />
          </div>
          <div className="col-12 ps-4">
            <TablaMedicos
              handleDelete={handleDelete}
              getMedicoById={getMedicoById}
              setEditar={setEditar}
            />
          </div>
        </div>
      </div>
    </>
  );
};
