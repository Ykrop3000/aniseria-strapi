const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

("use strict");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      return "multipart disabled";
    } else {
      entity = await strapi.connections.default
        .raw(`INSERT INTO genres(id, name, russian, kind)
      VALUES (${ctx.request.body.id}, '${ctx.request.body.name}', '${ctx.request.body.russian}', '${ctx.request.body.kind}')
      RETURNING *;`);
    }
    return sanitizeEntity(entity.rows, { model: strapi.models.genre });
  }
};
