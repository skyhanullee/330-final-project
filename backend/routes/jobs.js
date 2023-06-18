const { Router } = require("express");
const router = Router();
const jobDAO = require('../daos/job');
const isAuthorized = require("../middleware/isAuthorized");
const isAdmin = require("../middleware/isAdmin");
const uuid = require('uuid');

// Create: POST /jobs - restricted to users with the "admin" role
// router.post("/", isAuthorized, isAdmin, async (req, res, next) => {
router.post("/", isAuthorized, async (req, res, next) => {
  // router.post("/", async (req, res, next) => {
  try {
    const job = req.body;
    // console.log('POST: printing req.body')
    // console.log(job);

    let jobId;
    if (!req.body.jobId) {
      jobId = uuid.v4();
    }
    else {
      jobId = req.body.jobId;
    }
    if (!job) {
      res.status(400).send({ message: 'No job given.' });
    }

    // const existingJob = await jobDAO.getJobByJobId(job.jobId);
    // if (existingJob) {
    //   return res.status(409).send({ message: 'Job already saved.' });
    // }

    const editedJob = { ...job, jobId: jobId };

    await jobDAO.createJob(editedJob);
    res.status(200).json(editedJob);
    // console.log(job.jobId);
    // console.log(editedJob);

  } catch (e) {
    next(e);
  }
});

// Get all jobs: GET /jobs - open to all users
router.get("/", async (req, res, next) => {
  // router.get("/", async (req, res, next) => {
  try {
    const jobs = await jobDAO.getAllJobs();
    res.json(jobs);
    // console.log(res.body);
    // res.json({ msg: "get works!" });
  } catch (e) {
    next(e);
  }
});

// Get specific job: GET /jobs/:id - open to all users
router.get("/:id", isAuthorized, async (req, res, next) => {
  // router.get("/:id", async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const job = await jobDAO.getJobByJobId(jobId);
    // const job = await jobDAO.getJobById(jobId);
    if (!job) {
      res.status(404).send({ message: 'Cannot find job from id.' })
    }
    else {
      res.json(job);
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// Update a note: PUT /jobs/:id - restricted to users with the "admin" role
// router.put("/:id", isAuthorized, isAdmin, async (req, res, next) => {
router.put("/:id", isAuthorized, async (req, res, next) => {
  // router.put("/:id", async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const job = req.body;
    if (!jobId || !job) {
      res.status(400).send({ message: 'No job id / job data.' })
    }
    const isUpdated = await jobDAO.updateJobById(jobId, job);
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
