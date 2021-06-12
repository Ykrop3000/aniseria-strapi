const sanitizer = require("strapi-sanitizer");
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

("use strict");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      data.author = ctx.state.user.id;
      entity = await strapi.services.comment.create(data, { files });
    } else {
      ctx.request.body.author = ctx.state.user.id;
      entity = await strapi.services.comment.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.comment });
  },

  /**
   * Create a record.
   *
   * @return {Object}
   */

  async delete(ctx) {
    const { id } = ctx.params;

    let entity;

    if (ctx.state.user.role.type !== "admin") {
      const [comment] = await strapi.services.comment.find({
        id: ctx.params.id,
        "author.id": ctx.state.user.id,
      });
      if (!comment) {
        return ctx.unauthorized(`You can't update this entry`);
      }
    }

    entity = await strapi.services.comment.delete({ id });

    return sanitizeEntity(entity, { model: strapi.models.comment });
  },

  /**
   * Get a record.
   *
   * @return {Array}
   */

  async find(ctx) {
    let entities;
    entities = await strapi.query("comment").find(ctx.query);

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.comment })
    );
  },

  /**
   * GetOne a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.services.comment.findOne({ id });

    return sanitizeEntity(entity, { model: strapi.models.comment });
  },

  /**
   * Update a record.
   *
   *@return {Object}
   */

  async update(ctx) {
    const { id } = ctx.params;
    let entity;

    if (ctx.state.user.role.type !== "admin") {
      const [comment] = await strapi.services.comment.find({
        id: ctx.params.id,
        "author.id": ctx.state.user.id,
      });
      if (!comment) {
        return ctx.unauthorized(`You can't update this entry`);
      }
    }

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.comment.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.comment.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.comment });
  },
};
