const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
  },
  remainders: [
    {
      remTime: {
        type: Date,
        required: true
      },
      message: {
        type: String
      }
    }
  ]
});

module.exports = Notes = mongoose.model('notes', NotesSchema);