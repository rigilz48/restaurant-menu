const express = require('express');
const router = express.Router();

const {
  getAllfoodmenu,
  getSlugfoodmenu,
} = require('../controllers/foodmenuControllers');

router.get('/menus', getAllfoodmenu);
router.get('/menus/:slug', getSlugfoodmenu);

module.exports = router;
