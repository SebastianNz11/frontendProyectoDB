import { useState, useEffect } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";


export const TablaRegistro = ({ setEditar, handleEditar, handleDelete, data }) => {


  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const usuariosPorPagina = 5;

  useEffect(() => {
    setDatos(data)    
  }, [data]);
  // useEffect(() => {
  //   fetchDataUsuarios()    
  // }, []);

  // const fetchDataUsuarios = async () => {
  //   try {
  //     const response = await fetch("http://localhost:4000/api/registro");
  //     if (!response.ok) {
  //       throw new Error("No se pudieron obtener los datos");
  //     }

  //     const data = await response.json();
  //     // Ordenar los datos por ID en orden descendente
  //     data.sort((a, b) => b.id_usuario - a.id_usuario);      
  //     setDatos(data);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  const paginacion = () => {
    const pageCount = Math.ceil(datos.length / usuariosPorPagina);

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

  const filteredUsuarios = datos.filter((usuario) =>
    usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = pageNumber * usuariosPorPagina;
  const endIndex = startIndex + usuariosPorPagina;
  const usuariosPorPaginaArray = filteredUsuarios.slice(startIndex, endIndex);

  return (
    <div className="container-fluid pt-5 ps-5">
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
                  <th>Id usuario</th>
                  <th>Nombre</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {usuariosPorPaginaArray.map((usuario) => (
                  <tr key={usuario.id_usuario}>
                    <td>{usuario.id_usuario}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.rol}</td>
                    <td>
                      <button
                        onClick={() => {
                          setEditar(true);
                          handleEditar(usuario.id_usuario);
                        }}
                        className="btn btn-warning"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(usuario.id_usuario)}
                        className="btn btn-danger ms-2"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <p>
                Página {pageNumber + 1} de{" "}
                {Math.ceil(filteredUsuarios.length / usuariosPorPagina)}
              </p>
              {paginacion()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
