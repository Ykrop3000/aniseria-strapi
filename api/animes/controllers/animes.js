const sanitizer = require("strapi-sanitizer");
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

("use strict");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Get a record.
   *
   * @return {Array}
   */

  async find(ctx) {
    let entities;

    entities = await strapi.services.animes.find(ctx.query);

    return entities.map(async entity => {
      // if (ctx.state.user) {
      //   const bookmark = await strapi.services.bookmark.findOne({
      //     user: ctx.state.user.id,
      //     anime: entity.id
      //   });

      //   return sanitizeEntity(
      //     { ...entity, bookmark: bookmark ? bookmark.type : null },
      //     { model: strapi.models.animes }
      //   );
      // }

      return sanitizeEntity(entity, { model: strapi.models.animes });
    });
  }
};
