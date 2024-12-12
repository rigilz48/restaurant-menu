const { Pool } = require('pg');

const pool = new Pool({
  host: 'aws-0-ap-southeast-1.pooler.supabase.com',
  user: 'postgres.dyaqudmgsdiluhagipii',
  database: 'postgres',
  password: 'RZHJiYe85zFUXoPA',
  port: '6543',
  max: 20,
  idleTimeoutMillis: 2000,
  connectionTimeoutMillis: 2000,
});

module.exports = pool;
