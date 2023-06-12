const mongoose = require('mongoose');

const bookmarkListSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  jobs: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'jobs' }], required: true },
  total: { type: Number, required: true }
});


module.exports = mongoose.model("bookmarkLists", bookmarkListSchema);
