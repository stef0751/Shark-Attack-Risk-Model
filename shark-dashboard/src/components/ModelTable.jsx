export default function ModelTable({ models }) {
  return (
    <div className="glass-card">
      <h2 className="section-title">
        <span className="title-glow">Model</span> Comparison
      </h2>
      <div style={{ overflowX: "auto" }}>
        <table className="model-table">
          <thead>
            <tr>
              <th>Model</th>
              <th>Accuracy</th>
              <th style={{ width: 90 }}></th>
              <th>F1 — fatal class</th>
              <th style={{ width: 90 }}></th>
              <th>Precision</th>
              <th>Recall</th>
              <th>Verdict</th>
            </tr>
          </thead>
          <tbody>
            {models.map((m) => (
              <tr key={m.name} className={m.selected ? "selected-row" : ""}>
                <td>
                  <span style={{
                    fontWeight: m.selected ? "600" : "400",
                    color: m.selected ? "var(--glow)" : "var(--text-dim)",
                  }}>
                    {m.name}
                  </span>
                  {m.selected && <span className="badge-winner">✦ selected</span>}
                </td>
                <td style={{ fontWeight: "600", color: "#cce8ff" }}>
                  {(m.accuracy * 100).toFixed(1)}%
                </td>
                <td>
                  <div className="bar-track">
                    <div className="bar-fill" style={{
                      width: `${m.accuracy * 100}%`,
                      background: m.selected ? "var(--glow)" : "#1a4a6a",
                    }} />
                  </div>
                </td>
                <td style={{
                  fontWeight: "600",
                  color: m.f1 === 0 ? "#ff4444" : m.selected ? "#00e5a0" : "#f0c040",
                }}>
                  {m.f1.toFixed(3)}
                </td>
                <td>
                  <div className="bar-track">
                    <div className="bar-fill" style={{
                      width: `${m.f1 * 100}%`,
                      background: m.f1 === 0 ? "#ff4444" : m.selected ? "#00e5a0" : "#f0c040",
                    }} />
                  </div>
                </td>
                <td style={{ color: "var(--text-dim)", fontSize: 12 }}>
                  {m.precision === 0 ? "—" : (m.precision * 100).toFixed(0) + "%"}
                </td>
                <td style={{ color: "var(--text-dim)", fontSize: 12 }}>
                  {m.recall === 0 ? "—" : (m.recall * 100).toFixed(0) + "%"}
                </td>
                <td style={{ fontSize: 11, color: "var(--text-dim)", maxWidth: 180 }}>
                  {m.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="card-footnote">
        Logistic Regression hit 80.4% accuracy by predicting "non-fatal" every time — useless for the minority class.
        Random Forest was chosen for its balance of accuracy and fatal-class detection.
      </p>
    </div>
  );
}