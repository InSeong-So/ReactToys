// ------------------------------
// 게시판 백엔드
// ------------------------------
const express = require('express')
const app = express();
const server = require('http').createServer(app);
const PORT_NO = 3001
server.listen(PORT_NO, () => {
  console.log('서버 실행', `http://localhost:${PORT_NO}`);
});

// public 디렉토리 공개
app.use('/public', express.static('./public'));
app.get('/', (req, res) => {
  res.redirect(302, '/public');
});

// 웹 소켓 서버 실행
const socketio = require('socket.io');
const io = socketio.listen(server);

// 클라이언트가 접속했을 때의 이벤트 설정
io.on('connection', (socket) => {
  console.log('사용자 접속:', socket.client.id);
  // 메세지를 받으면
  socket.on('chat-msg', (msg) => {
    console.log('message:', msg);
    // 모든 클라이언트에게 전송
    io.emit('chat-msg', msg);
  });
});