import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import loadable from '@loadable/component';
const SplitMe = loadable(() => import('./SplitMe'), {
  fallback: <div>Loading...</div>,
});

function App() {
  const [ visible, setVisible ] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  const onMouseOver = () => {
    // 컴포넌트 미리 불러오기
    SplitMe.preload();
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p onClick={onClick} onMouseOver={onMouseOver}>Hello React!</p>
        {visible && <SplitMe/>}
      </header>
    </div>
  );
}

export default App;