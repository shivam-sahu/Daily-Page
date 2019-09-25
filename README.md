# Daily Page

A Digital Diary is a simple way to keep your personal thoughts and feelings both accessible and private, giving you a confidential way to express yourself.

## To Build

Firstly install dependencies using `npm install` and `npm run client-install`, use `npm run dev` to start both React and Node dev servers together , \
React server is on port 5000 while Node server is on port 3000 (localhost)

## Keys

Add keys in "./config/credentials.js" and export them

```javascript
module.exports = {
  mongoURI: "mongodb://<dbuser>:<dbpassword>@ds127646.mlab.com:27646/articulus",
  secretOrKey: "secretkey"
};
```
