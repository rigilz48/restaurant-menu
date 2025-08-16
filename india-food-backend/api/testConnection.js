// api/testConnection.js
const pool = require('../config/connectionver'); // sesuaikan path

export default async function handler(req, res) {
  try {
    const result = await pool.query('SELECT NOW()');
    res.status(200).json({
      success: true,
      message: 'PostgreSQL Connected',
      serverTime: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Connection failed',
      error: error.message,
    });
  }
}
