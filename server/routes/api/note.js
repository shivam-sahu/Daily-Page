const express = require("express");
const router = express.Router();
const User = require('../../models/User');
// const Note = require('../../models/Notes');
const DiaryEntry = require('../../models/DiaryEntry');
const passport = require('passport');

// to get notes
router.get("/note",passport.authenticate('jwt',{session:false}),(req,res) => {
  const user = req.user.id;
  DiaryEntry.find({user},(err,doc) =>{
    if(err) res.status(400).json({"msg":"faliure"});
    res.send({"msg":"success","arr":doc});
  });

});


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



module.exports = router;
