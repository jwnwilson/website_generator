'use strict';

/**
 * Lifecycle callbacks for the `page` model.
 */

module.exports = {
  lifecycles: {
    async beforeUpdate(params, data) {
      console.log("params", params);
      console.log("data", data);
      if(data.status == 'published') {
        console.log("Setting published time")
        data.published_at = new Date();
      }
    },
  }
};
