import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function ActivityChart({ activities }) {
  const sorted = [...activities].sort((a, b) => b.count - a.count);

  const chartData = {
    labels: sorted.map(a => a.name),
    datasets: [
      {
        label: "Attack Count",
        data: sorted.map(a => a.count),
        backgroundColor: "rgba(0,180,255,0.7)",
        borderRadius: 3,
        borderSkipped: false,
        yAxisID: "y",
      },
      {
        label: "Fatal Rate %",
        data: sorted.map(a => +(a.fatalRate * 100).toFixed(1)),
        backgroundColor: "rgba(255,60,60,0.8)",
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
      tooltip: {
        backgroundColor: "rgba(0,10,20,0.95)",
        borderColor: "rgba(0,220,255,0.3)",
        borderWidth: 1,
        titleColor: "#00e5ff",
        bodyColor: "#aaccdd",
        callbacks: {
          label: ctx => ctx.datasetIndex === 0
            ? ` ${ctx.parsed.y} attacks`
            : ` ${ctx.parsed.y}% fatal rate`,
        },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#4a8fa8", font: { size: 10 }, maxRotation: 25 } },
      y: {
        position: "left",
        grid: { color: "rgba(0,180,255,0.06)" },
        ticks: { color: "#4a8fa8", font: { size: 10 } },
        title: { display: true, text: "Attack count", color: "#336688", font: { size: 10 } },
      },
      y1: {
        position: "right",
        grid: { display: false },
        ticks: { color: "#aa4444", font: { size: 10 }, callback: v => v + "%" },
        title: { display: true, text: "Fatal rate", color: "#aa4444", font: { size: 10 } },
        max: 60,
      },
    },
  };

  return (
    <div className="glass-card">
      <h2 className="section-title"><span className="title-glow">Activity</span> Breakdown</h2>
      <div className="chart-legend">
        <span className="legend-item"><span className="legend-dot" style={{ background: "rgba(0,180,255,0.8)", boxShadow: "0 0 6px #00b4ff" }} />Attack count</span>
        <span className="legend-item"><span className="legend-dot" style={{ background: "rgba(255,60,60,0.8)", boxShadow: "0 0 6px #ff3c3c" }} />Fatal rate %</span>
      </div>
      <div style={{ position: "relative", height: 240 }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
