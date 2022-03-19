// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const catchAsync = require('../utils/catchAsync');
// const User = require('../models/user');

// router.get('/register', (req, res) => {
//     res.render('users/register');
// });

// // paasport ensures that username is unique
// // catching the error and flashing the meassge and redirecting to the register page
// router.post('/register', catchAsync(async (req, res, next) => {
//     try {
//         const { email, username, password } = req.body;
//         const user = new User({ email, username });
//         const registeredUser = await User.register(user, password);

//         // after registering we automatically have to login the user for this we use passport's builtin method login 
//         req.login(registeredUser, err => {
//             if (err) return next(err);
//             req.flash('success', 'Welcome to Yelp Camp!');
//             res.redirect('/campgrounds');
//         })
//     } catch (e) {
//         req.flash('error', e.message);
//         res.redirect('register');
//     }
// }));

// router.get('/login', (req, res) => {
//     res.render('users/login');
// })


// // authenticating the user using passport 
// // setting failure flash true, flashes a message when something goes wrong, failureredirect - redirects to specified route
// // when something goes wrong!!

// router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
//     req.flash('success', 'welcome back!');
//     const redirectUrl = req.session.returnTo || '/campgrounds';     // || is used coz if there is no previuos path like when user 
//     // directly tries to login then he will be directed to home page which is campgrounds here.

//     // delete is used to delete the path saved in the session 
//     delete req.session.returnTo;
//     res.redirect(redirectUrl);
// })

// router.get('/logout', (req, res) => {
//     req.logout();    // passport method to logout (does all the work apparently!.)
//     req.flash('success', "Goodbye!");
//     res.redirect('/campgrounds');
// })

// module.exports = router;









const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

module.exports = router;