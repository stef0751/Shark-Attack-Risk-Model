export default function ModelTable({ models }) {
  return (
    <div className="card">
      <h2 className="card-title">Model Comparison</h2>
      <div style={{ overflowX: "auto" }}>
        <table className="model-table">
          <thead>
            <tr>
              <th>Model</th>
              <th>Accuracy</th>
              <th></th>
              <th>F1 Score (fatal)</th>
              <th></th>
              <th>Precision</th>
              <th>Recall</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {models.map((m) => (
              <tr key={m.name} className={m.selected ? "selected-row" : ""}>
                <td>
                  <span style={{ fontWeight: m.selected ? "600" : "400" }}>{m.name}</span>
                  {m.selected && <span className="badge-selected">selected</span>}
                </td>

                <td style={{ fontWeight: "500" }}>{(m.accuracy * 100).toFixed(1)}%</td>
                <td style={{ width: "80px" }}>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${m.accuracy * 100}%`,
                        background: m.selected ? "#1D9E75" : "#B5D4F4",
                      }}
                    />
                  </div>
                </td>

                <td
                  style={{
                    fontWeight: "500",
                    color: m.f1 === 0 ? "#A32D2D" : m.selected ? "#1D9E75" : "#BA7517",
                  }}
                >
                  {m.f1.toFixed(3)}
                </td>
                <td style={{ width: "80px" }}>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${m.f1 * 100}%`,
                        background: m.f1 === 0 ? "#E24B4A" : m.selected ? "#1D9E75" : "#EF9F27",
                      }}
                    />
                  </div>
                </td>

                <td style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                  {m.precision === 0 ? "—" : (m.precision * 100).toFixed(0) + "%"}
                </td>
                <td style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                  {m.recall === 0 ? "—" : (m.recall * 100).toFixed(0) + "%"}
                </td>
                <td style={{ fontSize: "11px", color: "var(--text-muted)", maxWidth: "200px" }}>
                  {m.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}