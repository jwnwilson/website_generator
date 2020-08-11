import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import {
  NavLink,
} from 'react-router-dom';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faSearchPlus, faExternalLinkAlt, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { Link } from "gatsby"
import config from '../../config';
import './Portfolio.css';

Modal.setAppElement('#___gatsby');

const customStyles = {
  overlay: {
    zIndex: 1000,
    boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.75)",
  },
  content: {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
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
    console.log("modalIsOpen", this.modalIsOpen);
  }

  componentDidMount() {
  }

  openModal = () => {
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
        <a className="portfolio-item d-block d-flex mx-auto" onClick={() => this.showProjectModal(index)}>
          <div className="portfolio-item-caption d-flex position-absolute h-100 w-100">
            <div className="portfolio-item-caption-content my-auto w-100 text-center text-white">
              <FontAwesomeIcon icon={faSearchPlus} />
            </div>
          </div>
          <img className="img-fluid" src={config.staticUrl + project.cover_image.url} alt="" />
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
            <span className="btn btn-primary btn-lg rounded-pill portfolio-modal-close" onClick={this.closeModal}>
              <FontAwesomeIcon icon={faWindowClose} className="mr-2" />
                Close
              </span>
          <div className="row">
              <div className="col text-center">
                <h2 className="text-secondary text-uppercase mb-0">
                  {project.title}
                </h2>
                <hr />
              </div>
            </div>
            <div className="center-vertical">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="row">
                      <div className="col-6 d-flex" style={{justifyContent: "center"}}>
                        <img className="img-fluid mb-5" src={config.staticUrl + project.cover_image.url} alt="" />
                      </div>
                      <div className="col-6">
                        <ReactMarkdown source={project.description} /> 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row center-container">
              <a className="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss mr-2" href={url}>
                <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" />
                Check it out
              </a>
            </div>
          </div>
        </Modal>
      );
    });

    return (
      <div className="bg-white">
        <section className="portfolio " id="portfolio" style={{height: "100%"}}>
          <div className="container">
            <h2 className="text-center text-uppercase text-secondary mb-0">
              {data.name}
            </h2>
            <div style={{ textAlign: "center" }}>
              <hr className="star-dark" />
              <div className="star-dark-star">
                <FontAwesomeIcon icon={faStar} />
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
