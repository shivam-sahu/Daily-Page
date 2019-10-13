const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
    
},
  mobile:[ {
    type: String
  }],
  email: { type: String, unique: true},

});

module.exports = Contact = mongoose.model("conatcts", ContactSchema);