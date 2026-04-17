# Mayank Arora — Portfolio Website

A static portfolio website built with **React**, **Tailwind CSS**, and **Framer Motion**. Frontend-only — no backend or database needed. Ready to deploy on Vercel.

---

## Tech Stack

| Layer  | Technology                                                    |
| ------ | ------------------------------------------------------------- |
| UI     | React 19, Tailwind CSS, Framer Motion, tsParticles, shadcn/ui |
| Fonts  | Space Grotesk, Inter, JetBrains Mono (Google Fonts)           |
| Icons  | Lucide React                                                  |

---

## Run Locally

```bash
# Clone the repo
git clone <your-repo-url>
cd frontend

# Install dependencies
yarn install

# Start dev server
yarn start
```

Opens at `http://localhost:3000`.

---

## Project Structure

```
frontend/
├── public/
│   └── index.html           # Google Fonts loaded here
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Fixed transparent blur navbar
│   │   ├── Hero.jsx          # Full-screen hero with particles
│   │   ├── About.jsx         # Bio + animated terminal card
│   │   ├── Skills.jsx        # Security/Dev toggle tabs
│   │   ├── Projects.jsx      # Featured project cards
│   │   ├── Labs.jsx          # Cybersecurity lab entries
│   │   ├── Freelance.jsx     # Freelance work + experiments
│   │   ├── DSA.jsx           # LeetCode profile card
│   │   ├── Timeline.jsx      # Achievements timeline
│   │   ├── Hobbies.jsx       # Hobby cards
│   │   ├── Contact.jsx       # Contact form (opens mailto)
│   │   ├── Footer.jsx        # Footer
│   │   └── CustomCursor.jsx  # Custom cursor effect
│   ├── data/
│   │   └── mock.js           # ← ALL portfolio content lives here
│   ├── App.js
│   ├── App.css
│   └── index.css
├── package.json
└── tailwind.config.js
```

---

## How to Edit Content

All portfolio content is in **one file**: `src/data/mock.js`

- **Personal info** — name, tagline, photo URL, social links, resume link
- **About** — bio text + terminal commands
- **Skills** — security & dev skill lists
- **Projects** — title, description, tags, links for each project
- **Labs** — cybersecurity lab entries
- **Freelance** — Qpid campaign + frontend experiments
- **DSA** — LeetCode profile info
- **Timeline** — milestone events
- **Hobbies** — hobby cards
- **Contact** — email, phone, socials

Edit `mock.js`, save, and changes appear instantly.

---

## Deploy to Vercel

### Method 1 — Vercel Dashboard (Easiest)

1. Push your code to **GitHub**
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. Set these settings:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Create React App
   - **Build Command**: `yarn build` (auto-detected)
   - **Output Directory**: `build` (auto-detected)
5. Click **Deploy**

Your site will be live at `https://your-project.vercel.app` in ~60 seconds.

### Method 2 — Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# From the frontend directory
cd frontend

# Deploy
vercel

# Follow the prompts — it auto-detects Create React App
```

### Custom Domain (Optional)

1. In Vercel dashboard → your project → **Settings** → **Domains**
2. Add your domain (e.g., `mayankarora.dev`)
3. Update your domain's DNS:
   - **A Record**: `76.76.21.21`
   - **CNAME**: `cname.vercel-dns.com`
4. SSL is automatic

---

## Customization Tips

| What           | Where                                    |
| -------------- | ---------------------------------------- |
| Content/text   | `src/data/mock.js`                       |
| Colors         | Hex values in components + `index.css`   |
| Photo          | Update `photo` URL in `mock.js`          |
| Resume PDF     | Update `resumeUrl` in `mock.js`          |
| Add/remove sections | Edit `App.js` component list        |
| Fonts          | Google Fonts link in `public/index.html` |

Main color palette: `#080C18` `#7B5EEA` `#3B6FD4` `#A78BFA`

---

## Contact Form

The contact form opens the visitor's default email client (`mailto:`) with pre-filled subject and body. No backend needed — it works anywhere.

---

Built by **Mayank Arora** · 2025
