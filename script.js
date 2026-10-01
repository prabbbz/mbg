const CONFIG = {"name": "ReyyYuzora", "username": "prabbbz", "userId": "9164965658", "profile": "https://www.roblox.com/id/users/9164965658/profile", "avatar": "https://tr.rbxcdn.com/30DAY-Avatar-B28BC904C94890749D2E74CC5E058125-Png/352/352/Avatar/Png/noFilter", "discord": "https://discord.gg/pe3tb2dZCU", "web": "https://roblox-prabbbz.vercel.app/", "src": "games.json", "batch": 60};
const $ = id => document.getElementById(id);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
if (location.hash === "#bio") location.replace("bio.html"); // link bio lama
document.querySelectorAll("[data-text]").forEach(e => e.textContent = CONFIG[e.dataset.text]);

/* ----- Pembaca data: mencari game di posisi mana pun dalam JSON ----- */
const GAMEURL = /\/export\/game\//i;
const loc = v => typeof v === "string" ? v : Array.isArray(v) ? loc(v[0]) : v && typeof v === "object" ? loc(v.en || v.EN || v.name || v.title || Object.values(v).find(x => typeof x === "string")) : "";
function findGames(d, out = []) {
  if (Array.isArray(d)) d.forEach(x => findGames(x, out));
  else if (d && typeof d === "object") {
    if (Object.values(d).some(v => typeof v === "string" && GAMEURL.test(v))) out.push(d);
    else Object.values(d).forEach(x => findGames(x, out));
  }
  return out;
}
function walk(o, path, out) {
  if (typeof o === "string") out.push([path, o]);
  else if (o && typeof o === "object") for (const k in o) walk(o[k], path + "." + k, out);
  return out;
}
function normalize(g) {
  const flat = walk(g, "", []);
  const URLRE = /https?:\/\/[^\s"'<>]*\/export\/game\/[^\s"'<>]*/i;
  const hit = flat.find(([k, v]) => /game_?url/i.test(k) && URLRE.test(v)) || flat.find(([, v]) => URLRE.test(v));
  const url = hit ? hit[1].match(URLRE)[0] : flat.find(([, v]) => GAMEURL.test(v))[1];
  const imgs = flat.filter(([k, v]) => /^https?:/.test(v) && (/\.(png|jpe?g|webp|gif|avif)(\?|$)/i.test(v) || /thumb|cover|icon|image|preview|poster/i.test(k)));
  const best = imgs.find(([k]) => /thumb|cover|preview/i.test(k)) || imgs[0];
  const c = flat.find(([k]) => /genre|categor/i.test(k));
  const title = loc(g.title || g.name) || url.split("/").pop().replace(/[-_]+/g, " ").replace(/\b\w/g, m => m.toUpperCase());
  return { title, img: best ? best[1] : "", url, cat: c ? c[1] : "" };
}
/* ------------------------------------------------------------------- */

const rnd = n => Math.floor(Math.random() * n);
function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; }
let all = [], cat = "", shown = 0, adPos = 5, adIdx = -1;

/* ----- animasi muncul saat scroll, glow kursor, progress bar ----- */
const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: .12 });
const reveal = e => { e.classList.add("rv"); io.observe(e); };
document.querySelectorAll(".sec .eyebrow, .sec h2, .sec .sub, .sec .card:not(.gcard)").forEach(reveal);
const glow = $("glow"), bar = $("bar");
document.addEventListener("pointermove", e => {
  glow.style.setProperty("--mx", e.clientX + "px"); glow.style.setProperty("--my", e.clientY + "px");
  const c = e.target.closest && e.target.closest(".card"); if (!c) return;
  const r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
  c.style.setProperty("--x", x + "px"); c.style.setProperty("--y", y + "px");
  if (c.classList.contains("gcard") && e.pointerType === "mouse") {
    c.style.setProperty("--rx", (.5 - y / r.height) * 8 + "deg"); c.style.setProperty("--ry", (x / r.width - .5) * 10 + "deg");
  }
});
document.addEventListener("pointerleave", e => {
  if (e.target.classList && e.target.classList.contains("gcard")) { e.target.style.setProperty("--rx", "0deg"); e.target.style.setProperty("--ry", "0deg"); }
}, true);
$("burger").onclick = () => $("menu").classList.toggle("open");
const links = [...$("menu").querySelectorAll('a[href^="#"]')];
links.forEach(a => a.onclick = () => $("menu").classList.remove("open"));
const secs = links.map(a => document.querySelector(a.getAttribute("href")));
function onScroll() {
  $("nav").classList.toggle("solid", scrollY > 30);
  let i = 0; secs.forEach((s, n) => { if (s.getBoundingClientRect().top < innerHeight * .4) i = n; });
  links.forEach((a, n) => a.classList.toggle("on", n === i));
  bar.style.transform = `scaleX(${scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)})`;
}
addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", onScroll); onScroll();
function countUp(e) {
  const t = parseInt(e.textContent.replace(/\D/g, "")) || 0; let s = null;
  const f = ts => { s ??= ts; const p = Math.min((ts - s) / 1200, 1); e.textContent = Math.round(t * (1 - Math.pow(1 - p, 3))).toLocaleString("id-ID"); if (p < 1) requestAnimationFrame(f); };
  requestAnimationFrame(f);
}

