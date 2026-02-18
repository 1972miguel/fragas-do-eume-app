import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

export default function PerfilAltitud() {
  // Tus datos originales (resampleados cada 0.1 km)
  const distances = [
    0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4,
    1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9,
    3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.4,
    4.5, 4.6, 4.7, 4.8, 4.9, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9,
    6.0, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 7.0, 7.1, 7.2, 7.3, 7.4,
    7.5, 7.6, 7.7, 7.8, 7.9, 8.0, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9,
    9.0, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9, 10.0, 10.1, 10.2, 10.3,
    10.4, 10.5, 10.6, 10.7, 10.8, 10.9, 11.0, 11.1, 11.2, 11.3, 11.4,
  ];

  const altitudes = [
    207.592, 208.511, 216.015, 215.191, 214.092, 214.528, 202.183, 188.608,
    190.457, 190.244, 180.994, 180.798, 186.538, 194.878, 198.726, 210.01,
    204.636, 193.053, 192.817, 185.459, 174.025, 168.023, 157.129, 155.036,
    156.677, 159.972, 168.414, 146.619, 159.173, 157.481, 147.061, 153.213,
    132.219, 150.208, 138.125, 140.508, 119.422, 110.052, 103.693, 90.433,
    95.229, 100.888, 95.496, 94.494, 100.755, 93.11, 106.822, 108.367, 101.019,
    93.621, 88.364, 84.923, 87.353, 92.228, 86.038, 100.355, 106.026, 90.953,
    85.574, 89.717, 91.796, 88.708, 94.429, 104.452, 103.031, 97.585, 98.072,
    97.964, 95.608, 95.726, 99.917, 108.959, 105.549, 101.951, 99.477, 100.354,
    100.814, 105.82, 104.46, 109.563, 101.778, 102.608, 105.524, 105.107,
    104.092, 96.361, 98.183, 106.502, 105.933, 105.905, 112.949, 114.149,
    121.654, 137.326, 126.839, 141.088, 156.259, 162.343, 156.948, 142.715,
    138.149, 127.306, 122.672, 130.437, 137.928, 147.89, 133.627, 134.549,
    138.436, 150.431, 165.08, 174.647, 188.608, 199.079, 200.908,
  ];

  const minAlt = Math.min(...altitudes).toFixed(0);
  const maxAlt = Math.max(...altitudes).toFixed(0);

  const data = {
    labels: distances.map((d) => `${d.toFixed(1)} km`),
    datasets: [
      {
        label: "Altitud",
        data: altitudes,
        borderColor: "#15803d",
        backgroundColor: "rgba(22, 163, 74, 0.2)",
        borderWidth: 3,
        tension: 0.35,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    // ── CONFIGURACIÓN CLAVE PARA QUE EL TOOLTIP SEA RÁPIDO Y FÁCIL ──
    interaction: {
      intersect: false, // No obliga a estar exactamente sobre un punto
      mode: "nearest", // Busca el punto más cercano
      axis: "x", // Solo considera la distancia horizontal (km)
      hoverRadius: 25, // Área grande de detección (en píxeles)
    },

    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        mode: "nearest",
        intersect: false,
        position: "nearest",
        caretPadding: 10,
        backgroundColor: "rgba(22, 101, 52, 0.95)",
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 13 },
        displayColors: false,
        callbacks: {
          title: (tooltipItems) => `Distancia: ${tooltipItems[0].label}`,
          label: (context) => {
            const alt = context.parsed.y;
            const idx = context.dataIndex;
            const prevAlt = idx > 0 ? context.dataset.data[idx - 1] : alt;
            const pendiente = ((alt - prevAlt) / 0.1).toFixed(1); // cada 0.1 km
            return `Altitud: ${alt.toFixed(1)} m   |   Pendiente ≈ ${pendiente} %/km`;
          },
        },
      },
    },

    scales: {
      x: {
        title: {
          display: true,
          text: "Distancia recorrida (km)",
          color: "#1f2937",
          font: { size: 14 },
        },
        grid: { color: "#e5e7eb" },
      },
      y: {
        title: {
          display: true,
          text: "Altitud sobre el nivel del mar (m)",
          color: "#1f2937",
          font: { size: 14 },
        },
        grid: { color: "#e5e7eb" },
        min: 40,
        max: 230,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-12 bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-green-800 text-center">
        Perfil altitudinal detallado
      </h3>
      <p className="text-center text-gray-600 mb-6">
        Ruta circular de 11.4 km • Desnivel +358 m / -358 m • Altitud mínima{" "}
        {minAlt} m • máxima {maxAlt} m
      </p>

      <div className="w-full bg-gray-50 rounded-lg" style={{ height: "380px" }}>
        <Line data={data} options={options} />
      </div>

      <p className="mt-4 text-center text-sm text-gray-600 italic">
        Pasa el ratón por la línea para ver altitud y pendiente aproximada
      </p>
    </div>
  );
}
