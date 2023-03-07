const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const { google: { clientID, clientSecret } } = require('./keys');

passport.use(
    new GoogleStrategy({
        // options for the google strat 
        clientID: clientID,
        clientSecret: clientSecret, 
        callbackURL: 'http://localhost:3000/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
            //Passport Call back function
            console.log('Passport call back function fired');
            console.log(profile);
        }
    ),
)