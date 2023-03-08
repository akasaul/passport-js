const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const { mongo: {uri}, session: {cookieKeys} } = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

// set up view engine 

app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, 
    keys: [ cookieKeys ]
}))


// initialize passport 
app.use(passport.initialize());
app.use(passport.session())

// Connect to mongodb 
mongoose.connect(uri)
    .then(() => console.log('Mongodb connected'))
    .catch((err) => console.log(err));

// set up routes 
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes);


// create home route 
app.get('/', (req, res) => {
    res.render('home');
})

app.listen(3000, () => {
    console.log('app listening on port 3000')
})