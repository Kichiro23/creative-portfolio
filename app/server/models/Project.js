import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Project name is required"], trim: true, maxlength: 255 },
    slug: { type: String, required: true, unique: true, trim: true, maxlength: 255 },
    description: { type: String, trim: true },
    longDescription: { type: String, trim: true },
    image: { type: String, trim: true, maxlength: 500 },
    techStack: { type: String, trim: true, maxlength: 500 },
    liveUrl: { type: String, trim: true, maxlength: 500 },
    repoUrl: { type: String, trim: true, maxlength: 500 },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

projectSchema.index({ order: 1 });
projectSchema.index({ featured: 1, order: 1 });

export default mongoose.model("Project", projectSchema);
