const express = require("express");
const router = express.Router();
const passport = require('passport');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const keys = require("../../config/keys");

const User = require('../../models/User');

//!test
router.get('/test', (req, res) => {
  res.json({
    msg: "wo this works."
  })
})

//* post requests

//? register api
router.post("/register", (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        return res.status(400).json({ username: "Already registered" });
      } else {
        const newUser = new User(req.body);

        newUser.save((err, doc) => {
          if (err) res.status(400).send(err);
          res.status(200).json({
            registered: true,
            msg: "Account created"
          })
        })
      }
    })

});

//? login api
router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }).then(user => {
    if (!user) {
      return res.status(404).json({ username: "User not found" });
    }

    // Compare password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched

        //payload with username
        const payload = { username: user.username, id : user.id };

        // sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 * 24 * 3 },
          (err, token) => {

            res.send({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        res.status(400).json({ password: "Password Incorrect" });
      }
    });
  });
});

// router.post("/postquestion", passport.authenticate('jwt', { session: false }), (req, res) => {
//   // const questionsToPost = {};
//   // const questionSet = req.user.questionsToPost;
//   const questionSet = req.body;
//   res.json({ questionSet });
// });

// router.post("/updateQuestion", (req, res) => {
//   console.log(req.body)
//   // res.json(req.body)
//   Questions.findOneAndUpdate({ username: req.body.username })
//     .then()
// })

//*get



module.exports = router;