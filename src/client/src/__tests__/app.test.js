/* eslint-env jest */

import { shallow, render, mount } from 'enzyme'
import React from 'react'
import { useStaticQuery } from "gatsby"
import renderer from 'react-test-renderer'
import sinon from 'sinon' 

import App from '../templates/app';
import { preloadCards } from '../templates/app';

const testPageData = {
  "title": "Home",
  "name": "Home",
  "url": "/",
  "slug": "home",
  "cards": [
      {
          "__component": "card.welcome",
          "title": "Welcome",
          "name": "Welcome",
          "text": "Python - Django - Flask - Celery - Javascript - React - Kubernetes",
          "createdAt": "2020-07-12T10:17:47.279Z",
          "updatedAt": "2020-08-11T10:39:09.476Z",
          "__v": 0,
          "image": {
              "_id": "5f0ae34616f21d001e59fe83",
              "name": "jwn_hero_image",
              "alternativeText": "",
              "caption": "",
              "hash": "jwn_hero_image_b1197e95c3",
              "ext": ".jpeg",
              "mime": "image/jpeg",
              "size": 76.05,
              "width": 960,
              "height": 720,
              "url": "/uploads/jwn_hero_image_b1197e95c3.jpeg",
              "formats": {
                  "thumbnail": {
                      "hash": "thumbnail_jwn_hero_image_b1197e95c3",
                      "ext": ".jpeg",
                      "mime": "image/jpeg",
                      "width": 208,
                      "height": 156,
                      "size": 6.96,
                      "path": null,
                      "url": "/uploads/thumbnail_jwn_hero_image_b1197e95c3.jpeg"
                  },
                  "medium": {
                      "hash": "medium_jwn_hero_image_b1197e95c3",
                      "ext": ".jpeg",
                      "mime": "image/jpeg",
                      "width": 750,
                      "height": 563,
                      "size": 59.76,
                      "path": null,
                      "url": "/uploads/medium_jwn_hero_image_b1197e95c3.jpeg"
                  },
                  "small": {
                      "hash": "small_jwn_hero_image_b1197e95c3",
                      "ext": ".jpeg",
                      "mime": "image/jpeg",
                      "width": 500,
                      "height": 375,
                      "size": 30.73,
                      "path": null,
                      "url": "/uploads/small_jwn_hero_image_b1197e95c3.jpeg"
                  }
              },
              "provider": "local",
              "related": [],
              "createdAt": "2020-07-12T10:17:42.477Z",
              "updatedAt": "2020-07-15T09:46:06.589Z",
              "__v": 0,
              "id": "5f0ae34616f21d001e59fe83"
          },
          "id": "5f0ae34b16f21d001e59fe85"
      },
      {
          "__component": "card.portfolio",
          "_id": "5f0f24150b7d309ef8275730",
          "title": "Portfolio",
          "name": "Projects",
          "projects": [
              {
                  "_id": "5f0f24150b7d309ef8275731",
                  "title": "Safari Mixer",
                  "description": "# Safari Mixer\\n\\n A Google voice experiment written in Node.js and React, available as a web app and also a google home app. Written end to end by myself as a short professional project at Rehab Studio.\\n\\n## Tech",
                  "url": "https://safarimixer.beta.rehab/",
                  "createdAt": "2020-07-15T15:43:17.513Z",
                  "updatedAt": "2020-08-11T10:39:09.485Z",
                  "__v": 0,
                  "cover_image": {
                      "_id": "5f0f24110b7d309ef827572f",
                      "name": "safari-mixer-small",
                      "alternativeText": "",
                      "caption": "",
                      "hash": "safari_mixer_small_c568e0cd3c",
                      "ext": ".jpeg",
                      "mime": "image/png",
                      "size": 20.58,
                      "width": 160,
                      "height": 153,
                      "url": "/uploads/safari_mixer_small_c568e0cd3c.jpeg",
                      "formats": {},
                      "provider": "local",
                      "related": [],
                      "createdAt": "2020-07-15T15:43:13.748Z",
                      "updatedAt": "2020-08-11T10:39:06.521Z",
                      "__v": 0,
                      "id": "5f0f24110b7d309ef827572f"
                  },
                  "id": "5f0f24150b7d309ef8275731"
              }
          ],
          "createdAt": "2020-07-15T15:43:17.503Z",
          "updatedAt": "2020-08-11T10:39:09.500Z",
          "__v": 1,
          "id": "5f0f24150b7d309ef8275730"
      },
      {
          "__component": "card.contact-me",
          "_id": "5f1d78d3fc5ad0da568a71ef",
          "title": "Contact me",
          "send_url": "https://mail.jwnwilson-kube.co.uk/send",
          "createdAt": "2020-07-26T12:36:35.123Z",
          "updatedAt": "2020-08-11T10:39:09.461Z",
          "__v": 0,
          "id": "5f1d78d3fc5ad0da568a71ef"
      }
  ],
  "createdAt": "2020-07-12T10:17:47.275Z",
  "updatedAt": "2020-08-11T10:39:09.537Z",
  "__v": 1,
  "deployed_at": "2020-07-13T14:00:00.016Z",
  "footer": {
      "_id": "5f0ef5b20b7d309ef827572d",
      "about_title": "About me",
      "about_me": "I'm a Full Stack Developer with VFX experience currently working in London I'm interested in web development, machine learning and data science!",
      "insta_url": "https://www.instagram.com/noelwilsonlon",
      "name": "Default",
      "location_title": "Location",
      "linkedin_url": "https://www.linkedin.com/in/noel-wilson-0a194225",
      "links_title": "Around the web",
      "github_url": "https://github.com/jwnwilson",
      "location": "Essex / London",
      "createdAt": "2020-07-15T12:25:22.477Z",
      "updatedAt": "2020-07-15T12:25:22.477Z",
      "__v": 0,
      "id": "5f0ef5b20b7d309ef827572d"
  },
  "header": {
      "_id": "5f0ef5760b7d309ef827572c",
      "selectors": [
          {
              "selector": "portfolio",
              "name": "Portfolio"
          }
      ],
      "links": null,
      "title": "Noel Wilson",
      "name": "Default",
      "createdAt": "2020-07-15T12:24:22.541Z",
      "updatedAt": "2020-08-13T10:41:32.573Z",
      "__v": 0,
      "subtitle": "Full Stack Developer",
      "id": "5f0ef5760b7d309ef827572c"
  },
  "id": "5f0ae34b16f21d001e59fe84"
}
const testData = {
  site: {
    siteMetadata: {
      title: `Test Title`,
    },
  },
  page: {
    content: JSON.stringify(
      testPageData
    )
  }
};