/* ----- iklan sendiri (house ads) -> web Roblox ----- */
const ADS = [
  { h: "Suka Roblox? Coba game buatan kami", p: "Gratis dan langsung main lewat Roblox.", c: "Mainkan", g: ["#ff3d8b", "#ff9a3c"] },
  { h: "Bosan? Pindah main ke Roblox", p: "Kumpulan game Roblox buatan sendiri.", c: "Lihat game", g: ["#2de2e6", "#ff3d8b"] },
  { h: "Build • Script • Play", p: "Game Roblox buatan kami menunggumu.", c: "Kunjungi", g: ["#ff9a3c", "#2de2e6"] },
  { h: "Mau game Roblox yang seru?", p: "Cek daftar game kami sekarang.", c: "Cek sekarang", g: ["#ff3d8b", "#2de2e6"] },
  { h: "Main Roblox bareng kami", p: "Pilih game favorit, klik Mainkan, selesai.", c: "Ayo main", g: ["#2de2e6", "#ff9a3c"] }
];
function nextAd() { let n; do { n = rnd(ADS.length); } while (n === adIdx); return (adIdx = n); }
function adLink(n, place, cls) {
  const a = el("a", cls), d = ADS[n];
  a.href = CONFIG.web + "?utm_source=mainyuk&utm_medium=house_ad&utm_campaign=ad" + (n + 1) + "&utm_content=" + place;
  a.target = "_blank"; a.rel = "noopener";
  a.style.setProperty("--g1", d.g[0]); a.style.setProperty("--g2", d.g[1]);
  return a;
}
function showBanner() {
  const n = nextAd(), d = ADS[n], a = adLink(n, "banner", "card adbar");
  a.innerHTML = `<small class="adtag">Iklan</small><div><b>${esc(d.h)}</b><p>${esc(d.p)}</p></div><span class="btn sm">${esc(d.c)}</span>`;
  $("adslot").replaceChildren(a);
}
function adCard() {
  const n = rnd(ADS.length), d = ADS[n], a = adLink(n, "tile", "tile adtile");
  a.innerHTML = `<span class="ph"><svg class="i b"><use href="#i-roblox"/></svg></span><span class="ad">Iklan</span><span class="nm"><b>${esc(d.h)}</b></span>`;
  return a;
}
function showSlim() {
  const n = nextAd(), d = ADS[n], a = adLink(n, "player", "slim");
  a.innerHTML = `<small>Iklan</small><strong>${esc(d.h)}</strong><span class="btn sm">${esc(d.c)}</span>`;
  $("pad").replaceChildren(a);
}

