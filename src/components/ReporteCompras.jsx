import  { useState } from 'react';
import {Navbar} from './Navbar'
import {ReporteComprasTotal} from './ReporteComprasTotal'


export const ReporteCompras = () => {
  const [mes, setMes] = useState('');
  const [anio, setAño] = useState('');

  const handleGenerarReporte = async () => {
    if (!mes || !anio) {
      alert("Por favor, selecciona un mes y un año.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/compras/reporte/${mes}/${anio}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte_compras_mes_${mes}_año_${anio}.pdf`;
        a.click();
      } else {
        alert("No hay datos de compras en ese mes y año");
      }
    } catch (error) {
      console.error("Error al generar el reporte:", error);
      alert("Error al generar el reporte. Intenta de nuevo.");
    }
  };
 
  return (
   <> 
   <Navbar/>
    <div className="container mt-5 col-6">
      <h2>Generar Reporte de Compras por Mes</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleGenerarReporte(); }}>
        <div className="form-group">
          <label htmlFor="mes">Mes</label>
          <select
            id="mes"
            className="form-control"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
          >
            <option value="">Selecciona un mes</option>
            {[...Array(12)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {new Date(0, index).toLocaleString('es', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="año">Año</label>
          <select
            id="año"
            className="form-control"
            value={anio}
            onChange={(e) => setAño(e.target.value)}
          >
            <option value="">Selecciona un año</option>
            {[...Array(10)].map((_, index) => {
              const currentYear = new Date().getFullYear();
              const year = currentYear - index;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Generar Reporte
        </button>
      </form>
    </div>
    <div>
     <ReporteComprasTotal/>
    </div>
    </>
  );
};
