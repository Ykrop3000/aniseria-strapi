const sanitizer = require("strapi-sanitizer");
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

("use strict");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // /**
  //  * Create a record.
  //  *
  //  * @return {Object}
  //  */
  // async addBookmark(ctx) {
  //   let entity;
  //   let bookmarkCandidate;
  //   let animeCandidate;
  //   const { id, anime, to } = ctx.request.body;
  //   animeCandidate = await strapi.services.animes.findOne({ id: anime });
  //   if (!animeCandidate) {
  //     return ctx.response.badRequest("Anime not found");
  //   }
  //   // if (ctx.state.user.role.type !== "admin") {
  //   //   const [list] = await strapi.services.list.find({
  //   //     id: id,
  //   //     "user.id": ctx.state.user.id,
  //   //   });
  //   //   if (!comment) {
  //   //     return ctx.unauthorized(`You can't update this entry`);
  //   //   }
  //   // }
  //   const lists = await strapi.services.list.find({
  //     "user.id": ctx.state.user.id,
  //   });
  //   lists.forEach((list) => {
  //     if(list.animes.map(e => e.id).includes(anime)){
  //       const items = await strapi.connections.default("animes_lists__lists_animes")
  //         .where("list_id", "in", [array of id's])
  //         .andWhere("anime_id", "in", function(qb) {
  //           qb.select("id").from("t1")
  //             .whereIn("col-x", function(qb) {
  //               qb.select("id")
  //                 .from("t3")
  //                 .where("col-y", ID);
  //             });
  //         })
  //         .del();
  //     }
  //   });
  //   // const items = await strapi.connections.default("t1_t2__t2_t1")
  //   //   .where("t2_id", "in", [array of id's])
  //   //   .andWhere("t1_id", "in", function(qb) {
  //   //     qb.select("id").from("t1")
  //   //       .whereIn("col-x", function(qb) {
  //   //         qb.select("id")
  //   //           .from("t3")
  //   //           .where("col-y", ID);
  //   //       });
  //   //   })
  //   //   .del();
  //   // entity = await strapi.services.bookmark.update({ id }, {});
  //   return { id: 1 };
  // },
};
