import { useState, useEffect } from "react";
import {
  BsChevronLeft,
  BsChevronRight,
  BsTrash3,
  BsPencil,
} from "react-icons/bs";

export const TablaDiagnosticos = ({
  setEditar,
  getDiagnosticoById,
  handleEditar,
  handleDelete,
}) => {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const diagnosticosPorPagina = 5;

  useEffect(() => {
    const fetchDataDiagnosticos = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/diagnosticos");
        if (!response.ok) {
          throw new Error("No se pudieron obtener los datos");
        }

        const data = await response.json();
        // Ordenar los datos por ID en orden descendente
        data.sort((a, b) => b.id_diagnostico - a.id_diagnostico);
        setDatos(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDataDiagnosticos();
  }, [datos]);

  const paginacion = () => {
    const pageCount = Math.ceil(datos.length / diagnosticosPorPagina);

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

  const filteredDiagnosticos = datos.filter((diagnostico) =>
    diagnostico.id_paciente.toString().includes(searchTerm.toLowerCase())
  );

  const startIndex = pageNumber * diagnosticosPorPagina;
  const endIndex = startIndex + diagnosticosPorPagina;
  const diagnosticosPorPaginaArray = filteredDiagnosticos.slice(
    startIndex,
    endIndex
  );

  return (
    <div className="container-fluid pt-5 ps-5">
      <h2 className="mb-5">Tabla de Diagnosticos</h2>
      <div className="row col-12">
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por id paciente"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Id Diagnóstico</th>
                  <th>Id Médico</th>
                  <th>Id Procedimiento</th>
                  <th>Id Paciente</th>
                  <th>Fecha</th>
                  <th>Medicamento</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {diagnosticosPorPaginaArray.map((diagnostico) => (
                  <tr key={diagnostico.id_diagnostico}>
                    <td>{diagnostico.id_diagnostico}</td>
                    <td>{diagnostico.id_medico}</td>
                    <td>{diagnostico.id_procedimiento_med}</td>
                    <td>{diagnostico.id_paciente}</td>
                    <td>{diagnostico.fecha_diagnostico}</td>
                    <td>{diagnostico.detalle_medicamento}</td>
                    <td>
                      <button
                        onClick={() => {
                          getDiagnosticoById(diagnostico.id_diagnostico);
                          setEditar(true);
                          handleEditar(diagnostico.id_diagnostico);
                        }}
                        className="btn btn-warning"
                      >
                        <BsPencil />
                      </button>
                      <button
                        onClick={() => handleDelete(diagnostico.id_diagnostico)}
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
                {Math.ceil(filteredDiagnosticos.length / diagnosticosPorPagina)}
              </p>
              {paginacion()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
