/* =========================================================
   Smart Agriculture – Digital Farming  |  script.js
   ========================================================= */

/* ---------- DATA ---------- */
// npk = recommended kg per hectare (N, P2O5, K2O) – general guideline values
const crops = [
  { name: "Rice", emoji: "🌾", season: "Kharif", soil: "Alluvial / Clayey loam", water: "High (1200–1500 mm)", duration: "110–150 days", temp: "20–35 °C", ph: "5.5–6.5", npk: [120, 60, 60], note: "Grown in flooded fields; transplant 21-day-old seedlings." },
  { name: "Wheat", emoji: "🌿", season: "Rabi", soil: "Loamy / Alluvial", water: "Medium (450–650 mm)", duration: "120–150 days", temp: "10–25 °C", ph: "6.0–7.5", npk: [120, 60, 40], note: "Needs cool weather for growth and warm weather at ripening." },
  { name: "Maize", emoji: "🌽", season: "Kharif", soil: "Well-drained loamy", water: "Medium (500–800 mm)", duration: "90–120 days", temp: "21–30 °C", ph: "5.8–7.0", npk: [120, 60, 40], note: "Avoid waterlogging; sensitive to frost." },
  { name: "Cotton", emoji: "☁️", season: "Kharif", soil: "Black (Regur)", water: "Medium (700–1300 mm)", duration: "150–180 days", temp: "21–35 °C", ph: "6.0–8.0", npk: [100, 50, 50], note: "Needs a long frost-free period and plenty of sunshine." },
  { name: "Sugarcane", emoji: "🎋", season: "Zaid", soil: "Deep loamy / Alluvial", water: "Very high (1500–2500 mm)", duration: "10–18 months", temp: "20–35 °C", ph: "6.5–7.5", npk: [250, 100, 100], note: "Perennial grass; ratoon crop possible for 2–3 cycles." },
  { name: "Tomato", emoji: "🍅", season: "Rabi", soil: "Sandy loam / Red", water: "Medium (600–800 mm)", duration: "90–140 days", temp: "18–27 °C", ph: "6.0–7.0", npk: [120, 60, 60], note: "Stake plants and use drip irrigation for best quality." },
  { name: "Potato", emoji: "🥔", season: "Rabi", soil: "Sandy loam", water: "Medium (500–700 mm)", duration: "75–120 days", temp: "15–20 °C", ph: "5.0–6.5", npk: [150, 60, 100], note: "Earth up soil around plants to protect tubers from sunlight." },
  { name: "Groundnut", emoji: "🥜", season: "Kharif", soil: "Red / Sandy loam", water: "Low–Medium (500–700 mm)", duration: "100–130 days", temp: "22–30 °C", ph: "6.0–7.0", npk: [25, 50, 75], note: "Fixes its own nitrogen; gypsum at flowering boosts pods." },
  { name: "Ragi (Finger Millet)", emoji: "🌱", season: "Kharif", soil: "Red loamy", water: "Low (400–500 mm)", duration: "100–120 days", temp: "20–30 °C", ph: "5.0–8.2", npk: [50, 40, 25], note: "Drought tolerant and highly nutritious – ideal for dry regions." },
  { name: "Watermelon", emoji: "🍉", season: "Zaid", soil: "Sandy / Sandy loam", water: "Low–Medium", duration: "80–110 days", temp: "24–30 °C", ph: "6.0–7.0", npk: [80, 40, 40], note: "Needs hot weather; stop watering a week before harvest for sweeter fruit." }
];

const irrigation = [
  { name: "Drip", icon: "💧", desc: "Water is delivered drop by drop directly to the root zone through pipes and emitters.", pros: ["Saves 40–60% water", "Reduces weeds and disease", "Allows fertigation (fertilizer with water)"], eff: "90–95%", best: "Vegetables, fruits, sugarcane, cotton" },
  { name: "Sprinkler", icon: "🚿", desc: "Water is sprayed in the air like rainfall using pumps, pipes and rotating nozzles.", pros: ["Good for uneven land", "Saves 30–50% water", "Even coverage"], eff: "70–80%", best: "Wheat, pulses, groundnut, lawns" },
  { name: "Surface (Flood)", icon: "🌊", desc: "Water flows over the field by gravity. Includes basin, border and furrow methods.", pros: ["Low cost to set up", "No energy needed", "Simple to operate"], eff: "40–60%", best: "Rice, wheat on level land" },
  { name: "Furrow", icon: "〰️", desc: "Water runs through small channels between crop rows, wetting only part of the field.", pros: ["Less water than flooding", "Suits row crops", "Easy to manage"], eff: "60–70%", best: "Maize, sugarcane, potato, cotton" },
  { name: "Sub-surface", icon: "⬇️", desc: "Buried pipes release water directly below the soil surface at root level.", pros: ["Very low evaporation", "Works for years", "Leaves surface dry for field work"], eff: "90–95%", best: "High-value and orchard crops" },
  { name: "Rainwater Harvesting", icon: "🌧️", desc: "Rain is collected in farm ponds, check dams or tanks and used during dry spells.", pros: ["Cuts groundwater use", "Protects against drought", "Low running cost"], eff: "Varies", best: "Rain-fed and dry-land farms" }
];

