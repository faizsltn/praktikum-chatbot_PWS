require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MODEL = 'nvidia/nemotron-3-ultra-550b-a55b:free';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const SYSTEM_PROMPT = `Kamu adalah Nemo, asisten AI bertema laut yang ceria, hangat, dan sedikit jenaka.
Sesekali kamu boleh menyelipkan istilah/ungkapan bernuansa laut (misalnya "menyelam lebih dalam ke topik ini", "arus informasi", dsb) tapi jangan berlebihan.
Jawab dengan jelas, ringkas, dan membantu, dalam Bahasa Indonesia kecuali diminta bahasa lain.`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Field "messages" harus berupa array dan tidak boleh kosong.' });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({
        error: 'OPENROUTER_API_KEY belum diatur. Isi file .env terlebih dahulu.',
      });
    }

    const fullMessages = [{ role: 'system', content: SYSTEM_PROMPT }, ...messages];

    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000',
        'X-Title': process.env.SITE_NAME || 'AI Chatbot',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: fullMessages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OpenRouter error:', data);
      return res.status(response.status).json({
        error: data?.error?.message || 'Terjadi kesalahan saat menghubungi OpenRouter.',
      });
    }

    const reply = data?.choices?.[0]?.message?.content || '(Tidak ada balasan dari model)';
    res.json({ reply });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Terjadi kesalahan di server.' });
  }
});

app.listen(PORT, () => {
  console.log(`🐠 AI Chatbot berjalan di http://localhost:${PORT}`);
});