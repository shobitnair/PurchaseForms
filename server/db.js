const Pool = require('pg').Pool;

const pool  = new Pool({
    user:"postgres",
    password:"Vrindavan123",
    host:"34.100.245.249",
    port:"5432",
    database:"demo"
});

module.exports = {pool};