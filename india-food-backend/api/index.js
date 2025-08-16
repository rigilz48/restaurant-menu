const express = require('express');
const cors = require('cors');
const foodmenuRoutes = require('../routes/foodmenuRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', foodmenuRoutes);

module.exports = app;
