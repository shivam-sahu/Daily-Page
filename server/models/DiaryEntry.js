const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiaryEntrySchema = new Schema({
  text: {
    type: String
  },

  user : {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  date: {
    type: Date,
    default: Date.now
  }




});

module.exports = DiaryEntry = mongoose.model("diaryEntry", DiaryEntrySchema)  