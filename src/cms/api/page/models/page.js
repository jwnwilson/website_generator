'use strict';

/**
 * Lifecycle callbacks for the `page` model.
 */

module.exports = {
  lifecycles: {
    async beforeUpdate(params, data) {
      let publishedState = 'published';
      let original = await strapi.query('Page').findOne({ id: params._id });
      if(data.status == publishedState && original.status !== publishedState) {
        data.published_at = new Date();
      }
    },
  }
};