/* ----- daftar game ----- */
function drawCats() {
  const n = {};
  all.forEach(g => { if (g.cat) n[g.cat] = (n[g.cat] || 0) + 1; });
  const list = ["", ...Object.keys(n).sort((a, b) => n[b] - n[a]).slice(0, 14)], box = $("cats");
  box.textContent = "";
  list.forEach((slug, i) => {
    const b = el("button"); b.type = "button"; b.dataset.slug = slug; b.style.setProperty("--i", i);
    b.append(el("span", "", slug || "Semua"), el("em", "", String(slug ? n[slug] : all.length)));
    b.onclick = () => { cat = slug; markCats(); drawGames(true); };
    box.append(b);
  });
  markCats();
}
function markCats() { [...$("cats").children].forEach(b => b.classList.toggle("on", b.dataset.slug === cat)); }
function gameCard(g, big) {
  const c = el("button", "tile" + (big ? " big" : ""));
  c.type = "button"; c.title = g.title;
  c.innerHTML = `<span class="ph"><svg class="i"><use href="#i-pad"/></svg></span>${g.img ? `<img src="${esc(g.img)}" alt="" loading="lazy" onerror="this.remove()">` : ""}<span class="nm"><b>${esc(g.title)}</b></span>`;
  c.onclick = () => play(g);
  return c;
}
function drawGames(reset) {
  const q = $("q").value.trim().toLowerCase(), grid = $("gameList");
  const list = all.filter(g => (!cat || g.cat === cat) && g.title.toLowerCase().includes(q));
  const from = reset ? 0 : shown;
  shown = reset ? CONFIG.batch : shown + CONFIG.batch;
  if (reset) { adPos = 3 + rnd(7); grid.textContent = ""; if (!list.length) grid.append(el("p", "empty", "Game tidak ditemukan.")); }
  list.slice(from, shown).forEach((g, k) => { const i = from + k; if (i === adPos && !q) grid.append(adCard()); grid.append(gameCard(g, i % 14 === 0)); });
  $("more").hidden = shown >= list.length;
  onScroll();
}
function setData(d) {
  all = findGames(d).map(normalize);
  if (!all.length) {
    const n = el("div", "pk", "File terbaca, tapi tidak ada link game (/export/game/) di dalamnya. Kirim potongan ini ke Claude:");
    n.append(el("pre", "", JSON.stringify(d, null, 1).slice(0, 700))); $("note").replaceChildren(n); return;
  }
  $("note").textContent = "";
  $("stGames").textContent = all.length; countUp($("stGames"));
  drawCats(); drawGames(true);
}
function showPicker() {
  $("gameList").textContent = ""; $("more").hidden = true;
  const n = el("div", "pk", "games.json belum ditemukan. Unduh katalog di widgets.playgama.com (login dulu supaya CLID kamu ikut), simpan sebagai games.json di folder ini, atau pilih filenya di sini: ");
  const f = el("input"); f.type = "file"; f.accept = ".json,application/json";
  f.onchange = async () => { try { setData(JSON.parse(await f.files[0].text())); } catch (e) { alert("File tidak bisa dibaca: " + e.message); } };
  n.append(f); $("note").replaceChildren(n);
}
async function load() {
  try { const r = await fetch(CONFIG.src); if (!r.ok) throw new Error("HTTP " + r.status); setData(await r.json()); } catch (e) { showPicker(); }
}
function play(g) {
  $("ptitle").textContent = g.title; showSlim();
  $("frame").src = g.url; $("player").showModal();
}
$("pclose").onclick = () => $("player").close();
$("player").onclose = () => { $("frame").src = "about:blank"; };
$("player").addEventListener("click", e => { if (e.target === $("player")) $("player").close(); });
$("pfs").onclick = () => $("frame").requestFullscreen && $("frame").requestFullscreen();
$("more").onclick = () => drawGames(false);
$("q").oninput = () => drawGames(true);
$("rand").onclick = () => { if (all.length) play(all[rnd(all.length)]); };


/* ----- tema terang/gelap & widget Discord ----- */
const root = document.documentElement, tbtn = $("themeBtn");
function applyTheme(t) {
  root.dataset.theme = t; tbtn.textContent = t === "light" ? "☾" : "☀";
  tbtn.setAttribute("aria-label", t === "light" ? "Dark mode" : "Light mode");
  document.querySelector('meta[name="theme-color"]').content = t === "light" ? "#f5f6fb" : "#07080c";
}
applyTheme(root.dataset.theme || "dark");
tbtn.onclick = () => { const t = root.dataset.theme === "light" ? "dark" : "light"; applyTheme(t); try { localStorage.setItem("theme", t); } catch {} };
const dw = $("dw");
if (dw && CONFIG.discord) fetch(`https://discord.com/api/v10/invites/${CONFIG.discord.split("/").pop().split("?")[0]}?with_counts=true`)
  .then(r => r.json()).then(d => {
    if (!d.approximate_member_count) return;
    dw.innerHTML = `<span><i></i><b>${(d.approximate_presence_count ?? 0).toLocaleString("id-ID")}</b> online</span><span><b>${d.approximate_member_count.toLocaleString("id-ID")}</b> member</span>`;
    dw.hidden = false;
  }).catch(() => {});

showBanner(); setInterval(showBanner, 15000);
load();
