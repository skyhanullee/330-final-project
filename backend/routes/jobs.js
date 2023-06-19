const { Router } = require("express");
const router = Router();
const jobDAO = require('../daos/job');
const isAuthorized = require("../middleware/isAuthorized");
// const isAdmin = require("../middleware/isAdmin");
const uuid = require('uuid');

// Create: POST /jobs 
// Restricted to users with the "admin" role
router.post("/", isAuthorized, async (req, res, next) => {
  try {
    let editedJob;
    const job = req.body;
    if (!job) {
      res.status(400).send({ message: 'No job given.' });
    }

    let jobId;
    if (!req.body.jobId) {
      jobId = uuid.v4();
    }
    else {
      jobId = req.body.jobId;
    }

    const existingJob = await jobDAO.getJobByJobId(job.jobId);
    if (existingJob) {
      return res.status(409).send({ message: 'Job already saved.' });
    }

    editedJob = { ...job, jobId: jobId, userId: req.user?._id };

    await jobDAO.createJob(editedJob);
    res.status(200).json(editedJob);

  } catch (e) {
    next(e);
  }
});

// Get all jobs: GET /jobs 
// Open to all users
router.get("/", async (req, res, next) => {
  try {
    const jobs = await jobDAO.getAllJobs();
    res.json(jobs);
  } catch (e) {
    next(e);
  }
});

// Get specific job: GET /jobs/:id 
// Open to all users
router.get("/:id", isAuthorized, async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const job = await jobDAO.getJobByJobId(jobId);
    if (!job) {
      res.status(404).send({ message: 'Cannot find job from id.' })
    }
    else {
      res.json(job);
    }
  } catch (e) {
    next(e);
  }
});

// Update a note: PUT /jobs/:id 
// Restricted to users with the "admin" role
router.put("/:id", isAuthorized, async (req, res, next) => {
  try {
    const jobId = req.body.jobId;
    const paramsId = req.params.id;
    const jobData = req.body;
    const userId = req.user._id;
    if (!paramsId || !jobData) {
      res.status(400).send({ message: 'No job id / job data.' })
    }

    if (jobId !== paramsId) {
      return res.status(404).send({ message: 'Invalid job id.' })
    }

    const jobObj = await jobDAO.getJobByJobId(jobData.jobId);

    if (!jobObj) {
      return res.status(400).send({ message: 'Job does not exist.' });
    }
    const userRoles = req.user;
    if (!userRoles.roles.includes('admin')) {
      if (userId !== jobObj.userId) {
        return res.status(405).send({ message: 'Invalid user id.' });
      }
    }
    const isUpdated = await jobDAO.updateJobById(paramsId, jobData);
    if (!isUpdated) {
      res.status(400).send({ message: 'Not updated. Something went wrong.' });
    }
    else {
      res.status(200).send({ message: 'Job updated.' })
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
