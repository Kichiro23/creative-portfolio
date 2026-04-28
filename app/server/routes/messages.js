import express from "express";
import { z } from "zod";
import Message from "../models/Message.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

const messageSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  email: z.string().email("Invalid email").max(320),
  subject: z.string().max(255).optional(),
  content: z.string().min(1, "Message is required"),
});

// GET /api/messages — admin only
router.get("/", protect, adminOnly, async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (err) {
    next(err);
  }
});

// GET /api/messages/unread-count — admin only
router.get("/unread-count", protect, adminOnly, async (req, res, next) => {
  try {
    const count = await Message.countDocuments({ read: false });
    res.json({ success: true, data: count });
  } catch (err) {
    next(err);
  }
});

// POST /api/messages — public contact form
router.post("/", async (req, res, next) => {
  try {
    const data = messageSchema.parse(req.body);
    const message = await Message.create(data);
    res.status(201).json({ success: true, data: message });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/messages/:id/read — admin only
router.patch("/:id/read", protect, adminOnly, async (req, res, next) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!message) {
      res.status(404);
      throw new Error("Message not found");
    }
    res.json({ success: true, data: message });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/messages/:id — admin only
router.delete("/:id", protect, adminOnly, async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      res.status(404);
      throw new Error("Message not found");
    }
    res.json({ success: true, message: "Message deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
