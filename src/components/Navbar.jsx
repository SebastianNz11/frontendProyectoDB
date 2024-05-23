// components/Navbar.js
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import { AuthContext } from "../components/AuthContext";

export const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuth({ isAuthenticated: false, role: null });
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <Link to="/dashboard">
          <img src={logo} alt="" style={{ width: "50px", height: "50px" }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {auth.isAuthenticated && (
              <>
                {auth.role === "admin" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link active ms-5 text-white" aria-current="page" to="/registro">
                        Usuarios
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active ms-5 text-white" aria-current="page" to="/graficas">
                        Graficas
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active ms-5 text-white" aria-current="page" to="/empleados">
                        Empleados
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active ms-5 text-white" aria-current="page" to="/compras">
                        Compras
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active ms-5 text-white" aria-current="page" to="/enfermeros">
                        Enfermeros
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active ms-5 text-white" aria-current="page" to="/recepcionistas">
                        Recepcionistas
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active ms-5 text-white" aria-current="page" to="/medicos">
                        Médicos
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active ms-5 text-white" aria-current="page" to="/pacientes">
                        Pacientes
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active ms-5 text-white" aria-current="page" to="/citas">
                        Citas
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active ms-5 text-white" aria-current="page" to="/procedimientos">
                        Procedimientos
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active ms-5 text-white" aria-current="page" to="/diagnosticos">
                        Diagnósticos
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active ms-5 text-white" aria-current="page" to="/facturas">
                        Facturas
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active ms-5 text-white" aria-current="page" to="/reportecompras">
                        Reporte Compras
                      </Link>
                    </li>
                  </>
                )}
                {auth.role === "medico" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link active ms-5 text-white" aria-current="page" to="/procedimientos">
                        Procedimientos
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active ms-5 text-white" aria-current="page" to="/diagnosticos">
                        Diagnósticos
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active ms-5 text-white" aria-current="page" to="/citas">
                        Citas
                      </Link>
                    </li>
                  </>
                )}
                {auth.role === "recepcionista" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link active ms-5 text-white" aria-current="page" to="/pacientes">
                        Pacientes
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active ms-5 text-white" aria-current="page" to="/citas">
                        Citas
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active ms-5 text-white" aria-current="page" to="/facturas">
                        Facturas
                      </Link>
                    </li>
                  </>
                )}
                {auth.role === "contabilidad" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link active ms-5 text-white" aria-current="page" to="/reportecompras">
                        Reporte Compras
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active ms-5 text-white" aria-current="page" to="/facturas">
                        Facturas
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active ms-5 text-white" aria-current="page" to="/graficas">
                        Graficas
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active ms-5 text-white" aria-current="page" to="/compras">
                        Compras
                      </Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <button className="btn btn-outline-danger my-2 my-sm-0" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
