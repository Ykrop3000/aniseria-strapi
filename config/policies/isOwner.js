"use strict";

/**
 * `isOwner` policy.
 */

module.exports = async (ctx, next, args) => {
  const { id, role } = ctx.state.user;
  if (role !== "administrator") {
    ctx.query.owner = id;
  }

  await next();
  if (ctx.params.id) {
    console.log(ctx.response);
    // let owner = ctx.response.body.get("author");
    // if (owner !== id && role !== "administrator") {
    //   return ctx.unauthorized("You are not allowed to perform this action.");
    // }
  }
};
