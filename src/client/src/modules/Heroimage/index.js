import React from 'react';
import PropTypes from 'prop-types';
import settings from '../../config/settings';

import './HeroImage.css';

const HeroImage = (props) => {
  console.log("props", props);
  const data = props.data;
  return (
    <section id="intro" className="bg-primary text-white text-center">
      <div className="container">
        <h1 className="text-uppercase mb-0 title">
          {data.title}
        </h1>
        <hr className="star-light" />
        {/* <img
          className="img-fluid rounded-circle col-10 col-sm-8 col-md-6 col-lg-4 mb-5 d-block mx-auto"
          src={settings.serverUrl + data.image.file}
          alt=""
        /> */}
        <h3 className="font-weight-light mb-0">
          {data.text}
        </h3>
      </div>
    </section>
  );
};

HeroImage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default HeroImage;
