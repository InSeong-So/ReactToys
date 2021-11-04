import React, { Suspense, useState } from 'react';
import logo from './logo.svg';
import './App.css';
const SplitMe = React.lazy(() => import('./SplitMe'));

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
        <Suspense fallback={<div>Loading...</div>}>
          {visible && <SplitMe/>}
        </Suspense>
      </header>
    </div>
  );
}

export default App;

// 서버사이드 렌더링을 지원하지 않음 ㅠ