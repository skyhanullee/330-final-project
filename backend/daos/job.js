const mongoose = require('mongoose');
const Job = require('../models/job');

module.exports = {};

// should create a job for the given user (only pro users can create jobs)
module.exports.createJob = async (jobObj) => {
  const created = await Job.create(jobObj);
  if (!created) {
    return null;
  }
  return created;
};

// should get job for jobId (jobId)
module.exports.getJobByJobId = async (jobId) => {
  const job = await Job.findOne({ jobId: jobId }).lean();
  if (!job) {
    return null;
  }
  return job;
};

// should get all jobs for userId
module.exports.getAllJobs = async () => {
  const jobs = await Job.find().lean();
  if (!jobs) {
    return null;
  }
  return jobs;
};

module.exports.updateJobById = async (jobId, jobObj) => {
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return false;
  }
  await Job.updateOne({ jobId: jobId }, jobObj);
  return true;
};

class BadDataError extends Error { };
module.exports.BadDataError = BadDataError;
