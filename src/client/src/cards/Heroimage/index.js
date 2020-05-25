import React from 'react';
import PropTypes from 'prop-types';
import settings from '../../config/settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import './HeroImage.css';
import { apiUrl } from '../../config/settings';

const HeroImage = (props) => {
  const data = props.data;
  console.log("data:", data);
  return (
    <section id="intro" className="bg-primary text-white text-center">
      <div className="container">
        <img
            className="img-fluid rounded-circle col-10 col-sm-8 col-md-6 col-lg-4 mb-5 d-block mx-auto"
            src={apiUrl + data.image.formats.medium.url}
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
