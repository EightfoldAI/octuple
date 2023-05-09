import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Empty } from './';

Enzyme.configure({ adapter: new Adapter() });

describe('Empty', () => {
  /*
   * Functionality Tests
   */
  test('empty renders', () => {
    const wrapper = mount(<Empty description="Test" />);
    expect(wrapper.containsMatchingElement(<Empty />)).toEqual(true);
  });

  test('empty includes the description class name', () => {
    const wrapper = mount(
      <Empty description="Test" descriptionClassNames="description-class" />
    );
    expect(
      wrapper.getDOMNode().querySelector('.description-class')
    ).toBeTruthy();
  });
});
