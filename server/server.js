const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
const passport = require("passport");

//? express
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//? body paser middleware
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(cookieParser());

//? db config
const db  = require("./config/keys").mongoURI;

//? mongoose db
mongoose.Promise = global.Promise;
//? connecting to database
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to database..."))
  .catch(err => console.log(err));

// ? passport middleware
app.use(passport.initialize());

//? passport config
require('./config/passport')(passport);

//? use routes
const User = require("./routes/api/user");
app.use('/api/user', User);
const Note = require("./routes/api/note");
app.use("/api/",Note);


const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on port ${port}`));
