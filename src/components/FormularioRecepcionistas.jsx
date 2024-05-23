import { useForm } from "react-hook-form";
import { useEffect } from "react";

export const FormularioRecepcionistas = ({
  handleInsert,
  editar,
  setEditar,
  datos,
  updateRecepcionista,
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
    setValue("no_identificacion", "");
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      if (editar) {
        await updateRecepcionista(data); // Llama a la función de actualización
        setEditar(false); // Sale del modo de edición después de actualizar
      } else {
        handleInsert(data); // Si no está en modo de edición, inserta un nuevo recepcionista
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
        <h3 className="mb-3">Ingresar Recepcionista</h3>
        <input
          type="text"
          className="form-control"
          placeholder="Nombre"
          {...register("nombre", {
            required: "Nombre es requerido",
            minLength: { value: 2, message: "El largo mínimo de nombre es 2" },
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

        <input
          type="text"
          className="form-control mt-3"
          placeholder="Número de Identificación"
          {...register("no_identificacion", {
            required: "Número de Identificación es requerido",
          })}
        />
        {errors.no_identificacion && (
          <span className="text-danger">{errors.no_identificacion.message}</span>
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

