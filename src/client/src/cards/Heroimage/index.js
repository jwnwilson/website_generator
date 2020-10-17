import React from 'react';
import PropTypes from 'prop-types';
import settings from '../../config/settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import './HeroImage.css';
import config from '../../config';

const HeroImage = (props) => {
  const data = props.data;
  let heroImageUrl = null;

  if (data.image !== undefined) {
    heroImageUrl = config.staticUrl + data.image.url;
  }
  return (
    <section id="intro" className="bg-primary text-white text-center">
      <div className="container mt-0 mt-md-5">
        <img
            className="img-fluid rounded-circle col-10 col-sm-8 col-md-6 col-lg-4 mb-5 d-block mx-auto"
            src={heroImageUrl}
            alt=""
        />
        <h1 className="text-uppercase mb-0 title">
          {data.title}
        </h1>
        <hr className="star-light" />
        <div className="star-light-star">
          <FontAwesomeIcon  icon={faStar}/>
        </div>
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
