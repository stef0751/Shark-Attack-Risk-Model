import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function ActivityChart({ activities }) {
  const sorted = [...activities].sort((a, b) => b.count - a.count);

  const chartData = {
    labels: sorted.map((a) => a.name),
    datasets: [
      {
        label: "Attack Count",
        data: sorted.map((a) => a.count),
        backgroundColor: "#378ADD",
        borderRadius: 3,
        borderSkipped: false,
        yAxisID: "y",
      },
      {
        label: "Fatal Rate %",
        data: sorted.map((a) => +(a.fatalRate * 100).toFixed(1)),
        backgroundColor: "#E24B4A",
        borderRadius: 3,
        borderSkipped: false,
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: {
        label: (ctx) =>
          ctx.datasetIndex === 0
            ? ` ${ctx.parsed.y} attacks`
            : ` ${ctx.parsed.y}% fatal rate`,
      }},
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#888", font: { size: 10 }, maxRotation: 30 } },
      y: {
        position: "left",
        grid: { color: "rgba(0,0,0,0.06)" },
        ticks: { color: "#888", font: { size: 10 } },
        title: { display: true, text: "Attack count", color: "#aaa", font: { size: 10 } },
      },
      y1: {
        position: "right",
        grid: { display: false },
        ticks: { color: "#E24B4A", font: { size: 10 }, callback: (v) => v + "%" },
        title: { display: true, text: "Fatal rate", color: "#E24B4A", font: { size: 10 } },
        max: 60,
      },
    },
  };

  return (
    <div className="card">
      <h2 className="card-title">Activity — Attack Count vs Fatal Rate</h2>
      <div className="chart-legend">
        <span className="legend-item"><span className="legend-dot" style={{ background: "#378ADD" }} />Attack count</span>
        <span className="legend-item"><span className="legend-dot" style={{ background: "#E24B4A" }} />Fatal rate %</span>
      </div>
      <div style={{ position: "relative", height: "220px" }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}