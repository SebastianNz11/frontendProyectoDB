import { useState } from "react";
import { FormularioFacturas } from "./FormularioFacturas";
import { Navbar } from "./Navbar";
import { TablaFacturas } from "./TablaFacturas";

export const Facturas = () => {
  const [errors, setErrors] = useState("");
  const [editar, setEditar] = useState(false);
  const [datos, setDatos] = useState(null);

  // Función para insertar facturas
  const handleInsert = async (data) => {
    try {
      const { id_diagnostico, costo_adicional, fecha_emision } = data;
      const info = await fetch("http://localhost:4000/api/facturas", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id_diagnostico,
          costo_adicional,
          fecha_emision,
        }),
      });
      if (!info.ok) {
        throw new Error("Error al enviar los datos");
      }
    } catch (error) {
      setErrors(error.message);
    }
  };

  // Función para eliminar facturas
  const handleDelete = async (id) => {
    try {
      const respuesta = await fetch(`http://localhost:4000/api/facturas/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        throw new Error("Error al eliminar factura");
      }

      console.log("Factura eliminada exitosamente");
    } catch (error) {
      setErrors(error.message);
    }
  };

  // Traer información de una factura
  const getFacturaById = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/facturas/${id}`);
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

  // Función para actualizar una factura
  const updateFactura = async (data) => {
    try {
      const { id_factura, id_diagnostico, costo_adicional, fecha_emision } = data;
      const datos = await fetch(`http://localhost:4000/api/facturas/${id_factura}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id_diagnostico,
          costo_adicional,
          fecha_emision,
        }),
      });

      if (!datos.ok) {
        throw new Error("Error al obtener los datos del servidor");
      }
    } catch (error) {
      setErrors(error.message);
    }
  };

  // Función para obtener el PDF de una factura
  const getFacturasPDF = async (id_factura) => {
  try {
    const response = await fetch(`http://localhost:4000/api/facturas/pdf/${id_factura}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al generar el PDF de la factura");
    }

    const arrayBuffer = await response.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `factura_${id_factura}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
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
            <FormularioFacturas
              handleInsert={handleInsert}
              editar={editar}
              setEditar={setEditar}
              datos={datos}
              updateFactura={updateFactura}
            />
          </div>
          <div className="col-12 ps-5">
            <TablaFacturas
              handleDelete={handleDelete}
              getFacturaById={getFacturaById}
              setEditar={setEditar}
              getFacturasPDF={getFacturasPDF}
            />
          </div>
        </div>
      </div>
    </>
  );
};
