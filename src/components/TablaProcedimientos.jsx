import { useState, useEffect } from "react";
import {
  BsChevronLeft,
  BsChevronRight,
  BsTrash3,
  BsPencil,
} from "react-icons/bs";

export const TablaProcedimientos = ({
  setEditar,
  getProcedimientoById,
  handleEditar,
  handleDelete,
}) => {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const procedimientosPorPagina = 5;

  useEffect(() => {
    const fetchDataProcedimientos = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/procedimientos");
        if (!response.ok) {
          throw new Error("No se pudieron obtener los datos");
        }

        const data = await response.json();
        // Ordenar los datos por ID en orden descendente
        data.sort((a, b) => b.id_procedimiento_med - a.id_procedimiento_med);
        setDatos(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDataProcedimientos();
  }, [datos]);

  const paginacion = () => {
    const pageCount = Math.ceil(datos.length / procedimientosPorPagina);

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

  const filteredProcedimientos = datos.filter((procedimiento) =>
    procedimiento.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = pageNumber * procedimientosPorPagina;
  const endIndex = startIndex + procedimientosPorPagina;
  const procedimientosPorPaginaArray = filteredProcedimientos.slice(
    startIndex,
    endIndex
  );

  return (
    <div className="container-fluid pt-5 ps-5">
      <h2 className="mb-5">Tabla de Procedimientos</h2>
      <div className="row col-12">
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por descripción"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Id Procedimiento</th>
                  <th>Descripción</th>
                  <th>Duración</th>
                  <th>Costo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {procedimientosPorPaginaArray.map((procedimiento) => (
                  <tr key={procedimiento.id_procedimiento_med}>
                    <td>{procedimiento.id_procedimiento_med}</td>
                    <td>{procedimiento.descripcion}</td>
                    <td>{procedimiento.duracion}</td>
                    <td>{procedimiento.costo}</td>
                    <td>
                      <button
                        onClick={() => {
                          getProcedimientoById(procedimiento.id_procedimiento_med);
                          setEditar(true);
                          handleEditar(procedimiento.id_procedimiento_med);
                        }}
                        className="btn btn-warning"
                      >
                        <BsPencil />
                      </button>
                      <button
                        onClick={() => handleDelete(procedimiento.id_procedimiento_med)}
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
                {Math.ceil(filteredProcedimientos.length / procedimientosPorPagina)}
              </p>
              {paginacion()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
