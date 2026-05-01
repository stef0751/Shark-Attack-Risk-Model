import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const LEVEL_COLORS = {
  low:    "#1D9E75",
  medium: "#EF9F27",
  high:   "#E24B4A",
};

export default function RiskHistogram({ bins }) {
  const chartData = {
    labels: bins.map((b) => b.range),
    datasets: [
      {
        data: bins.map((b) => b.count),
        backgroundColor: bins.map((b) => LEVEL_COLORS[b.level]),
        borderRadius: 3,
        borderSkipped: false,
        barPercentage: 0.9,
        categoryPercentage: 0.95,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { callbacks: {
      label: (ctx) => ` ${ctx.parsed.y} cases`
    }}},
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#888", font: { size: 10 }, maxRotation: 45 },
      },
      y: {
        grid: { color: "rgba(0,0,0,0.06)" },
        ticks: { color: "#888", font: { size: 11 } },
        title: { display: true, text: "Cases", color: "#aaa", font: { size: 11 } },
      },
    },
  };

  return (
    <div className="card">
      <h2 className="card-title">Risk Score Distribution (test set)</h2>
      <div style={{ position: "relative", height: "200px" }}>
        <Bar data={chartData} options={options} />
      </div>
      <div className="risk-legend">
        {Object.entries(LEVEL_COLORS).map(([level, color]) => (
          <span key={level} className="risk-legend-item">
            <span className="risk-dot" style={{ background: color }} />
            {level.charAt(0).toUpperCase() + level.slice(1)} risk
          </span>
        ))}
      </div>
    </div>
  );
}