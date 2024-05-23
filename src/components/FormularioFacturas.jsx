import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export const FormularioFacturas = ({
  handleInsert,
  editar,
  setEditar,
  datos,
  updateFactura,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [diagnosticos, setDiagnosticos] = useState([]);

  useEffect(() => {
    const fetchDiagnosticos = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/diagnosticos");
        if (!response.ok) {
          throw new Error("No se pudieron obtener los datos de los diagnósticos");
        }
        const data = await response.json();
        setDiagnosticos(data);
      } catch (error) {
        console.error("Error al obtener los datos de los diagnósticos:", error);
      }
    };

    fetchDiagnosticos();
  }, []);

  const handleReset = () => {
    setEditar(false);
    setValue("id_diagnostico", "");
    setValue("costo_adicional", "");
    setValue("fecha_emision", "");
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      if (editar) {
        await updateFactura(data);
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
        <h3 className="mb-3">{editar ? "Actualizar Factura" : "Registrar Factura"}</h3>
        <select
          className="form-select mt-3"
          {...register("id_diagnostico", { required: "Seleccione un diagnóstico" })}
        >
          <option value="">Seleccione un diagnóstico</option>
          {diagnosticos.map((diagnostico) => (
            <option key={diagnostico.id_diagnostico} value={diagnostico.id_diagnostico}>
              {diagnostico.id_diagnostico}
            </option>
          ))}
        </select>
        {errors.id_diagnostico && (
          <span className="text-danger">{errors.id_diagnostico.message}</span>
        )}
        <input
          type="number"
          className="form-control mt-3"
          placeholder="Costo Adicional"
          {...register("costo_adicional", { required: "Ingrese el costo adicional" })}
        />
        {errors.costo_adicional && (
          <span className="text-danger">{errors.costo_adicional.message}</span>
        )}
        <input
          type="date"
          className="form-control mt-3"
          placeholder="Fecha de Emisión"
          {...register("fecha_emision", { required: "Ingrese la fecha de emisión" })}
        />
        {errors.fecha_emision && (
          <span className="text-danger">{errors.fecha_emision.message}</span>
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
