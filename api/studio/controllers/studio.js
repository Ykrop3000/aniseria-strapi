"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const fs = require("fs").promises;
const axios = require("axios");
const fetch = require("node-fetch");

module.exports = {
  async createImage(ctx) {
    const imgPath = ctx.query.img;

    // const response = await axios.get(imgPath, {
    //   responseType: "blob",
    // });

    const r = await fetch(imgPath);
    const myBlob = await r.blob();

    const uploadedFiles = await strapi.plugins.upload.services.upload.upload({
      files: myBlob,
      data: {
        fileInfo: {
          type: "image/png",
          name: "test"
        }
      }
    });
    return uploadedFiles;
  }
  //   async create(ctx) {
  //     const { id } = ctx.params;
  //     let entity;

  //     if (ctx.state.user.role.type !== "admin") {
  //       const [comment] = await strapi.services.comment.find({
  //         id: ctx.params.id,
  //         "author.id": ctx.state.user.id,
  //       });
  //       if (!comment) {
  //         return ctx.unauthorized(`You can't update this entry`);
  //       }
  //     }

  //     if (ctx.is("multipart")) {
  //       const { data, files } = parseMultipartData(ctx);
  //       entity = await strapi.services.comment.update({ id }, data, {
  //         files,
  //       });
  //     } else {
  //       entity = await strapi.services.comment.update({ id }, ctx.request.body);
  //     }

  //     return sanitizeEntity(entity, { model: strapi.models.comment });
  //   },
};
