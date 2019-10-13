const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Note = require("../../models/Notes");
const Contact = require("../../models/Contact");
const DiaryEntry = require("../../models/DiaryEntry");
const passport = require("passport");


// to get all contacts
router.get("/contact",passport.authenticate('jwt',{session:false}),(req,res) => {
    const user = req.user.id;
    Contact.find({user},(err,doc) =>{
      if(err) res.status(400).json({"msg":"faliure"});
      res.send({"msg":"success","arr":doc});
    });
  
  });
  



// to add a contact  (crash if not provided valid detalis)
router.post(
  "/contact",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newContact = new Contact({
      name: req.body.name,
      user: req.user.id,
      mobile: req.body.mobile,
      email: req.body.email
    });

    newContact.save((err, doc) => {
      if (err) res.status(400).json({ msg: "faliure" });
      res.status(200).json({ msg: "success", contactID: newContact.id });
    });
  }
);


// to delete a contact
router.delete("/contact",passport.authenticate('jwt',{session:false}),(req,res) => {
    const id = req.body.contactID;
    Contact.remove({_id:req.body.contactID}, (err) => {
      if(err) res.status(400).json({"msg":"faliure"});
      res.status(200).json({"msg":"success"}); 
    });
  });

// to update  a contact
router.patch("/contact",passport.authenticate('jwt',{session:false}),(req,res) => {

    const contactID = req.body.contactID
    res.status(200).json(req.body);

    Contact.findOneAndUpdate({_id:contactID},req.body, {new:true}).then(doc => { 
      res.status(200).json({"msg":"success"});
    }).catch(err => {
      res.status(200).json({"msg":"faliure"});
    })
  
  
  });

module.exports = router;
