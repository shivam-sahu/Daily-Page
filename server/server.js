const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
const passport = require("passport");

const app = express();

app.use(bodyParser.json());
// app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(passport.initialize());

// require('./config/passport')(passport);


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("server is running!");
});