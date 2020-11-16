'use strict';

/**
 * deploy.js controller
 *
 * @description: A set of functions called "actions" of the `deploy` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: 'ok'
    });
  },

  find: async ctx => {
    const entries = await strapi.query("deployment", "deploy").find(ctx.request.query)
    ctx.send(entries)
  }
};
