import React, { Component } from 'react';
import Subject from './components/Subject';
import TOC from './components/TOC';
import Control from './components/Control';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    // UI에 영향을 줄 필요가 전혀 없기에, state 바깥에 둬서 불필요한 렌더링을 막는다.
    this.max_content_id = 3;
    this.state = {
      mode: 'welcome',
      selected_content_id: 0,
      subject: { title: 'WEB', sub: 'World Wide Web!' },
      welcome: { title: 'Welcome', desc: 'Hello, React!!' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HyperText Markup Language' },
        { id: 2, title: 'CSS', desc: 'Cascading Style Sheets' },
        { id: 3, title: 'JavaScript', desc: 'JavaScript is a programming language' }
      ]
    }
  }
  getReadContent() {
    return this.state.contents.filter((item) => {
      return item.id === this.state.selected_content_id;
    })[0];
  }
  getContent() {
    let _title, _desc, _article = null;
    const _content = this.getReadContent();
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc} />
    } else if (this.state.mode === 'read') {
      _article = <ReadContent title={_content.title} desc={_content.desc} />
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={(_title, _desc) => {
        this.max_content_id++;
        // 오리지널 데이터를 변경하지 않고 데이터를 추가하는 방법을 강구하라.
        // push // concat의 차이는 차후 퍼포먼스에 큰 영향을 미친다.
        /** Immutable, mutable
         * Array.from() : 배열을 깊은 복사하여 새로 생성한다. 즉, 내용은 같으나 a !== b 이다.   // 배열만
         * Object.assign : 객체를 깊은 복사하여 새로 생성한다. 즉, 내용은 같으나 a !== b 이다.  // 객체만
         */
        this.setState({
          contents: this.state.contents.concat(
            {
              id: this.max_content_id,
              title: _title,
              desc: _desc
            })
        });

      }}></CreateContent>
    } else if (this.state.mode === 'update') {
      _article = <UpdateContent data={_content} onSubmit={(_id, _title, _desc) => {
        let _content = Array.from(this.state.contents);
        for (let i = 0; i < _content.length; i++) {
          if (_content[i].id === _id) {
            _content[i] = { id: _id, title: _title, desc: _desc };
          }
        }
        this.setState({
          mode: 'read',
          contents: _content
        });
      }}></UpdateContent>
    }
    return _article
  }

  render() {
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={() => {
            this.setState({
              mode: 'welcome'
            })
          }} />
        <TOC onChangePage={(sel_id) => {
          this.setState({
            mode: 'read',
            selected_content_id: Number(sel_id)
          })
        }} data={this.state.contents} />
        <Control onChangeMode={(_mode) => {
          if (_mode === 'delete') {
            if (window.confirm('정말 삭제하시겠습니까?')) {
              let _content = Array.from(this.state.contents);
              for (let i = 0; i < _content.length; i++) {
                if (_content[i].id === this.state.selected_content_id) {
                  _content.splice(i, 1);
                  if (this.max_content_id === this.state.selected_content_id) {
                    this.max_content_id--;
                  }
                  break;
                }
              }
              this.setState({
                mode: 'welcome',
                contents: _content
              })
            }
          }
          else {
            if(_mode === 'update' && !this.state.selected_content_id){
              alert('선택된 항목이 없습니다.');
              return;
            }
            this.setState({
              mode: _mode
            })

          }
        }}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
