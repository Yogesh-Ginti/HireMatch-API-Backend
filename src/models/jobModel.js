import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  description: String,
  location: String,
  salaryRange: String,
  jobType: { type: String, enum: ['full-time', 'part-time', 'internship', 'contract'] },
  category: String,  // e.g., "it-jobs", "sales-jobs"
  requirements: [String],  // List of skills or qualifications
  createdAt: { type: Date, default: Date.now },
});

const jobModel = mongoose.model('Job', jobSchema);
export default jobModel;
