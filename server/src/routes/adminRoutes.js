const express = require('express');
const adminController = require('../controllers/adminController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

// Apply auth and admin-only middleware to all routes
// TEMP: Disabled for rapid dev testing
// router.use(protect);
// router.use(restrictTo('SUPER_ADMIN'));

router.post('/restaurants', adminController.createRestaurant);
router.get('/restaurants', adminController.getAllRestaurants);

module.exports = router;