const weatherData = {
  "Bengaluru": { temp: 27, hum: 68, wind: 12, rain: 40, cond: "⛅ Partly cloudy" },
  "Mysuru": { temp: 29, hum: 60, wind: 10, rain: 25, cond: "☀️ Sunny" },
  "Punjab (Ludhiana)": { temp: 22, hum: 55, wind: 8, rain: 10, cond: "🌤️ Mostly clear" },
  "Mumbai": { temp: 31, hum: 78, wind: 15, rain: 55, cond: "🌦️ Light showers" },
  "Chennai": { temp: 32, hum: 74, wind: 14, rain: 60, cond: "🌧️ Rain expected" }
};

const tips = [
  "Test your soil every 2–3 years to know exactly what nutrients it needs.",
  "Rotate crops – follow cereals with pulses to restore soil nitrogen.",
  "Water in the early morning or evening to reduce evaporation.",
  "Mulching keeps soil cool, saves water and stops weeds.",
  "Use neem-based sprays as a safe first step against many pests.",
  "Treat seeds before sowing to prevent seed-borne diseases.",
  "Plant border crops like marigold to attract beneficial insects.",
  "Make compost from crop residue instead of burning it.",
  "Check weather forecasts before spraying or irrigating.",
  "Keep records of expenses and yields – it helps you earn more next season.",
  "Grow cover crops in the off-season to protect soil from erosion.",
  "Space plants correctly – overcrowding invites disease and reduces yield."
];

const gallery = [
  { title: "Golden Wheat Field", emoji: "🌾", cat: "crops", bg: "linear-gradient(135deg,#f59e0b,#b45309)", text: "Wheat ready for harvest in the Rabi season." },
  { title: "Paddy Fields", emoji: "🌱", cat: "crops", bg: "linear-gradient(135deg,#22c55e,#166534)", text: "Rice seedlings growing in flooded paddies." },
  { title: "Tomato Harvest", emoji: "🍅", cat: "crops", bg: "linear-gradient(135deg,#ef4444,#991b1b)", text: "Ripe tomatoes grown with staking and drip irrigation." },
  { title: "Maize Cobs", emoji: "🌽", cat: "crops", bg: "linear-gradient(135deg,#facc15,#a16207)", text: "Maize is a major Kharif cereal and fodder crop." },
  { title: "Drip Irrigation", emoji: "💧", cat: "water", bg: "linear-gradient(135deg,#38bdf8,#0369a1)", text: "Drip lines deliver water straight to plant roots." },
  { title: "Sprinkler System", emoji: "🚿", cat: "water", bg: "linear-gradient(135deg,#60a5fa,#1d4ed8)", text: "Sprinklers imitate rainfall over the crop." },
  { title: "Farm Pond", emoji: "🌧️", cat: "water", bg: "linear-gradient(135deg,#2dd4bf,#115e59)", text: "Rainwater stored in farm ponds for dry spells." },
  { title: "Drone Spraying", emoji: "🚁", cat: "tech", bg: "linear-gradient(135deg,#a78bfa,#5b21b6)", text: "Drones spray pesticides and map crop health." },
  { title: "Smart Tractor", emoji: "🚜", cat: "tech", bg: "linear-gradient(135deg,#fb923c,#9a3412)", text: "GPS-guided tractors cut overlap and save fuel." },
  { title: "Greenhouse", emoji: "🏠", cat: "tech", bg: "linear-gradient(135deg,#4ade80,#15803d)", text: "Controlled climate for year-round vegetables." },
  { title: "Soil Sensors", emoji: "📡", cat: "tech", bg: "linear-gradient(135deg,#94a3b8,#334155)", text: "IoT sensors report soil moisture to your phone." },
  { title: "Hydroponics", emoji: "🥬", cat: "tech", bg: "linear-gradient(135deg,#86efac,#047857)", text: "Leafy greens grown in nutrient-rich water." }
];

/* ---------- HELPERS ---------- */
const $ = (id) => document.getElementById(id);

