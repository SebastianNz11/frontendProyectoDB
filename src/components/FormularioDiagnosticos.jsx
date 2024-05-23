import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export const FormularioDiagnosticos = ({
  handleInsert,
  editar,
  setEditar,
  datos,
  updateDiagnostico,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [medicos, setMedicos] = useState([]);
  const [procedimientos, setProcedimientos] = useState([]);
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

    const fetchProcedimientos = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/procedimientos");
        if (!response.ok) {
          throw new Error("No se pudieron obtener los datos de los procedimientos");
        }
        const data = await response.json();
        setProcedimientos(data);
      } catch (error) {
        console.error("Error al obtener los datos de los procedimientos:", error);
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
    fetchProcedimientos();
    fetchPacientes();
  }, []);

  const handleReset = () => {
    setEditar(false);
    setValue("id_medico", "");
    setValue("id_procedimiento_med", "");
    setValue("id_paciente", "");
    setValue("fecha_diagnostico", "");
    setValue("detalle_medicamento", "");
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      if (editar) {
        await updateDiagnostico(data);
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
        <h3 className="mb-3">Ingresar Diagnóstico</h3>
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
          {...register("id_procedimiento_med", { required: "Seleccione un procedimiento" })}
        >
          <option value="">Seleccione un procedimiento</option>
          {procedimientos.map((procedimiento) => (
            <option key={procedimiento.id_procedimiento_med} value={procedimiento.id_procedimiento_med}>
              {procedimiento.descripcion}
            </option>
          ))}
        </select>
        {errors.id_procedimiento_med && (
          <span className="text-danger">{errors.id_procedimiento_med.message}</span>
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
          placeholder="Fecha de diagnóstico"
          {...register("fecha_diagnostico", { required: "Ingrese la fecha de diagnóstico" })}
        />
        {errors.fecha_diagnostico && (
          <span className="text-danger">{errors.fecha_diagnostico.message}</span>
        )}
        <textarea
          className="form-control mt-3"
          rows="3"
          placeholder="Detalle del medicamento"
          {...register("detalle_medicamento", { required: "Ingrese el detalle del medicamento" })}
        />
        {errors.detalle_medicamento && (
          <span className="text-danger">{errors.detalle_medicamento.message}</span>
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
