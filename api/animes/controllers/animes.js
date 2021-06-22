const sanitizer = require("strapi-sanitizer");
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const parser = require("../parsers/animeParser");
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
    console.log(ctx.query);
    entities = await strapi.services.animes.find(ctx.query);
    if (entities.length == 0 && ctx.query._or) {
      console.log(await parser.parse(ctx.query._or[0].url));
    }
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
  },

  async create(ctx) {
    const entity = await strapi.services.animes.findOne({
      name: ctx.request.body.name
    });
    let entry;

    if (!entity) {
      entry = await strapi.query("animes").create(ctx.request.body);
    } else {
      console.log("updated");
      entry = await strapi
        .query("animes")
        .update({ name: ctx.request.body.name }, ctx.request.body);
    }

    return sanitizeEntity(entry, { model: strapi.models.animes });
  }
};
