const router = require('express').Router();
const passport = require('passport');


// Auth Login 
router.get('/login', (req, res) => {
    res.render('login');
});
    

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport 
    res.send('logging out');
})


// Auth with google 
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))


// Call back route for google to redirect to 
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('you reached the callback URI')
})

module.exports = router;