/**
 * Programmatic SEO Salary Data Generator
 * Generates calculator entries based on job titles x locations matrix.
 */

const fs = require("fs");
const path = require("path");

// Job categories with related job titles
const jobCategories = {
  "AI & Machine Learning": [
    "AI Engineer", "Machine Learning Engineer", "Data Scientist",
    "Prompt Engineer", "AI Researcher", "MLOps Engineer",
    "Computer Vision Engineer", "NLP Engineer"
  ],
  "Software Engineering": [
    "Full Stack Developer", "Frontend Developer", "Backend Engineer",
    "Software Engineer", "DevOps Engineer", "Site Reliability Engineer",
    "Mobile Developer", "Game Developer", "Embedded Systems Engineer"
  ],
  "Data & Analytics": [
    "Data Analyst", "Data Engineer", "Business Intelligence Analyst",
    "Data Architect", "Quantitative Analyst"
  ],
  "Cloud & Infrastructure": [
    "Cloud Architect", "Cloud Engineer", "DevOps Engineer",
    "System Administrator", "Network Engineer"
  ],
  "Cybersecurity": [
    "Cybersecurity Analyst", "Security Engineer", "Penetration Tester",
    "Security Architect", "CISO"
  ],
  "Product & Management": [
    "Product Manager", "Engineering Manager", "Technical Program Manager",
    "Product Owner", "Scrum Master"
  ],
  "Design & UX": [
    "UX Designer", "UI Designer", "Product Designer",
    "Interaction Designer", "Visual Designer"
  ],
  "QA & Testing": [
    "QA Engineer", "Test Automation Engineer", "SDET"
  ],
  "Blockchain & Web3": [
    "Blockchain Developer", "Smart Contract Engineer", "Web3 Developer",
    "Solidity Developer", "Blockchain Architect"
  ],
  "AR/VR & Game Dev": [
    "AR/VR Developer", "Unity Developer", "Unreal Engine Developer",
    "Game Designer", "3D Artist"
  ]
};

const locations = [
  { name: "Germany", code: "DE", city: "Berlin", currency: "EUR", colaIndex: 72 },
  { name: "USA", code: "US", city: "San Francisco", currency: "USD", colaIndex: 85 },
  { name: "United Kingdom", code: "UK", city: "London", currency: "GBP", colaIndex: 78 },
  { name: "Canada", code: "CA", city: "Toronto", currency: "CAD", colaIndex: 75 },
  { name: "Australia", code: "AU", city: "Sydney", currency: "AUD", colaIndex: 79 },
  { name: "Switzerland", code: "CH", city: "Zurich", currency: "CHF", colaIndex: 95 },
  { name: "Netherlands", code: "NL", city: "Amsterdam", currency: "EUR", colaIndex: 77 },
  { name: "Singapore", code: "SG", city: "Singapore", currency: "SGD", colaIndex: 88 },
  { name: "France", code: "FR", city: "Paris", currency: "EUR", colaIndex: 73 },
  { name: "Sweden", code: "SE", city: "Stockholm", currency: "SEK", colaIndex: 74 }
];

// Base salary ranges by profession category and experience level (in local currency)
const baseSalariesByCategory = {
  "AI & Machine Learning": {
    junior: { min: 45000, max: 65000, avg: 55000 },
    mid: { min: 65000, max: 90000, avg: 77500 },
    senior: { min: 90000, max: 130000, avg: 110000 },
    lead: { min: 120000, max: 160000, avg: 140000 }
  },
  "Software Engineering": {
    junior: { min: 40000, max: 58000, avg: 49000 },
    mid: { min: 58000, max: 82000, avg: 70000 },
    senior: { min: 82000, max: 120000, avg: 101000 },
    lead: { min: 110000, max: 150000, avg: 130000 }
  },
  "Data & Analytics": {
    junior: { min: 42000, max: 60000, avg: 51000 },
    mid: { min: 60000, max: 80000, avg: 70000 },
    senior: { min: 80000, max: 110000, avg: 95000 },
    lead: { min: 105000, max: 140000, avg: 122500 }
  },
  "Cloud & Infrastructure": {
    junior: { min: 43000, max: 61000, avg: 52000 },
    mid: { min: 61000, max: 85000, avg: 73000 },
    senior: { min: 85000, max: 125000, avg: 105000 },
    lead: { min: 115000, max: 155000, avg: 135000 }
  },
  "Cybersecurity": {
    junior: { min: 44000, max: 62000, avg: 53000 },
    mid: { min: 62000, max: 88000, avg: 75000 },
    senior: { min: 88000, max: 130000, avg: 109000 },
    lead: { min: 120000, max: 160000, avg: 140000 }
  },
  "Product & Management": {
    junior: { min: 48000, max: 68000, avg: 58000 },
    mid: { min: 68000, max: 95000, avg: 81500 },
    senior: { min: 95000, max: 140000, avg: 117500 },
    lead: { min: 130000, max: 180000, avg: 155000 }
  },
  "Design & UX": {
    junior: { min: 38000, max: 54000, avg: 46000 },
    mid: { min: 54000, max: 76000, avg: 65000 },
    senior: { min: 76000, max: 105000, avg: 90500 },
    lead: { min: 100000, max: 135000, avg: 117500 }
  },
  "QA & Testing": {
    junior: { min: 36000, max: 50000, avg: 43000 },
    mid: { min: 50000, max: 68000, avg: 59000 },
    senior: { min: 68000, max: 95000, avg: 81500 },
    lead: { min: 90000, max: 120000, avg: 105000 }
  },
  "Blockchain & Web3": {
    junior: { min: 50000, max: 72000, avg: 61000 },
    mid: { min: 72000, max: 105000, avg: 88500 },
    senior: { min: 105000, max: 150000, avg: 127500 },
    lead: { min: 140000, max: 190000, avg: 165000 }
  },
  "AR/VR & Game Dev": {
    junior: { min: 39000, max: 55000, avg: 47000 },
    mid: { min: 55000, max: 78000, avg: 66500 },
    senior: { min: 78000, max: 110000, avg: 94000 },
    lead: { min: 105000, max: 140000, avg: 122500 }
  }
};

