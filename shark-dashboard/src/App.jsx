import "./App.css";
import data from "./data/summary.json";
import MetricCard from "./components/MetricCard";
import ModelTable from "./components/ModelTable";
import FeatureImportance from "./components/FeatureImportance";
import RiskHistogram from "./components/RiskHistogram";
import ActivityChart from "./components/ActivityChart";

export default function App() {
  const { dataset, models, featureImportance, topActivities, riskBins } = data;
  const fatalityPct = ((dataset.fatal / dataset.cleaned) * 100).toFixed(0);

  return (
    <div className="dashboard">

      {/* ── Header ── */}
      <header className="header">
        <div>
          <h1>Global Shark Attack Analysis</h1>
          <p>Predictive modeling of fatal shark attack outcomes · Data Management Project</p>
          <div className="header-badges">
            <span className="header-badge">{dataset.cleaned.toLocaleString()} cleaned records</span>
            <span className="header-badge">3 models compared</span>
            <span className="header-badge">Random Forest selected</span>
            <span className="header-badge">Risk score output</span>
          </div>
        </div>
        <div className="team-chips">
          <div className="team-chip">
            <span className="team-avatar" style={{ background: "#185FA5" }}>S</span>
            Steffina Jerald
          </div>
          <div className="team-chip">
            <span className="team-avatar" style={{ background: "#0F6E56" }}>T</span>
            Tiya Bordia
          </div>
        </div>
      </header>

      {/* ── Dataset Overview ── */}
      <p className="section-label">Dataset overview</p>
      <div className="metrics-grid">
        <MetricCard
          label="Raw records"
          value={dataset.raw.toLocaleString()}
          sub="original dataset rows"
        />
        <MetricCard
          label="After cleaning"
          value={dataset.cleaned.toLocaleString()}
          sub="valid Y/N fatal labels"
        />
        <MetricCard
          label="Fatality rate"
          value={fatalityPct + "%"}
          sub={`${dataset.fatal.toLocaleString()} fatal / ${dataset.nonfatal.toLocaleString()} non-fatal`}
          accent="#BA7517"
        />
        <MetricCard
          label="Model training rows"
          value={dataset.modelRows.toLocaleString()}
          sub="after feature dropna"
        />
      </div>

      {/* ── EDA ── */}
      <p className="section-label">Exploratory analysis</p>
      <div style={{ marginBottom: "1.25rem" }}>
        <ActivityChart activities={topActivities} />
      </div>

      {/* ── Models ── */}
      <p className="section-label">Model comparison</p>
      <div style={{ marginBottom: "1.25rem" }}>
        <ModelTable models={models} />
      </div>

      {/* ── Charts row ── */}
      <div className="two-col">
        <FeatureImportance data={featureImportance} />
        <RiskHistogram bins={riskBins} />
      </div>

      {/* ── Key finding ── */}
      <div className="finding-banner">
        <span className="icon">🦈</span>
        <div>
          <strong>Key finding</strong>
          <p>
            Logistic Regression achieved the highest raw accuracy (80.4%) but completely failed to
            detect fatal attacks (F1 = 0.00), making it unsuitable for this task. Random Forest was
            selected as the final model because it successfully identifies fatal cases and produces
            probability estimates that power the risk score — the central deliverable of this project.
          </p>
        </div>
      </div>

    </div>
  );
}