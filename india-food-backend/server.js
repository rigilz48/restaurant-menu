const express = require('express');
const cors = require('cors');
const foodmenuRoutes = require('./routes/foodmenuRoutes');

const app = express();

const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/api', foodmenuRoutes);

app.listen(port, () => {
  console.log(`Server Berjalan di Port : ${port}`);
});
