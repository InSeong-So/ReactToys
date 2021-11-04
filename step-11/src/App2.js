// 두 번째 방법
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export class App extends Component {
  state ={
    SplitMe: null,
  }

  handleClick = async () => {
    const loadModule = await import('./SplitMe');
    this.setState({
      SplitMe: loadModule.default,
    });
  }

  render() {
    const { SplitMe } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p onClick={this.handleClick}>Hello React!</p>
          {SplitMe && <SplitMe/>}
        </header>
      </div>
    );
  }
}

export default App;
