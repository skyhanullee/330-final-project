const { Router } = require("express");
const router = Router();
const jobDAO = require('../daos/job');
const isAuthorized = require("../middleware/isAuthorized");
const isPro = require("../middleware/isPro");

// Create: POST /jobs - restricted to users with the "pro" role
router.post("/", isAuthorized, isPro, async (req, res, next) => {
  // router.post("/", async (req, res, next) => {
  try {
    const job = req.body;
    if (!job) {
      res.status(400).send('No job given.');
    }

    const existingJob = await jobDAO.getJobByJobId(job.jobId);
    if (existingJob) {
      return res.status(409).send({ message: 'Job already saved.' });
    }

    const newJob = await jobDAO.createJob(job);
    res.status(200).json(newJob);
    console.log(newJob);

  } catch (e) {
    next(e);
  }
});
// router.post("/", async (req, res, next) => {
//   try {
//     const job = req.body;
//     if (!job) {
//       res.status(400).send('No job given.');
//     }
//     else {
//       const newJob = await jobDAO.createJob(job);
//       res.json(newJob, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       console.log(newJob);
//     }
//   } catch (e) {
//     next(e);
//   }
// });

// Get specific job: GET /jobs/:id - open to all users
router.get("/:id", isAuthorized, async (req, res, next) => {
  // router.get("/:id", async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const job = await jobDAO.getJobByJobId(jobId);
    if (!job) {
      res.status(404).send('Cannot find job from id.')
    }
    else {
      res.json(job);
    }
  } catch (e) {
    next(e);
  }
});

// Get all jobs: GET /jobs - open to all users
router.get("/", isAuthorized, async (req, res, next) => {
  // router.get("/", async (req, res, next) => {
  try {
    const jobs = await jobDAO.getAllJobs();
    res.json(jobs);
    // res.json({ msg: "get works!" });
  } catch (e) {
    next(e);
  }
});

// Update a note: PUT /jobs/:id - restricted to users with the "pro" role
router.put("/:id", isAuthorized, isPro, async (req, res, next) => {
  // router.put("/:id", async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const job = req.body;
    if (!job) {
      res.status
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
