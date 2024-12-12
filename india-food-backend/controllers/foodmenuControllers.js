const pool = require('../config/connection');

const getAllfoodmenu = async (request, response) => {
  try {
    const result = await pool.query(`SELECT * FROM menu_makanan`);

    let dataResult = result.rows;

    response.json(dataResult);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Server error' });
  }
};

const getSlugfoodmenu = async (request, response) => {
  try {
    const result = await pool.query(
      `SELECT * FROM menu_makanan WHERE slug = $1`,
      [request.params.slug]
    );

    let dataResult = result.rows[0];

    if (!dataResult) {
      response.status(404).json({ message: 'Data Not Found' });
    } else {
      response.json(dataResult);
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllfoodmenu, getSlugfoodmenu };
