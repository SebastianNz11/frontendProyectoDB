import { useState, useEffect } from "react";
import {
  BsChevronLeft,
  BsChevronRight,
  BsTrash3,
  BsPencil,
} from "react-icons/bs";

export const TablaCitas = ({
  setEditar,
  getCitaById,
  handleEditar,
  handleDelete,
}) => {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const citasPorPagina = 5;

  useEffect(() => {
    const fetchDataCitas = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/citas");
        if (!response.ok) {
          throw new Error("No se pudieron obtener los datos");
        }

        const data = await response.json();
        // Ordenar los datos por ID en orden descendente
        data.sort((a, b) => b.id_cita - a.id_cita);
        setDatos(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDataCitas();
  }, [datos]);

  const paginacion = () => {
    const pageCount = Math.ceil(datos.length / citasPorPagina);

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

  const filteredCitas = datos.filter((cita) =>
    cita.id_paciente.toString().includes(searchTerm.toLowerCase())
  );

  const startIndex = pageNumber * citasPorPagina;
  const endIndex = startIndex + citasPorPagina;
  const citasPorPaginaArray = filteredCitas.slice(startIndex, endIndex);

  return (
    <div className="container-fluid pt-5 ps-5">
      <h2 className="mb-5">Tabla de Citas</h2>
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
                  <th>Id Cita</th>
                  <th>Id Médico</th>
                  <th>Id Enfermero</th>
                  <th>Id Recepcionista</th>
                  <th>Id Paciente</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {citasPorPaginaArray.map((cita) => (
                  <tr key={cita.id_cita}>
                    <td>{cita.id_cita}</td>
                    <td>{cita.id_medico}</td>
                    <td>{cita.id_enfermero}</td>
                    <td>{cita.id_recepcionista}</td>
                    <td>{cita.id_paciente}</td>
                    <td>{cita.fecha_cita}</td>
                    <td>{cita.hora_cita}</td>
                    <td>
                      <button
                        onClick={() => {
                          getCitaById(cita.id_cita);
                          setEditar(true);
                          handleEditar(cita.id_cita);
                        }}
                        className="btn btn-warning"
                      >
                        <BsPencil />
                      </button>
                      <button
                        onClick={() => handleDelete(cita.id_cita)}
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
                {Math.ceil(filteredCitas.length / citasPorPagina)}
              </p>
              {paginacion()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
