import React from 'react';
import { graphql } from 'gatsby';
import loadable from '@loadable/component';
import { Provider } from 'react-redux';

import Layout from "../components/layout";
import SEO from "../components/seo";
import { appModules } from "../modules";
import store from '../store';


export default class PageList extends React.Component {

  renderModule(moduleFileName, module, index, fallback = null) {
    const ModuleComponent = loadable(() => import(`../modules/${moduleFileName}`));
    console.log("Module data:" + JSON.stringify(module));
    return (
      <div key={index} data-module-index={index}>
        <ModuleComponent data={module} fallback={fallback}/>
      </div>
    );  
  }

  staticRenderModule(index, htmlEl) {
    return (<section key={index.toString()} dangerouslySetInnerHTML={{ __html: htmlEl.innerHTML }}/>)
  }

  getFromMap(moduleName) {
    if (!(moduleName in appModules)){
      console.log(`Unknown moduleName: ${moduleName}`);
      return { moduleFileName: 'Unknown', shouldLoadJavascript: false };
    } 
    return appModules[moduleName];
  }

  render() {
      const page = this.props.data.page;
      const content = JSON.parse(page.content);
      let components;

      console.log("page", page);
      console.log("content", content);

      if (content.modules) {
        components = content.modules.map((module, index) => {
          const module_name = module.module.polymorphic_ctype.model;
          //const moduleFileName = capitalize(module_name);
          const { shouldLoadJavascript, moduleFileName } = this.getFromMap(module_name);
          // Get existing html from pre-rendered page if exists use as fallback for 
          // loadable component
          let htmlEl;
          // This should only run client side will try catch when building
          try {
            htmlEl = document.querySelector(`[data-module-index="${index.toString()}"]`);
          } catch(err) {
            htmlEl = null;
          }
          const fallback = htmlEl ? this.staticRenderModule(index, htmlEl) : null;
          
          if (!shouldLoadJavascript && fallback) {
            return fallback;
          } else {
            return this.renderModule(moduleFileName, module, index, fallback);
          }
        });
      } else {
        components = [];
      }
      
      return (
        <Provider store={store}>
          <Layout header={content.header}>
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