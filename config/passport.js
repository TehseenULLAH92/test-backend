const GooglePlusTokenStrategy = require ('passport-google-plus-token');
const passport = require('passport'); // Import passport

// Google Oauth Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
  console.log("accessToken", accessToken);
  console.log("refreshToken", refreshToken);
  console.log("profile", profile);
}));