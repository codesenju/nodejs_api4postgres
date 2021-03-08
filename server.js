const express = require("express");
//const bodyParser = require("body-parser");
const cors = require("cors");
const port = 80
const app = express();

// Connect to postgresql instance
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "movie",
//password: <password>,
  port: 15432
});

app.use(cors());
//app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Health OK!')
  })

//Create Query
app.get("/api/v1/movies", (req, res) => {
    pool.query(
      `select * from basic fetch first 50 rows only`,
      [],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows);
      }
    );
  });
  app.get("/api/v1/movies/:title", (req, res) => {
    pool.query(
      `select * from basic where LOWER(primarytitle) like LOWER('%${req.params.title}%')`,
      [],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows);
      }
    );
  });

app.listen(port, () => {
  console.log(`Server is running on port `+ port);
});