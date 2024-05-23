// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Login } from './components/Login';
import { Registro } from './components/Registro';
import { Empleados } from './components/Empleados';
import { Compras } from './components/Compras';
import { Enfermeros } from './components/Enfermeros';
import { Recepcionistas } from './components/Recepcionistas';
import { Medicos } from './components/Medicos';
import { GraficasPage } from './components/GraficasPage';
import { Pacientes } from './components/Pacientes';
import { Procedimientos } from './components/Procedimientos';
import { Diagnosticos } from './components/Diagnosticos';
import { Citas } from './components/Citas';
import { Facturas } from './components/Facturas';
import { ReporteCompras } from './components/ReporteCompras';
import { PrivateRoute } from './components/PrivateRoute';
import { RoleRoute } from './components/RoleRoute';
import { AuthProvider } from './components/AuthContext';

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            
            <Route element={<RoleRoute roles={['admin']} />}>
              <Route path="/registro" element={<Registro />} />
              <Route path="/graficas" element={<GraficasPage />} />
              <Route path="/empleados" element={<Empleados />} />
              <Route path="/compras" element={<Compras />} />
              <Route path="/enfermeros" element={<Enfermeros />} />
              <Route path="/recepcionistas" element={<Recepcionistas />} />
              <Route path="/medicos" element={<Medicos />} />
              <Route path="/pacientes" element={<Pacientes />} />
              <Route path="/citas" element={<Citas />} />
              <Route path="/procedimientos" element={<Procedimientos />} />
              <Route path="/diagnosticos" element={<Diagnosticos />} />
              <Route path="/facturas" element={<Facturas />} />
              <Route path="/reportecompras" element={<ReporteCompras />} />
            </Route>

            <Route element={<RoleRoute roles={['medico']} />}>
              <Route path="/procedimientos" element={<Procedimientos />} />
              <Route path="/diagnosticos" element={<Diagnosticos />} />
              <Route path="/citas" element={<Citas />} />
            </Route>

            <Route element={<RoleRoute roles={['recepcionista']} />}>
              <Route path="/pacientes" element={<Pacientes />} />
              <Route path="/citas" element={<Citas />} />
              <Route path="/facturas" element={<Facturas />} />
            </Route>

            <Route element={<RoleRoute roles={['contabilidad']} />}>
              <Route path="/reportecompras" element={<ReporteCompras />} />
              <Route path="/facturas" element={<Facturas />} />
              <Route path="/graficas" element={<GraficasPage />} />
              <Route path="/compras" element={<Compras />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