const originalConsoleError = console.error;

beforeAll(() => {
  return preloadCards();
})

beforeEach(() => {
  // Use this for more complicated tests and logic
  useStaticQuery.mockReturnValue(testData);
  // Suppress SSR warning
  console.error = jest.fn((msg) => {
    if (msg.includes('Warning: useLayoutEffect does nothing on the server')) {
      return null;
    } else {
      originalConsoleError(msg);
    }
  });
})

afterEach(() => {
  console.error = originalConsoleError;
});

describe('With Enzyme render', () => {
  it('App shows "Noel Wilson"', () => {
    const app = render(<App data={testData} />)
    expect(app.find('a').text()).toContain('Noel Wilson')
  })

  it('App has welcome card', () => {
    const app = render(<App data={testData} />)
    expect(app.find('h1').text()).toContain('Welcome')
  })

  it('App has projects card', () => {
    const app = render(<App data={testData} />)
    expect(app.find('h2').text()).toContain('Projects')
  })

  it('App has contact me card', () => {
    const app = render(<App data={testData} />)
    expect(app.find('h2').text()).toContain('Contact Me')
  })
})


describe('With Enzyme mount', () => {
  beforeEach(() => {
    // Avoid `attachTo: document.body` Warning
    const div = document.createElement('div');
    div.setAttribute('id', 'container');
    document.body.appendChild(div);
  });
  
  afterEach(() => {
    const div = document.getElementById('container');
    if (div) {
      document.body.removeChild(div);
    }
  });
  
  it('App skips welcome re-render', () => {
    sinon.spy(App.prototype, "renderCard");
    const wrapper = mount(<App data={testData}/>, { attachTo: document.getElementById('container') });
    expect(App.prototype.renderCard.callCount).toBe(3);
    const hydratedWrapper = mount(<App data={testData}/>, { hydrateIn: document.getElementById('container') });
    expect(App.prototype.renderCard.callCount).toBe(5);
  })
})

describe('With Snapshot Testing', () => {
  it('App snapshot with test data', () => {
    const component = renderer.create(<App data={testData} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})