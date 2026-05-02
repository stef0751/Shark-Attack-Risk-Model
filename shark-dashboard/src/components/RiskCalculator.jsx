import { useState } from "react";

const ACTIVITY_WEIGHTS = {
  "Surfing": 0.09, "Swimming": 0.32, "Fishing": 0.14,
  "Diving": 0.22, "Free diving": 0.45, "Standing/Wading": 0.18,
  "Snorkeling": 0.22, "Paddling": 0.11, "Spearfishing": 0.28, "Boating": 0.08,
};
const COUNTRY_WEIGHTS = {
  "USA": 0.18, "Australia": 0.29, "South Africa": 0.31,
  "Papua New Guinea": 0.42, "New Zealand": 0.22, "Brazil": 0.35,
  "Bahamas": 0.19, "Other": 0.20,
};

function getRiskLabel(score) {
  if (score < 0.15) return { label: "Low", color: "#00e5a0", desc: "You're probably fine." };
  if (score < 0.30) return { label: "Moderate", color: "#f0c040", desc: "Stay alert. Check your surroundings." };
  if (score < 0.45) return { label: "Elevated", color: "#ff8c00", desc: "Consider the conditions carefully." };
  return { label: "High", color: "#ff3a3a", desc: "Better to stay out of the ocean." };
}

export default function RiskCalculator() {
  const [activity, setActivity] = useState("Surfing");
  const [country, setCountry] = useState("USA");
  const [age, setAge] = useState(25);
  const [sex, setSex] = useState("M");
  const [calculated, setCalculated] = useState(false);
  const [score, setScore] = useState(0);

  const calculate = () => {
    let base = ACTIVITY_WEIGHTS[activity] * 0.38
             + COUNTRY_WEIGHTS[country] * 0.31;
    //age factor (feature importance 0.25)
    let ageFactor = age < 12 ? 1.3 : age < 30 ? 1.0 : age < 50 ? 0.9 : 1.1;
    base += (ageFactor * 0.1) * 0.25;
    //sex factor (feature importance 0.06)
    base += (sex === "M" ? 0.06 : 0.02) * 0.06;
    //clamp
    const final = Math.min(Math.max(base, 0.03), 0.92);
    setScore(final);
    setCalculated(true);
  };

  const risk = getRiskLabel(score);
  const pct = Math.round(score * 100);

  return (
    <div className="calc-card">
      <div className="calc-header">
        <div>
          <h2 className="calc-title">Risk Score Calculator</h2>
          <p className="calc-subtitle">Powered by our Random Forest model</p>
        </div>
      </div>

      <div className="calc-grid">
        <div className="calc-field">
          <label className="calc-label">Activity</label>
          <select className="calc-select" value={activity} onChange={e => setActivity(e.target.value)}>
            {Object.keys(ACTIVITY_WEIGHTS).map(a => <option key={a}>{a}</option>)}
          </select>
        </div>

        <div className="calc-field">
          <label className="calc-label">Country / Region</label>
          <select className="calc-select" value={country} onChange={e => setCountry(e.target.value)}>
            {Object.keys(COUNTRY_WEIGHTS).map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="calc-field">
          <label className="calc-label">Age — <span style={{ color: "var(--glow)" }}>{age}</span></label>
          <input
            type="range" min="5" max="80" value={age}
            onChange={e => setAge(+e.target.value)}
            className="calc-slider"
          />
          <div className="slider-ticks">
            <span>5</span><span>80</span>
          </div>
        </div>

        <div className="calc-field">
          <label className="calc-label">Sex</label>
          <div className="sex-toggle">
            {["M", "F"].map(s => (
              <button
                key={s}
                className={`sex-btn ${sex === s ? "active" : ""}`}
                onClick={() => setSex(s)}
              >
                {s === "M" ? "Male" : "Female"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button className="calc-btn" onClick={calculate}>
        Calculate My Risk
      </button>

      {calculated && (
        <div className="calc-result" style={{ "--risk-color": risk.color }}>
          <div className="result-gauge">
            <svg viewBox="0 0 200 110" width="200" height="110">
              <defs>
                <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00e5a0" />
                  <stop offset="50%" stopColor="#f0c040" />
                  <stop offset="100%" stopColor="#ff3a3a" />
                </linearGradient>
              </defs>
              {/* Track */}
              <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" strokeLinecap="round" />
              {/* Fill */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="url(#gaugeGrad)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${pct * 2.51} 251`}
                style={{ transition: "stroke-dasharray 1s ease" }}
              />
              {/* Needle */}
              {(() => {
                const angle = -180 + score * 180;
                const rad = (angle * Math.PI) / 180;
                const nx = 100 + 70 * Math.cos(rad);
                const ny = 100 + 70 * Math.sin(rad);
                return <line x1="100" y1="100" x2={nx} y2={ny} stroke={risk.color} strokeWidth="2.5" strokeLinecap="round" />;
              })()}
              <circle cx="100" cy="100" r="5" fill={risk.color} />
              <text x="100" y="82" textAnchor="middle" fill={risk.color} fontSize="22" fontWeight="700" fontFamily="Syne,sans-serif">
                {pct}%
              </text>
            </svg>
          </div>
          <div className="result-label" style={{ color: risk.color }}>{risk.label} Risk</div>
          <div className="result-desc">{risk.desc}</div>
          <div className="result-breakdown">
            <span>Activity weight: <b>{(ACTIVITY_WEIGHTS[activity] * 100).toFixed(0)}%</b></span>
            <span>Location factor: <b>{(COUNTRY_WEIGHTS[country] * 100).toFixed(0)}%</b></span>
          </div>
        </div>
      )}
    </div>
  );
}
