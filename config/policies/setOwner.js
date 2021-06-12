"use strict";

/**
 * `setOwner` policy.
 */

module.exports = async (ctx, next) => {
  const { id } = ctx.state.user;
  const { body } = ctx.request;

  body.author = id.toString();

  await next();
};
