// ------------------------------
// 게시판 백엔드
// ------------------------------
const NeDB = require('nedb');
const path = require('path');

const db = new NeDB({
  filename: path.join(__dirname, 'sis.db'),
  autoload: true
});

// 서버 실행
const express = require('express');
const app = express();
const PORT_NO = 3001;
app.listen(PORT_NO, () => {
  console.log('서버 실행', `http://localhost:${PORT_NO}`);
});

// public 디렉토리 내용을 자동으로 응답
app.use('/public', express.static('./public'));
// 최상위 페이지에 접속하면 /public으로 리다이렉트
app.get('/', (req, res) => {
  res.redirect(302, '/public');
});

// API 정의
// 로그 추출 API
app.get('/api/getItems', (req, res) => {
  // 데이터베이스에 저장된 데이터를 시간 순서로 정렬하여 응답
  db.find({}).sort({ stime: 1 }).exec((err, data) => {
    if (err) {
      sendJSON(res, false, { logs: [], msg: err });
      return;
    }
    sendJSON(res, true, { logs: data });
  });
});

// 로그 작성 API
app.get('/api/write', (req, res) => {
  const q = req.query;
  // URL 매개변수로 받은 값을 DB에 저장
  db.insert({
    name: q.name,
    body: q.body,
    stime: (new Date()).getTime()
  }, (err, doc) => {
    if (err) {
      console.log(err);
      sendJSON(res, false, { msg: err });
      return;
    }
    sendJSON(res, true, { id: doc._id });
  });
})


function sendJSON(res, result, obj) {
  obj['result'] = result;
  res.json(obj);
}