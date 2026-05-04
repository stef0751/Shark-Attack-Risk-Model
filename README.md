# Shark Attack Risk Model

**Steffina Jerald & Tiya Bordia** — CS 210: Data Management | Professor Guna

---

## What is this?

Both of us joined the RU Surfing Club this year and started spending a lot more 
time at the ocean. That naturally got us curious about shark attack safety — not 
in a panicked way, but in a "what does the data actually say" kind of way. Most 
of what you see in the news focuses on how many attacks happen or where. We 
wanted to ask a different question:

**What actually makes a shark attack fatal?**

We took a real, messy, historical dataset of thousands of shark attack incidents 
from around the world and tried to answer that. We built classification models, 
compared their results, figured out which features actually matter, and turned 
everything into a risk score and an interactive dashboard.

---

## What we actually did

- Cleaned and standardized a dataset that was honestly a mess — 
  inconsistent spellings, missing values, ages written as text, 
  you name it
- Did exploratory analysis to understand distributions across activity 
  type, country, age, and gender before touching any models
- Trained and compared three classifiers: Logistic Regression, 
  Decision Tree, and Random Forest
- Evaluated using F1 score, precision, and recall — not just accuracy, 
  because accuracy alone was misleading here 
- Built a risk score using Random Forest predicted probabilities
- Built an interactive React dashboard to visualize everything

---

## The models

| Model | Accuracy | F1 (Fatal) | Recall |
|---|---|---|---|
| Logistic Regression | 80.4% | 0.000 | 0.00 |
| Decision Tree | 73.9% | 0.379 | 0.41 |
| Random Forest | 77.7% | 0.323 | 0.27 |

The accuracy thing is worth explaining. Logistic Regression got 80.4% 
accuracy but predicted literally zero fatal cases. That happens because 
76% of the dataset is non-fatal — if you just predict "non-fatal" every 
single time, you still get 76% accuracy. That's why we used F1 score as 
our main metric instead.

---

## What we found

- **Age was the strongest predictor** (35.6% feature importance) — 
  we expected activity to come first, so this was a genuine surprise
- **Activity type matters a lot** — free diving had a ~45% fatal rate 
  vs surfing at ~9%
- **Location played a bigger role than sex** — sex barely mattered at all
- The risk score surfaces scenarios that are genuinely more dangerous, 
  like older victims in isolated deep water vs surfers near a crowded beach

---

## Running the analysis

### Requirements
Make sure you have Python 3 installed. Then install the required libraries by running:

```bash
pip install pandas numpy matplotlib seaborn scikit-learn
```

### Steps
1. Download or clone this repository
2. Place the `attacks.csv` file in the same folder as `analysis.ipynb`
3. Open the notebook:
```bash
jupyter notebook analysis.ipynb
```
4. Run all cells in order from top to bottom using **Cell → Run All** 
   or by pressing **Shift + Enter** on each cell individually

### What to expect
- The notebook will print dataset shape and class distributions at 
  each major step so you can follow along
- Five EDA plots will appear inline as the cells run
- Model results including accuracy, F1 score, and full classification 
  reports will print for all three classifiers
- A feature importance chart and risk score distribution histogram 
  will appear at the end

> **Note:** The `attacks.csv` file must be in the same directory as 
> the notebook or the first cell will throw a FileNotFoundError.

## Running the dashboard

```bash
cd shark-dashboard
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## Stack

- **Analysis** — Python, pandas, scikit-learn, matplotlib, seaborn
- **Dashboard** — React, Vite, Chart.js, react-chartjs-2

---

## Honest limitations

- Species and time of day had too many missing values to use reliably
- We used label encoding instead of one-hot encoding for categories
- The dataset has reporting bias toward more dramatic incidents
- Class imbalance (76/24 split) made it hard for models to learn 
  fatal cases well — SMOTE or class weighting could help here