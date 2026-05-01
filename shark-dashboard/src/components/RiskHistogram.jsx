import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const LEVEL_COLORS = { low: "#00e5a0", medium: "#f0c040", high: "#ff4444" };

export default function RiskHistogram({ bins }) {
  const chartData = {
    labels: bins.map(b => b.range),
    datasets: [{
      data: bins.map(b => b.count),
      backgroundColor: bins.map(b => LEVEL_COLORS[b.level]),
      borderRadius: 3,
      borderSkipped: false,
      barPercentage: 0.9,
      categoryPercentage: 0.95,
    }],
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
        callbacks: { label: ctx => ` ${ctx.parsed.y} cases in test set` },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#4a8fa8", font: { size: 10 }, maxRotation: 45 } },
      y: {
        grid: { color: "rgba(0,180,255,0.06)" },
        ticks: { color: "#4a8fa8", font: { size: 11 } },
      },
    },
  };

  return (
    <div className="glass-card">
      <h2 className="section-title"><span className="title-glow">Risk Score</span> Distribution</h2>
      <div style={{ position: "relative", height: 200 }}>
        <Bar data={chartData} options={options} />
      </div>
      <div className="risk-legend">
        {Object.entries(LEVEL_COLORS).map(([level, color]) => (
          <span key={level} className="risk-legend-item">
            <span className="risk-dot" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
            {level.charAt(0).toUpperCase() + level.slice(1)} risk
          </span>
        ))}
      </div>
    </div>
  );
}
