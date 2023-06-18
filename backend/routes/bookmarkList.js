const { Router } = require("express");
const isAuthorized = require("../middleware/isAuthorized");
const isAdmin = require("../middleware/isAdmin");
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
    const userId = req.user._id;
    const isUserHaveBookmarkList = await bookmarkListDAO.getBookmarkListByUserId(userId);
    // console.log(isUserHaveBookmarkList.length);
    if (isUserHaveBookmarkList.length > 0) {
      // console.log('bookmark already exists');
      return res.status(409).send({ message: 'bookmark list already exists' });
    }
    const newBookmarkList = await bookmarkListDAO.createBookmarkList(userId);
    // console.log('bookmark list created');
    // console.log(newBookmarkList)
    res.json(newBookmarkList);
  } catch (e) {
    next(e);
    // console.log(e);
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
      console.log('not admin');
      return res.json(userBookmarkList);
    }
    if (userRoles.roles.includes('admin')) {
      const allBookmarkLists = await bookmarkListDAO.getAllBookmarkLists();
      console.log('admin');

      return res.json(allBookmarkLists);
    }
    return res.status(404).send();
  } catch (e) {
    next(e);
  }
});

// BookmarkLists (requires authentication)
// Get an bookmarkList: GET /bookmarkList/:id - return an bookmarkList with the jobs array containing the full job objects rather than just their _id. 
//  - If the user is a normal user return a 404 if they did not place the bookmarkList. An admin user should be able to get any bookmarkList.
router.get("/:id", isAuthorized, async (req, res, next) => {
  try {
    // const bookmarkListId = req.params.id;
    const userId = req.params.id;
    const userRoles = req.user;

    // const bookmarkList = await bookmarkListDAO.getBookmarkListById(bookmarkListId);
    const bookmarkList = await bookmarkListDAO.getBookmarkListByUserId(userId);
    // console.log(`bookmark something soemthing${bookmarkList[0]}`);
    const bookmarkListJobs = await bookmarkListDAO.getBookmarkListById(bookmarkList[0]._id);

    if (!bookmarkList) {
      return res.status(400).send({ message: 'BookmarkList does not exist.' });
    }

    // return an bookmarkList with jobs array containing full job objects, not just their ids
    // if not admin, only return their own bookmarkLists for the specific user
    if (!userRoles.roles.includes('admin')) {
      if (req.user._id === bookmarkList[0].userId.toString()) {
        // console.log(bookmarkList);
        return res.json(bookmarkList);
      }
      else {
        return res.status(404).send({ message: 'Invalid user id' });
      }
    }

    if (userRoles.roles.includes('admin')) {
      console.log('user is admin')
      return res.json(bookmarkListJobs);
    }
    return res.status(404).send();
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// should update bookmark list by adding a job to the list
router.put("/:id", isAuthorized, async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    const paramId = req.params.id.toString();
    const jobData = req.body;

    console.log(userId.toString(), paramId.toString());

    if (userId.toString() !== paramId.toString()) {
      console.log('user not the same')
      return res.status(404).send({ message: 'Invalid user id.' })
    }

    let jobObj = await jobDAO.getJobByJobId(jobData.jobId);

    if (!jobObj) {
      return res.status(400).send({ message: 'Job does not exist.' });
    }

    const updatedBookmarkList = await bookmarkListDAO.updateBookmarkListByUserId(userId, jobObj);
    if (!updatedBookmarkList) {
      console.log('something went wrong with adding job to bookmark list');
      return res.status(409).send('Something went wrong with adding to bookmark list.');
    };

    // console.log(updatedBookmarkList);
    return res.json(updatedBookmarkList);
    // return res.status(403).send({ message: 'Invalid user id.' })

  }
  catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
