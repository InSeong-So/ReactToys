import React from 'react';
import './App.css';
import { useRoutes } from 'react-router';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';

const App = () => {
  const element = useRoutes([
    { path: '/*', element: <PostListPage /> },
    { path: '@:username',element: <PostListPage /> },
    { path: '@:username/:postId', element: <PostPage /> },
    { path: 'login', element: <LoginPage /> },
    { path: 'register', element: <RegisterPage /> },
    { path: 'write', element: <WritePage /> },
    // { path: '*', element: <NotFound /> },
  ]);
  return element;
};


export default App;
