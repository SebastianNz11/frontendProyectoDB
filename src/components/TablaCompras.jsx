import { useState, useEffect } from "react";
import {
  BsChevronLeft,
  BsChevronRight,
  BsTrash3,
  BsPencil,
} from "react-icons/bs";

export const TablaCompras = ({
  setEditar,
  getCompraById,
  handleEditar,
  handleDelete,
}) => {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const comprasPorPagina = 5;

  useEffect(() => {
    const fetchDataCompras = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/compras");
        if (!response.ok) {
          throw new Error("No se pudieron obtener los datos");
        }

        const data = await response.json();
        // Ordenar los datos por ID en orden descendente
        data.sort((a, b) => b.id_compra - a.id_compra);
        setDatos(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDataCompras();
  }, [datos]);

  const paginacion = () => {
    const pageCount = Math.ceil(datos.length / comprasPorPagina);

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

  const filteredCompras = datos.filter((compra) =>
    compra.detalle_compra.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = pageNumber * comprasPorPagina;
  const endIndex = startIndex + comprasPorPagina;
  const comprasPorPaginaArray = filteredCompras.slice(startIndex, endIndex);

  return (
    <div className="container-fluid pt-5">
      <h2 className="mb-5">Tabla de Compras</h2>
      <div className="row col-12">
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por detalle de compra"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Id Compra</th>
                  <th>Detalle de Compra</th>
                  <th>Vendedor</th>
                  <th>Fecha de Compra</th>
                  <th>Número de Factura</th>
                  <th>Total de Compra</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {comprasPorPaginaArray.map((compra) => (
                  <tr key={compra.id_compra}>
                    <td>{compra.id_compra}</td>
                    <td>{compra.detalle_compra}</td>
                    <td>{compra.vendedor}</td>
                    <td>{compra.fecha_compra}</td>
                    <td>{compra.no_factura}</td>
                    <td>{compra.total}</td>
                    <td>
                      <button
                        onClick={() => {
                          getCompraById(compra.id_compra);
                          setEditar(true);
                          handleEditar(compra.id_compra);
                        }}
                        className="btn btn-warning"
                      >
                        <BsPencil />
                      </button>
                      <button
                        onClick={() => handleDelete(compra.id_compra)}
                        className="btn btn-danger ms-2"
                      >
                        <BsTrash3 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <p>
                Página {pageNumber + 1} de{" "}
                {Math.ceil(filteredCompras.length / comprasPorPagina)}
              </p>
              {paginacion()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
