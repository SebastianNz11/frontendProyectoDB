import { useState, useEffect } from "react";
import {
  BsChevronLeft,
  BsChevronRight,
  BsTrash3,
  BsPencil,
} from "react-icons/bs";

export const TablaEnfermeros = ({
  setEditar,
  getEnfermeroById,
  handleEditar,
  handleDelete,
}) => {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const enfermerosPorPagina = 5;

  useEffect(() => {
    const fetchDataEnfermeros = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/enfermeros");
        if (!response.ok) {
          throw new Error("No se pudieron obtener los datos");
        }

        const data = await response.json();
        // Ordenar los datos por ID en orden descendente
        data.sort((a, b) => b.id_enfermero - a.id_enfermero);
        setDatos(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDataEnfermeros();
  }, [datos]);

  const paginacion = () => {
    const pageCount = Math.ceil(datos.length / enfermerosPorPagina);

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

  const filteredEnfermeros = datos.filter((enfermero) =>
    enfermero.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = pageNumber * enfermerosPorPagina;
  const endIndex = startIndex + enfermerosPorPagina;
  const enfermerosPorPaginaArray = filteredEnfermeros.slice(
    startIndex,
    endIndex
  );

  return (
    <div className="container-fluid pt-5 ps-5">
      <h2 className="mb-5">Tabla de Enfermeros</h2>
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
                  <th>Id Enfermero</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Identificación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {enfermerosPorPaginaArray.map((enfermero) => (
                  <tr key={enfermero.id_enfermero}>
                    <td>{enfermero.id_enfermero}</td>
                    <td>{enfermero.nombre}</td>
                    <td>{enfermero.apellido}</td>
                    <td>{enfermero.identificacion}</td>
                    <td>
                      <button
                        onClick={() => {
                          getEnfermeroById(enfermero.id_enfermero);
                          setEditar(true);
                          handleEditar(enfermero.id_enfermero);
                        }}
                        className="btn btn-warning"
                      >
                        <BsPencil />
                      </button>
                      <button
                        onClick={() => handleDelete(enfermero.id_enfermero)}
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
                {Math.ceil(filteredEnfermeros.length / enfermerosPorPagina)}
              </p>
              {paginacion()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
