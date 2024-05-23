import { useForm } from "react-hook-form";
import { useEffect } from "react";

export const FormularioEmpleados = ({
  handleInsert,
  editar,
  setEditar,
  datos,
  updateEmpleados,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const handleReset = () => {
    setEditar(false);
    setValue("nombre", "");
    setValue("apellido", "");
    setValue("empleado", "");
    setValue("salario", "");
  };

  const onSubmit = async (data) => {
    try {
      if (editar) {
        await updateEmpleados(data); // Llama a la función de actualización
        setEditar(false); // Sale del modo de edición después de actualizar
      } else {
        handleInsert(data); // Si no está en modo de edición, inserta un nuevo empleado
      }
      handleReset(); // Restablece el formulario después de la acción
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
    <div className="container-fluid  d-flex justify-content-center pt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="mb-3">Ingresar Empleado</h3>
        <input
          type="text"
          className="form-control"
          placeholder="Nombre"
          {...register("nombre", {
            required: "Nombre es requerido",
            minLength: { value: 2, message: "El largo mínimo de nombre es 5" },
            maxLength: {
              value: 20,
              message: "El largo máximo del nombre es 20",
            },
          })}
        />
        {errors.nombre && (
          <span className="text-danger">{errors.nombre.message}</span>
        )}
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Apellido"
          {...register("apellido", {
            required: {
              value: true,
              message: "Apellido es requerido",
            },
            maxLength: {
              value: 20,
              message: "El largo máximo del apellido es 20",
            },
            minLength: {
              value: 1,
              message: "El largo mínimo del apellido es 1",
            },
          })}
        />
        {errors.apellido && (
          <span className="text-danger">{errors.apellido.message}</span>
        )}

        <select
          name="tipo_empleado"
          className="form-select mt-3"
          {...register("empleado", {
            required: "Selecciona el tipo de empleado",
          })}
        >
          <option value="">Selecciona el tipo de empleado</option>
          <option value="medico">Médico</option>
          <option value="enfermero">Enfermero</option>
          <option value="recepcionista">Recepcionista</option>
          <option value="finanzas">Finanzas</option>
        </select>
        {errors.empleado && (
          <span className="text-danger">{errors.empleado.message}</span>
        )}

        <input
          type="number"
          className="form-control mt-3"
          placeholder="Salario"
          {...register("salario", {
            required: "Salario es requerido",
            pattern: {
              value: /^[1-9]\d*$/,
              message: "No se permiten negativos",
            },
          })}
        />
        {errors.salario && (
          <span className="text-danger">{errors.salario.message}</span>
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
