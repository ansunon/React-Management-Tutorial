const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/customers', (req, res) => {
    res.send([
    {
      'id': '1',
      'image': 'https://placeimg.com/64/64/any',
      'name': '홍길동',
      'birthday': '999999',
      'gender': '여자',
      'job': '대학원생'
    },
    {
      'id': '2',
      'image': 'https://placeimg.com/64/64/1',
      'name': '김철수',
      'birthday': '12345',
      'gender': '남자',
      'job': '대학원'
    },
    {
      'id': '3',
      'image': 'https://placeimg.com/64/64/2',
      'name': '김영희',
      'birthday': '123456',
      'gender': '여자',
      'job': '대학원생'
    }
    ])
});

app.listen(port, () => console.log(`Listening on port ${port}`));