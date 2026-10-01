// ===== KONFIGURASI: ganti sesuai akunmu =====
// Link dengan url kosong ("") tampil redup + label "Segera". Isi url untuk mengaktifkannya.
const CONFIG = {
  name: "ReyyYuzora",
  username: "prabbbz",
  bio: "Developer game Roblox. Mainkan game buatanku dan gabung komunitasnya!",
  avatar: "https://tr.rbxcdn.com/30DAY-Avatar-B28BC904C94890749D2E74CC5E058125-Png/352/352/Avatar/Png/noFilter",
  // icon: roblox | discord | tiktok | youtube | instagram | whatsapp | pad
  links: [
    { t: "Profil Roblox", s: "Lihat semua game buatanku", u: "https://www.roblox.com/id/users/9164965658/profile", i: "roblox", featured: true },
    { t: "Website Game Roblox", s: "Daftar lengkap game & info update", u: "", i: "pad" },
    { t: "Discord", s: "Gabung komunitas & dapat info update", u: "", i: "discord" },
    { t: "TikTok", s: "Cuplikan gameplay & pengumuman", u: "", i: "tiktok" },
    { t: "YouTube", s: "Video dan trailer game", u: "", i: "youtube" },
    { t: "Instagram", s: "Foto dan cerita sehari-hari", u: "", i: "instagram" },
    { t: "WhatsApp", s: "Chat langsung untuk kerja sama", u: "", i: "whatsapp" }
  ]
};

const $ = id => document.getElementById(id);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const FILL = ["roblox", "discord", "tiktok", "youtube"];
const ic = n => `<svg class="i${FILL.includes(n) ? " b" : ""}"><use href="#i-${esc(n)}"/></svg>`;

document.title = CONFIG.name + " — Links";
$("name").textContent = CONFIG.name; $("fn").textContent = CONFIG.name;
$("user").textContent = CONFIG.username; $("bio").textContent = CONFIG.bio;
const ava = $("ava"); ava.src = CONFIG.avatar; ava.onerror = () => ava.style.visibility = "hidden";

$("links").innerHTML = CONFIG.links.map((l, n) => {
  const inner = `<span class="lic">${ic(l.i)}</span><span class="lt"><b>${esc(l.t)}</b><small>${esc(l.s)}</small></span>` +
    (l.u ? `<svg class="i arr"><use href="#i-arrow"/></svg>` : `<span class="soon">Segera</span>`);
  const cls = "lk" + (l.featured ? " feat" : "") + (l.u ? "" : " off");
  return l.u ? `<a class="${cls}" style="--n:${n}" href="${esc(l.u)}" target="_blank" rel="noopener">${inner}</a>`
             : `<div class="${cls}" style="--n:${n}">${inner}</div>`;
}).join("");

const live = CONFIG.links.filter(l => l.u && !l.featured);
$("soc").innerHTML = live.map(l => `<a href="${esc(l.u)}" target="_blank" rel="noopener" aria-label="${esc(l.t)}">${ic(l.i)}</a>`).join("");
$("soc").hidden = !live.length;

const toast = $("toast");
function show(m) { toast.textContent = m; toast.classList.add("on"); clearTimeout(show.t); show.t = setTimeout(() => toast.classList.remove("on"), 2200); }
$("share").onclick = async () => {
  try { if (navigator.share) { await navigator.share({ title: CONFIG.name, url: location.href }); return; } } catch { return; }
  try { await navigator.clipboard.writeText(location.href); show("Link halaman disalin"); } catch { show("Salin dari address bar ya"); }
};

const glow = $("glow");
addEventListener("pointermove", e => { glow.style.setProperty("--mx", e.clientX + "px"); glow.style.setProperty("--my", e.clientY + "px"); }, { passive: true });
