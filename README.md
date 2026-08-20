# LKN Therapeutic Massage - Website for April Ravenwood, LMT

A modern, high-end website designed for **April Ravenwood** and her therapeutic massage practice in **Cornelius, NC** at **20905 Torrence Chapel Road, Suite 204**.

Built with **Next.js (App Router)**, **Tailwind CSS**, and **Lucide Icons**, styled in a calming, luxurious **moody aesthetic** (deep forest/moss emerald, obsidian slate, warm antique gold, and candlelight tones).

---

## 🌟 Key Features & Business Highlights

- **The LKN Standard ($0 Upcharge)**: Prominently highlights that **Cupping Therapy** and **Steamed Herbal Hot Towels** are included in sessions at **zero additional charge**.
- **16-Year Veteran LMT**: Showcases April’s 16 years of licensed massage therapy experience and intuitive anatomy-focused touch.
- **Specialized Prenatal Massage**: Dedicated section for safe, ergonomic side-lying prenatal bodywork tailored for expecting mothers across all trimesters.
- **Monthly Wellness Memberships**: Tiered membership packages (Essential Reset 60m, Restorative Journey 90m, Ultimate Sanctuary 120m) with rollover guarantees, guest pass privileges, and member discounts.
- **Interactive Session Customizer**: Interactive tool allowing clients to choose duration, calibrate pressure, pick focus areas, and toggle inclusions with live summary generation.
- **Interactive Appointment Booking Modal**: Multi-step booking/inquiry modal with instant confirmation feedback.
- **Location & Suite 204 Guide**: Full address (20905 Torrence Chapel Rd Suite 204, Cornelius, NC 28031), copy address button, Google Maps navigation, travel times from Davidson/Huntersville, and arrival guide.
- **Ambient Spa Soundscape**: Self-contained Web Audio soothing ambient synthesizer toggle in the bottom right corner.
- **Curated Placeholders**: Ready-to-edit slots for April’s photos, prices, and NC license numbers.

---

## 🚀 Easy Vercel Deployment

This project is built with **Next.js**, which has native zero-config deployment on Vercel.

### Option 1: Deploy via GitHub (Recommended)
1. Push this repository to your GitHub account:
   ```bash
   git add .
   git commit -m "Initial commit of LKN Therapeutic Massage site"
   git branch -M main
   git remote add origin https://github.com/your-username/lkn-massage.git
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository and click **Deploy**. Vercel will automatically build and host the website.

### Option 2: Deploy via Vercel CLI
```bash
npx vercel
```

---

## 💻 Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

---

## 📝 How to Update Pricing & Photos

- **Service Details & Pricing**: Edit [`src/data/servicesData.js`](src/data/servicesData.js) to adjust prices, descriptions, and duration lengths.
- **Membership Tiers & Pricing**: Edit [`src/data/membershipsData.js`](src/data/membershipsData.js) to set monthly membership rates.
- **FAQs**: Edit [`src/data/faqsData.js`](src/data/faqsData.js) to add or edit questions and answers.
- **Testimonials**: Edit [`src/data/testimonialsData.js`](src/data/testimonialsData.js) to update client reviews.
- **Photos**: Replace the styled placeholder slots in `src/components/Hero.jsx`, `src/components/AboutApril.jsx`, `src/components/Services.jsx`, and `src/components/Memberships.jsx` with standard `<img>` or `<Image />` tags using your finalized photos.

---

## 📍 Business Information
- **Business Name**: LKN Therapeutic Massage
- **Therapist**: April Ravenwood, LMT (16 Years Experience)
- **Address**: 20905 Torrence Chapel Road, Suite 204, Cornelius, NC 28031
- **Service Area**: Cornelius, Davidson, Huntersville, Mooresville, and the greater Lake Norman region
