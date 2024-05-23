import { useState, useEffect } from "react";
import {
  BsChevronLeft,
  BsChevronRight,
  BsTrash3,
  BsPencil,
} from "react-icons/bs";

export const TablaRecepcionistas = ({
  setEditar,
  getRecepcionistaById,
  handleEditar,
  handleDelete,
}) => {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const recepcionistasPorPagina = 5;

  useEffect(() => {
    const fetchDataRecepcionistas = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/recepcionistas"
        );
        if (!response.ok) {
          throw new Error("No se pudieron obtener los datos");
        }

        const data = await response.json();
        // Ordenar los datos por ID en orden descendente
        data.sort((a, b) => b.id_recepcionista - a.id_recepcionista);
        setDatos(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDataRecepcionistas();
  }, [datos]);

  const paginacion = () => {
    const pageCount = Math.ceil(datos.length / recepcionistasPorPagina);

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

  const filteredRecepcionistas = datos.filter((recepcionista) =>
    recepcionista.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = pageNumber * recepcionistasPorPagina;
  const endIndex = startIndex + recepcionistasPorPagina;
  const recepcionistasPorPaginaArray = filteredRecepcionistas.slice(
    startIndex,
    endIndex
  );

  return (
    <div className="container-fluid pt-5 ps-5">
      <h2 className="mb-5">Tabla de Recepcionistas</h2>
      <div className="row col-12">
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Id Recepcionista</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>No. Identificación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {recepcionistasPorPaginaArray.map((recepcionista) => (
                  <tr key={recepcionista.id_recepcionista}>
                    <td>{recepcionista.id_recepcionista}</td>
                    <td>{recepcionista.nombre}</td>
                    <td>{recepcionista.apellido}</td>
                    <td>{recepcionista.no_identificacion}</td>
                    <td>
                      <button
                        onClick={() => {
                          getRecepcionistaById(recepcionista.id_recepcionista);
                          setEditar(true);
                          handleEditar(recepcionista.id_recepcionista);
                        }}
                        className="btn btn-warning"
                      >
                        <BsPencil />
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(recepcionista.id_recepcionista)
                        }
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
                {Math.ceil(
                  filteredRecepcionistas.length / recepcionistasPorPagina
                )}
              </p>
              {paginacion()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
