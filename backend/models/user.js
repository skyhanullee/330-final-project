const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: { type: [String], required: true },
  savedJobs: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'jobs' }], required: true },
});


module.exports = mongoose.model("users", userSchema);
