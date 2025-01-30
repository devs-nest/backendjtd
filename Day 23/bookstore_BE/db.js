// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

// global.require = require;

const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "bookstore",
  password: "123",
  port: 5433,
});

module.exports = pool