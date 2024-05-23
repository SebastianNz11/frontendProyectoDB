import { useState, useEffect } from "react";
import {
  BsChevronLeft,
  BsChevronRight,
  BsTrash3,
  BsPencil,
} from "react-icons/bs";

export const TablaMedicos = ({
  setEditar,
  getMedicoById,
  handleEditar,
  handleDelete,
}) => {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const medicosPorPagina = 5;

  useEffect(() => {
    const fetchDataMedicos = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/medicos");
        if (!response.ok) {
          throw new Error("No se pudieron obtener los datos");
        }

        const data = await response.json();
        // Ordenar los datos por ID en orden descendente
        data.sort((a, b) => b.id_medico - a.id_medico);
        setDatos(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDataMedicos();
  }, [datos]);

  const paginacion = () => {
    const pageCount = Math.ceil(datos.length / medicosPorPagina);

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

  const filteredMedicos = datos.filter((medico) =>
    medico.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = pageNumber * medicosPorPagina;
  const endIndex = startIndex + medicosPorPagina;
  const medicosPorPaginaArray = filteredMedicos.slice(startIndex, endIndex);

  return (
    <div className="container-fluid pt-5 ps-5">
        <h2 className="mb-5">Tabla de Registros</h2>
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
                  <th>Id Médico</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Número de Colegiado</th>
                  <th>Especialidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {medicosPorPaginaArray.map((medico) => (
                  <tr key={medico.id_medico}>
                    <td>{medico.id_medico}</td>
                    <td>{medico.nombre}</td>
                    <td>{medico.apellido}</td>
                    <td>{medico.no_colegiado}</td>
                    <td>{medico.especialidad}</td>
                    <td>
                      <button
                        onClick={() => {
                          getMedicoById(medico.id_medico);
                          setEditar(true);
                          handleEditar(medico.id_medico);
                        }}
                        className="btn btn-warning"
                      >
                        <BsPencil />
                      </button>
                      <button
                        onClick={() => handleDelete(medico.id_medico)}
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
                {Math.ceil(filteredMedicos.length / medicosPorPagina)}
              </p>
              {paginacion()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
