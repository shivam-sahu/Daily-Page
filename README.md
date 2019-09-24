# Daily Page

Digital Diary with features to keep notes and add remainders.

## To Build

Firstly install dependencies using `npm install` and `npm run client-install`, use `npm run dev` to start both react and node dev servers together , \
react server is on port 5000 while node server is on port 3000 (localhost)

## Keys

Add keys in "./config/credentials.js" and export them

```javascript
module.exports = {
  mongoURI: "mongodb://<dbuser>:<dbpassword>@ds127646.mlab.com:27646/articulus",
  secretOrKey: "secretkey"
};
```
