const router = require('express').Router();
const passport = require('passport');


// Auth Login 
router.get('/login', (req, res) => {
    res.render('login');
});
    

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport 
    req.logout();
    res.redirect('/');
})


// Auth with google 
router.get('/google', passport.authenticate('google', { 
    scope: ['https://www.googleapis.com/auth/userinfo.profile',
'https://www.googleapis.com/auth/userinfo.email'],
accessType: 'offline', approvalPrompt: 'force' }));


// Call back route for google to redirect to 
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    res.redirect('/profile');
})

module.exports = router;