import React from 'react';
import PropTypes from 'prop-types';

import './Footer.css';

// Load global jQuery
const { $ } = window;

class Footer extends React.Component {
  componentDidMount() {
  }

  render() {
    const data = this.props.data || {};
    console.log("data", data);
    return (
      !data ? null
        : (
          <div>
            <footer className="footer text-center">
              <div className="container">
                <div className="row">
                  <div className="col-md-4 mb-5 mb-lg-0">
                    <h4 className="text-uppercase mb-4">
                      Location
                    </h4>
                    <p className="lead mb-0">
                      {data.location}
                    </p>
                  </div>
                  <div className="col-md-4 mb-5 mb-lg-0">
                    <h4 className="text-uppercase mb-4">
                      Around the Web
                    </h4>
                    <ul className="list-inline mb-0">
                      <li className="list-inline-item">
                        <a className="btn btn-outline-light btn-social text-center rounded-circle" href={data.github_url}>
                          <i className="fa fa-fw fa-github" />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="btn btn-outline-light btn-social text-center rounded-circle" href={data.linkedin_url}>
                          <i className="fa fa-fw fa-linkedin" />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="btn btn-outline-light btn-social text-center rounded-circle" href={data.instagram_url}>
                          <i className="fa fa-fw fa-instagram" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4">
                    <h4 className="text-uppercase mb-4">
                      About Me
                    </h4>
                    <p className="lead mb-0">
                      {data.about_me}
                    </p>
                  </div>
                </div>
              </div>
            </footer>

            <div className="copyright py-4 text-center text-white">
              <div className="container">
                <small>
                  Copyright &copy; Noel Wilson 2020
                </small>
              </div>
            </div>

            <div className="scroll-to-top position-fixed ">
              <a className="js-scroll-trigger d-block text-center text-white rounded" href="#page-top">
                <i className="fa fa-chevron-up" />
              </a>
            </div>
          </div>
        )
    );
  }
}

export default Footer;
