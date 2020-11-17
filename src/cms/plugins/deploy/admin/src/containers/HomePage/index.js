/*
 *
 * HomePage
 *
 */

import React, { memo, Component} from 'react';
import Button from  'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { FaCheck, FaTimes, FaSpinner, FaQuestion } from 'react-icons/fa';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import {request} from "strapi-helper-plugin";

const Deployment = (deployment, index) => {
  let statusIcon = <FaQuestion className="ml-3"></FaQuestion>;

  statusIcon = deployment.deployStatus == "Success" ? <FaCheck className="ml-3" style={{color: "green"}}></FaCheck> : statusIcon;
  statusIcon = deployment.deployStatus == "Processing" ? <FaSpinner className="ml-3" style={{color: "orange"}}></FaSpinner> : statusIcon;
  statusIcon = deployment.deployStatus == "Failed" ? <FaTimes className="ml-3" style={{color: "red"}}></FaTimes> : statusIcon;

  return (<div key={index.toString()} className="row">
    <div className="col">
      <Accordion.Toggle as={Button} variant="link" eventKey={index.toString()}>
        <div className="row mb-2">
          <h3>Deployment: {deployment._id} </h3>
          {statusIcon}
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={index.toString()}>
        <div className="col">
          <div className="row">
            <p>Time: {new Date(deployment.updatedAt).toLocaleString("en-UK")}</p>
          </div>
          <div className="row">
            <p>Status: {deployment.deployStatus}</p>
          </div>
          <div className="row">
            <pre>Output: {deployment.progress.output}</pre>
          </div>
        </div>
      </Accordion.Collapse>
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
    const deployments = this.state.deployments ? this.state.deployments.map((deployment, index) => Deployment(deployment, index)) : null;
    return (
      <div className="container">
        <div className="col">
          <div className="row pt-3">
            <h1>Deployments</h1>
          </div>
          <hr></hr>
          <Accordion defaultActiveKey="0">
            {deployments}
          </Accordion>
        </div>
      </div>
    );
  };
}

export default memo(HomePage);
