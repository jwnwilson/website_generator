import React from 'react';
import { graphql } from 'gatsby';
import loadable from '@loadable/component';
import { Provider } from 'react-redux';

import Layout from "../components/layout";
import SEO from "../components/seo";
import { appModules } from "../cards";
import store from '../store';
import "./modularPage.css";
import "../styles/index.scss";

export default class PageList extends React.Component {

  renderModule(moduleFileName, module, index, type, fallback = null) {
    const ModuleComponent = loadable(() => import(`../cards/${moduleFileName}`));
    // console.log("Module data:" + JSON.stringify(module));
    return (
      <div key={index} data-module-index={index} data-module-type={type} id={"card-section-" + index}>
        <ModuleComponent data={module} fallback={fallback} />
      </div>
    );
  }

  staticRenderModule(index, htmlEl) {
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

    // console.log("page", page);
    // console.log("content", content);
    // console.log("content.cards", content.cards);

    if (content.cards) {
      components = content.cards.map((card, index) => {
        const card_title = card.title;
        const card_type = card.__component;
        // const moduleFileName = capitalize(module_name);
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
        const fallback = htmlEl ? this.staticRenderModule(index, htmlEl) : null;

        if (!shouldLoadJavascript && fallback) {
          console.log("fallback", fallback);
          return fallback;
        } else {
          return this.renderModule(moduleFileName, card, index, card_type, fallback);
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