// Skills organized by profession category with skill bonus amounts
const skillsByCategory = {
  "AI & Machine Learning": [
    { name: "Python", bonus: 5000 }, { name: "TensorFlow", bonus: 8000 },
    { name: "PyTorch", bonus: 8000 }, { name: "MLOps", bonus: 10000 },
    { name: "AWS/Azure", bonus: 7000 }, { name: "Deep Learning", bonus: 9000 },
    { name: "Kubernetes", bonus: 6000 }, { name: "GPU Programming", bonus: 12000 }
  ],
  "Software Engineering": [
    { name: "JavaScript/TypeScript", bonus: 6000 }, { name: "React", bonus: 5000 },
    { name: "Node.js", bonus: 5000 }, { name: "Go", bonus: 7000 },
    { name: "Rust", bonus: 8000 }, { name: "AWS", bonus: 6000 },
    { name: "Docker", bonus: 4000 }, { name: "Kubernetes", bonus: 6000 }
  ],
  "Data & Analytics": [
    { name: "SQL", bonus: 5000 }, { name: "Python", bonus: 6000 },
    { name: "Tableau", bonus: 4000 }, { name: "Spark", bonus: 8000 },
    { name: "PowerBI", bonus: 4000 }, { name: "Snowflake", bonus: 7000 },
    { name: "R", bonus: 5000 }, { name: "AWS Athena", bonus: 6000 }
  ],
  "Cloud & Infrastructure": [
    { name: "AWS", bonus: 7000 }, { name: "Azure", bonus: 7000 },
    { name: "GCP", bonus: 7000 }, { name: "Terraform", bonus: 8000 },
    { name: "Docker", bonus: 4000 }, { name: "Kubernetes", bonus: 6000 },
    { name: "Linux", bonus: 3000 }, { name: "CI/CD", bonus: 5000 }
  ],
  "Cybersecurity": [
    { name: "Network Security", bonus: 6000 }, { name: "Penetration Testing", bonus: 9000 },
    { name: "SIEM", bonus: 5000 }, { name: "CISSP", bonus: 10000 },
    { name: "Cloud Security", bonus: 8000 }, { name: "Incident Response", bonus: 7000 },
    { name: "Vulnerability Assessment", bonus: 5000 }, { name: "IAM", bonus: 6000 }
  ],
  "Product & Management": [
    { name: "Agile/Scrum", bonus: 4000 }, { name: "Jira", bonus: 2000 },
    { name: "Roadmapping", bonus: 5000 }, { name: "User Research", bonus: 4000 },
    { name: "Analytics", bonus: 5000 }, { name: "Stakeholder Management", bonus: 6000 },
    { name: "P&L Management", bonus: 8000 }, { name: "Product Strategy", bonus: 7000 }
  ],
  "Design & UX": [
    { name: "Figma", bonus: 3000 }, { name: "Adobe Creative Suite", bonus: 3000 },
    { name: "User Research", bonus: 5000 }, { name: "Prototyping", bonus: 4000 },
    { name: "Design Systems", bonus: 6000 }, { name: "Usability Testing", bonus: 4000 },
    { name: "HTML/CSS", bonus: 3000 }, { name: "Accessibility", bonus: 4000 }
  ],
  "QA & Testing": [
    { name: "Selenium", bonus: 4000 }, { name: "Cypress", bonus: 4000 },
    { name: "Test Automation", bonus: 5000 }, { name: "API Testing", bonus: 4000 },
    { name: "Performance Testing", bonus: 5000 }, { name: "JIRA", bonus: 2000 },
    { name: "Postman", bonus: 2000 }, { name: "Python", bonus: 5000 }
  ],
  "Blockchain & Web3": [
    { name: "Solidity", bonus: 10000 }, { name: "Ethereum", bonus: 9000 },
    { name: "Smart Contracts", bonus: 10000 }, { name: "Web3.js", bonus: 7000 },
    { name: "IPFS", bonus: 5000 }, { name: "DeFi", bonus: 8000 },
    { name: "NFT", bonus: 6000 }, { name: "Rust", bonus: 7000 }
  ],
  "AR/VR & Game Dev": [
    { name: "Unity", bonus: 5000 }, { name: "Unreal Engine", bonus: 6000 },
    { name: "C#", bonus: 4000 }, { name: "C++", bonus: 5000 },
    { name: "Blender", bonus: 3000 }, { name: "ARKit", bonus: 5000 },
    { name: "ARCore", bonus: 5000 }, { name: "3D Modeling", bonus: 4000 }
  ]
};

