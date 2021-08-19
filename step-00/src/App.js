import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import TOC from './components/TOC'
import Control from './components/Control'
import ReadContent from './components/ReadContent'
import CreateContent from './components/CreateContent'
import UpdateContent from './components/UpdateContent'

class App extends Component {
  constructor(props) {
    super(props);
    this.maxSelectedId = 3;
    this.state = {
      mode: 'welcome',
      selectedId: 1,
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML IS NOT PROGRAMMING LANGUAGE!', },
        { id: 2, title: 'CSS', desc: 'CSS IS STYLESHEET' },
        { id: 3, title: 'JS', desc: 'JAVASCRIPT IS NOT JAVA' },
      ]
    }
  }
  getReadContent() {
    return this.state.contents.filter(item => item.id === this.state.selectedId)[0];
  }
  render() {
    let _title, _desc, _content = null;
    if (this.state.mode === 'welcome') {
      _title = 'Welcome';
      _desc = 'Hello, World!';
      _content = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'read') {
      const readContent = this.getReadContent();
      _title = readContent.title;
      _desc = readContent.desc;
      _content = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'create') {
      _content = <CreateContent onCreateItem={(title, desc) => {
        this.state.contents.forEach(e => {
          this.setState({
            contents: this.state.contents.concat({
              id: this.maxSelectedId++,
              title: title,
              desc: desc,
            })
          })
        })
      }}></CreateContent>
    } else if (this.state.mode === 'update') {
      const readContent = this.getReadContent();
      _content = <UpdateContent data={readContent} onUpdateItem={(item) => {
        const updatedContents = Array.from(this.state.contents);
        for (let i = 0; i < updatedContents.length; i++) {
          if (updatedContents[i].id === item.id) {
            updatedContents[i] = item;
          }
        }
        this.setState({
          contents: updatedContents
        });
      }}></UpdateContent>
    }
    return (
      <div className="App">
        <Header onClickHome={() => {
          this.setState({
            mode: 'welcome'
          });
        }}></Header>
        <TOC
          data={this.state.contents}
          onChangeTitle={(_id) => {
            this.setState({
              mode: 'read',
              selectedId: _id
            });
          }}></TOC>
        <Control onChangeMode={_mode => {
          if (_mode === 'delete') {
            let deletedContents = Array.from(this.state.contents);
            for (let i = 0; i < deletedContents.length; i++) {
              if (deletedContents[i].id === this.state.selectedId) {
                if (deletedContents[i].id === this.maxSelectedId) {
                  this.maxSelectedId--;
                }
                deletedContents.splice(i, 1);
                break;
              }
            }
            this.setState({
              mode: 'welcome',
              contents: deletedContents,
            });
          } else {
            this.setState({
              mode: _mode
            });

          }
        }}></Control>
        {_content}
      </div>
    );
  }
}

export default App;
