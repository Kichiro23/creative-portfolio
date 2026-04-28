import express from "express";
import { z } from "zod";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  email: z.string().email("Invalid email address").max(320),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
});

// POST /api/auth/register
router.post("/register", async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);

    const existing = await User.findOne({ email: data.email });
    if (existing) {
      res.status(409);
      throw new Error("Email already registered");
    }

    const user = await User.create(data);
    const token = generateToken({ id: user._id, email: user.email, role: user.role });

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/login
router.post("/login", async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await User.findOne({ email: data.email }).select("+password");
    if (!user) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    const isMatch = await user.comparePassword(data.password);
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    user.lastSignInAt = new Date();
    await user.save();

    const token = generateToken({ id: user._id, email: user.email, role: user.role });

    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/auth/me
router.get("/me", protect, async (req, res, next) => {
  try {
    res.json({ success: true, user: req.user });
  } catch (err) {
    next(err);
  }
});

export default router;
