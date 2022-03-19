const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');   // to catch the particular error sends the error if found and if not then next().

// exporting the middleware from middleware.js file
const { isLoggedIn, isAuthorized, validateCampground } = require('../middleware');    // middleware to check whether the user is logged in or not if nnot that will redirect to login page!

const Campground = require('../models/campground');
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer');
const { storage } = require('../cloudinary')
const upload =  multer({ storage })

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'),  validateCampground, catchAsync(campgrounds.createCampground))
    // .post(upload.array('image'), (req,res) => {
    //     console.log(req.body, req.files);
    //     res.send("it worked!!")
    // })

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthorized, upload.array('image'),  validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthorized, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthorized, catchAsync(campgrounds.renderEditForm))



module.exports = router;