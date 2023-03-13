const express = require("express");
const Pool = require('pg').Pool
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432,
})

app.get("/", (req, res) => {

    pool.query('SELECT * FROM products', (error, results) => {

        if (error) throw error

        res.status(200).json(results.rows)
    })
});

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
