import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Skill name is required"], trim: true, maxlength: 255 },
    category: { type: String, required: [true, "Category is required"], trim: true, maxlength: 100 },
    proficiency: { type: Number, default: 0, min: 0, max: 100 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

skillSchema.index({ category: 1, order: 1 });

export default mongoose.model("Skill", skillSchema);