// Helper: Generate slug from job title and location name
function generateSlug(jobTitle, locationName) {
  return `${jobTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}-salary-${locationName.toLowerCase()}`;
}

// Helper: Calculate location multiplier based on cost of living index
function getLocationMultiplier(colaIndex) {
  return 0.8 + (colaIndex / 100) * 0.4;
}

// Main generator function
function generateCalculators() {
  const calculators = [];
  let id = 1;

  for (const [category, jobTitles] of Object.entries(jobCategories)) {
    for (const jobTitle of jobTitles) {
      const locationSubset = locations.slice(0, 5);

      for (const loc of locationSubset) {
        const locMultiplier = getLocationMultiplier(loc.colaIndex);
        const categorySalaries = baseSalariesByCategory[category];
        const categorySkills = skillsByCategory[category];

        const baseSalary = {};
        const taxRate = {};
        const levels = Object.keys(categorySalaries);

        for (const level of levels) {
          const sal = categorySalaries[level];
          baseSalary[level] = {
            min: Math.round(sal.min * locMultiplier),
            max: Math.round(sal.max * locMultiplier),
            avg: Math.round(sal.avg * locMultiplier),
            currency: loc.currency
          };
          taxRate[level] = level === "junior" ? 0.25 : level === "mid" ? 0.30 : level === "senior" ? 0.35 : 0.40;
        }

        const shuffledSkills = [...categorySkills].sort(() => 0.5 - Math.random());
        const selectedSkills = shuffledSkills.slice(0, 4 + Math.floor(Math.random() * 3));

        const relatedJobSlugs = jobTitles
          .filter(jt => jt !== jobTitle)
          .slice(0, 3)
          .map(jt => generateSlug(jt, loc.name));

        const slug = generateSlug(jobTitle, loc.name);
        const metaTitle = `${jobTitle} Salary Calculator ${loc.name} 2026 | Free Tool`;
        const metaDescription = `Calculate your ${jobTitle} salary in ${loc.name}. Get accurate salary ranges for junior, mid-level, and senior positions. Updated for 2026.`;
        const h1 = `${jobTitle} Salary Calculator - ${loc.name}`;

        calculators.push({
          id,
          slug,
          jobTitle,
          location: loc.name,
          locationCode: loc.code,
          city: loc.city,
          metaTitle,
          metaDescription,
          h1,
          baseSalary,
          taxRate,
          costOfLiving: {
            index: loc.colaIndex,
            rent1Bedroom: Math.round(800 * locMultiplier),
            monthlyExpenses: Math.round(1200 * locMultiplier)
          },
          growthRate: {
            annual: 6 + Math.floor(Math.random() * 6),
            fiveYear: 30 + Math.floor(Math.random() * 30)
          },
          demandScore: 70 + Math.floor(Math.random() * 30),
          skills: selectedSkills,
          relatedJobs: relatedJobSlugs
        });

        id++;
      }
    }
  }

  return calculators;
}

const calculators = generateCalculators();

const output = {
  metadata: {
    version: "3.0.0",
    lastUpdated: new Date().toISOString().split("T")[0],
    totalCalculators: calculators.length,
    locations: locations.length,
    jobTitles: Object.values(jobCategories).flat().length,
    description: "Comprehensive programmatic SEO salary data for tech, AI, and engineering roles"
  },
  calculators
};

const outputPath = path.join(__dirname, "..", "data", "salaries.json");
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log(`Generated ${calculators.length} calculator entries`);
console.log(`Written to ${outputPath}`);
console.log(`Categories: ${Object.keys(jobCategories).length}`);
console.log(`Locations: ${locations.length}`);
console.log(`Job titles: ${Object.values(jobCategories).flat().length}`);