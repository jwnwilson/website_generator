'use strict';
const { sanitizeEntity } = require('strapi-utils');


module.exports = {

    /**
     * Retrieve pages filter by published true
     *
     * @return {Array}
     */
    async find(ctx) {
      let entities;

      ctx.query = {
        ...ctx.query,
        status_nin: ['archived'],
      };


      if (ctx.query._q) {
        entities = await strapi.services.page.search(ctx.query);
      } else {
        entities = await strapi.services.page.find(ctx.query);
      }
  
      return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.page }));
    },
  };
