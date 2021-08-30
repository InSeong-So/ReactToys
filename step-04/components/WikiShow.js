import React, { Component } from 'react';
import axios from 'axios';
import WikiParser from '../util/WikiParser';
import styles from '../src/styles';

class WikiShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.match.params.name,
      body: '',
      loaded: false
    }
    axios.get('/api/get/', {
      params: {
        name: this.state.name,
      }
    }).then(result => {
      this.setState({
        body: result.data.body,
        loaded: true,
      });
    }).catch(err => {
      console.log(err);
    });
  }
  // 위키 문법을 리액트 객체로 변환
  convertText(src) {
    // 위키 문법을 파서로 파싱
    const nodes = WikiParser.parse(src);
    // 각 요소를 React 객체로 변환
    const lines = nodes.map((e, i) => {
      if (e.tag === 'ul') {
        const lis = e.items.map((s, j) => <li key={`node${i}_${j}`}>{s}</li>);
        return <ul key={`node${i}`}>{lis}</ul>
      }
      if (e.tag === 'a') {
        return (<div key={`node${i}`}>
          <a href={`/wiki/${e.label}`}>→{e.label}</a>
        </div>)
      }
      return React.createElement(
        e.tag, { key: 'node' + i }, e.label)
    });
    return lines;
  }
  render() {
    if (!this.state.loaded) {
      return <p>읽는 중입니다...</p>
    }
    const { name, body } = this.state;
    const html = this.convertText(body);
    return (
      <div>
        <h1>{name}</h1>
        <div style={styles.show}>{html}</div>
        <p style={styles.right}>
          <a href={`/edit/${name}`}>페이지 수정하기</a>
        </p>
      </div>
    )
  }
}

export default WikiShow