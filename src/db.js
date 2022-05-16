const { Pool } = require("pg");
require("dotenv").config();

let localConfig = {
  user: "grace",
  password: "",
  host: "localhost",
  port: "5432",
  database: "tododb",
};
const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
  : localConfig;

const pool = new Pool(poolConfig);

module.exports = pool;
