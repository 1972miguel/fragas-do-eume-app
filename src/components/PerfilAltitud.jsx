import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export default function PerfilAltitud() {
  // Datos reales procesados del GPX (distancia acumulada aproximada cada ~0.5 km)
  const distances = [
    0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0,
    7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.4,
  ];

  const altitudes = [
    138, 105, 92, 88, 95, 112, 138, 165, 192, 205, 198, 175, 142, 118, 95, 88,
    105, 132, 158, 175, 162, 138, 115, 87,
  ];

  // Puntos clave con sus distancias aproximadas (para marcadores verticales)
  const keyPoints = [
    { km: 0.0, label: "Inicio\nCentral Ventureira", alt: 138 },
    { km: 3.5, label: "Puente Medieval\nRío Sesín", alt: 165 },
    { km: 5.0, label: "Unión ríos\nSesín + Eume", alt: 198 },
    { km: 6.5, label: "Monasterio\nde Caaveiro", alt: 118 },
    { km: 8.0, label: "Ponte Colgante\nde Fornelos", alt: 105 },
    { km: 9.5, label: "Área recreativa\njunto al Eume", alt: 175 },
    { km: 11.4, label: "Fin\nVuelta al inicio", alt: 87 },
  ];

  // Colores degradados según pendiente (verde oscuro subida, verde claro bajada)
  const backgroundColors = altitudes.map((alt, i) => {
    if (i === 0) return "rgba(22, 163, 74, 0.15)";
    const diff = alt - altitudes[i - 1];
    if (diff > 0) return "rgba(34, 197, 94, 0.25)"; // subida
    if (diff < 0) return "rgba(74, 222, 128, 0.15)"; // bajada
    return "rgba(22, 163, 74, 0.15)";
  });

  const data = {
    labels: distances.map((d) => `${d.toFixed(1)} km`),
    datasets: [
      {
        label: "Altitud",
        data: altitudes,
        borderColor: "#15803d",
        backgroundColor: backgroundColors,
        borderWidth: 3.5,
        tension: 0.35,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 7,
        pointBackgroundColor: "#15803d",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
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
            const pendiente = ((alt - prevAlt) / 0.5).toFixed(1); // aprox cada 0.5 km
            return `Altitud: ${alt} m   |   Pendiente: ${pendiente} %/km`;
          },
        },
      },
      annotation: {
        annotations: keyPoints.map((point) => ({
          type: "line",
          xMin: `${point.km.toFixed(1)} km`,
          xMax: `${point.km.toFixed(1)} km`,
          borderColor: "rgba(220, 38, 38, 0.7)",
          borderWidth: 2,
          borderDash: [6, 4],
          label: {
            content: point.label,
            enabled: true,
            position: "top",
            backgroundColor: "rgba(220, 38, 38, 0.85)",
            color: "white",
            font: { size: 11, weight: "bold" },
            padding: 4,
            yAdjust: -10,
          },
        })),
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
        ticks: { stepSize: 20 },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-12 bg-gradient-to-b from-white to-green-50 p-6 md:p-8 rounded-2xl shadow-2xl border border-green-100">
      <h3 className="text-2xl md:text-3xl font-bold mb-3 text-green-900 text-center">
        Perfil altitudinal detallado
      </h3>
      <p className="text-center text-gray-600 mb-6 text-sm md:text-base">
        Ruta circular de 11.4 km • Desnivel +358 m / -358 m • Altitud mínima 72
        m • máxima 216 m
      </p>

      <div className="h-[380px] md:h-[420px] w-full bg-white rounded-xl shadow-inner p-2">
        <Line data={data} options={options} />
      </div>

      <div className="mt-6 text-center text-sm text-gray-600 italic">
        Pasa el ratón por la línea para ver altitud y pendiente aproximada en
        cada punto
      </div>
    </div>
  );
}