/* ---------- NAVIGATION ---------- */
$("menuToggle").addEventListener("click", () => $("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach((a) =>
  a.addEventListener("click", () => $("mainNav").classList.remove("open"))
);
$("year").textContent = new Date().getFullYear();

const toTop = $("toTop");
window.addEventListener("scroll", () => { toTop.hidden = window.scrollY < 400; });
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ---------- CROP SEARCH ---------- */
let activeSeason = "all";

function renderCrops() {
  const q = $("cropSearch").value.trim().toLowerCase();
  const list = crops.filter((c) => {
    const matchSeason = activeSeason === "all" || c.season === activeSeason;
    const text = `${c.name} ${c.season} ${c.soil} ${c.note}`.toLowerCase();
    return matchSeason && text.includes(q);
  });

  $("cropResults").innerHTML = list.map((c) => `
    <article class="crop-card">
      <div class="emoji">${c.emoji}</div>
      <h3>${c.name}</h3>
      <p>${c.note}</p>
      <div class="tags">
        <span class="tag">${c.season}</span>
        <span class="tag">${c.duration}</span>
        <span class="tag">${c.soil}</span>
      </div>
    </article>`).join("");

  $("noCrop").hidden = list.length > 0;
}

$("cropSearch").addEventListener("input", renderCrops);
$("seasonFilters").addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  document.querySelectorAll("#seasonFilters .chip").forEach((c) => c.classList.remove("active"));
  btn.classList.add("active");
  activeSeason = btn.dataset.season;
  renderCrops();
});

/* ---------- IRRIGATION TABS ---------- */
function showIrrigation(i) {
  const m = irrigation[i];
  document.querySelectorAll("#irrTabs .chip").forEach((c, idx) => c.classList.toggle("active", idx === i));
  $("irrPanel").innerHTML = `
    <h3>${m.icon} ${m.name} Irrigation</h3>
    <p>${m.desc}</p>
    <ul>${m.pros.map((p) => `<li>${p}</li>`).join("")}</ul>
    <div class="meta">
      <span>💦 Efficiency: <b>${m.eff}</b></span>
      <span>🌾 Best for: <b>${m.best}</b></span>
    </div>`;
}
$("irrTabs").innerHTML = irrigation
  .map((m, i) => `<button class="chip" data-i="${i}">${m.icon} ${m.name}</button>`).join("");
$("irrTabs").addEventListener("click", (e) => {
  const b = e.target.closest(".chip");
  if (b) showIrrigation(Number(b.dataset.i));
});
showIrrigation(0);

/* ---------- CROP INFORMATION FINDER ---------- */
const cropOptions = `<option value="">-- Select --</option>` +
  crops.map((c, i) => `<option value="${i}">${c.emoji} ${c.name}</option>`).join("");
$("cropSelect").innerHTML = cropOptions;

$("cropSelect").addEventListener("change", (e) => {
  if (e.target.value === "") { $("cropInfo").textContent = "Choose a crop to see details."; return; }
  const c = crops[e.target.value];
  $("cropInfo").innerHTML = `
    <b>${c.emoji} ${c.name}</b>
    <table>
      <tr><td>Season</td><td>${c.season}</td></tr>
      <tr><td>Soil</td><td>${c.soil}</td></tr>
      <tr><td>Soil pH</td><td>${c.ph}</td></tr>
      <tr><td>Temperature</td><td>${c.temp}</td></tr>
      <tr><td>Water need</td><td>${c.water}</td></tr>
      <tr><td>Duration</td><td>${c.duration}</td></tr>
    </table>
    <p style="margin-top:8px">💡 ${c.note}</p>`;
});

/* ---------- FERTILIZER CALCULATOR ---------- */
$("fertCrop").innerHTML = crops.map((c, i) => `<option value="${i}">${c.emoji} ${c.name}</option>`).join("");

$("fertBtn").addEventListener("click", () => {
  const area = parseFloat($("fertArea").value);
  const out = $("fertResult");

  if (isNaN(area) || area <= 0) {
    out.innerHTML = "⚠️ Please enter a valid land area greater than 0.";
    return;
  }

  const crop = crops[$("fertCrop").value];
  const hectares = $("fertUnit").value === "acre" ? area * 0.4047 : area;

  // Nutrient requirement (kg)
  const N = crop.npk[0] * hectares;
  const P = crop.npk[1] * hectares;
  const K = crop.npk[2] * hectares;

  // Convert to fertilizer products
  const dap = P / 0.46;              // DAP: 18% N, 46% P2O5
  const nFromDap = dap * 0.18;
  const urea = Math.max(N - nFromDap, 0) / 0.46; // Urea: 46% N
  const mop = K / 0.60;              // MOP: 60% K2O

  const f = (n) => n.toFixed(1);
  out.innerHTML = `
    <b>${crop.emoji} ${crop.name} – ${area} ${$("fertUnit").value}(s)</b>
    <table>
      <tr><th>Nutrient</th><th>Needed (kg)</th></tr>
      <tr><td>Nitrogen (N)</td><td>${f(N)}</td></tr>
      <tr><td>Phosphorus (P₂O₅)</td><td>${f(P)}</td></tr>
      <tr><td>Potash (K₂O)</td><td>${f(K)}</td></tr>
    </table>
    <table>
      <tr><th>Fertilizer</th><th>Quantity (kg)</th></tr>
      <tr><td>DAP</td><td>${f(dap)}</td></tr>
      <tr><td>Urea</td><td>${f(urea)}</td></tr>
      <tr><td>Muriate of Potash</td><td>${f(mop)}</td></tr>
    </table>
    <small class="muted">General guideline only. Follow your soil test report and local agriculture officer's advice.</small>`;
});

