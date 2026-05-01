import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function FeatureImportance({ data }) {
  const chartData = {
    labels: data.map((d) => d.feature),
    datasets: [
      {
        data: data.map((d) => d.importance),
        backgroundColor: data.map((d) => d.color),
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { callbacks: {
      label: (ctx) => ` Importance: ${ctx.parsed.x.toFixed(2)}`
    }}},
    scales: {
      x: {
        grid: { color: "rgba(0,0,0,0.06)" },
        ticks: { color: "#888", font: { size: 11 } },
        max: 0.5,
      },
      y: {
        grid: { display: false },
        ticks: { color: "#555", font: { size: 13, weight: "500" } },
      },
    },
  };

  return (
    <div className="card">
      <h2 className="card-title">Feature Importance — Random Forest</h2>
      <div style={{ position: "relative", height: "200px" }}>
        <Bar data={chartData} options={options} />
      </div>
      <p className="card-footnote">
        Activity type is the strongest predictor of fatality. Geographic location and victim age follow closely.
      </p>
    </div>
  );
}