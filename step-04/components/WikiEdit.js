import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import styles from '../src/styles';

// 편집 화면
class WikiEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.match.params.name,
      body: '',
      loaded: false,
      jump: ''
    }

    axios.get('/api/get', {
      params: {
        name: this.state.name
      }
    }).then(result => {
      this.setState({
        body: result.data.body,
        loaded: true,
      })
    }).catch(err => {
      console.log(err);
    })
  }
  // 서버에 전송 : 저장
  save() {
    const wikiname = this.state.name;
    axios.post('/api/put', {
      param: {
        name: wikiname, body: this.state.body
      }
    }).then(result => {
      this.setState({
        jump: ' /wiki/' + wikiname,
      })
    }).catch(err => {
      if (err) {
        console.log(err);
        return;
      }
    })
  }
  bodyChanged(e) {
    this.setState({ body: e.target.value });
  }
  render() {
    if (!this.state.loaded) {
      return <p>읽는 중입니다...</p>
    }

    if (this.state.jump !== '') {
      // 메인으로 redirect
      return <Redirect to={this.state.jump} />
    }

    const name = this.state.name;
    return (
      <div style={styles.edit}>
        <h1><a href={`/wiki/${name}`}>{name}</a></h1>
        <textarea rows={12} cols={60}
          onChange={e => this.bodyChanged(e)}
          value={this.state.body} /><br />
        <button onClick={e => this.save()}>저장</button>
      </div>
    )
  }
}

export default WikiEdit