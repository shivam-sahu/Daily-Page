const express = require("express");
const router = express.Router();
const User = require('../../models/User');
// const Note = require('../../models/Notes');
const DiaryEntry = require('../../models/DiaryEntry');
const passport = require('passport');


// to add a note
router.post("/note",passport.authenticate('jwt',{session:false}),(req,res) => {
  const text = req.body.text;
  const user = req.user.id;
  const newEntry = new DiaryEntry({text,user});

  newEntry.save((err,doc) => {
    if(err) res.status(400).json({"msg":"faliure"});

    res.status(200).json({"msg":"success","noteID":newEntry.id});
  });
});

// to delete a note
router.delete("/note",passport.authenticate('jwt',{session:false}),(req,res) => {
  const id = req.body.noteID;
  DiaryEntry.remove({_id:req.body.noteID}, (err) => {
    if(err) res.status(400).json({"msg":"faliure"});

    res.status(200).json({"msg":"success"});
    
  });

});

// to update 
router.patch("/note",passport.authenticate('jwt',{session:false}),(req,res) => {

  const noteID = req.body.noteID
  const text = req.body.text;
  
  DiaryEntry.findOneAndUpdate({_id:noteID},{text,"date":Date.now()},{new:true}).then(doc => {
    
    res.status(200).json({"msg":"success"});

  }).catch(err => {
    res.status(200).json({"msg":"faliure"});

  })


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
