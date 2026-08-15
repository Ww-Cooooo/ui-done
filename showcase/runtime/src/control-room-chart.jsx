import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip
} from "chart.js";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip
);

const rows = [
  ["08:00", 19, 16],
  ["09:00", 28, 25],
  ["10:00", 34, 31],
  ["11:00", 30, 24],
  ["12:00", 22, 18]
];

function chartMarkup() {
  return `
    <div class="throughput-chart">
      <div class="chart-copy">
        <div>
          <h3 id="throughput-title">Yard throughput</h3>
          <p>Planned and loaded pallets by hour</p>
        </div>
        <p class="chart-summary" id="throughput-summary">The sample shift peaks at 10:00 with 34 pallets planned and 31 loaded.</p>
      </div>
      <div class="chart-canvas-wrap">
        <canvas role="img" aria-labelledby="throughput-title throughput-summary"></canvas>
      </div>
      <table class="visually-hidden">
        <caption>Yard throughput sample data</caption>
        <thead><tr><th>Time</th><th>Planned pallets</th><th>Loaded pallets</th></tr></thead>
        <tbody>${rows.map(row => `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td></tr>`).join("")}</tbody>
      </table>
    </div>`;
}

function boot() {
  const root = document.querySelector("[data-ui-chart]");
  if (!root) return;

  root.innerHTML = chartMarkup();
  const canvas = root.querySelector("canvas");
  const styles = getComputedStyle(document.documentElement);
  const ink = styles.getPropertyValue("--ink").trim() || "#181c1f";
  const accent = styles.getPropertyValue("--accent").trim() || "#b84e25";
  const line = styles.getPropertyValue("--line").trim() || "#c8ccc6";
  const ready = styles.getPropertyValue("--ready").trim() || "#286148";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const chart = new Chart(canvas, {
    type: "bar",
    data: {
      labels: rows.map(row => row[0]),
      datasets: [
        {
          type: "bar",
          label: "Planned pallets",
          data: rows.map(row => row[1]),
          backgroundColor: `${accent}33`,
          borderColor: accent,
          borderWidth: 1,
          borderRadius: 0
        },
        {
          type: "line",
          label: "Loaded pallets",
          data: rows.map(row => row[2]),
          borderColor: ready,
          backgroundColor: ready,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 6,
          tension: 0.24
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: reducedMotion ? false : { duration: 420, easing: "easeOutQuart" },
      interaction: { intersect: false, mode: "index" },
      scales: {
        x: {
          grid: { display: false },
          border: { color: line },
          ticks: { color: ink, font: { family: "Red Hat Mono", size: 11 } }
        },
        y: {
          beginAtZero: true,
          suggestedMax: 40,
          grid: { color: `${line}99` },
          border: { display: false },
          ticks: { color: ink, stepSize: 10, font: { family: "Red Hat Mono", size: 11 } },
          title: { display: true, text: "Pallets per hour", color: ink, font: { family: "Outfit", size: 12, weight: "600" } }
        }
      },
      plugins: {
        legend: {
          position: "top",
          align: "start",
          labels: { color: ink, boxWidth: 14, boxHeight: 8, font: { family: "Outfit", size: 12 } }
        },
        tooltip: {
          backgroundColor: ink,
          titleFont: { family: "Red Hat Mono" },
          bodyFont: { family: "Outfit" },
          padding: 10,
          cornerRadius: 2
        }
      }
    }
  });

  window.addEventListener("pagehide", () => chart.destroy(), { once: true });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
else boot();
