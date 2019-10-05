# Daily Page

A Digital Diary is a simple way to keep your personal thoughts and feelings both accessible and private, giving you a confidential way to express yourself.

## To Build

Firstly install dependencies (both back-end and front-end) using `npm run install-dep`, use `npm run dev` to start both react and node dev servers together , \
react server is on port 8000 while node server is on port 3001 (localhost)

## Keys

Add keys in "./config/credentials.js" and export them

```javascript
module.exports = {
  mongoURI: "mongodb://<dbuser>:<dbpassword>@ds113849.mlab.com:13849/daily-page",
  secretOrKey: "secretkey"
};
```
