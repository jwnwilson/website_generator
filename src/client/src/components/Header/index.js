import React from 'react';
import { connect } from 'react-redux';
import { Link } from "gatsby"
import Scrollspy from 'react-scrollspy';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery';

import './Header.css';
import { select } from 'redux-saga/effects';
//import { componentUpdated } from '../../actions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  componentDidMount() {
    this.smoothScrolling();

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(() => {
      $('.navbar-collapse').collapse('hide');
    });

    // Collapse now if page is not at top
    this.navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(this.navbarCollapse);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.updateComponents) {
      this.smoothScrolling();
      // this.props.componentUpdated();
    }
  }

  smoothScrolling() {
    // Smooth scrolling using jQuery easing
    const selector = 'a.js-scroll-trigger[href*="#"]:not([href="#"])';
    $(selector).unbind('click');
    $(selector).click(function () {   // eslint-disable-line
      if (window.location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && window.location.hostname === this.hostname) {
        let target = $(this.hash);
        let expanded = $("#navbarResponsive")[0].className.indexOf("show") > -1;
        let offset = expanded ? 72 : 50;
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - offset),
          }, 1000, 'easeInOutExpo');
          return false;
        }
      }
      return null;
    });
  }

  navbarCollapse() {
    const element = $('#mainNav');
    if (!element.offset()) return;
    if (element.offset().top > 100) {
      element.addClass('navbar-shrink');
    } else {
      element.removeClass('navbar-shrink');
    }
  }

  render() {
    const { data } = this.props;
    let title = "";
    let links = [];
    const selectors = [];
    let headerLinks = null;

    if (data && data.title) {
      title = data.title;
    } else if (data && data.Title) {
      title = data.Title;
    }
    
    if (data && data.selectors) {
      data.selectors.forEach((selector, index) => {
        let link = (
          <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href={'#' + selector.selector}>
            {selector.name}
          </a>
        );
        links.push (
          <li className="nav-item mx-0 mx-lg-1" key={index}>
            {link}
          </li>
        );
        selectors.push(`card-section-${index+1}`);
      });
    }

    if (data && data.links) {
      data.links.forEach((link, index) => {
        link = (
          <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href={link.url}>
            {link.title}
          </a>
        );
        links.push (
          <li className="nav-item mx-0 mx-lg-1" key={index}>
            {link}
          </li>
        );
      });
    }
      
    headerLinks = (
      <Scrollspy
        className="navbar-nav ml-auto"
        items={selectors}
        currentClassName="active"
        offset={-100}
      >
        {links}
      </Scrollspy>
    );

    return (
      <nav className="navbar navbar-expand-lg bg-secondary text-uppercase" id="mainNav">
        <div className="container">
          <Link className="navbar-brand js-scroll-trigger" to="/#intro">
            {title}
          </Link>
          <button 
            className="navbar-toggler navbar-toggler-right text-uppercase bg-primary text-white rounded"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <FontAwesomeIcon className="ml-2" icon={faBars} />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            {headerLinks}
          </div>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = {
  //componentUpdated,
};

const mapStateToProps = state => ({
  updateComponents: state.updateComponents,
});

Header.propTypes = {
  data: PropTypes.object.isRequired,
  //componentUpdated: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
