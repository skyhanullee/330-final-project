const mongoose = require('mongoose');
const BookmarkList = require('../models/bookmarkList');
const Job = require('../models/job');

module.exports = {};

// should create a bookmarkList for the given user
module.exports.createBookmarkList = async (bookmarkListObj) => {
  const created = await BookmarkList.create(bookmarkListObj);
  if (!created) {
    return null;
  }
  return created;
};

// should get the bookmarkList back by the bookmarkListId, not userId
module.exports.getBookmarkListById = async (bookmarkListId) => {
  const bookmarkList = await BookmarkList.findOne({ _id: bookmarkListId }).lean();
  if (!bookmarkList) {
    return null;
  }
  const jobIds = bookmarkList.jobs;
  const jobs = await Job.find({ _id: { $in: jobIds } }).lean();

  let jobArray = [];
  jobIds.forEach(i => {
    const job = jobs.find(tempJob => tempJob._id.toString() === i.toString());
    jobArray.push(job);
  });
  bookmarkList.jobs = jobArray;
  return bookmarkList;
};

module.exports.getBookmarkListByUserId = async (userId) => {
  const bookmarkList = await BookmarkList.find({ userId: userId });
  if (!bookmarkList) {
    return null;
  }
  return bookmarkList;
}

// should get all bookmarkLists for userId
module.exports.getAllBookmarkLists = () => {
  const bookmarkLists = BookmarkList.find().lean();
  if (!bookmarkLists) {
    return null;
  }
  return bookmarkLists;
};

class BadDataError extends Error { };
module.exports.BadDataError = BadDataError;
