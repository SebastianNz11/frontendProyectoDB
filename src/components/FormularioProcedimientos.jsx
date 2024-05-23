import { useForm } from "react-hook-form";
import { useEffect } from "react";

export const FormularioProcedimientos = ({
  handleInsert,
  editar,
  setEditar,
  datos,
  updateProcedimiento,
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
    setValue("descripcion", "");
    setValue("duracion", "");
    setValue("costo", "");
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      if (editar) {
        await updateProcedimiento(data); // Llama a la función de actualización
        setEditar(false); // Sale del modo de edición después de actualizar
      } else {
        handleInsert(data); // Si no está en modo de edición, inserta un nuevo procedimiento
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
    <div className="container-fluid justify-content-center pt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="mb-3">Ingresar Procedimiento</h3>
        <input
          type="text"
          className="form-control"
          placeholder="Descripción"
          {...register("descripcion", {
            required: "Descripción es requerida",
          })}
        />
        {errors.descripcion && (
          <span className="text-danger">{errors.descripcion.message}</span>
        )}
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Duración"
          {...register("duracion", {
            required: {
              value: true,
              message: "Duración es requerida",
            },
          })}
        />
        {errors.duracion && (
          <span className="text-danger">{errors.duracion.message}</span>
        )}

        <input
          type="number"
          className="form-control mt-3"
          placeholder="Costo"
          {...register("costo", {
            required: "Costo es requerido",
          })}
        />
        {errors.costo && (
          <span className="text-danger">{errors.costo.message}</span>
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
