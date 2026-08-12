# 🐠 Nemo — AI Assistant

Chatbot sederhana bertema laut menggunakan **Express.js** (backend) dan **HTML/CSS/JS** murni (frontend), didukung oleh model AI gratis **`nvidia/nemotron-3-ultra-550b-a55b:free`** melalui [OpenRouter](https://openrouter.ai/).

Dibuat untuk keperluan **Praktikum PWS (Pemrograman Web Server)**.

## ✨ Fitur

- 💬 Chat real-time dengan AI Nemotron
- 🌊 Desain tema laut dengan animasi gelembung
- 😄 Quick-reply chips (Fakta laut, Lelucon receh, dll)
- ⌨️ Typing indicator saat AI sedang membalas
- 📝 Jawaban AI dirender rapi dengan Markdown (bold, tabel, list) menggunakan [marked.js](https://marked.js.org/)
- 🔒 API key disimpan aman di server (tidak terekspos ke browser)

## 🛠️ Teknologi

| Bagian | Teknologi |
|---|---|
| Backend | Node.js, Express.js |
| Frontend | HTML, CSS, JavaScript (vanilla) |
| AI Model | NVIDIA Nemotron 3 Ultra (via OpenRouter API) |
| Markdown Renderer | marked.js |

## 📁 Struktur Proyek
praktikum-chatbot/
├── node_modules/ (otomatis dibuat saat npm install)
├── public/
│ └── index.html # UI chat tema "Nemo"
├── .env # API key (JANGAN di-share/commit)
├── .gitignore
├── index.js # Backend Express
├── package.json
├── package-lock.json
└── README.md

## 🚀 Cara Menjalankan

### 1. Clone repository

```bash
git clone https://github.com/faizsltn/praktikum-chatbot_PWS.git
cd praktikum-chatbot_PWS
```

### 2. Install dependencies

```bash
npm install
```

### 3. Buat file `.env`

Buat file `.env` di root folder, isi dengan API key OpenRouter kamu:
OPENROUTER_API_KEY=isi_api_key_openrouter_kamu_disini
SITE_URL=http://localhost:3000
SITE_NAME=Nemo AI Chatbot
PORT=3000

> Dapatkan API key gratis di **https://openrouter.ai/keys**

### 4. Jalankan server

```bash
npm start
```

### 5. Buka di browser
http://localhost:3000

## ⚙️ Cara Kerja

1. Frontend (`public/index.html`) mengirim riwayat percakapan ke endpoint `POST /api/chat`
2. Backend (`index.js`) meneruskan request ke OpenRouter API dengan model `nvidia/nemotron-3-ultra-550b-a55b:free`
3. Balasan AI dikirim kembali ke frontend, dirender jadi HTML rapi (bukan teks Markdown mentah), lalu ditampilkan sebagai bubble chat

## ⚠️ Catatan

- Butuh **Node.js versi 18 ke atas**
- Model `:free` memiliki rate limit — jika muncul error 429, tunggu sebentar lalu coba lagi
- **Jangan pernah commit file `.env`** ke Git/GitHub — file ini sudah dimasukkan ke `.gitignore`

## 👤 Dibuat oleh

Faiz — Praktikum PWS, Universitas Muhammadiyah Yogyakarta