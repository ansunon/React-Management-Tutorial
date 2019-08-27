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

connection.connect(); // 데이터 베이스 연결하는 부분
/* 파일 추가를 위해서 별도의 라이브러리가 필요하다.
   npm install --save multer 
   그리고 데이터베이스 연결이 된 뒷 부분에 소스를 작성해야한다. */
const multer = require('multer');
const upload = multer({dest: './upload'}); // upload 폴더안에 파일이 들어갈것이다.


app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM CUSTOMER WHERE isDeleted = 0", // 데이터가 삭제 안된 부분만 가져와야하므로 0만 가져와야한다.
    (err, rows, fields) => {
        res.send(rows);
    }
  )
});

// 사용자가 upload 안에 있는 파일을 보기 위해서 폴더를 공유할것이다.
// image 폴더에서 upload 폴더로 접근할수 있게 하는 것이다.
// image 폴더와 upload폴더와 mapping 되는 것이다.

app.use('/image', express.static('./upload'));


app.post('/api/customers', upload.single('image'), (req, res) => {

  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';

  let image = '/image/' + req.file.filename;
  
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows); 
    })
});

app.delete('/api/customers/:id', (req, res) => {
  let sql ='UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
  let params = [req.params.id];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`));