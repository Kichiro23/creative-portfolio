import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true, maxlength: 255 },
    company: { type: String, required: [true, "Company is required"], trim: true, maxlength: 255 },
    type: {
      type: String,
      enum: ["fulltime", "parttime", "freelance", "contract"],
      default: "freelance",
    },
    location: { type: String, trim: true, maxlength: 255 },
    startDate: { type: String, trim: true, maxlength: 50 },
    endDate: { type: String, trim: true, maxlength: 50 },
    current: { type: Boolean, default: false },
    description: { type: String, trim: true },
    highlights: { type: String, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

experienceSchema.index({ order: 1 });

export default mongoose.model("Experience", experienceSchema);
