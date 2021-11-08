const checkLoggedIn = (ctx, next) => {
  if (!ctx.state.user._id) {
    ctx.status = 401;
  }
  return next();
};

export default checkLoggedIn;
