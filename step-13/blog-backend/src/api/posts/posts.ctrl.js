import mongoose from 'mongoose';
import Joi from 'joi';
import Post from '../../models/post';

const { ObjectId } = mongoose.Types;

export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  next();
};

export const write = async ctx => {
  const schema = Joi.object().keys({
    // 객체가 다음 필드가 있는지 검증합니다.
    title: Joi.string().required(), // required() 필수 항목을 검증합니다.
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  });
  // 검증 후 실해 시 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const list = async ctx => {
  // query는 문자열이므로 숫자로 변환해야 합니다.
  // 값이 없다면 default는 1로 설정합니다.
  const page = +ctx.query.page || 1;

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
    const postCount = await Post.countDocuments().exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10));
    ctx.body = posts.map(post => ({
      ...post,
      body:
        post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
    }));
    // ctx.body = posts
    //   .map(post => post.toJSON())
    //   .map(post => ({
    //     ...post,
    //     body:
    //       post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
    //   }));
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const read = async ctx => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (error) {
    ctx.throw(500, error);
  }
};

/**
 * remove() 특정 조건을 만족하는 데이터를 모두 지웁니다.
 * findByIdAndRemove() id를 찾아 지웁니다.
 * findOneAndRemove() 특정 조건을 만족하는 데이터 하나를 찾아 제거합니다.
 *
 * @param {*} ctx
 */
export const remove = async ctx => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const update = async ctx => {
  const { id } = ctx.params;

  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // 업데이트 된 값을 반환하고, false인 경우 업데이트 전의 값을 반환합니다.
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (error) {
    ctx.throw(500, error);
  }
};
