const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
const passport = require("passport");
const UserT = require("./models/User");
const ReminderT = require("./models/Reminder");

let apiKey = require("./config/credentials").SENDGRID_API_KEY;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(apiKey);

const CheckTimer = 180000; // 3 mins

function sendEmail(to, subject, body)
{
  const email = {
    to,
    from:"DailyPage@mail.com",
    subject,
    text : body,
    html : body
  }
  return sgMail.send(email);
}

setInterval(()=>{
  
  // serach Reminder
 ReminderT.find({}, (err,doc) => {
  if(!err)
  {
    let toBeSentArr = [];
    let curTime = new Date(Date.now() + (330 * 60000));
    console.log("cycle started at", new Date(curTime).toISOString())

    toBeSentArr = doc.filter((e) => ((new Date(e.date) - curTime >= 0) && (new Date(e.date) - curTime <= CheckTimer) ));
    toBeSentArr.forEach((x) => {
      UserT.findById(x.user).then((doc) => {
        let email = doc.email;
        sendEmail(email,"DialyPage Notification", `You Have A Reminder Set Up ... ${x.text} `).then(d => {
          console.log("Done", new Date(x.date).toISOString());

          }).catch(e => {
            console.log(e);
          });

      }).catch((e) => {
        console.log(e);

      })
    });

  }
 });


}, CheckTimer);


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
const Contact = require("./routes/api/contact");
app.use("/api/",Contact);
const Reminder = require("./routes/api/reminder");
app.use("/api/",Reminder);


const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on port ${port}`));
