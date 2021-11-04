import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import loadable from '@loadable/component';

// // 기본 사용법
// const SplitMe = loadable(() => import('./SplitMe'));

// 로딩 중 다른 UI 보여주고 싶다면
const SplitMe = loadable(() => import('./SplitMe'), {
  fallback: <div>Loading...</div>,
});

function App() {
  const [ visible, setVisible ] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p onClick={onClick}>Hello React!</p>
        {visible && <SplitMe/>}
      </header>
    </div>
  );
}

export default App;

// 서버 사이드 렌더링 지원