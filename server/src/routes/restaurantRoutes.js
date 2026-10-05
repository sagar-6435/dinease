const express = require('express');
const multer = require('multer');
const restaurantController = require('../controllers/restaurantController');
const { protect, restrictTo } = require('../middleware/auth');
const Restaurant = require('../models/Restaurant');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// TEMP: Mock auth middleware to automatically use the first restaurant in DB
router.use(async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findOne();
    req.user = { restaurantId: restaurant ? restaurant._id : '64b0f0b4a4f8d4e4f8d4e4f8' };
    next();
  } catch (err) {
    next(err);
  }
});

router.post('/menu', upload.single('image'), restaurantController.createMenuItem);
router.get('/menu', restaurantController.getMenu);

module.exports = router;
