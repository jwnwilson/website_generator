'use strict';
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const deployFlag = true;

const build_site = async () => {
  console.log('Building output:');
  let output;
  try {
    output = await exec('cd ../client && npm run build');
  } 
  catch (err) {
    console.log("Error building client:", err);
    throw(err);
  }
  console.log('Building:');
  console.log('output:', output);
}

const deploy_site = async () => {
  console.log('Deploying output:');
  let output
  try {
    output = await exec('cd ../client && npm run deploy');
  } 
  catch (err) {
    console.log("Error deploying client:", err);
    throw(err);
  }
  console.log('Deploying:');
  console.log('output:', output);
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

const build_if_published = async () => {
  console.log("Checking for pages to publish");
  // fetch pages to publish
  const five_min_ago = new Date(Date.now() - 1000 * 60 * 5);
  const draftPageToPublish = await strapi.api.page.services.page.find({
    status: 'published',
    published_at_gt: five_min_ago
  });
  let deploy = false;

  console.log("draftPageToPublish", draftPageToPublish.map(page => page.name));

  // Update values before deploying to avoid re-deploy
  let results = await Promise.all(draftPageToPublish.map(async page => {
    let updated = false;
    console.log('page.deployed_at', page.deployed_at);
    if (page.deployed_at === undefined || new Date(page.deployed_at) < five_min_ago) {
      updated = true;
      await strapi.api.page.services.page.update({ id: page.id }, { deployed_at: new Date() });
    }
    return updated;
  }));

  if (results.includes(true)) {
    console.log("New pages to deploy");
    deploy = true;
  }

  // Build and Deploy 
  if (deploy) {
    await build_site();
    if(deployFlag) {
      await deploy_site();
    } else {
      console.log("Skipping deployment")
    }
  }
}

module.exports = {
  '*/1 * * * *': build_if_published
};