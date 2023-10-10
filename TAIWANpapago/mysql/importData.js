const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
require('dotenv').config();


// 讀取 JSON 檔案
const passagesPath = path.join(__dirname, 'passages.json');
const viewPointsPath = path.join(__dirname,'viewPoints.json');

const viewPointsData = JSON.parse(fs.readFileSync(viewPointsPath, 'utf-8'));
const passagesData = JSON.parse(fs.readFileSync(passagesPath, 'utf-8'));


// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  charset: 'utf8mb4'
});


connection.connect((err) => {
  if (err) {
      console.error('importData.js unable to connect to the database:', err);
  } else {
      console.log('importData.js connected to the database successfully!');
  }
});


// 創建資料表

const createViewPointTable = `
CREATE TABLE IF NOT EXISTS viewPoints (
  id INT PRIMARY KEY,
  name TEXT,
  imageUrl TEXT,
  photoUrl TEXT,
  map TEXT,
  web TEXT
)CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;`

const createPassageTable = `
CREATE TABLE IF NOT EXISTS passages (
  id INT PRIMARY KEY,
  viewPointId INT,
  idx INT,
  eng TEXT,
  level INT,
  web TEXT,
  contents TEXT,
  words TEXT,
  FOREIGN KEY (viewPointId) REFERENCES viewPoints(id)
)CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;`;

// Function to promisify the query
function queryAsync(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results, fields) => {
      if (error) reject(error);
      else resolve({ results, fields });
    });
  });
}

(async () => {
  try {
    await queryAsync('DROP TABLE IF EXISTS passages');
    console.log('Passages table dropped.');

    await queryAsync('DROP TABLE IF EXISTS viewPoints');
    console.log('ViewPoints table dropped.');

    await queryAsync(createViewPointTable);
    console.log('ViewPoints table created.');

    await queryAsync(createPassageTable);
    console.log('Passages table created.');


    // 將資料寫入 viewpoints 表格
    const viewPointSQL = 'INSERT INTO viewPoints SET ?';
    const insertData = (index) => {
        if (index < viewPointsData.length) {
            connection.query(viewPointSQL, viewPointsData[index], (err, result) => {
                if (err) throw err;
                insertData(index + 1);
            });
        } else {
            console.log('ViewPoints data inserted.');
            insertPassageData(0);  // 繼續插入 passages 表的資料
        }
    }

    const passageSQL = 'INSERT IGNORE INTO passages SET ?';
    const insertPassageData = (index) => {
        if (index < passagesData.length) {
            const passage = passagesData[index];
            // passage.contents = JSON.stringify(passage.contents);
            // passage.words = JSON.stringify(passage.words);
            connection.query(passageSQL, passage, (err, result) => {
                if (err) throw err;
                insertPassageData(index + 1);
            });
        } else {
            console.log('passagesData data inserted.');
            connection.end();
        }
    }

    insertData(0);  // 首先插入 viewpoints 表的資料

  } catch (error) {
    console.error(error);
  }
})();

