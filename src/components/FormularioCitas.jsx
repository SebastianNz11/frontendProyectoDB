import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export const FormularioCitas = ({
  handleInsert,
  editar,
  setEditar,
  datos,
  updateCita,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [medicos, setMedicos] = useState([]);
  const [enfermeros, setEnfermeros] = useState([]);
  const [recepcionistas, setRecepcionistas] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/medicos");
        if (!response.ok) {
          throw new Error("No se pudieron obtener los datos de los médicos");
        }
        const data = await response.json();
        setMedicos(data);
      } catch (error) {
        console.error("Error al obtener los datos de los médicos:", error);
      }
    };

    const fetchEnfermeros = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/enfermeros");
        if (!response.ok) {
          throw new Error("No se pudieron obtener los datos de los enfermeros");
        }
        const data = await response.json();
        setEnfermeros(data);
      } catch (error) {
        console.error("Error al obtener los datos de los enfermeros:", error);
      }
    };

    const fetchRecepcionistas = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/recepcionistas");
        if (!response.ok) {
          throw new Error("No se pudieron obtener los datos de los recepcionistas");
        }
        const data = await response.json();
        setRecepcionistas(data);
      } catch (error) {
        console.error("Error al obtener los datos de los recepcionistas:", error);
      }
    };

    const fetchPacientes = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/pacientes");
        if (!response.ok) {
          throw new Error("No se pudieron obtener los datos de los pacientes");
        }
        const data = await response.json();
        setPacientes(data);
      } catch (error) {
        console.error("Error al obtener los datos de los pacientes:", error);
      }
    };

    fetchMedicos();
    fetchEnfermeros();
    fetchRecepcionistas();
    fetchPacientes();
  }, []);

  const handleReset = () => {
    setEditar(false);
    setValue("id_medico", "");
    setValue("id_enfermero", "");
    setValue("id_recepcionista", "");
    setValue("id_paciente", "");
    setValue("fecha_cita", "");
    setValue("hora_cita", "");
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      if (editar) {
        await updateCita(data);
        setEditar(false);
      } else {
        handleInsert(data);
      }
      handleReset();
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  };

  useEffect(() => {
    if (editar && datos) {
      reset(datos);
    }
  }, [editar, datos, reset]);

  return (
    <div className="container-fluid justify-content-center pt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="mb-3">Agendar Cita</h3>
        <select
          className="form-select mt-3"
          {...register("id_medico", { required: "Seleccione un médico" })}
        >
          <option value="">Seleccione un médico</option>
          {medicos.map((medico) => (
            <option key={medico.id_medico} value={medico.id_medico}>
              {medico.nombre} {medico.apellido}
            </option>
          ))}
        </select>
        {errors.id_medico && (
          <span className="text-danger">{errors.id_medico.message}</span>
        )}
        <select
          className="form-select mt-3"
          {...register("id_enfermero", { required: "Seleccione un enfermero" })}
        >
          <option value="">Seleccione un enfermero</option>
          {enfermeros.map((enfermero) => (
            <option key={enfermero.id_enfermero} value={enfermero.id_enfermero}>
              {enfermero.nombre} {enfermero.apellido}
            </option>
          ))}
        </select>
        {errors.id_enfermero && (
          <span className="text-danger">{errors.id_enfermero.message}</span>
        )}
        <select
          className="form-select mt-3"
          {...register("id_recepcionista", { required: "Seleccione un recepcionista" })}
        >
          <option value="">Seleccione un recepcionista</option>
          {recepcionistas.map((recepcionista) => (
            <option key={recepcionista.id_recepcionista} value={recepcionista.id_recepcionista}>
              {recepcionista.nombre} {recepcionista.apellido}
            </option>
          ))}
        </select>
        {errors.id_recepcionista && (
          <span className="text-danger">{errors.id_recepcionista.message}</span>
        )}
        <select
          className="form-select mt-3"
          {...register("id_paciente", { required: "Seleccione un paciente" })}
        >
          <option value="">Seleccione un paciente</option>
          {pacientes.map((paciente) => (
            <option key={paciente.id_paciente} value={paciente.id_paciente}>
              {paciente.nombre} {paciente.apellido}
            </option>
          ))}
        </select>
        {errors.id_paciente && (
          <span className="text-danger">{errors.id_paciente.message}</span>
        )}
        <input
          type="date"
          className="form-control mt-3"
          placeholder="Fecha de la cita"
          {...register("fecha_cita", { required: "Ingrese la fecha de la cita" })}
        />
        {errors.fecha_cita && (
          <span className="text-danger">{errors.fecha_cita.message}</span>
        )}
        <input
          type="time"
          className="form-control mt-3"
          placeholder="Hora de la cita"
          {...register("hora_cita", { required: "Ingrese la hora de la cita" })}
        />
        {errors.hora_cita && (
          <span className="text-danger">{errors.hora_cita.message}</span>
        )}
        <div>
          {editar ? (
            <div>
              <button className="btn btn-warning mt-3">Actualizar</button>
              <button
                className="btn btn-danger mt-3 ms-3"
                onClick={() => {
                  setEditar(false);
                  handleReset();
                }}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button className="btn btn-primary mt-3">Registrar</button>
          )}
        </div>
      </form>
    </div>
  );
};
