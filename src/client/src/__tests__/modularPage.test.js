/* eslint-env jest */

import { shallow, render } from 'enzyme'
import React from 'react'
import { useStaticQuery } from "gatsby"
import renderer from 'react-test-renderer'

import PageList from '../templates/modularPage';

const testData = {page: {content: JSON.stringify({modules: []})}};

const setup = () => {
}

beforeEach(() => {
  // Use this for more complicated tests and logic
  // useStaticQuery.mockImplementationOnce(({ render }) =>
  //   render({
  //     site: {
  //       siteMetadata: {
  //         title: `Default Starter`,
  //       },
  //     },
  //   })
  // )
  useStaticQuery.mockReturnValue(
    {
      site: {
        siteMetadata: {
          title: `Test Title`,
        },
      },
    }
  );
})

describe('With Enzyme', () => {
  it('App shows "Modular static website"', () => {
    setup();

    const pageList = render(<PageList data={testData}/>)
    expect(pageList.find('h1').text()).toEqual('Test Title')
  })
})

describe('With Snapshot Testing', () => {
  it('App shows "Modular static website"', () => {
    setup();
    const component = renderer.create(<PageList data={testData}/>)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})