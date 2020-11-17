/*
 *
 * HomePage
 *
 */

import React, { memo, Component} from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import {request} from "strapi-helper-plugin";

const Deployment = (deployment) => {
  return (<div key={deployment._id} className="row">
    <div className="col">
      <div className="row mb-2">
        <h3>Deployment: {deployment._id} </h3>
      </div>
      <div className="row">
        <p>Status: {deployment.deployStatus}</p>
      </div>
      <div className="row">
        <pre>Output: {deployment.progress.output}</pre>
      </div>
    </div>
  </div>)
}


class HomePage extends Component {
  state = {
    deployments: null
  }

  deployState = async () => {
    try {
      const response = await request("/deploy/deployment?_sort=createdAt:desc", {
        method: "GET",
      });

      console.log("response", response)
      this.setState({ deployments: response});
    } catch (e) {
      this.setState({ deployments: null }, () => {
        strapi.notification.error(`Unable to get deployment info.`);
        strapi.notification.error(`${e}`);
      });
    }
  }

  async componentDidMount() {
    await this.deployState();
    this.interval = setInterval(async () => this.deployState(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    console.log("this.state.deployments", this.state.deployments);
    const deployments = this.state.deployments ? this.state.deployments.map(deployment => Deployment(deployment)) : null;
    return (
      <div className="container">
        <div className="col">
          <div className="row pt-3">
            <h1>Deployments</h1>
          </div>
          <hr></hr>
          {deployments}
        </div>
      </div>
    );
  };
}

export default memo(HomePage);
