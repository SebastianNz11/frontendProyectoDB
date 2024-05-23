import { useState, useEffect } from "react";
import {
  BsChevronLeft,
  BsChevronRight,
  BsTrash3,
  BsPencil,
  BsFilePdf,
} from "react-icons/bs";

export const TablaFacturas = ({
  setEditar,
  getFacturaById,
  handleEditar,
  handleDelete,
  getFacturasPDF,
}) => {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const facturasPorPagina = 5;

  useEffect(() => {
    const fetchDataFacturas = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/facturas");
        if (!response.ok) {
          throw new Error("No se pudieron obtener los datos");
        }

        const data = await response.json();
        // Ordenar los datos por ID en orden descendente
        data.sort((a, b) => b.id_factura - a.id_factura);
        setDatos(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDataFacturas();
  }, [datos]);

  const paginacion = () => {
    const pageCount = Math.ceil(datos.length / facturasPorPagina);

    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={"page-item " + (pageNumber === 0 && "disabled")}>
            <button
              className="page-link"
              onClick={() => handlePageChange({ selected: pageNumber - 1 })}
            >
              <BsChevronLeft />
            </button>
          </li>
          {[...Array(pageCount)].map((_, index) => (
            <li
              key={index}
              className={"page-item " + (pageNumber === index && "active")}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange({ selected: index })}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={
              "page-item " + (pageNumber === pageCount - 1 && "disabled")
            }
          >
            <button
              className="page-link"
              onClick={() => handlePageChange({ selected: pageNumber + 1 })}
            >
              <BsChevronRight />
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPageNumber(0); // Resetear la página a 0 cuando se realiza una búsqueda
  };

  const filteredFacturas = datos.filter((factura) =>
    factura.id_factura.toString().includes(searchTerm.toLowerCase())
  );

  const startIndex = pageNumber * facturasPorPagina;
  const endIndex = startIndex + facturasPorPagina;
  const facturasPorPaginaArray = filteredFacturas.slice(startIndex, endIndex);

  return (
    <div className="container-fluid pt-5 ps-5">
      <h2 className="mb-5">Tabla de Facturas</h2>
      <div className="row col-12">
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por id factura"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Id Factura</th>
                  <th>Id Diagnóstico</th>
                  <th>Costo Adicional</th>
                  <th>Fecha Emisión</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {facturasPorPaginaArray.map((factura) => (
                  <tr key={factura.id_factura}>
                    <td>{factura.id_factura}</td>
                    <td>{factura.id_diagnostico}</td>
                    <td>{factura.costo_adicional}</td>
                    <td>{factura.fecha_emision}</td>
                    <td>
                      <button
                        onClick={() => {
                          getFacturaById(factura.id_factura);
                          setEditar(true);
                          handleEditar(factura.id_factura);
                        }}
                        className="btn btn-warning"
                      >
                        <BsPencil />
                      </button>
                      <button
                        onClick={() => handleDelete(factura.id_factura)}
                        className="btn btn-danger ms-2"
                      >
                        <BsTrash3 />
                      </button>
                      <button
                        onClick={() => getFacturasPDF(factura.id_factura)}
                        className="btn btn-primary ms-2"
                      >
                        <BsFilePdf />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <p>
                Página {pageNumber + 1} de{" "}
                {Math.ceil(filteredFacturas.length / facturasPorPagina)}
              </p>
              {paginacion()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
