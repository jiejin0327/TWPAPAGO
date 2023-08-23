const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

const port = 3000;

app.use(express.json());
app.use(cors());

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '880327',
    database: 'taiwanpapago'
  });
  

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

// Create an endpoint that will return data from your database
app.get('/api/viewPoints/', (req, res) => {
  db.query('SELECT * FROM viewPoints ', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({error: err});
    } else {
      // res.send(results);
      console.log(results);
      res.json(results);
    }
  });
});

app.get('/api/viewPoints/:id', (req, res) => {
    db.query('SELECT * FROM viewPoints WHERE id = ?', [req.params.id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({error: err});
      } else {
        // res.send(results);
        console.log(results);
        res.json(results);
      }
    });
  });
  
  app.get('/api/passages/:viewPointId', (req, res) => {
    db.query('SELECT * FROM passages WHERE viewPointId = ?', [req.params.viewPointId], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({error: err});
      } else {
        // res.send(results);
        console.log(results);
        res.json(results);
      }
    });
  });
  
  app.listen(port, () => console.log(`App listening at http://localhost:${port}`));