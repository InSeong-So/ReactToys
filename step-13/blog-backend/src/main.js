import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';
import jwtMiddelware from './lib/jwtMiddleware';
import api from './api';

require('dotenv').config();
// import createFakeData from './createFakeData';

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // createFakeData();
  })
  .catch(error => {
    console.log(error);
  });

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/api', api.routes()); // api 라우트 적용

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());
app.use(jwtMiddelware);

// router.get('/about/:name?', ctx => {
//   const { name } = ctx.params;
//   ctx.body = name ? `${name}의 소개` : '소개';
// });

// router.get('/posts', ctx => {
//   const { id } = ctx.query;
//   ctx.body = id ? `포스트 #${id}` : '포스트 아이디가 없습니다.';
// });

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(__dirname, '../../blog-frontend/build');
app.use(serve(buildDirectory));
app.use(async ctx => {
  // Not Found이고 주소가 /api로 시작하지 않으면
  if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
    await send(ctx, 'index.html', { root: buildDirectory });
  }
});

app.listen(PORT, () => {
  console.log(`Server has been http://localhost:${PORT || 5500} started!`);
});
