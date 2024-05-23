import { useForm } from "react-hook-form";
import { useEffect } from "react";

export const FormularioCompras = ({
  handleInsert,
  editar,
  setEditar,
  datos,
  updateCompra,
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
    setValue("detalle_compra", "");
    setValue("vendedor", "");
    setValue("fecha_compra", "");
    setValue("no_factura", "");
    setValue("total", "");
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      if (editar) {
        await updateCompra(data); // Llama a la función de actualización
        setEditar(false); // Sale del modo de edición después de actualizar
      } else {
        handleInsert(data); // Si no está en modo de edición, inserta una nueva compra
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
    <div className="container-fluid  justify-content-center pt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="mb-3">Ingresar Compra</h3>
        <input
          type="text"
          className="form-control"
          placeholder="Detalle de Compra"
          {...register("detalle_compra", {
            required: "Detalle de compra es requerido",
          })}
        />
        {errors.detalle_compra && (
          <span className="text-danger">{errors.detalle_compra.message}</span>
        )}
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Vendedor"
          {...register("vendedor", {
            required: {
              value: true,
              message: "Vendedor es requerido",
            },
          })}
        />
        {errors.vendedor && (
          <span className="text-danger">{errors.vendedor.message}</span>
        )}

        <input
          type="date"
          className="form-control mt-3"
          placeholder="Fecha de Compra"
          {...register("fecha_compra", {
            required: "Fecha de compra es requerida",
          })}
        />
        {errors.fecha_compra && (
          <span className="text-danger">{errors.fecha_compra.message}</span>
        )}

        <input
          type="text"
          className="form-control mt-3"
          placeholder="Número de Factura"
          {...register("no_factura", {
            required: "Número de factura es requerido",
          })}
        />
        {errors.no_factura && (
          <span className="text-danger">{errors.no_factura.message}</span>
        )}

        <input
          type="number"
          className="form-control mt-3"
          placeholder="Total de Compra"
          {...register("total", {
            required: "Total de compra es requerido",
          })}
        />
        {errors.total_compra && (
          <span className="text-danger">{errors.total.message}</span>
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
