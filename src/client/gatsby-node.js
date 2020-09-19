/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const fetch = require('node-fetch');
const LoadablePlugin = require('@loadable/webpack-plugin');
const webpack = require("webpack");
const http = require('http');
const FormData = require('form-data');

const baseUrl = process.env.SERVER_URL || 'http://localhost:1337';
const overwrite = process.env.SERVER_OVERWRITE || 'http://localhost:1337';
const cmsUser = process.env.CMS_USERNAME || 'admin';
const cmsPassword = process.env.CMS_PASSWORD || 'Y9bt53cS6nfDfJr';
const staticUrl = `${baseUrl}`;


exports.onCreateWebpackConfig = ({ stage, getConfig, rules, loaders, plugins, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      plugins: [
        new LoadablePlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
      ]
    })
  } else {
    actions.setWebpackConfig({
      plugins: [
        new LoadablePlugin(),
      ],
      externals: {
        jquery: 'jQuery', // important: 'Q' capitalized
      }
    })
  }
}

// You can delete this file if you're not using it
exports.sourceNodes = async ({ boundActionCreators }) => {
    const crypto = require('crypto');
    const { createNode } = boundActionCreators;

    const form = new FormData();
    form.append("identifier", cmsUser);
    form.append("password", cmsPassword);

    // Authing on api
    let auth = await fetch(
      `${staticUrl}/admin/auth/local`,
      {
        method: "POST",
        body: form,
      });
    let jwt = await auth.json();

    console.log('Fetching from: ', `${staticUrl}/pages`);
    const resp = await fetch(`${staticUrl}/pages`, {headers: {Authorization: `bearer ${jwt.jwt}`}});
    const pages = await resp.json();

    console.log("pages", pages);

    return await Promise.all(pages.map(async page => {
        console.log('Loading page: ', `${page.name}`);
        // Add list of fields to pull down to node
        const pageNode =  {
            id: page.id.toString(),
            parent: null,
            children: [],
            internal: {
            type: `Page`,
            contentDigest: crypto
                .createHash(`md5`)
                .update(JSON.stringify(page))
                .digest(`hex`),
            },
            title: page.title,
            content: JSON.stringify(page),
            slug: page.slug,
            url: page.url
        }
        console.log("Page loaded", pageNode);
        createNode(pageNode);
    }));
};

exports.createPages = ({ graphql, boundActionCreators }) => {
    const path = require(`path`);
    const { createPage } = boundActionCreators;
    return new Promise((resolve, reject) => {
        graphql(`
          {
            allPage{
              edges{
                node{
                  id
                  url
                }
              }
            }
          }
        `  ).then(result => {
            if (result.data ===undefined || result.data.allPage === undefined) {
              console.log("No result from API, aborting!");
              resolve();
              return;
            }
            result.data.allPage.edges.forEach(({ node }) => {
                console.log(JSON.stringify(node));
                createPage({
                    path: node.url,
                    component: path.resolve(`./src/templates/app.js`),
                    context: {
                        pageId: node.id,
                    },
                })
            });
            resolve();
        })
    }).catch(error => {
        console.log(error);
    })
};
    