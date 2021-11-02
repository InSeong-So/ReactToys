import React from 'react'
import { Route } from 'react-router-dom'
import NewsPage from './pages/NewsPage'

const App = () => {
  // /:cateogry? 의 물음표 뜻은 category 값이 선택적(Optional)이라는 의미로 있을 수도, 없을 수도 있다는 것입니다.
  return <Route path="/:category?" component={NewsPage} />;
}

export default App
