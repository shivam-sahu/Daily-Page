const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String
  },
  contact: [
    {
      phone: {
        type: String,
      }
    }
  ],
  address: {
    type: String
  },
  follow: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: users
      }
    }
  ]
})

module.exports = Profile = mongoose.model("profiles", ProfileSchema);