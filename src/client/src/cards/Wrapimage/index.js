import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

import './WrapImage.css';
import { staticUrl } from '../../config/settings';


const WrapImage = (props) => {
  const { data } = props;
  const paras = (
    <ReactMarkdown source={data.text} />
  );
  const link = !data.url ? null : (
    <a href={data.url} target="_blank" className="wrap-image-link">
      <FontAwesomeIcon  icon={faLink}/>
      <span className="ml-3">Link</span>
    </a>
  );
  const img = !data.image ? '' : staticUrl + data.image[0].formats.medium.url;

  return (
    <section className="wrap-image bg-primary text-white mb-0 mt-5" id="wrap-image">
      <div className="container">
        <div className="row">
          <div className="pull-left col-12 col-md-5 mb-3">
            <img className="img-responsive rounded" src={img} alt={data.title} width="100%" style={{ width: '100%' }} />
          </div>
          <div className="pull-left col-12 col-md-7 mt-3">
            <h2>
              {data.title}
            </h2>
            {link}
            <hr />
        </div>
        </div>
        {paras}
        <div className="clear-fix col-xs-12">
          <hr />
        </div>
      </div>
    </section>
  );
};

WrapImage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default WrapImage;
