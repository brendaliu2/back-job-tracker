
// Import the express in typescript file
import express from 'express';

// Initialize the express engine
const app: express.Application = express();

/** Database setup for tracker. */

const { Client } = require("pg");

const DB_URI = process.env.NODE_ENV === "test"
    ? "postgresql:///tracker_test"
    : "postgresql:///tracker";

let db = new Client({
  connectionString: DB_URI
});

db.connect();


// Take a port 3000 for running server.
const port: number = 8080;

// process JSON body => req.body
app.use(express.json());

// process traditional form data => req.body
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});




// Handling '/' Request
app.get('/', (_req, _res) => {
    _res.send("TypeScript With Express");
});

//Return JSON [{handle: ... , career_page: ..., last_visited: ...}, ...]
app.get('/companies', async ( _req, _res ) => {
    _res.header("Access-Control-Allow-Origin", "*");
    _res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const results = await db.query(
        // `SELECT *
        //   FROM companies
        //   ORDER BY last_visted asc`
        `SELECT *
          FROM companies`
    );
    const page: object = results.rows;

    _res.json(page);
});

//adds new company and link to db
app.post('/companies', async (_req, _res) => {
    _res.header("Access-Control-Allow-Origin", "*");
    _res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const newCompany = _req.body.name;
    const newLink = _req.body.link;

    const duplicateCheck = await db.query(
        `SELECT handle
          FROM companies
          WHERE LOWER(handle) = LOWER('${newCompany}')`

    )
    if (duplicateCheck.rows.length) {
        _res.json('Duplicate Error')
        // _res.json(duplicateCheck)
    } else {
        const results = await db.query(
            `INSERT INTO companies (handle, career_page)
              VALUES ('${newCompany}', '${newLink}')
              RETURNING handle`
        );
        _res.json(results.rows);
    }
})

//Edits company last visited timestamp
app.patch('/:company', async (_req, _res) => {
    _res.header("Access-Control-Allow-Origin", "*");
    _res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const company = _req.params.company;
    const results = await db.query(
        `UPDATE companies
            SET last_visited=CURRENT_TIMESTAMP
            WHERE LOWER(handle)='${company}'
            RETURNING handle, last_visited`
    );
    _res.json(results.rows);
})

// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);
});