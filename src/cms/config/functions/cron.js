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
  return output;
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
  return output;
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

  // Check for failed deployments and fail them
  let existingDeployment = await strapi
    .query("deployment", "deploy")
    .find({deployStatus_in: ["Processing", "Success", "Failed"], createdAt_gt: five_min_ago});
  let remainingDeployments = [];

  existingDeployment.forEach(async deployment => {
    if (deployment.deployStatus === 'Processing' && deployment.updatedAt < five_min_ago) {
      console.log(`Found unfinished existing deployment: ${deployment.id} setting to failed`);
      await strapi.query("deployment", "deploy").update(
        {id: deployment.id},
        {deployStatus: "Failed"}
      );
    } else {
      remainingDeployments.push(deployment)
    }
  });


  if (draftPageToPublish.length > 0) {
    console.log("Found pages to publish:", draftPageToPublish.map(page => page.name));
  } else {
    console.log("No pages to publish")
    return;
  }

  if (remainingDeployments.length === 0) {
    deploy = true;
  } else {
    console.log("Existing deployments running skipping");
  }

  // Build and Deploy
  if (deploy) {
    let progress = await strapi.query("deployment", "deploy").create({
      deployStatus: "Processing",
      progress: {
        output: "Waiting for command output..."
      }
    });
    console.log("Starting deployment:", progress);
    try {
      let commandOutput = await build_site();
      await strapi.query("deployment", "deploy").update(
        {id: progress.id},
        {
        deployStatus: "Processing",
        progress: {
          output: commandOutput
        }
      })

      if(deployFlag) {
        await deploy_site();
      } else {
        commandOutput += console.log("Skipping deployment")
      }
      console.log('Saving result', commandOutput)
      await strapi.query("deployment", "deploy").update(
        {id: progress.id},
        {
        deployStatus: "Success",
        progress: {
          output: commandOutput.stdout
        }
      })
    } catch(err) {
      console.log('saving error', err)
      await strapi.query("deployment", "deploy").update(
        {id: progress.id},
        {
        deployStatus: "Failed",
        progress: {
          output: err.stdout
        }
      })
    }
  }
}

module.exports = {
  '*/1 * * * *': build_if_published
};
