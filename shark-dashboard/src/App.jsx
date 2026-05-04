import "./App.css";
import data from "./data/summary.json";
import OceanBackground from "./components/OceanBackground";
import MetricCard from "./components/MetricCard";
import ModelTable from "./components/ModelTable";
import FeatureImportance from "./components/FeatureImportance";
import RiskHistogram from "./components/RiskHistogram";
import ActivityChart from "./components/ActivityChart";
import RiskCalculator from "./components/RiskCalculator";

export default function App() {
  const { dataset, models, featureImportance, topActivities, riskBins } = data;
  const fatalityPct = Math.round((dataset.fatal / dataset.cleaned) * 100);

  return (
    <>
      <OceanBackground />

      <div className="dashboard">

        {/* ── Hero Header ── */}
        <header className="site-header">
          <span className="shark-fin-icon">🦈</span>
          <h1>Shark Attacks</h1>
          <p className="subtitle">
            Predicting fatal shark attack outcomes using machine learning · Global Shark Attack Dataset
          </p>
          <div className="header-badges">
            <span className="header-badge">{dataset.raw.toLocaleString()} raw records</span>
            <span className="header-badge">{dataset.cleaned.toLocaleString()} after cleaning</span>
            <span className="header-badge">3 models compared</span>
            <span className="header-badge">Random Forest selected</span>
            <span className="header-badge">Live risk calculator</span>
          </div>
          <div className="team-row">
            {[
              { initial: "S", name: "Steffina Jerald", color: "#185FA5" },
              { initial: "T", name: "Tiya Bordia",     color: "#0F6E56" },
            ].map(({ initial, name, color }) => (
              <div className="team-chip" key={name}>
                <span className="team-avatar" style={{ background: color }}>{initial}</span>
                {name}
              </div>
            ))}
          </div>
        </header>

        {/* ── Dataset Overview ── */}
        <p className="section-label">Dataset overview</p>
        <div className="metrics-grid" style={{ marginBottom: "2rem" }}>
          <MetricCard
            label="Raw records"
            rawValue={dataset.raw}
            sub="original dataset rows"
          />
          <MetricCard
            label="After cleaning"
            rawValue={dataset.cleaned}
            sub="valid Y/N fatal labels + key fields present"
          />
          <MetricCard
            label="Fatal attacks"
            rawValue={dataset.fatal}
            sub={`${fatalityPct}% of cleaned dataset`}
            accent="#ff6b6b"
          />
          <MetricCard
            label="Model rows"
            rawValue={dataset.modelRows}
            sub="after dropna on all 4 features"
          />
        </div>

        <div className="glow-divider" />

        {/* ── EDA ── */}
        <p className="section-label">Exploratory analysis</p>
        <div style={{ marginBottom: "1.25rem" }}>
          <ActivityChart activities={topActivities} />
        </div>

        <div className="glow-divider" />

        {/* ── Models ── */}
        <p className="section-label">Model comparison</p>
        <div style={{ marginBottom: "1.25rem" }}>
          <ModelTable models={models} />
        </div>

        {/* ── Charts ── */}
        <div className="two-col">
          <FeatureImportance data={featureImportance} />
          <RiskHistogram bins={riskBins} />
        </div>

        <div className="glow-divider" />

        {/* ── Risk Calculator ── */}
        <p className="section-label">Interactive risk score</p>
        <RiskCalculator />

        {/* ── Key Finding ── */}
        <div className="finding-banner">
          <div>
            <strong>Key findings</strong>
            <p>
               <div className="finding-banner">
          <div>
            <p>
            The strongest predictors were activity type, shark species, and injury severity.  
            Diving and free diving were far more fatal than surfing or swimming. Highest risk scores 
            showed up in scenarios with larger species and more isolated waters. Some of these results were genuinely surprising and showed how much more nuanced the story gets when you actually look at the data instead of just going off what you see in the news.
            </p>
          </div>
        </div>

            </p>
          </div>
        </div>

      </div>
    </>
  );
}