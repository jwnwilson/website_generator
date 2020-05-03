import React from 'react';
import PropTypes from 'prop-types';

import './About.css';

const About = (props) => {
  const { data } = props;
  return (
    <section className="bg-primary text-white mb-0" id="about">
      <div className="container">
        <h2 className="text-center text-uppercase text-white">
          {data.title}
        </h2>
        <hr className="star-light mb-5" />
        <div className="row">
          <div className="col-lg-4 ml-auto">
            <p className="lead">
              {data.paragraph_1}
            </p>
          </div>
          <div className="col-lg-4 mr-auto">
            <p className="lead">
              {data.paragraph_2}
            </p>
          </div>
        </div>
        {data.cv_link
          && (
          <div className="text-center mt-4">
            <a className="btn btn-xl btn-outline-light" target="_blank" href={data.cv_link}>
              <i className="fa fa-download mr-2" />
              CV Link
            </a>
          </div>
          )
        }
      </div>
    </section>
  );
};

About.propTypes = {
  data: PropTypes.object.isRequired,
};

export default About;
