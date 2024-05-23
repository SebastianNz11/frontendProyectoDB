import { useState } from "react";
import { FormularioCompras } from "./FormularioCompras";
import { Navbar } from "./Navbar";
import { TablaCompras } from "./TablaCompras";

export const Compras = () => {
  const [errors, setErrors] = useState("");
  const [editar, setEditar] = useState(false);
  const [datos, setDatos] = useState("");

  const handleInsert = async (data) => {
    try {
      const { detalle_compra, vendedor, fecha_compra, no_factura, total } =
        data;
      const info = await fetch("http://localhost:4000/api/compras", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          detalle_compra,
          vendedor,
          fecha_compra,
          no_factura,
          total,
        }),
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
      const respuesta = await fetch(`http://localhost:4000/api/compras/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        throw new Error("Error al eliminar compra");
      }

      console.log("Compra eliminada exitosamente");
    } catch (error) {
      setErrors(error.message);
    }
  };

  const getCompraById = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/compras/${id}`);
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

  const updateCompra = async (data) => {
    try {
      const {
        id_compra,
        detalle_compra,
        vendedor,
        fecha_compra,
        no_factura,
        total,
      } = data;
      const datos = await fetch(
        `http://localhost:4000/api/compras/${id_compra}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            detalle_compra,
            vendedor,
            fecha_compra,
            no_factura,
            total,
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
            <FormularioCompras
              handleInsert={handleInsert}
              editar={editar}
              setEditar={setEditar}
              datos={datos}
              updateCompra={updateCompra}
            />
          </div>
          <div className="col-12 ps-4">
            <TablaCompras
              handleDelete={handleDelete}
              getCompraById={getCompraById}
              setEditar={setEditar}
            />
          </div>
        </div>
      </div>
    </>
  );
};
