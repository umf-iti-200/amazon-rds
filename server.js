const express = require("express");
const bodyParser = require("body-parser")
const Pool = require('pg').Pool
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
})

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/books", (req, res) => {

    pool.query('SELECT * FROM books', (error, results) => {

        if (error) throw error

        res.status(200).json(results.rows)
    })
});

app.post("/api/books/create", (req, res) => {

    const body = req.body;

    const sql = "INSERT INTO books (title, author) VALUES ('"+body.title+"','"+body.author+"')"
    
    pool.query(sql, (error, results) => {

        if (error) throw error

        res.status(200).json(results.rows)
    })
});

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
