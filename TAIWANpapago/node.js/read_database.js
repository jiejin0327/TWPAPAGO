const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const app = express();
require('dotenv').config();


const port = 3000;

app.use(express.json());
app.use(cors());

// Create a connection to the database
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  charset: 'utf8mb4'
  });


  db.connect((err) => {
    if (err) {
        console.error('Unable to connect to the database:', err);
    } else {
        console.log('Connected to the database successfully!');
    }
});

// 用於提供專案根目錄下的靜態文件，如 index.html
app.use(express.static(path.join(__dirname, '../')));
app.use('/image', express.static(path.join(__dirname, '../image')));


 // Start the server
 app.listen(port, () => console.log(`Server is running `));
 app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.use((req, res, next) => {
  console.log(`Received request for ${req.url}`);
  next();
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
  
 