import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const Login = () => {
  const [nombre, setNombre] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, contrasenia }),
      });

      if (response.ok) {
        const data = await response.json();
        
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.rol);
        setAuth({ isAuthenticated: true, role: data.rol });
        navigate("/dashboard");
      } else {
        alert("Nombre de usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="border p-5 m-5 border-primary">
      <h2 className="text-primary text-center">Bienvenido</h2>
      <form className="mt-5" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Usuario"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="password"
          className="form-control mt-4"
          placeholder="Contraseña"
          value={contrasenia}
          onChange={(e) => setContrasenia(e.target.value)}
        />
        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn btn-primary mt-4" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
