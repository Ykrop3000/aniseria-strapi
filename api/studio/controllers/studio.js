const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

("use strict");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // async createImage(ctx) {
  //   const imgPath = ctx.query.img;

  //   // const response = await axios.get(imgPath, {
  //   //   responseType: "blob",
  //   // });

  //   const r = await fetch(imgPath);
  //   const myBlob = await r.blob();

  //   const uploadedFiles = await strapi.plugins.upload.services.upload.upload({
  //     files: myBlob,
  //     data: {
  //       fileInfo: {
  //         type: "image/png",
  //         name: "test"
  //       }
  //     }
  //   });
  //   return uploadedFiles;
  // }

  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      return "multipart disabled";
    } else {
      if (ctx.request.body.image) {
        entity = await strapi.connections.default
          .raw(`INSERT INTO studios(id, name, image)
        VALUES (${ctx.request.body.id}, '${ctx.request.body.name}', '${ctx.request.body.image}' )
        RETURNING *;`);
      } else {
        entity = await strapi.connections.default
          .raw(`INSERT INTO studios(id, name)
        VALUES (${ctx.request.body.id}, '${ctx.request.body.name}')
        RETURNING *;`);
      }
    }
    return sanitizeEntity(entity.rows, { model: strapi.models.studio });
  }
};
