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
    if (isUserHaveBookmarkList.length > 0) {
      return res.status(409).send({ message: 'bookmarkList already exists' });
    }
    const newBookmarkList = await bookmarkListDAO.createBookmarkList(userId);
    res.json(newBookmarkList);
  } catch (e) {
    next(e);
  }
});

// BookmarkLists (requires authentication)
// GET /bookmarkLists - return bookmarkList made by the user making the request if not an admin user. 
//  - If they are an admin user, it should return all bookmarkLists in the DB.
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
      res.status(200).json(bookmarkList);
    }
  } catch (e) {
    next(e);
  }
});

// BookmarkLists (requires admin role)
// Get an bookmarkList: GET /bookmarkList/ - return an bookmarkList with the jobs array containing the full job objects rather than just their _id.
//  - If the user is a normal user return a 404. An admin user should be able to get any bookmarkList.
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

// should update bookmarkList by adding a job to the list
router.put("/:id", isAuthorized, async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    const paramsId = req.params.id.toString();
    const jobData = req.body;


    if (userId !== paramsId) {
      return res.status(404).send({ message: 'Invalid user id.' })
    }

    const jobObj = await jobDAO.getJobByJobId(jobData.jobId);

    if (!jobObj) {
      return res.status(400).send({ message: 'Job does not exist.' });
    }

    const updatedBookmarkList = await bookmarkListDAO.updateBookmarkListByUserId(userId, jobObj);
    if (!updatedBookmarkList) {
      // console.log('something went wrong with adding job to bookmarkList');
      return res.status(409).send('Something went wrong with adding to bookmarkList.');
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
