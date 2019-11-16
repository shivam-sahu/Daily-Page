const express = require("express");
const router = express.Router();
const User = require('../../models/User');
// const Note = require('../../models/Notes');
const Reminder = require('../../models/Reminder');
const passport = require('passport');

const softDateMatch = (d1, d2) => d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDay() == d2.getDay();


// to get notes
router.get("/reminder",passport.authenticate('jwt',{session:false}),(req,res) => {
  const user = req.user.id;
  Reminder.find({user},(err,doc) =>{
    if(err) res.status(400).json({"msg":"faliure"});
    // res.send({"msg":"success","arr":doc});
    else {
      
    let arr = [];
    // let reqDate = new Date(req.body.timestamp);
    let reqDate = req.query.timestamp;
    console.log(req.query);
     // console.log("log",doc);
    arr = doc.filter((item) => item.date === reqDate);
    res.status(200).json({"msg":"success",arr});  
    }  
  });
});


// to add a note
router.post("/reminder",passport.authenticate('jwt',{session:false}),(req,res) => {
  const text = req.body.text;
  const user = req.user.id;
  // console.log(user, "    ", text)
  // const reqDate = new Date(req.body.date); // req has date in ISO string format
  const reqDate = req.body.timestamp;
  const newEntry = new Reminder({text,user,"date" : reqDate});

  newEntry.save((err,doc) => {
    if(err) res.status(400).json({"msg":"faliure"});
    else res.status(200).json({"msg":"success","reminderID":newEntry.id,"text":newEntry.text});
  });
});

// to delete a note
router.delete("/reminder",passport.authenticate('jwt',{session:false}),(req,res) => {
  const id = req.body.reminderID;
  // console.log(req.body)

  Reminder.deleteOne({_id:req.body.reminderID}, (err) => {
    if(err) res.status(400).json({"msg":"faliure"})
    else res.status(200).json({"msg":"success"});
    
  });

});

// to update 
router.put("/reminder",passport.authenticate('jwt',{session:false}),(req,res) => {

  const reminderID = req.body.reminderID
  const text = req.body.text;
  
  // console.log(noteID, text);
  Reminder.findOneAndUpdate({_id:reminderID},{text,"date": new Date(req.body.date)},{new:true}).then(doc => {
    
    res.status(200).json({"msg":"success","doc":doc});

  }).catch(err => {
    res.status(200).json({"msg":"faliure",err});

  })
});



module.exports = router;
