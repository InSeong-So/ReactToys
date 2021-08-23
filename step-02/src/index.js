import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Form from '../components/Form'

class APP extends Component {
  constructor(props) {
    super(props);
    this.loadLogs();
    this.state = {
      items: []
    }
  }
  // API에 접근하여 게시글 목록을 가져온다.
  loadLogs() {
    axios.get('/api/getItems').then(result => {
      this.setState({ items: result.data.logs });
    }).catch(err => {
      console.log(err);
      return;
    });
  }
  render() {
    // 게시판 글을 생성
    const itemsHtml = this.state.items.map(e => (
      <li key={e._id}>{e.name} - {e.body}</li>
    ));
    return (
      <div>
        <h1 style={styles.h1}>게시판</h1>
        <Form onPost={e => this.loadLogs()} />
        <p style={styles.right}>
          <button onClick={e => this.loadLogs()}>다시 불러오기</button>
        </p>
        <ul>
          {itemsHtml}
        </ul>
      </div>
    )
  }
}

// 스타일 정의
const styles = {
  h1: {
    backgroundColor: 'blue',
    color: 'white',
    fontSize: 24,
    padding: 12
  },
  right: {
    textAlign: 'right'
  }
}

// DOM의 내용을 메인 컴포넌트로 변경
ReactDOM.render(
  <APP />,
  document.getElementById('root')
)