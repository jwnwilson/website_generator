import React from 'react';
import { graphql } from 'gatsby';
import loadable from '@loadable/component';
import { Provider } from 'react-redux';

import Layout from "../components/layout";
import SEO from "../components/seo";
import { appModules } from "../cards";
import store from '../store';
import "./app.css";
import "../styles/index.scss";

// Cache cards 
let CARDS = {};

export async function preloadCards() {
  /**
   * Preload our dynamically loaded cards, this can be used to load the cards in advance.
   * Currently used for testing.
   */
  let promises = Object.keys(appModules).map(async module => {
    let cardName = appModules[module].moduleFileName;
    CARDS[cardName] = loadable(() => import(`../cards/${cardName}`));
    return CARDS[cardName];
  });
  return await Promise.all(promises);
}

export default class App extends React.Component {

  renderCard(cardName, module, index, type, fallback = null) {
    let Card;
    // Load card component if not in cache.
    if (!(cardName in CARDS)){
      CARDS[cardName] = loadable(() => import(`../cards/${cardName}`));
    }
    
    Card = CARDS[cardName];
    return (
      <div key={index} data-module-index={index} data-module-type={type} id={"card-section-" + index}>
        <Card data={module} fallback={fallback} />
      </div>
    );
  }

  staticRenderCard(index, htmlEl) {
    return (<div key={index.toString()} dangerouslySetInnerHTML={{ __html: htmlEl.innerHTML }} />)
  }

  getFromMap(moduleName) {
    if (!(moduleName in appModules)) {
      console.log(`Unknown moduleName: ${moduleName}`);
      return { moduleFileName: 'Heroimage', shouldLoadJavascript: false };
    }
    return appModules[moduleName];
  }

  render() {
    const page = this.props.data.page;
    const content = JSON.parse(page.content);
    let components;

    if (content.cards) {
      components = content.cards.map((card, index) => {
        const card_type = card.__component;

        const { shouldLoadJavascript, moduleFileName } = this.getFromMap(card_type);
        // Get existing html from pre-rendered page if exists use as fallback for 
        // loadable component
        let htmlEl;

        // This should only run client side will try catch when building
        try {
          htmlEl = document.querySelector(`[data-module-index="${index.toString()}"]`);
          htmlEl = htmlEl.getAttribute("data-module-type") !== card_type ? null : htmlEl;
        } catch (err) {
          htmlEl = null;
        }

        // If we have existing html and no javascript to load then re-inject it into our returned html
        const fallback = htmlEl ? this.staticRenderCard(index, htmlEl) : null;
        if (!shouldLoadJavascript && fallback) {
          return fallback;
        } else {
          return this.renderCard(moduleFileName, card, index, card_type, fallback);
        }
      });
    } else {
      components = [];
    }

    const header = content.header;
    const footer = content.footer;

    return (
      <Provider store={store}>
        <Layout header={header} footer={footer}>
          <SEO title="Home" />
          {components}
        </Layout>
      </Provider>
    );
  }
}

export const query = graphql`
  query PageDetails($pageId: String!) {
    page(id: { eq: $pageId }) {
      id
      title
      content
    }
  }
`