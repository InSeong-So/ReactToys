// ------------------------------
// 게시판 백엔드
// ------------------------------
const path = require('path');
const NeDB = require('nedb');
const db = new NeDB({
  filename: path.join(__dirname, 'wiki.db'),
  autoload: true
});
const express = require('express');
const app = express();
const PORT_NO = 3001;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT_NO, () => {
  console.log('서버 실행', `http://localhost:${PORT_NO}`);
});

// API 정의
// 위키 데이터 응답
app.get('/api/get/:wikiname', (req, res) => {
  const wikiname = req.params.wikiname;
  db.find({ name: wikiname }, (err, docs) => {
    if (err) {
      res.json({ status: false, msg: err });
      return;
    }
    if (docs.length === 0) {
      docs = [{ name: wikiname, body: '' }];
    }
    res.json({ status: true, data: docs[0] });
  });
});

// 위키 데이터 작성
app.post('/api/put/:wikiname', (req, res) => {
  const wikiname = req.params.wikiname;
  console.log('/api/put' + wikiname, req.body);
  // 기존에 존재하는 엔트리인가?
  db.find({ name: wikiname }, (err, docs) => {
    if (err) {
      res.json({ status: false, msg: err });
      return;
    }
    const body = req.body.body;
    if (docs.length === 0) {
      // 엔트리가 없으면 추가해야지
      db.insert({ name: wikiname, body });
    } else {
      // 있으면 수정해야지
      db.update({ name: wikiname }, { name: wikiname, body });
    }
    res.json({ status: true });
  });
});


// public 디렉토리 공개
app.use('/wiki/:wikiname', express.static('./public'));
app.use('/edit/:wikiname', express.static('./public'));
app.get('/', (req, res) => {
  res.redirect(302, '/wiki/FrontPage');
});