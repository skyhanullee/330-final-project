const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  company: { type: String },
  salary: { type: Number },
  createdAt: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  url: { type: String },
});


module.exports = mongoose.model("jobs", jobSchema);
