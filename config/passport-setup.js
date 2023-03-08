const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/User');

const { google: { clientID, clientSecret } } = require('./keys');

passport.serializeUser((user, done) => {
    console.log('serializing user');
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
})

passport.use(
    new GoogleStrategy({
        // options for the google strat 
        clientID: clientID,
        clientSecret: clientSecret, 
        callbackURL: 'http://localhost:3000/auth/google/redirect'
    },  async (accessToken, refreshToken, profile, done) => {
            //Passport Call back function
            console.log('Passport call back function fired');
            const oldUser = await User.findOne({googleId: profile.id});


            if(oldUser) {
                // Already have the user
                console.log('User is' + oldUser);
                done(null, oldUser);
            } else {
                // if not create user in our db 
                const newUser = await new User({
                    username: profile.displayName, 
                    googleId: profile.id,   
                    thumbnail: profile._json.picture
                }).save();
                done(null, newUser);
            }
        }
    ),
)
