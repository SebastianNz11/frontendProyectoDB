import { useState } from 'react';
import { Navbar } from './Navbar';

export const ReporteComprasTotal = () => {
  const [anio, setAnio] = useState('');

  const handleGenerarReporte = async () => {
    if (!anio) {
      alert("Por favor, selecciona un año.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/compras/reportetotal/${anio}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte_compras_año_${anio}.pdf`;
        a.click();
      } else {
        alert("No hay datos de compras en ese año");
      }
    } catch (error) {
      console.error("Error al generar el reporte:", error);
      alert("Error al generar el reporte. Intenta de nuevo.");
    }
  };
 
  return (
    <> 
      <div className="container mt-5 col-6">
        <h2>Generar Reporte de Compras por Año</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleGenerarReporte(); }}>
          <div className="form-group">
            <label htmlFor="anio">Año</label>
            <select
              id="anio"
              className="form-control"
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
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
    </>
  );
};
