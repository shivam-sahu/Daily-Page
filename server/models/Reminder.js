const moongoose = require("mongoose");
const Schema = moongoose.Schema;

let d = new Date();

const ReminderSchema = new Schema({
  text : {
    type : String
  },

  user : {
    type : Schema.Types.ObjectId,
    ref : "users"
  },
  date : {
    type: Date
  }







});

module.exports = Reminder = moongoose.model("reminder", ReminderSchema )