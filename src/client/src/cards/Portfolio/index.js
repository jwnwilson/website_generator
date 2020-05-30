import React from 'react';
import PropTypes from 'prop-types';
import {
  NavLink,
} from 'react-router-dom';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faSearchPlus, faExternalLinkAlt, faWindowClose } from '@fortawesome/free-solid-svg-icons'


import { Link } from "gatsby"
import { staticUrl } from '../../config/settings';

import './Portfolio.css';

Modal.setAppElement('#___gatsby');

const customStyles = {
  overlay: {
    zIndex: 1000,
    boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.75)"
  }
};

class Portfolio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      modalIndex: 0
    }
  }

  setIsOpen = () => {
    this.setState({
      modalIsOpen: true
    });
  }

  componentDidMount() {
  }

  openModal = () =>  {
    this.setIsOpen();
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    });
  }

  showProjectModal = (index) => {
    this.setState({
      modalIndex: index
    }, this.openModal);
  }

  render() {
    const { data } = this.props;
    const portfolioItems = data.projects.map((project, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <a className="portfolio-item d-block mx-auto" onClick={() => this.showProjectModal(index)}>
          <div className="portfolio-item-caption d-flex position-absolute h-100 w-100">
            <div className="portfolio-item-caption-content my-auto w-100 text-center text-white">
              <FontAwesomeIcon  icon={faSearchPlus}/>
            </div>
          </div>
          <img className="img-fluid" src={staticUrl + project.cover_image.formats.medium.url} alt="" />
        </a>
      </div>
    ));
  
    const modals = data.projects.map((project, index) => {
      const url = project.url;
      return (
        <Modal
          isOpen={this.state.modalIsOpen && this.state.modalIndex === index}
          onRequestClose={this.closeModal}
          contentLabel="Project summary"
          key={index}
          style={customStyles}
        >
          <div className="modal-container" id={'portfolio-modal-' + index}>
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
                    <img className="img-fluid mb-5" src={staticUrl + project.cover_image.formats.medium.url} alt="" />
                    <p className="mb-5">
                      {project.description}
                    </p>
                    <Link className="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss mr-2" to={url}>
                      <FontAwesomeIcon  icon={faExternalLinkAlt} className="mr-2"/>
                      Details
                    </Link>
                    <span className="btn btn-primary btn-lg rounded-pill portfolio-modal-close" onClick={this.closeModal}>
                      <FontAwesomeIcon  icon={faWindowClose} className="mr-2"/>
                      Close
                    </span>
                  </div>
                </div>
            </div>
          </div>
        </Modal>
      );
    });

    return (
      <div className="bg-white">
        <section className="portfolio " id="portfolio">
          <div className="container">
            <h2 className="text-center text-uppercase text-secondary mb-0">
              Portfolio
            </h2>
            <div style={{textAlign: "center"}}>
              <hr className="star-dark" />
              <div className="star-dark-star">
                <FontAwesomeIcon  icon={faStar}/>
              </div>
            </div>
            
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
