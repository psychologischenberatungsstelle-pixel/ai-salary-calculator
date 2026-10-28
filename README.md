# 🚀 AI Salary Calculator - Programmatic SEO Micro-SaaS

## 📌 Konzept
Ein **kostenloses Web-Tool**, das Tech-Profis hilft, ihr erwartetes Gehalt basierend auf:
- Berufsbezeichnung (z.B. AI Engineer, Data Scientist)
- Erfahrungslevel (Junior, Mid, Senior)
- Land/Stadt
- Technologie-Stack

zu berechnen.

---

## 🎯 Gewählte Nische: **KI & Tech Gehälter**

### Warum profitabel?
1. **High-Intent Traffic**: Jobsuchende & Karriere-Wechsler suchen aktiv nach Gehalts-Insights
2. **Zero Competition**: Kaum interaktive Tools in diesem Micro-Bereich
3. **Monetarisierung**:
   - Google AdSense (Banner in Sidebar)
   - Affiliate-Links zu Tech-Job-Boards (LinkedIn Jobs, Glassdoor, Indeed)
   - Premium-Feature: PDF-Export (später)

---

## 📊 Programmatic SEO Strategie

### Ziel: 50-100 indexierte Seiten in 3 Monaten

**URL-Struktur:**
```
/[job-title]-salary-calculator-[location]
```

**Erste 10 Target-Keywords:**
1. `ai-engineer-salary-calculator-germany`
2. `senior-data-scientist-salary-usa`
3. `machine-learning-engineer-salary-uk`
4. `junior-python-developer-salary-canada`
5. `devops-engineer-salary-netherlands`
6. `cloud-architect-salary-australia`
7. `frontend-developer-salary-berlin`
8. `backend-engineer-salary-switzerland`
9. `full-stack-developer-salary-singapore`
10. `ai-researcher-salary-france`

**Content-Formel pro Seite:**
- H1: "[Job Title] Salary Calculator - [Location]"
- Interaktiver Rechner (Slider für Experience, Skills)
- Gehaltsspanne (Min/Max/Avg) aus JSON-Datenbank
- CTA: "Compare with [Related Job]" (Internal Links)
- Affiliate-Box: "Find [Job Title] Jobs on LinkedIn →"

---

## 🏗️ Tech Stack (100% Kostenlos)

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (Free Tier)
- **Datenbank**: JSON-Datei (statisch generiert)
- **Analytics**: Vercel Analytics (Free)
- **SEO**: next-sitemap + Metadata API

---

## 📁 Projektstruktur

```
Ki Project Sascha 1.0/
├── app/
│   ├── layout.tsx              # Root Layout (Google AdSense Script)
│   ├── page.tsx                # Landing Page (SEO-optimiert)
│   ├── [slug]/
│   │   └── page.tsx            # Dynamische pSEO-Seiten
│   └── api/
│       └── calculate/
│           └── route.ts        # Gehalt-Berechnungs-Logik
├── components/
│   ├── SalaryCalculator.tsx   # Haupt-Rechner-Komponente
│   ├── AdBanner.tsx            # AdSense Placeholder
│   └── AffiliateBox.tsx        # Job-Board CTA
├── data/
│   └── salaries.json           # pSEO-Daten (50+ Varianten)
├── lib/
│   └── generateSalary.ts       # Berechnungs-Helfer
├── public/
│   └── robots.txt
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── README.md
```

---

## 🎨 Design-Prinzipien

1. **Mobile-First**: Tailwind Responsive Classes
2. **Fast Loading**: Statische Generation (SSG) für alle pSEO-Seiten
3. **SEO-Optimiert**:
   - Unique Title/Description pro Seite
   - Strukturierte Daten (JSON-LD)
   - Internal Linking zwischen verwandten Jobs
4. **Conversion-Optimiert**:
   - Sticky AdSense Banner (Desktop)
   - Above-the-fold Calculator
   - Clear CTAs zu Job-Boards

---

## 📈 Growth-Roadmap

### Phase 1 (Woche 1-2): MVP
- ✅ 10 pSEO-Seiten live
- ✅ Basic Calculator funktionsfähig
- ✅ Deployment auf Vercel

### Phase 2 (Woche 3-4): Skalierung
- 🔄 50 pSEO-Seiten via Script generiert
- 🔄 Google Search Console Integration
- 🔄 AdSense Approval beantragt

### Phase 3 (Monat 2-3): Monetarisierung
- 💰 Affiliate-Links zu Job-Boards
- 💰 Premium-Feature: Salary Report als PDF
- 💰 Email-Capture für Newsletter (Career Tips)

---

## 🚦 Next Steps

1. ✅ Projektstruktur erstellt
2. ⏳ Core Components entwickeln
3. ⏳ pSEO-Daten generieren
4. ⏳ Deployment vorbereiten

---

**Start Date**: 28. Oktober 2026  
**Target Launch**: 1. November 2026  
**Revenue Goal**: 1.000 € - 5.000 € / Monat bis Q2 2027
