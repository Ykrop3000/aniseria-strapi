"use strict";

/**
 * `is-my` policy.
 */

module.exports = async (ctx, next) => {
  // Add your own logic here.
  console.log("In is-my policy.", ctx);

  await next();
};
