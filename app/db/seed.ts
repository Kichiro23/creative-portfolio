import { getDb } from "../api/queries/connection";
import { projects, skills, experiences } from "./schema";

async function seed() {
  const db = getDb();
  console.log("Seeding database...");

  // Seed projects
  const existingProjects = await db.select().from(projects);
  if (existingProjects.length === 0) {
    await db.insert(projects).values([
      {
        name: "CARP - Climate & Air Research Platform",
        slug: "carp",
        description: "Full-stack environmental monitoring platform delivering real-time weather, air quality, and multi-domain environmental data.",
        longDescription: "Developed at Bulacan State University, WeatherCarp integrates 5+ APIs (Open-Meteo, Google Gemini AI, REST Countries) for live data and AI assistance. Features include JWT + Google OAuth 2.0 authentication, interactive Leaflet.js maps, Chart.js visualizations, historical weather analysis (1940-present), AI chatbot assistant, and multi-domain monitoring.",
        image: "/project-carp.jpg",
        techStack: "React 19, TypeScript, Tailwind CSS, Node.js, Express, MongoDB, Vite, Leaflet.js, Chart.js",
        liveUrl: "https://weathercarp.com",
        featured: "true",
        order: 1,
      },
      {
        name: "Database Management System",
        slug: "dbms",
        description: "MySQL-based inventory management system with full CRUD operations and relational schemas.",
        longDescription: "Built a comprehensive inventory management system with structured data flows, relational database design, and full CRUD operations. Designed for small to medium businesses requiring organized data tracking.",
        image: "/project-dbms.jpg",
        techStack: "MySQL, SQL, Relational Schema Design",
        featured: "true",
        order: 2,
      },
    ]);
    console.log("Seeded projects");
  }

  // Seed skills
  const existingSkills = await db.select().from(skills);
  if (existingSkills.length === 0) {
    await db.insert(skills).values([
      { name: "Python", category: "Programming", proficiency: 95, order: 1 },
      { name: "JavaScript / TypeScript", category: "Programming", proficiency: 92, order: 2 },
      { name: "FastAPI", category: "Programming", proficiency: 88, order: 3 },
      { name: "SQL", category: "Programming", proficiency: 90, order: 4 },
      { name: "React 19", category: "Full Stack", proficiency: 90, order: 5 },
      { name: "Node.js / Express", category: "Full Stack", proficiency: 85, order: 6 },
      { name: "MongoDB", category: "Database", proficiency: 82, order: 7 },
      { name: "MySQL", category: "Database", proficiency: 88, order: 8 },
      { name: "AWS / GCP / Azure", category: "Cloud", proficiency: 80, order: 9 },
      { name: "Docker / Kubernetes", category: "Cloud", proficiency: 75, order: 10 },
      { name: "Figma / UI Design", category: "Creative", proficiency: 85, order: 11 },
      { name: "Tailwind CSS", category: "Creative", proficiency: 92, order: 12 },
      { name: "Cybersecurity", category: "Security", proficiency: 78, order: 13 },
      { name: "AI / Prompt Engineering", category: "AI", proficiency: 88, order: 14 },
    ]);
    console.log("Seeded skills");
  }

  // Seed experiences
  const existingExperiences = await db.select().from(experiences);
  if (existingExperiences.length === 0) {
    await db.insert(experiences).values([
      {
        title: "IT & Technical Support Specialist",
        company: "Freelance",
        type: "freelance",
        location: "Remote / Philippines",
        startDate: "2020",
        endDate: "Present",
        current: "true",
        description: "Delivered end-to-end IT services to 4+ clients covering network setup, hardware/software troubleshooting, website management, and performance monitoring.",
        highlights: "Managed cloud-hosted environments, ensured uptime and data integrity for client sites.",
        order: 1,
      },
      {
        title: "Social Media Manager",
        company: "Freelance",
        type: "freelance",
        location: "Remote / Philippines",
        startDate: "2022",
        endDate: "2024",
        current: "false",
        description: "Managed accounts for 5+ brands across food, retail, and events — handling content planning, creation, scheduling, and audience engagement.",
        highlights: "Consistently met weekly content deadlines across multiple clients without supervision.",
        order: 2,
      },
      {
        title: "Graphic Designer & Video Editor",
        company: "Freelance",
        type: "freelance",
        location: "Remote / Philippines",
        startDate: "2020",
        endDate: "2024",
        current: "false",
        description: "Produced 200+ graphic and video outputs (reels, AVPs, promotional clips, banners) for clients in food, retail, events, and service industries.",
        highlights: "Expert in Adobe Creative Suite and modern video editing workflows.",
        order: 3,
      },
      {
        title: "Lead Developer - CARP Platform",
        company: "Bulacan State University",
        type: "contract",
        location: "Malolos, Bulacan",
        startDate: "2025",
        endDate: "2026",
        current: "false",
        description: "Developed WeatherCarp, a full-stack environmental monitoring platform delivering real-time weather, air quality, and multi-domain environmental data to global users.",
        highlights: "Built with React 19 + TypeScript, Node.js/Express, MongoDB Atlas, integrated 5+ APIs, JWT + Google OAuth 2.0 authentication.",
        order: 4,
      },
    ]);
    console.log("Seeded experiences");
  }

  console.log("Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