/* ---------- WEATHER ---------- */
$("weatherCity").innerHTML = Object.keys(weatherData).map((c) => `<option>${c}</option>`).join("");

function showWeather() {
  const city = $("weatherCity").value;
  const w = weatherData[city];
  let advice;
  if (w.rain >= 50) advice = "🌧️ High chance of rain – postpone spraying and irrigation.";
  else if (w.temp >= 30) advice = "🔥 Hot day – irrigate in the evening and mulch the soil.";
  else if (w.rain < 20) advice = "☀️ Dry spell – good day for harvesting and field work.";
  else advice = "🌱 Good conditions for normal field operations.";

  $("weatherResult").innerHTML = `
    <div>${w.cond}</div>
    <div class="temp">${w.temp}°C</div>
    <div class="grid">
      <span>💧 Humidity: ${w.hum}%</span>
      <span>🌬️ Wind: ${w.wind} km/h</span>
      <span>☔ Rain chance: ${w.rain}%</span>
    </div>
    <div class="advice">${advice}</div>`;
}
$("weatherCity").addEventListener("change", showWeather);
showWeather();

/* ---------- RANDOM TIP ---------- */
let lastTip = -1;
function newTip() {
  let i;
  do { i = Math.floor(Math.random() * tips.length); } while (i === lastTip);
  lastTip = i;
  $("tipText").textContent = "“" + tips[i] + "”";
}
$("tipBtn").addEventListener("click", newTip);
newTip();

/* ---------- GALLERY + LIGHTBOX ---------- */
function renderGallery(cat = "all") {
  $("galleryGrid").innerHTML = gallery.map((g, i) => `
    <div class="g-item ${cat === "all" || g.cat === cat ? "" : "hide"}" data-i="${i}" style="background:${g.bg}">
      <div class="big">${g.emoji}</div>
      <div class="cap">${g.title}</div>
    </div>`).join("");
}
renderGallery();

$("galleryFilters").addEventListener("click", (e) => {
  const b = e.target.closest(".chip");
  if (!b) return;
  document.querySelectorAll("#galleryFilters .chip").forEach((c) => c.classList.remove("active"));
  b.classList.add("active");
  renderGallery(b.dataset.cat);
});

let lbIndex = 0;
function visibleIndexes() {
  return [...document.querySelectorAll(".g-item:not(.hide)")].map((el) => Number(el.dataset.i));
}
function openLightbox(i) {
  lbIndex = i;
  const g = gallery[i];
  const box = $("lbContent");
  box.style.background = g.bg;
  box.innerHTML = `<div class="big">${g.emoji}</div><h3>${g.title}</h3><p>${g.text}</p>`;
  $("lightbox").hidden = false;
}
function stepLightbox(dir) {
  const list = visibleIndexes();
  const pos = list.indexOf(lbIndex);
  openLightbox(list[(pos + dir + list.length) % list.length]);
}

$("galleryGrid").addEventListener("click", (e) => {
  const item = e.target.closest(".g-item");
  if (item) openLightbox(Number(item.dataset.i));
});
$("lbClose").addEventListener("click", () => ($("lightbox").hidden = true));
$("lbPrev").addEventListener("click", () => stepLightbox(-1));
$("lbNext").addEventListener("click", () => stepLightbox(1));
$("lightbox").addEventListener("click", (e) => { if (e.target === $("lightbox")) $("lightbox").hidden = true; });
document.addEventListener("keydown", (e) => {
  if ($("lightbox").hidden) return;
  if (e.key === "Escape") $("lightbox").hidden = true;
  if (e.key === "ArrowLeft") stepLightbox(-1);
  if (e.key === "ArrowRight") stepLightbox(1);
});

/* ---------- INITIAL RENDER ---------- */
renderCrops();