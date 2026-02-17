# Cyber Vision UAE

Official website for Cyber Vision UAE – Cybersecurity, Firewall, CCTV & Network Solutions.

## 🌐 Live Website

https://cybervision.ae

GitHub Pages:
https://anuragmdk.github.io/cybervision_WEBSITE/

---

## 🚀 Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- Supabase (Contact Form Backend)

---

## 🛠 Development Setup

1. Clone the repository

git clone https://github.com/anuragmdk/cybervision_WEBSITE.git

2. Navigate into the project

cd cybervision_WEBSITE

3. Install dependencies

npm install

4. Start development server

npm run dev

---

## 🏗 Production Build

To create production build:

npm run build

The output will be generated inside:

dist/

---

## 🌍 Deployment

This project is deployed using:

GitHub Pages + Custom Domain (cybervision.ae)

GitHub Pages settings:

- Branch: main
- Folder: /dist

---

## 🔐 Environment Variables

Create a `.env` file in the root folder:

VITE_SUPABASE_URL=https://divlgwjmpxtbqgeczjdg.supabase.co
VITE_SUPABASE_KEY=your_anon_public_key

Do NOT commit `.env` to GitHub.

---

## 📧 Contact Form

Form submissions are stored in Supabase table:

contact

Columns:
- id (uuid)
- name (text)
- email (text)
- message (text)
- created_at (timestamp)

