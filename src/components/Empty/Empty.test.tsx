import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Empty, EmptyMode } from './';
import { ConfigProvider } from '../ConfigProvider';
import { render, waitFor } from '@testing-library/react';

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
    const { container } = render(
      <Empty description="Test" descriptionClassNames="description-class" />
    );
    expect(container.querySelector('.description-class')).toBeTruthy();
  });

  test('empty gets theme from config provider', () => {
    const { container } = render(
      <ConfigProvider
        themeOptions={{
          name: 'red',
        }}
      >
        <Empty
          description="Test"
          descriptionClassNames="description-class"
          mode={EmptyMode.error}
        />
      </ConfigProvider>
    );
    const svgElement = container.querySelector('svg');
    const pathElement = svgElement.querySelectorAll('path')[0];
    expect(pathElement).toBeInTheDocument();
    const fillValue = pathElement.getAttribute('fill');
    expect(fillValue).toBe('currentColor');
  });
});
