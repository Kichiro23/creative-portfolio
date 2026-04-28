import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/User.js";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import Experience from "../models/Experience.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    await Promise.all([
      User.deleteMany(),
      Project.deleteMany(),
      Skill.deleteMany(),
      Experience.deleteMany(),
    ]);
    console.log("Cleared existing data");

    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const admin = await User.create({
      name: "Rommel Andrei De Leon",
      email: process.env.ADMIN_EMAIL || "admin@portfolio.com",
      password: adminPassword,
      role: "admin",
    });
    console.log(`Admin created: ${admin.email}`);

    const projects = await Project.insertMany([
      {
        name: "CARP (Climate & Air Research Platform)",
        slug: "carp-weathercarp",
        description:
          "A full-stack environmental monitoring platform delivering real-time weather, air quality, and multi-domain environmental data to global users. Built for Bulacan State University.",
        longDescription:
          "Developed WeatherCarp, a comprehensive full-stack environmental monitoring platform. Features include Leaflet.js live maps, Chart.js visualizations, historical weather analysis (1940–present), AI chatbot assistant powered by Google Gemini, and multi-domain monitoring (atmospheric, aquatic, terrestrial, fire risk).",
        image: "/project-carp.jpg",
        techStack: "React 19, TypeScript, Tailwind CSS, Node.js, Express, MongoDB, Vite, Leaflet.js, Chart.js",
        liveUrl: "https://weathercarp.com",
        repoUrl: "https://github.com",
        featured: true,
        order: 1,
      },
      {
        name: "Database Management System",
        slug: "dbms-inventory",
        description: "A MySQL-based inventory management system with full CRUD operations, relational schemas, and structured data flows.",
        image: "/project-dbms.jpg",
        techStack: "MySQL, SQL, relational schema design",
        featured: false,
        order: 2,
      },
      {
        name: "Software System Designer",
        slug: "system-designer",
        description: "Designed end-to-end system architecture, UI/UX layout, and user flow for a functional software application from scratch.",
        image: "/project-system.jpg",
        techStack: "Figma, system architecture, technical documentation",
        featured: false,
        order: 3,
      },
      {
        name: "Python Mathematics Converter",
        slug: "python-math-converter",
        description: "A modular mathematics converter in Python applying OOP principles — encapsulation, abstraction, and reusable class structures.",
        image: "/project-python.jpg",
        techStack: "Python, OOP, modular architecture",
        featured: false,
        order: 4,
      },
    ]);
    console.log(`Seeded ${projects.length} projects`);

    const skills = await Skill.insertMany([
      { name: "Python (Advanced)", category: "Programming", proficiency: 95, order: 1 },
      { name: "JavaScript / TypeScript", category: "Programming", proficiency: 90, order: 2 },
      { name: "FastAPI", category: "Programming", proficiency: 85, order: 3 },
      { name: "SQL", category: "Programming", proficiency: 88, order: 4 },
      { name: "REST API Development", category: "Programming", proficiency: 92, order: 5 },
      { name: "API Integration", category: "Programming", proficiency: 90, order: 6 },
      { name: "Prompt Engineering", category: "Programming", proficiency: 80, order: 7 },
      { name: "React 19", category: "Full Stack", proficiency: 92, order: 8 },
      { name: "TypeScript", category: "Full Stack", proficiency: 90, order: 9 },
      { name: "Node.js", category: "Full Stack", proficiency: 88, order: 10 },
      { name: "Express", category: "Full Stack", proficiency: 90, order: 11 },
      { name: "MongoDB", category: "Full Stack", proficiency: 85, order: 12 },
      { name: "JWT Authentication", category: "Full Stack", proficiency: 88, order: 13 },
      { name: "OAuth 2.0", category: "Full Stack", proficiency: 82, order: 14 },
      { name: "MySQL", category: "Database", proficiency: 88, order: 15 },
      { name: "MongoDB Atlas", category: "Database", proficiency: 85, order: 16 },
      { name: "Relational Schema Design", category: "Database", proficiency: 90, order: 17 },
      { name: "CRUD Operations", category: "Database", proficiency: 92, order: 18 },
      { name: "Vector Databases", category: "Database", proficiency: 75, order: 19 },
      { name: "AWS", category: "Cloud", proficiency: 80, order: 20 },
      { name: "GCP", category: "Cloud", proficiency: 78, order: 21 },
      { name: "Azure", category: "Cloud", proficiency: 75, order: 22 },
      { name: "Docker", category: "Cloud", proficiency: 82, order: 23 },
      { name: "Kubernetes", category: "Cloud", proficiency: 70, order: 24 },
      { name: "CI/CD Pipelines", category: "Cloud", proficiency: 78, order: 25 },
      { name: "Network Setup", category: "IT & Systems", proficiency: 90, order: 26 },
      { name: "Hardware/Software Support", category: "IT & Systems", proficiency: 92, order: 27 },
      { name: "Website Management", category: "IT & Systems", proficiency: 88, order: 28 },
      { name: "System Administration", category: "IT & Systems", proficiency: 85, order: 29 },
      { name: "Cybersecurity Fundamentals", category: "Security", proficiency: 82, order: 30 },
      { name: "HIPAA Compliance", category: "Security", proficiency: 75, order: 31 },
      { name: "Data Privacy", category: "Security", proficiency: 80, order: 32 },
      { name: "Figma (UI/UX)", category: "Creative", proficiency: 88, order: 33 },
      { name: "Graphic Design", category: "Creative", proficiency: 92, order: 34 },
      { name: "Video Editing", category: "Creative", proficiency: 90, order: 35 },
      { name: "Tailwind CSS", category: "Creative", proficiency: 92, order: 36 },
      { name: "Chart.js", category: "Creative", proficiency: 85, order: 37 },
      { name: "Leaflet.js", category: "Creative", proficiency: 82, order: 38 },
    ]);
    console.log(`Seeded ${skills.length} skills`);

    const experiences = await Experience.insertMany([
      {
        title: "IT & Technical Support Specialist",
        company: "Freelance",
        type: "freelance",
        location: "Remote / Philippines",
        startDate: "2020",
        endDate: "Present",
        current: true,
        description: "Delivered end-to-end IT services to 4+ clients — covering network setup, hardware/software troubleshooting, website management, and performance monitoring. Managed cloud-hosted environments, ensuring uptime, data integrity, and smooth operations for client sites.",
        order: 1,
      },
      {
        title: "Social Media Manager",
        company: "Freelance",
        type: "freelance",
        location: "Remote / Philippines",
        startDate: "2022",
        endDate: "2024",
        current: false,
        description: "Managed accounts for 5+ brands across food, retail, and events — handling content planning, creation, scheduling, and audience engagement. Consistently met weekly content deadlines across multiple clients without supervision.",
        order: 2,
      },
      {
        title: "Graphic Designer & Video Editor",
        company: "Freelance",
        type: "freelance",
        location: "Remote / Philippines",
        startDate: "2020",
        endDate: "2024",
        current: false,
        description: "Produced 200+ graphic and video outputs (reels, AVPs, promotional clips, banners) for clients in food, retail, events, and service industries.",
        order: 3,
      },
    ]);
    console.log(`Seeded ${experiences.length} experiences`);

    console.log("\nSeed completed successfully!");
    console.log(`Admin credentials: ${admin.email} / ${adminPassword}`);
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
};

seedData();
