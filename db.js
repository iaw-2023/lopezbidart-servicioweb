const config = require('./config');
const { Pool } = require('pg');

let pool;

pool = new Pool({
  user: config.DB_USER,
  host: config.DB_HOST,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  port: config.DB_PORT,
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;