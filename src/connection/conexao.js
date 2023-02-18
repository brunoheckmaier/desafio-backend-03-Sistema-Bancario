const { Pool } = require('pg')
require('dotenv').config


const pool = new Pool({
    // host: process.env.DB_HOST,
    // port: process.env.DB_PORT,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASS,
    // database: process.env.DB_DATABASE

    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '2319',
    database: 'dindin',

})

module.exports = pool