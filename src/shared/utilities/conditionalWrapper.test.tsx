import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import { ConditionalWrapper } from './';

Enzyme.configure({ adapter: new Adapter() });

describe('ConditionalWrapper', () => {
  it('Should wrap when true', () => {
    const wrapper = shallow(
      <ConditionalWrapper
        condition={true}
        wrapper={(children) => <a href="/">{children}</a>}
      >
        <img src="image.png" />
      </ConditionalWrapper>
    );

    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('img').length).toBe(1);
  });
  it('Should not wrap when false', () => {
    const wrapper = shallow(
      <ConditionalWrapper
        condition={false}
        wrapper={(children) => <a href="/">{children}</a>}
      >
        <img src="image.png" />
      </ConditionalWrapper>
    );

    expect(wrapper.find('a').length).toBe(0);
    expect(wrapper.find('img').length).toBe(1);
  });
  it('Should not wrap when undefined', () => {
    const wrapper = shallow(
      <ConditionalWrapper wrapper={(children) => <a href="/">{children}</a>}>
        <img src="image.png" />
      </ConditionalWrapper>
    );

    expect(wrapper.find('a').length).toBe(0);
    expect(wrapper.find('img').length).toBe(1);
  });
});
