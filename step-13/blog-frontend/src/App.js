import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<PostListPage/>}></Route>
        <Route path="/@:username" element={<PostListPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route>
        <Route path="/write" element={<WritePage/>}></Route>
        <Route path="/@:username/:postId" element={<PostPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
