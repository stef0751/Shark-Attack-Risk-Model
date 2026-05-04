import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function FeatureImportance({ data }) {
  // Sort descending so highest bar is on top
  const sorted = [...data].sort((a, b) => b.importance - a.importance);

  const chartData = {
    labels: sorted.map(d => d.feature),
    datasets: [{
      data: sorted.map(d => d.importance),
      backgroundColor: sorted.map(d => d.color),
      borderRadius: 4,
      borderSkipped: false,
    }],
  };

  const options = {
    indexAxis: "y",
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
          label: ctx => ` Importance score: ${ctx.parsed.x.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(0,180,255,0.06)" },
        ticks: { color: "#4a8fa8", font: { size: 11 } },
        max: 0.45,
      },
      y: {
        grid: { display: false },
        ticks: { color: "#88c4d8", font: { size: 13, weight: "500" } },
      },
    },
  };

  return (
    <div className="glass-card">
      <h2 className="section-title">
        <span className="title-glow">Feature</span> Importance
      </h2>
      <div style={{ position: "relative", height: 200 }}>
        <Bar data={chartData} options={options} />
      </div>
      <p className="card-footnote">
        Age is the strongest predictor (0.36) — victim age matters more than where or what they were doing.
        Sex is nearly irrelevant at 0.02.
      </p>
    </div>
  );
}