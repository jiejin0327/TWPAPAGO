const mysql = require('mysql');
const fs = require('fs');

// 讀取 JSON 文件
const viewPointsData = JSON.parse(fs.readFileSync('../mysql/viewPoints.json', 'utf-8'));
const passagesData = JSON.parse(fs.readFileSync('../mysql/passages.json', 'utf-8'));

const dataArray = [];
for (let i = 0; i < viewPointsData.length; i++) {
  const viewPointItem = viewPointsData[i];
  const passagesForViewPoint = passagesData.filter(p => p.viewPointId === viewPointItem.id);

  dataArray.push({
    viewPoint: viewPointItem.name,
    viewPointImageUrl: viewPointItem.imageUrl,
    viewPointPhoto: viewPointItem.photoUrl,
    viewPointMap: viewPointItem.map,
    viewPointWeb: viewPointItem.web,
    passages: passagesForViewPoint.map(p => ({
      eng: p.eng,
      level: p.level,
      web: p.web,
      contents: p.contents,
      words: p.words
    }))
  });
}

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '880327',
  database: 'taiwanpapago'
});

connection.connect();

dataArray.forEach((data) => {
  const viewPointData = {
    name: data.viewPoint,
    imageUrl: data.viewPointImageUrl,
    photoUrl: data.viewPointPhoto,
    map: data.viewPointMap,
    web: data.viewPointWeb
  };

  connection.query('INSERT INTO viewPoints SET ?', viewPointData, (error, results) => {
    if (error) throw error;

    const viewPointId = results.insertId;

    data.passages.forEach((passage, idx) => {
        const passageData = {
          viewPointId: viewPointId,
          eng: passage.eng,
          level: passage.level,
          web: passage.web,
          content: JSON.stringify(passage.contents)  // Convert contents array to JSON string
      };
  
        connection.query('INSERT INTO passages SET ?', passageData, (error, results) => {
          if (error) throw error;
        });
      });
    });
  });
