/*
 *
 * HomePage
 *
 */

import React, { memo, Component} from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import {request} from "strapi-helper-plugin";


class HomePage extends Component {
  state = {
    deployments: null
  }

  deployState = async () => {
    try {
      const response = await request("/deploy/deployment", {
        method: "GET",
      });

      console.log("response", response)

      this.setState({ deployments: response}, () => {
        strapi.notification.success(`Deployment updated`);
      });
    } catch (e) {
      this.setState({ deployments: null }, () => {
        strapi.notification.error(`Deployment Failed`);
        strapi.notification.error(`${e}`);
      });
    }
  }

  async componentDidMount() {
    await this.deployState();
 }

  render() {
    console.log("this.state.deployments", this.state.deployments);
    const status = this.state.deployments ? this.state.deployments[0].deployStatus : null;
    const output = this.state.deployments ? this.state.deployments[0].progress.output : null;
    return (
      <div>
        <h1>Deployment status</h1>
        <p>Status: {status}</p>
        <pre>Output: {output}</pre>
      </div>
    );
  };
}

export default memo(HomePage);
