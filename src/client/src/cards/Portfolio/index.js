import React from 'react';
import PropTypes from 'prop-types';
import {
  NavLink,
} from 'react-router-dom';
import { Link } from "gatsby"
import { apiUrl } from '../../config/settings';

import './Portfolio.css';

// Load global jQuery
const { $ } = window;

class Portfolio extends React.Component {
  componentDidMount() {
  }

  render() {
    const { data } = this.props;
    const portfolioItems = data.projects.map((project, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <a className="portfolio-item d-block mx-auto" href={'#portfolio-modal-' + index}>
          <div className="portfolio-item-caption d-flex position-absolute h-100 w-100">
            <div className="portfolio-item-caption-content my-auto w-100 text-center text-white">
              <i className="fa fa-search-plus fa-3x" />
            </div>
          </div>
          <img className="img-fluid" src={apiUrl + project.cover_image.formats.medium.url} alt="" />
        </a>
      </div>
    ));
    const modals = data.projects.map((project, index) => {
      const url = project.url;
      return (
        <div key={index} className="portfolio-modal mfp-hide" id={'portfolio-modal-' + index}>
          <div className="portfolio-modal-dialog bg-white">
            <a className="close-button d-none d-md-block portfolio-modal-close" href="#">
              <i className="fa fa-3x fa-times" />
            </a>
            <div className="container text-center">
              <div className="row">
                <div className="col-lg-8 mx-auto">
                  <h2 className="text-secondary text-uppercase mb-0">
                    {project.title}
                  </h2>
                  <hr className="star-dark mb-5" />
                  <img className="img-fluid mb-5" src={apiUrl + project.cover_image.formats.medium.url} alt="" />
                  <p className="mb-5">
                    {project.description}
                  </p>
                  <Link className="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss mr-2" to={url}>
                    <i className="fa fa-external-link mr-2" />
                    Details
                  </Link>
                  <a className="btn btn-primary btn-lg rounded-pill portfolio-modal-close" href="">
                    <i className="fa fa-close mr-2" />
                    Close
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="bg-white">
        <section className="portfolio " id="portfolio">
          <div className="container">
            <h2 className="text-center text-uppercase text-secondary mb-0">
              Portfolio
            </h2>
            <hr className="star-dark mb-5" />
            <div className="row">
              {portfolioItems}
            </div>
          </div>
        </section>
        {modals}
      </div>
    );
  }
}

Portfolio.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Portfolio;
