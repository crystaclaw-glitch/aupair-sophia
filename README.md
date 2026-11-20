# Sophia — Au Pair Portfolio

Website statis (HTML + CSS + JS), tanpa build step.

## Struktur
```
index.html
style.css
fun.css                <- gaya fitur interaktif
script.js              <- kontak & galeri (edit di sini)
fun.js                 <- fitur interaktif (typing, flip card, passport, dll)
i18n.js                <- terjemahan Belanda (NL) & Jerman (DE); Inggris = default di index.html
images/
  Sophia.jpg              <- 1 foto Sophia, dipakai di hero DAN di polaroid section About
  gallery/
    moments-1.jpg ... moments-6.jpg
    made-1.jpg ... made-6.jpg
    life-1.jpg ... life-6.jpg
```

## Yang perlu diedit
Semua ada di bagian atas `script.js`:
1. `CONTACT.whatsapp` -> nomor WA format internasional, tanpa `+` (contoh `6281234567890`)
2. `CONTACT.email` -> alamat email
3. `GALLERY` -> ganti/tambah nama file foto. Kalau file belum ada, tampil placeholder.

Foto: sebaiknya dikompres (max ~300 KB per foto, lebar sekitar 1200px) supaya web cepat.
Wajah Sophiak-Sophiak di foto volunteering harus sudah di-blur sebelum di-upload.

## Upload ke GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

## Deploy ke Cloudflare Pages
1. Cloudflare Dashboard -> Workers & Pages -> Create -> Pages -> Connect to Git
2. Pilih repo ini
3. Framework preset: **None**
4. Build command: *(kosongkan)*
5. Build output directory: `/` (atau kosongkan)
6. Save and Deploy

Setiap kali kamu push ke GitHub, Cloudflare otomatis deploy ulang.
Domain sendiri bisa ditambah lewat tab Custom domains.
