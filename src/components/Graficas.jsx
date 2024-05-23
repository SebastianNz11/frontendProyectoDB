import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";

export const Graficas = () => {
  const [comprasData, setComprasData] = useState([]);
  const totalChartRef = useRef(null);
  const vendedorChartRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (comprasData.length > 0) {
      renderCharts(comprasData);
    }
  }, [comprasData]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/compras");
      const data = await response.json();
      setComprasData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderCharts = (data) => {
    // Renderizar los gráficos solo si los elementos canvas están disponibles
    if (totalChartRef.current && vendedorChartRef.current) {
      renderTotalChart(data);
      renderVendedorChart(data);
    }
  };

  const renderTotalChart = (data) => {
    const ctx = totalChartRef.current.getContext("2d");
    totalChartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((item) => item.id_compra),
        datasets: [
          {
            label: "Total",
            data: data.map((item) => item.total),
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  const renderVendedorChart = (data) => {
    const vendedorData = data.reduce((acc, curr) => {
      acc[curr.vendedor] = (acc[curr.vendedor] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(vendedorData);
    const dataValues = Object.values(vendedorData);
    const backgroundColors = generateRandomColors(labels.length);

    const ctx = vendedorChartRef.current.getContext("2d");
    vendedorChartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Proveedor",
            data: dataValues,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  // Función para generar colores aleatorios
  const generateRandomColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.5)`;
      colors.push(color);
    }
    return colors;
  };

  return (
    <div className="container-fluid justify-content-between">
      <div className="row">
        <div className="col-6">
          <h5 className="text-center mb-5">Costos</h5>
          <canvas
            ref={totalChartRef}
            width="400"
            height="400"
            className="me-5"
          ></canvas>
        </div>
        <div className="col-6">
          <h5 className="text-center mb-5">Proveedores</h5>
          <canvas
            ref={vendedorChartRef}
            width="400"
            height="400"
            className="ms-5"
          ></canvas>
        </div>
      </div>
    </div>
  );
};
