'use strict';
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const deploy = process.env.DEPLOY;

const build_site = async () => {
  console.log('Building output:');
  const output = await exec('cd ../client && npm run build');
  console.log('Building:');
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}

const deploy_site = async () => {
  console.log('Deploying output:');
  const output = await exec('cd ../client && npm run deploy');
  console.log('Deploying:');
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
  console.log('Deploy complete');
}

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/3.0.0-beta.x/concepts/configurations.html#cron-tasks
 */

module.exports = {
  '*/1 * * * *': async () => {
    // fetch pages to publish
    const five_min_ago = new Date(Date.now() - 1000 * 60 * 5);
    const draftPageToPublish = await strapi.api.page.services.page.find({
      status: 'published',
      published_at_gt: five_min_ago
    });
    let deploy = false;

    // Update values before deploying to avoid re-deploy
    let results = await Promise.all(draftPageToPublish.map(async page => {
      let updated = false;
      if (page.deployed_at === null || new Date(page.deployed_at) < five_min_ago) {
        updated = true;
        await strapi.api.page.services.page.update({ id: page.id }, { deployed_at: new Date() });
      }
      return updated;
    }));

    if (results.includes(true)) {
      deploy = true;
    }

    // Publish 
    if (deploy) {
      await build_site();
      await deploy_site();
    }
  },
};