const express = require('express');
const cors = require('cors');
const foodmenuRoutes = require('../routes/foodmenuRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', foodmenuRoutes);

// ❌ Jangan pakai app.listen di Vercel
// ✅ Export handler
module.exports = app;
