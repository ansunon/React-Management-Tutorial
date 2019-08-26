const fs = require('fs'); // 파일에 접근하기 위한 변수
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data); //  환경 변수를 파싱
const mysql = require('mysql'); // mysql 라이브러리를 불러와서 mysql 변수에 넣는다.

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
})

app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM CUSTOMER", 
    (err, rows, fields) => {
        res.send(rows);
    }
  )
});

app.listen(port, () => console.log(`Listening on port ${port}`));