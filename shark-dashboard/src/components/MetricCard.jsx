export default function MetricCard({ label, value, sub, accent }) {
  return (
    <div className="metric-card">
      <span className="metric-label">{label}</span>
      <span className="metric-value" style={{ color: accent || "var(--text-primary)" }}>
        {value}
      </span>
      {sub && <span className="metric-sub">{sub}</span>}
    </div>
  );
}