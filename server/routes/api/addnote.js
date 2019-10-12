const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const Note = require('../../models/Notes');
const passport = require('passport');

router.get("/addnote",passport.authenticate('jwt',{session:false}),(req,res) => {

  res.json({
    "id":req.user.id,
    "full":req.user
  });



});

// router.get("/addnote",(req,res) => {
//   let user = User.findOne({"username":req.query["username"]});
//   let userid = 0
//   if(user)
//   {
//     userid = user._id;
  
//     let text = req.query["text"];
//     let reminders = [];
//     let obj = {"user":userid,"text":text,"remainders":reminders};
//     const newNote = new Note(obj);
//     newNote.save((err,doc) => {
//       if(err) res.status(400).send(err);
//       res.status(200).json({
//         "msg":"Success",
//         "user":user.username,
//         "text":text
//       })
//     })
//   }
//   else
//   {
//     res.status(400).json({"msg":"User Not Found"});
//   }
// });

module.exports = router;
