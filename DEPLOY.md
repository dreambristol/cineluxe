# CineLuxe — Deployment Guide

How to get cineluxe.us live using Vercel + GoDaddy, with Airtable form backend and reCAPTCHA v3.

---

## Step 1 — Push to GitHub

```bash
cd cineluxe
git add .
git commit -m "Add form backend + reCAPTCHA v3"
git push
```

---

## Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New… → Project"**, import your `cineluxe` GitHub repo
3. Vercel auto-detects Next.js — leave all settings as default
4. **Before deploying**, add Environment Variables (see Step 3 below)
5. Click **Deploy**

Your site will be live at `cineluxe-xxxxx.vercel.app` within ~60 seconds.

---

## Step 3 — Environment Variables

Set these in Vercel: **Project → Settings → Environment Variables**.
Also create a `.env.local` file at the root of your project for local development.

### reCAPTCHA v3 (Google)

Get your keys at [google.com/recaptcha](https://www.google.com/recaptcha/admin/create).
Choose **reCAPTCHA v3**, add your domain(s) (`cineluxe.us`, `www.cineluxe.us`, `localhost`).

| Variable | Where to put it | Description |
|---|---|---|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Vercel + `.env.local` | The **Site Key** from Google reCAPTCHA admin |
| `RECAPTCHA_SECRET_KEY` | Vercel only (server-side) | The **Secret Key** from Google reCAPTCHA admin |

### Airtable

Set up a free base at [airtable.com](https://airtable.com). Create a table named **"Dealer Applications"** with these fields (all Single Line Text unless noted):

| Field Name | Type |
|---|---|
| First Name | Single line text |
| Last Name | Single line text |
| Email | Email |
| Phone | Single line text |
| Company | Single line text |
| Website | URL |
| Country | Single line text |
| State / Region | Single line text |
| Business Type | Single line text |
| Years in Business | Single line text |
| Annual Revenue | Single line text |
| Client Base | Long text |
| Has Showroom | Single line text |
| Message | Long text |
| Submitted At | Single line text |

Get your API credentials from [airtable.com/create/tokens](https://airtable.com/create/tokens).
Create a Personal Access Token with `data.records:write` scope on your base.

| Variable | Where to put it | Description |
|---|---|---|
| `AIRTABLE_API_KEY` | Vercel + `.env.local` | Your Airtable Personal Access Token |
| `AIRTABLE_BASE_ID` | Vercel + `.env.local` | Your base ID (e.g. `appXXXXXXXXXXXXXX`) — found in the API docs for your base |
| `AIRTABLE_TABLE_NAME` | Optional | Defaults to `"Dealer Applications"` if not set |

### Example `.env.local`

```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LcXXXXXXXXXXXXXXXXXXXXX
RECAPTCHA_SECRET_KEY=6LcXXXXXXXXXXXXXXXXXXXXX
AIRTABLE_API_KEY=patXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
```

> ⚠️ Never commit `.env.local` to GitHub — it's in `.gitignore` by default in Next.js.

---

## Step 4 — Connect Your GoDaddy Domain

### In Vercel:
1. Go to your project → **Settings → Domains**
2. Click **"Add Domain"**, type `cineluxe.us` and click **Add**
3. Also add `www.cineluxe.us`
4. Vercel will show you the DNS records to add — **copy them**

### In GoDaddy:
1. Go to [godaddy.com](https://godaddy.com) → **My Products → Domains → DNS**
2. Update / add:
   - **A Record:** `@` → `216.198.79.1` (Vercel's IP — confirm from Vercel settings)
   - **CNAME Record:** `www` → the Vercel CNAME shown in your domain settings (e.g. `fe3f76a592e47cac.vercel-dns-017.com`)
3. Save changes

DNS propagates in 5–60 minutes. Vercel issues an SSL certificate automatically once verified.

---

## Step 5 — Replace Photography Placeholders

All image placeholder slots in the site are clearly labeled. Replace them with real photography using Next.js `<Image>` components:

| Section | File | Slot label |
|---|---|---|
| Hero (right side) | `app/page.tsx` | "Cinema Photography" |
| System pillar cards (×3) | `app/page.tsx` | "Projection Photography", "Audio Photography", "Acoustics Photography" |
| Full-width cinema visual | `app/page.tsx` | "Flagship Installation Photography" |

Example replacement:
```tsx
// Before (placeholder):
<div className="aspect-[4/3] relative bg-cinema-950 border-b border-cinema-700 overflow-hidden">
  {/* ... placeholder content ... */}
</div>

// After (real image):
import Image from "next/image";
import screeningRoomImg from "@/public/images/screening-room.jpg";

<div className="aspect-[4/3] relative overflow-hidden">
  <Image src={screeningRoomImg} alt="CineLuxe screening room" fill className="object-cover" />
</div>
```

---

## Step 6 — Customize Copy

| Placeholder | File | Replace with |
|---|---|---|
| Stats (500+, 12+, etc.) | `app/page.tsx` | Your real numbers |
| Timeline events | `app/about/page.tsx` | Your real history |
| Quote / philosophy | `app/page.tsx` | On-brand quote if different |

---

## Local Development

```bash
cd cineluxe
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> The form will work in dev even without env vars — reCAPTCHA is skipped if `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is empty, and the API returns an error (visible in console) if Airtable keys are missing. Set up `.env.local` for full local testing.
