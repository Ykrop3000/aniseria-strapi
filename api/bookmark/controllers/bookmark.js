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

  async addBookmark(ctx) {
    let entity;
    let bookmarkCandidate;
    let animeCandidate;

    const { anime, type } = ctx.request.body;

    animeCandidate = await strapi.services.animes.findOne({ id: anime });
    if (!animeCandidate) {
      return ctx.response.badRequest("Anime not found");
    }

    bookmarkCandidate = await strapi.services.bookmark.findOne({
      anime: anime,
      user: ctx.state.user.id,
    });

    if (!bookmarkCandidate) {
      console.log("create");
      entity = await strapi.services.bookmark.create({
        anime: anime,
        user: ctx.state.user.id,
        type: type,
      });
    } else {
      console.log("update");
      entity = await strapi.query("bookmark").update(
        { anime: anime, user: ctx.state.user.id },
        {
          anime: anime,
          user: ctx.state.user.id,
          type: type,
        }
      );
    }

    return sanitizeEntity(entity, { model: strapi.models.bookmark });
  },

  /**
   * Create a record.
   *
   * @return {String}
   */

  async inBookmark(ctx) {
    let bookmarkCandidate;

    const { _anime } = ctx.query;

    animeCandidate = await strapi.services.animes.findOne({ id: _anime });
    if (!animeCandidate) {
      return ctx.response.badRequest("Anime not found");
    }

    bookmarkCandidate = await strapi.services.bookmark.findOne({
      anime: _anime,
      user: ctx.state.user.id,
    });

    if (bookmarkCandidate) {
      return bookmarkCandidate.type;
    } else {
      return undefined;
    }
  },
};
