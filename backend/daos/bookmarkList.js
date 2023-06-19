const mongoose = require('mongoose');
const BookmarkList = require('../models/bookmarkList');
const Job = require('../models/job');

module.exports = {};

// should create a bookmarkList for the given user
module.exports.createBookmarkList = async (userId) => {
  const created = await BookmarkList.create({ userId: userId });
  if (!created) {
    return null;
  }
  return created;
};

module.exports.getBookmarkListByUserId = async (userId) => {
  try {
    const bookmarkList = await BookmarkList.find({ userId: userId });
    if (!bookmarkList) {
      return null;
    }
    return bookmarkList;
  }
  catch (e) {
    if (e.message.includes('validation failed')) {
      throw new BadDataError(e.message);
    }
    throw e;
  }
};

// should get all bookmarkLists
module.exports.getAllBookmarkLists = () => {
  const bookmarkLists = BookmarkList.find().lean();
  if (!bookmarkLists) {
    return null;
  }
  return bookmarkLists;
};

// should add job to bookmarkList
module.exports.updateBookmarkListByUserId = async (userId, jobId) => {
  let bookmarkList = BookmarkList.findOne({ userId: userId });
  if (!bookmarkList) {
    return null;
  }

  // bookmarkList.jobs?.push(jobId);
  bookmarkList.updateOne(
    { userId: userId },
    { $addToSet: { jobs: jobId } },
  );
  return bookmarkList;
};

// should delete job from bookmarkList
module.exports.removeJobFromBookmarkList = async (userId, jobId) => {
  const bookmarkList = await bookmarkList.findOne({ user: userId });
  if (!bookmarkList) {
    return false;
  }
  const index = bookmarkList.jobs.indexOf(jobId);
  if (index === -1) {
    return false;
  }
  bookmarkList.jobs.splice(index, 1);
  await bookmarkList.save();
  return true;
};

class BadDataError extends Error { };
module.exports.BadDataError = BadDataError;
