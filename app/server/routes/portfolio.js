import express from "express";
import Skill from "../models/Skill.js";
import Experience from "../models/Experience.js";

const router = express.Router();

// GET /api/portfolio/skills
router.get("/skills", async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    res.json({ success: true, data: skills });
  } catch (err) {
    next(err);
  }
});

// GET /api/portfolio/experiences
router.get("/experiences", async (req, res, next) => {
  try {
    const experiences = await Experience.find().sort({ order: 1 });
    res.json({ success: true, data: experiences });
  } catch (err) {
    next(err);
  }
});

export default router;
