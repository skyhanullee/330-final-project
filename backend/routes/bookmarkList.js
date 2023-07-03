const { Router } = require("express");
const isAuthorized = require("../middleware/isAuthorized");
// const isAdmin = require("../middleware/isAdmin");
const bookmarkListDAO = require('../daos/bookmarkList');
const jobDAO = require('../daos/job');
const User = require("../models/user");
const router = Router();
const mongoose = require('mongoose');

// Create: POST /bookmarkLists 
// Open to all users
// Takes in userId.
// BookmarkList should be created only once.
// The bookmarkList should also have the userId of the user placing the bookmarkList.
router.post("/", isAuthorized, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const isUserHaveBookmarkList = await bookmarkListDAO.getBookmarkListByUserId(userId);
    if (isUserHaveBookmarkList.length > 0) {
      return res.status(409).send({ message: 'bookmarkList already exists' });
    }
    const newBookmarkList = await bookmarkListDAO.createBookmarkList(userId);
    res.json(newBookmarkList);
  } catch (e) {
    next(e);
  }
});

// Get bookmark list: GET /bookmarkLists 
// Return bookmarkList made by the user making the request if not an admin user. 
// If they are an admin user, it should return all bookmarkLists in the DB.
router.get("/", isAuthorized, async (req, res, next) => {
  try {
    const user = req.user;

    // return a bookmarkList 
    // admin: return all bookmarkLists
    if (user.roles.includes('admin')) {
      const allBookmarkLists = await bookmarkListDAO.getAllBookmarkLists();
      res.status(200).json(allBookmarkLists);
    }

    // normal user: only return their own bookmarkLists for the specific user
    if (!user.roles.includes('admin')) {
      const bookmarkList = await bookmarkListDAO.getBookmarkListByUserId(user._id);
      // if bookmarkList does not exist for user
      if (bookmarkList[0] === undefined) {
        return res.status(400).send({ message: 'BookmarkList does not exist.' });
      }
      const savedJobs = [];
      for (let i of bookmarkList[0].jobs) {
        // console.log(i);
        savedJobs.push(await jobDAO.getJobById(i));
      }
      // console.log(savedJobs);
      // res.status(200).json(bookmarkList);
      res.status(200).json(savedJobs);
    }
  } catch (e) {
    next(e);
  }
});

// Get an bookmarkList: GET /bookmarkList/ 
// Return an bookmarkList with the jobs array containing the full job objects rather than just their _id.
// If the user is a normal user return a 404. An admin user should be able to get any bookmarkList.
router.get("/:id", isAuthorized, async (req, res, next) => {
  try {
    const userRoles = req.user;
    if (!userRoles.roles.includes('admin')) {
      res.status(404).send();
    }
    if (userRoles.roles.includes('admin')) {
      const userBookmarkList = await bookmarkListDAO.getBookmarkListByUserId(req.user._id);
      res.json(userBookmarkList);
    }
  } catch (e) {
    next(e);
  }
});

// add a job to bookmark list: PUT /update/:id 
// Should update bookmarkList by adding a job to the list
// :id is userId
router.put("/update", isAuthorized, async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    const jobData = req.body;
    console.log(jobData.jobId);

    // if job is from user posted jobs, check if job exists first
    const jobFromDB = await jobDAO.getJobByJobId(jobData.jobId);

    if (!jobFromDB) {
      // if the job is from Adzuna, add job to jobs collection
      if (jobData.isAdzuna) {
        // TODO: ADD ADZUNA JOB TO JOBS COLLECTION SO THAT IT CAN BE REFERENCED.
        // IT WILL CAUSE AN ERROR SINCE THE FUNCTION LOOKS FOR JOB DATA FROM JOBS DB
        // BUT THE DATA WAS FROM ADZUNA AND NEVER STORED.
        const newJob = await jobDAO.createJob(jobData);
      }
    }

    const updatedBookmarkList = await bookmarkListDAO.updateBookmarkListByUserId(userId, jobFromDB.jobId);
    // }
    if (!updatedBookmarkList) {
      return res.status(409).send('Something went wrong with adding to bookmarkList.');
    };
    return res.json(updatedBookmarkList);
  }
  catch (e) {
    console.log(e);
    next(e);
  }
});

