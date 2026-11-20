/* =====================================================
   EDIT HERE — kontak & foto galeri
   ===================================================== */

// Kontak: isi nomor WhatsApp (format internasional, tanpa + atau spasi) dan email
const CONTACT = {
  whatsapp: "",              // contoh: "6281297793393"
  email: "",                 // contoh: "sphiazzahara@email.com"
  whatsappMessage: "Hello Sophia! I came across your Au Pair portfolio and would love to get to know you."
};

// Galeri: taruh foto di folder images/gallery/ lalu ganti nama file di bawah.
// Kalau file belum ada, otomatis muncul placeholder. Tambah/hapus baris sesuka kamu.
// "h" = tinggi placeholder (hanya untuk tampilan sebelum foto diganti).
const GALLERY = {
  "g-moments": [
    { src: "images/gallery/moments-1.jpg", caption: "Volunteering day", h: 260 },
    { src: "images/gallery/moments-2.jpg", caption: "Painting together", h: 200 },
    { src: "images/gallery/moments-3.jpg", caption: "Playing with the kids", h: 300 },
    { src: "images/gallery/moments-4.jpg", caption: "Group activity", h: 220 },
    { src: "images/gallery/moments-5.jpg", caption: "Creative time", h: 270 },
    { src: "images/gallery/moments-6.jpg", caption: "Little moments", h: 210 }
  ],
  "g-made": [
    { src: "images/gallery/made-1.jpg", caption: "Pipe-cleaner flowers", h: 280 },
    { src: "images/gallery/made-2.jpg", caption: "Handmade bouquet", h: 210 },
    { src: "images/gallery/made-3.jpg", caption: "Crafting project", h: 250 },
    { src: "images/gallery/made-4.jpg", caption: "DIY decoration", h: 300 },
    { src: "images/gallery/made-5.jpg", caption: "Handmade gift", h: 220 },
    { src: "images/gallery/made-6.jpg", caption: "Made with love", h: 260 }
  ],
  "g-life": [
    { src: "images/gallery/life-1.jpg", caption: "Homemade food", h: 240 },
    { src: "images/gallery/life-2.jpg", caption: "Flowers", h: 300 },
    { src: "images/gallery/life-3.jpg", caption: "Little adventure", h: 210 },
    { src: "images/gallery/life-4.jpg", caption: "Cooking", h: 270 },
    { src: "images/gallery/life-5.jpg", caption: "Nature", h: 230 },
    { src: "images/gallery/life-6.jpg", caption: "Daily moments", h: 280 }
  ]
};

/* ===================================================== */

// Contact links
(function () {
  const wa = document.getElementById("waBtn"), mail = document.getElementById("mailBtn");
  const waT = document.getElementById("waText"), mailT = document.getElementById("mailText");
  const chat = document.getElementById("chatBtn");
  if (CONTACT.whatsapp) {
    const url = "https://wa.me/" + CONTACT.whatsapp.replace(/\D/g, "") + "?text=" + encodeURIComponent(CONTACT.whatsappMessage);
    wa.href = url; waT.textContent = "+" + CONTACT.whatsapp.replace(/\D/g, ""); chat.href = url; chat.target = "_blank"; chat.rel = "noopener";
  } else { wa.addEventListener("click", e => e.preventDefault()); wa.style.opacity = ".6"; }
  if (CONTACT.email) {
    mail.href = "mailto:" + CONTACT.email + "?subject=" + encodeURIComponent("Hello from a host family"); mailT.textContent = CONTACT.email;
  } else { mail.addEventListener("click", e => e.preventDefault()); mail.style.opacity = ".6"; }
})();

// Gallery build
const allItems = [];
Object.entries(GALLERY).forEach(([id, items]) => {
  const root = document.getElementById(id);
  if (!root) return;
  items.forEach(it => {
    const fig = document.createElement("div");
    fig.className = "g-item";
    fig.tabIndex = 0;
    const img = new Image();
    img.alt = it.caption; img.loading = "lazy";
    img.onload = () => { fig.dataset.loaded = "1"; fig.style.minHeight = ""; };
    img.onerror = () => {
      img.remove(); fig.classList.add("empty"); fig.style.height = (it.h || 240) + "px";
      fig.innerHTML = `<div>${it.caption}<small>${it.src}</small></div>`;
    };
    img.src = it.src;
    fig.style.minHeight = (it.h || 240) + "px";
    fig.appendChild(img);
    const index = allItems.length;
    allItems.push({ el: fig, ...it });
    fig.addEventListener("click", () => openLB(index));
    fig.addEventListener("keydown", e => { if (e.key === "Enter") openLB(index); });
    root.appendChild(fig);
  });
});

// Lightbox
const lb = document.getElementById("lightbox"), lbImg = document.getElementById("lbImg"), lbCap = document.getElementById("lbCap");
let cur = 0;
function openLB(i) {
  const it = allItems[i];
  if (!it.el.dataset.loaded) return;            // placeholder tidak dibuka
  cur = i; lbImg.src = it.src; lbImg.alt = it.caption; lbCap.textContent = it.caption;
  lb.hidden = false; document.body.style.overflow = "hidden";
}
function closeLB() { lb.hidden = true; document.body.style.overflow = ""; }
function step(d) {
  let n = cur, tries = 0;
  do { n = (n + d + allItems.length) % allItems.length; tries++; } while (!allItems[n].el.dataset.loaded && tries <= allItems.length);
  openLB(n);
}
document.getElementById("lbClose").onclick = closeLB;
document.getElementById("lbPrev").onclick = () => step(-1);
document.getElementById("lbNext").onclick = () => step(1);
lb.addEventListener("click", e => { if (e.target === lb) closeLB(); });
document.addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLB();
  if (e.key === "ArrowLeft") step(-1);
  if (e.key === "ArrowRight") step(1);
});

// Mobile menu
const burger = document.getElementById("burger"), links = document.getElementById("links");
burger.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  links.classList.remove("open"); burger.setAttribute("aria-expanded", "false");
}));

// Fade-in on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
}, { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
