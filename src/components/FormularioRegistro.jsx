import { useForm } from "react-hook-form";
export const FormularioRegistro = ({
  setNombre,
  setContrasenia,
  setRol,
  nombre,
  contrasenia,
  rol,
  editar,
  handleSubmit,
  handleUpdate,
  id,
  setEditar,
  clear,
}) => {
  return (
    <div className="">
      <h1>Agregar Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            required
            name="nombre"
            className="form-control"
            placeholder="Usuario"
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            required
            name="contrasenia"
            className="form-control"
            placeholder="Contraseña"
            onChange={(e) => setContrasenia(e.target.value)}
            value={contrasenia}
          />
        </div>
        <div className="mb-3">
          <select
            name="rol"
            className="form-select"
            required
            onChange={(e) => setRol(e.target.value)}
            value={rol}
          >
            <option value="" disabled>
              Selecciona un rol
            </option>
            <option value="admin">Administrador</option>
            <option value="recepcionista">Recepcionista</option>
            <option value="finanzas">Finanzas</option>
          </select>
        </div>
        <div>
          {editar ? (
            <div>
              <button
                type="button"
                className="btn btn-warning me-2"
                onClick={(e) => {
                  handleUpdate(e, id);
                  setEditar(false);
                }}
              >
                Actualizar
              </button>
              <button
                type="button"
                className="btn btn-danger me-2"
                onClick={() => {
                  setEditar(false);
                  clear();
                }}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              type="submit"
              className="btn btn-primary me-2"
              onSubmit={handleSubmit}
            >
              Registrar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
