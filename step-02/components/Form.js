import React, { Component } from 'react';
import {form} from './Form.style';

// 게시판 입력 양식 컴포넌트 정의
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      body: '',
    }
  }
  // 텍스트 박스의 값이 변경되었을 때 저장
  nameChanged(e) {
    this.setState({ name: e.target.value });
  }
  bodyChanged(e) {
    this.setState({ body: e.target.value });
  }
  // 웹 서버에 글 작성
  post(e) {
    axios.get('/api/write', { params: { name: this.state.name, body: this.state.body } }).then(result => {
      this.setState({ body: '' })
      if (this.props.onPost) {
        this.props.onPost();
      }
    }).catch(err => {
      console.log(err);
    })
  }
  render() {
    return (
      <div style={form}>
        이름:<br />
        <input type='text' value={this.state.name}
          onChange={e => { this.nameChanged(e) }} /><br />
        내용:<br />
        <input type='text' value={this.state.body} size='60'
          onChange={e => { this.bodyChanged(e) }} /><br />
        <button onClick={e => this.post()}>전송</button>
      </div>
    )
  }
}

export default Form;