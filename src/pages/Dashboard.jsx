// Dashboard.jsx
import gif from "../img/salud.gif";
import { Navbar } from "../components/Navbar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/");
    }
  }, [auth.isAuthenticated, navigate]);

  if (!auth.isAuthenticated) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="container d-flex justify-content-center p-5">
        <div className="row col-4 mt-5">
          <img src={gif} alt="logo" className="mx-auto mt-5" />
        </div>
      </div>
      <div className="container">
        {auth.role === "admin" && <p>Bienvenido, administrador.</p>}
        {auth.role === "recepcionista" && <p>Bienvenido, recepcionista.</p>}
        {auth.role === "medico" && <p>Bienvenido, médico.</p>}
        {auth.role === "contabilidad" && <p>Bienvenido, contabilidad.</p>}
      </div>
    </>
  );
};
