// import React from 'react';
// import ReactDOMServer from 'react-dom/server';

// const html = ReactDOMServer.renderToString(
//   <div>Hello Server Side Rendering!</div>,
// );

// console.log(html);

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import path from 'path';
import fs from 'fs';

// asset-manifest.json에서 파일 경로들을 조회
const manifest = JSON.parse(
  fs.readFileSync(path.resolve('./build/asset-manifest.json'), 'utf-8'),
);

const chunks = Object.keys(manifest.files)
  .filter(key => /chunk\.js$/.exec(key))  // chunk.js로 끝나는 '키'를 찾아서
  .map(key => `<script src="${manifest.files[key]}"></script>`) // 스크립트 태그로 변환하고
  .join(''); // 합칩니다.

const createPage = (root) => {
  return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="utf-8" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="theme-color" content="#000000" />
      <title>React ServerSideRendering App</title>
      <link href="${manifest.files['main.css']}" rel="stylesheet" />
    </head>
    <body>
      <noscript>앱을 실행하려면 자바스크립트가 필요합니다.</noscript>
      <div id="root">
        ${root}
      </div>
      <script src="${manifest.files['runtime-main.js']}"></script>
      ${chunks}
      <script src="${manifest.files['main.js']}"></script>
    </body>
    </html>
  `;
};

const app = express();

// 서버 사이드 렌더링을 처리할 핸들러 함수
const serverRender = (req, res, next) => {
  // 이 함수는 404가 떠야 하는 상황에 404를 띄우지 않고 서버 사이드 렌더링을 합니다.
  const context = {};
  const jsx = (
    <StaticRouter location={req.url} context={context}>
      <App/>
    </StaticRouter>
  );

  const root = ReactDOMServer.renderToString(jsx);  // 렌더링을 하고
  res.send(createPage(root)); // 클라이언트에 결과물 응답
};

const server = express.static(path.resolve('./build'), {
  index: false, // "/" 경로에서 index.html을 보여주지 않도록 설정
});

app.use(server);  // 순서가 중요한데, 반드시 serverRender 전에 위치해야 합니다.
app.use(serverRender);

app.listen(5000, () => {
  console.log('http://localhost:5000 started!');
});