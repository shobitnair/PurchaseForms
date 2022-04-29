const Pool = require("pg").Pool;

const pool  = new Pool({
    user:"postgres",
    password:"Vrindavan123",
    host : "localhost",
    port:"5432",
    database:"demo"
});

module.exports = { pool };
