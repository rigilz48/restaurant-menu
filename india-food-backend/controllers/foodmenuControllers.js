const pool = require('../config/connection');

const getAllFoodMenu = async (request, response) => {
  try {
    // Ambil query parameter untuk pagination
    const page = parseInt(request.query.page, 10) || 1; // Halaman default 1
    const limit = parseInt(request.query.limit, 10) || 8; // Limit default 8 data per halaman
    const offset = (page - 1) * limit; // Hitung offset berdasarkan halaman
    const searchQuery = request.query.search || ''; // Query pencarian

    // SQL queries
    const GET_MENUS_QUERY = `SELECT * FROM menu_makanan WHERE nama_makanan ILIKE $1 ORDER BY id_makanan LIMIT $2 OFFSET $3`;
    const COUNT_MENUS_QUERY = `SELECT COUNT(*) FROM menu_makanan WHERE nama_makanan ILIKE $1`;

    // Query untuk mengambil data sesuai limit dan offset, dan search query
    const result = await pool.query(GET_MENUS_QUERY, [
      `%${searchQuery}%`,
      limit,
      offset,
    ]);

    // Query untuk menghitung total data di tabel sesuai search query
    const totalResult = await pool.query(COUNT_MENUS_QUERY, [
      `%${searchQuery}%`,
    ]);
    const totalMenus = parseInt(totalResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalMenus / limit);

    // Mengembalikan data dalam format JSON
    response.json({
      data: result.rows, // Data menu
      currentPage: page, // Halaman saat ini
      totalPages: totalPages, // Total halaman
      totalData: totalMenus, // Total data
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Server error' });
  }
};

const getSlugFoodMenu = async (request, response) => {
  try {
    // SQL queries
    const GET_MENU_BY_SLUG_QUERY = `SELECT * FROM menu_makanan WHERE slug = $1`;

    const result = await pool.query(GET_MENU_BY_SLUG_QUERY, [
      request.params.slug,
    ]);
    const dataResult = result.rows[0];

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

module.exports = { getAllFoodMenu, getSlugFoodMenu };
