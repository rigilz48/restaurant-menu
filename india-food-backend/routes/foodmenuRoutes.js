const express = require('express');
const router = express.Router();

const {
  getAllFoodMenu,
  getSlugFoodMenu,
} = require('../controllers/foodmenuControllers');

router.get('/menus', getAllFoodMenu);
router.get('/menus/:slug', getSlugFoodMenu);

module.exports = router;
