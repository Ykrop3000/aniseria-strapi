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

    if (ctx.query.url) {
      return entities.map((entity) =>
        sanitizeEntity(entity, { model: strapi.models.animes })
      );
    }

    return entities.map((entity) => sanitizer(entity, "animes"));
  },
};
