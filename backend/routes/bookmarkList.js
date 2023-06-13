const { Router } = require("express");
const isAuthorized = require("../middleware/isAuthorized");
const bookmarkListDAO = require('../daos/bookmarkList');
const jobDAO = require('../daos/job');
const router = Router();

// BookmarkLists (requires authentication)
// Create: POST /bookmarkLists - open to all users
//  - Takes in userId.
//    BookmarkList should be created only once.
//    The bookmarkList should also have the userId of the user placing the bookmarkList.
router.post("/", isAuthorized, async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const isUserHaveBookmarkList = await bookmarkListDAO.getBookmarkListByUserId(userId);
    if (isUserHaveBookmarkList) {
      res.status(409).send({ message: 'bookmark list already exists' });
    }
    const newBookmarkList = await bookmarkListDAO.createBookmarkList(userId);
    console.log('bookmark list created');
    res.json(newBookmarkList);


    // const jobObj = req.body.job;
    // const jobId = jobObj.jobId;

    // if (!isUserHaveBookmarkList) {
    //   await bookmarkListDAO.createBookmarkList(userId);
    //   console.log('bookmark list created');
    // };

    // const jobFromDB = await jobDAO.getJobByJobId(jobId);
    // if (!jobFromDB) {
    //   await jobDAO.createJob(jobObj);
    //   console.log('job created')
    // };

    // await bookmarkListDAO.addJobToBookmarkList(userId, jobId);
    // res.status(200).json({ message: "Job added to bookmarked list." });
    // const jobs = req.body;
    // let total = 0;

    // for (const jobId of jobs) {
    //   let jobFromBookmarkList = await jobDAO.getJobByJobId(jobId);
    //   if (!jobFromBookmarkList) {
    //     return res.status(400).send({ message: 'Bad job _id.' });
    //   }
    //   else {
    //     total += jobFromBookmarkList.price;
    //   }
    // }

    // const bookmarkList = await bookmarkListDAO.createBookmarkList({
    //   userId: req.user._id,
    //   jobs: req.body,
    //   total: total
    // })
    // res.json(bookmarkList);
  } catch (e) {
    next(e);
  }
});

// BookmarkLists (requires authentication)
// Get an bookmarkList: GET /bookmarkList/:id - return an bookmarkList with the jobs array containing the full job objects rather than just their _id. 
//  - If the user is a normal user return a 404 if they did not place the bookmarkList. An admin user should be able to get any bookmarkList.
router.get("/:id", isAuthorized, async (req, res, next) => {
  try {
    const bookmarkListId = req.params.id;
    const userRoles = req.user;

    const bookmarkList = await bookmarkListDAO.getBookmarkListById(bookmarkListId);
    if (!bookmarkList) {
      res.status(400).send({ message: 'BookmarkList does not exist.' });
    }

    // return an bookmarkList with jobs array containing full job objects, not just their ids
    // if not admin, only return their own bookmarkLists for the specific user
    if (!userRoles.roles.includes('admin')) {
      if (req.user._id === bookmarkList.userId.toString()) {
        res.json(bookmarkList);
      }
      else {
        res.status(404).send({ message: 'Invalid user id' });
      }
    }

    if (userRoles.roles.includes('admin')) {
      return res.json(bookmarkList);
    }
    return res.status(404).send();
  } catch (e) {
    next(e);
  }
});

// BookmarkLists (requires authentication)
// Get all bookmarkLists: GET /bookmarkLists - return all the bookmarkLists made by the user making the request if not an admin user. 
//  - If they are an admin user it should return all bookmarkLists in the DB.
router.get("/", isAuthorized, async (req, res, next) => {
  try {
    const userRoles = req.user;
    if (!userRoles.roles.includes('admin')) {
      const userBookmarkList = await bookmarkListDAO.getBookmarkListByUserId(req.user._id);
      res.json(userBookmarkList);
    }
    else {
      const allBookmarkLists = await bookmarkListDAO.getAllBookmarkLists();
      res.json(allBookmarkLists);
    }
  } catch (e) {
    next(e);
  }
});


module.exports = router;
