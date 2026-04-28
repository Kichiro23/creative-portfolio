import express from "express";
import { z } from "zod";
import Project from "../models/Project.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

const projectSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  description: z.string().optional(),
  longDescription: z.string().optional(),
  image: z.string().max(500).optional(),
  techStack: z.string().max(500).optional(),
  liveUrl: z.string().max(500).optional(),
  repoUrl: z.string().max(500).optional(),
  featured: z.boolean().default(false),
  order: z.number().optional(),
});

const updateSchema = projectSchema.partial().extend({ id: z.string().min(1) });

// GET /api/projects — public list
router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
});

// GET /api/projects/featured — public featured
router.get("/featured", async (req, res, next) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ order: 1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
});

// GET /api/projects/:slug — public single
router.get("/:slug", async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
});

// POST /api/projects — admin only
router.post("/", protect, adminOnly, async (req, res, next) => {
  try {
    const data = projectSchema.parse(req.body);
    const project = await Project.create(data);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
});

// PUT /api/projects/:id — admin only
router.put("/:id", protect, adminOnly, async (req, res, next) => {
  try {
    const data = updateSchema.parse({ ...req.body, id: req.params.id });
    const { id, ...updateData } = data;
    const project = await Project.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/projects/:id — admin only
router.delete("/:id", protect, adminOnly, async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }
    res.json({ success: true, message: "Project deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
