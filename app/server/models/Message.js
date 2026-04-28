import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true, maxlength: 255 },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      maxlength: 320,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    subject: { type: String, trim: true, maxlength: 255 },
    content: { type: String, required: [true, "Message content is required"], trim: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

messageSchema.index({ createdAt: -1 });
messageSchema.index({ read: 1 });

export default mongoose.model("Message", messageSchema);
