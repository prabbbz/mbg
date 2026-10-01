const CONFIG = {
  name: "ReyyYuzora",
  username: "prabbbz",
  profile: "https://www.roblox.com/id/users/9164965658/profile",
  avatar: "https://tr.rbxcdn.com/30DAY-Avatar-B28BC904C94890749D2E74CC5E058125-Png/352/352/Avatar/Png/noFilter",
  discord: "https://discord.gg/pe3tb2dZCU",
  web: "https://roblox-prabbbz.vercel.app/"
};

// Link dengan u kosong tampil redup + label "Segera". Isi u untuk mengaktifkan.
const BIO = {
  text: "Developer game Roblox. Mainkan game buatanku dan gabung komunitasnya!",
  // icon: roblox | discord | tiktok | youtube | instagram | whatsapp | pad
  links: [
    { t: "Profil Roblox", s: "Lihat semua game buatanku", u: CONFIG.profile, i: "roblox", featured: true },
    { t: "MainYuk", s: "Game online gratis, langsung main", u: "index.html", i: "pad", same: true },
    { t: "Web Roblox", s: "Game Roblox buatanku", u: CONFIG.web, i: "roblox" },
    { t: "Discord", s: "Gabung komunitas & dapat info update", u: CONFIG.discord, i: "discord" },
    { t: "TikTok", s: "Cuplikan gameplay & pengumuman", u: "https://www.tiktok.com/@sueprabu_21?is_from_webapp=1&sender_device=pc", i: "tiktok" },
    { t: "YouTube", s: "Video dan trailer game", u: "", i: "youtube" },
    { t: "Instagram", s: "Foto dan cerita sehari-hari", u: "", i: "instagram" },
    { t: "WhatsApp", s: "Chat langsung untuk kerja sama", u: "https://wa.me/6287781781230", i: "whatsapp" }
  ]
};

const $ = id => document.getElementById(id);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const FILL = ["roblox", "discord", "tiktok", "youtube"];
const ic = n => `<svg class="i${FILL.includes(n) ? " b" : ""}"><use href="#i-${esc(n)}"/></svg>`;

$("bName").textContent = CONFIG.name; $("bUser").textContent = CONFIG.username; $("bBio").textContent = BIO.text;
$("fName").textContent = CONFIG.name;
const bAva = $("bAva"); bAva.src = CONFIG.avatar; bAva.onerror = () => bAva.style.visibility = "hidden";

$("bLinks").innerHTML = BIO.links.map((l, n) => {
  const inner = `<span class="lic">${ic(l.i)}</span><span class="lt"><b>${esc(l.t)}</b><small>${esc(l.s)}</small></span>` +
    (l.u ? `<svg class="i arr"><use href="#i-arrow"/></svg>` : `<span class="soon">Segera</span>`);
  const cls = "lk" + (l.featured ? " feat" : "") + (l.u ? "" : " off");
  return l.u ? `<a class="${cls}" style="--n:${n}" href="${esc(l.u)}"${l.same ? "" : ' target="_blank" rel="noopener"'}>${inner}</a>`
             : `<div class="${cls}" style="--n:${n}">${inner}</div>`;
}).join("");
const live = BIO.links.filter(l => l.u && !l.featured && !l.same);
$("bSoc").innerHTML = live.map(l => `<a href="${esc(l.u)}" target="_blank" rel="noopener" aria-label="${esc(l.t)}">${ic(l.i)}</a>`).join("");
$("bSoc").hidden = !live.length;

const toast = $("toast");
function msg(m) { toast.textContent = m; toast.classList.add("on"); clearTimeout(msg.t); msg.t = setTimeout(() => toast.classList.remove("on"), 2200); }
$("bShare").onclick = async () => {
  const url = location.href.split("#")[0];
  try { if (navigator.share) { await navigator.share({ title: CONFIG.name, url }); return; } } catch { return; }
  try { await navigator.clipboard.writeText(url); msg("Link bio disalin"); } catch { msg("Salin dari address bar ya"); }
};

const root = document.documentElement, tbtn = $("themeBtn");
function applyTheme(t) {
  root.dataset.theme = t; tbtn.textContent = t === "light" ? "☾" : "☀";
  tbtn.setAttribute("aria-label", t === "light" ? "Dark mode" : "Light mode");
  document.querySelector('meta[name="theme-color"]').content = t === "light" ? "#f5f6fb" : "#07080c";
}
applyTheme(root.dataset.theme || "dark");
tbtn.onclick = () => { const t = root.dataset.theme === "light" ? "dark" : "light"; applyTheme(t); try { localStorage.setItem("theme", t); } catch {} };
