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
const { stringify } = require('querystring');

const baseUrl = process.env.SERVER_URL || 'http://localhost:1337';
const overwrite = process.env.SERVER_OVERWRITE || 'http://localhost:1337';
const cmsUser = process.env.CMS_USERNAME || 'jwnwilson@hotmail.co.uk';
const cmsPassword = process.env.CMS_PASSWORD || '$J9Z9dYi*AP^';
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
    form.append("email", cmsUser);
    form.append("password", cmsPassword);

    let text;
    let jwt;
    let auth;
    // Authing on api
    try {
      auth = await fetch(
        `${staticUrl}/admin/login`,
        {
          method: "POST",
          body: form,
        });
      text = await auth.text();
      jwt = JSON.parse(text);  
      console.log(`Got response: ${text}`)
    } catch(err) {
      console.error(`Error authorizing with the cms: ${err}, response: ${text}`);
      throw(err);
    }

    console.log('Fetching from: ', `${staticUrl}/pages`);
    const resp = await fetch(`${staticUrl}/pages`, {headers: {Authorization: `Bearer ${jwt.data.token}`}});
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
    