/**
// add a job to bookmark list: PUT /update/:id 
// Should update bookmarkList by adding a job to the list
// :id is userId
router.put("/update", isAuthorized, async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    const jobData = req.body;
    let updatedBookmarkList;

    // if the job is from Adzuna, update bookmark list right away
    if (jobData.isAdzuna) {
      // TODO: ADD ADZUNA JOB TO JOBS DB SO THAT IT CAN BE REFERENCED.
      // IT WILL CAUSE AN ERROR SINCE THE FUNCTION LOOKS FOR JOB DATA FROM JOBS DB
      // BUT THE DATA WAS FROM ADZUNA AND NEVER STORED.
      const newJob = await jobDAO.createJob(jobData);
      console.log('BOOKMARK ROUTES: ' + newJob);
      updatedBookmarkList = await bookmarkListDAO.updateBookmarkListByUserId(userId, jobData.jobId);
    }
    // if job is from user posted jobs, check if job exists first
    else {
      const jobFromDB = await jobDAO.getJobByJobId(jobData.jobId);
      updatedBookmarkList = await bookmarkListDAO.updateBookmarkListByUserId(userId, jobFromDB.jobId);
    }
    if (!updatedBookmarkList) {
      return res.status(409).send('Something went wrong with adding to bookmarkList.');
    };
    return res.json(updatedBookmarkList);
  }
  catch (e) {
    console.log(e);
    next(e);
  }
});
 */

// add a job to bookmark list: PUT /update/:id 
// Should update bookmarkList by adding a job to the list
// :id is userId
router.put("/update/:id", isAuthorized, async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    // const paramsId = req.params.id.toString();
    const jobData = req.body;

    // console.log(`=-=-=-===-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-`)
    // console.log(jobData);

    if (userId !== paramsId) {
      return res.status(404).send({ message: 'User did not create this bookmark list. Cannot update.' })
    }

    const jobObj = await jobDAO.getJobByJobId(jobData.jobId);
    // console.log(`=-=-=-===-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-`)
    // console.log(jobObj);

    // if (!jobObj) {
    //   return res.status(400).send({ message: 'Job does not exist.' });
    // }

    const updatedBookmarkList = await bookmarkListDAO.updateBookmarkListByUserId(userId, jobObj.jobId);
    if (!updatedBookmarkList) {
      return res.status(409).send('Something went wrong with adding to bookmarkList.');
    };

    return res.json(updatedBookmarkList);
  }
  catch (e) {
    console.log(e);
    next(e);
  }
});

// Delete a job from bookmark list: PUT /delete/:id 
// Should update bookmarkList by removing a job from the list
// :id is userId
router.delete("/delete", isAuthorized, async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    // const paramsId = req.params.id.toString();
    const jobData = req.body;
    // const jobId = req.body.jobId;

    // console.log(userId, paramsId);
    // console.log(await User.findOne({ _id: userId }));
    // console.log(await User.findOne({ _id: paramsId }));
    // if (userId !== paramsId) {
    //   return res.status(404).send({ message: 'User did not create this bookmark list. Cannot update.' })
    // }

    const jobFromDB = await jobDAO.getJobByJobId(jobData.jobId);
    console.log(jobFromDB);

    if (!jobFromDB) {
      return res.status(400).send({ message: 'Job does not exist.' });
    }

    const removedJob = await bookmarkListDAO.removeJobFromBookmarkList(userId, jobFromDB._id);
    // console.log(removedJob);
    if (!removedJob) {
      return res.status(409).send('Something went wrong with removing from bookmarkList.');
    }
    else if (removedJob.message) {
      return res.status(409).send(removedJob.message);
    }

    return res.json(removedJob);
  }
  catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
