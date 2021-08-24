import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles';
const io = require('socket.io-client');
const socket = io('http://localhost:3001');

// 입력 양식
class ChatForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      message: '',
    }
  }
  nameChanged(e) {
    this.setState({
      name: e.target.value
    });
  }
  messageChanged(e) {
    this.setState({
      message: e.target.value,
    });
  }
  // 서버에 이름, 메세지 전송
  send() {
    socket.emit('chat-msg', {
      name: this.state.name,
      message: this.state.message
    });
    this.setState({ message: '' })
  }
  render() {
    return (
      <div stlye={styles.form}>
        이름:<br />
        <input type="text"
          value={this.state.name}
          onChange={e => {
            this.nameChanged(e);
          }} /><br />
        메세지:<br />
        <input type="text"
          value={this.state.message}
          onChange={e => {
            this.messageChanged(e);
          }} /><br />
        <button onClick={e => this.send()}>전송</button>
      </div>
    )
  }
}

class ChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: []
    }
  }

  componentDidMount() {
    // 실시간 로그 수신 설정
    socket.on('chat-msg', obj => {
      const logs2 = this.state.logs;
      obj.key = 'key_' + (this.state.logs.length + 1);
      console.log(obj);
      // 로그에 추가
      logs2.unshift(obj);
      this.setState({
        logs: logs2
      });
    })
  }

  render() {
    // 로그를 사용하여 HTML 요소를 생성
    const messages = this.state.logs.map(e => {
      return (
        <div key={e.key} style={styles.log}>
          <span style={styles.name}>{e.name}</span>
          <span style={styles.msg}>{e.message}</span>
          <p style={{ clear: 'both' }} />
        </div>
      )
    });
    return (
      <div>
        <h1 style={styles.h1}>실시간 채팅</h1>
        <ChatForm />
        <div>{messages}</div>
      </div>
    )
  }
}

ReactDOM.render(
  <ChatApp />,
  document.getElementById('root'),
)