import AnimatedCounter from "./AnimatedCounter";

export default function MetricCard({ label, value, rawValue, sub, accent, prefix = "", suffix = "" }) {
  return (
    <div className="metric-card">
      <span className="metric-label">{label}</span>
      <span className="metric-value" style={{ color: accent || "var(--glow)" }}>
        {rawValue != null
          ? <AnimatedCounter target={rawValue} prefix={prefix} suffix={suffix} />
          : value}
      </span>
      {sub && <span className="metric-sub">{sub}</span>}
    </div>
  );
}