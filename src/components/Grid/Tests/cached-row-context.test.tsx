import React, { memo, useContext, useRef, useState } from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Row } from '../Row';
import RowContext from '../RowContext';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

const CacheInner = memo(() => {
  const countRef = useRef(0);
  countRef.current++;
  useContext(RowContext);
  return (
    <div>
      Child Rendering Count: <span id="child_count">{countRef.current}</span>
    </div>
  );
});

const CacheOuter = () => {
  const [count, setCount] = useState(1);
  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <button type="button" onClick={handleClick} id="parent_btn">
        Click
      </button>
      Parent Rendering Count: <span id="parent_count">{count}</span>
      <Row>
        <CacheInner />
      </Row>
    </div>
  );
};

describe('Cached RowContext', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('is working', () => {
    const wrapper = mount(<CacheOuter />);
    const childCount = wrapper.find('#child_count').text();

    wrapper.find('#parent_btn').at(0).simulate('click');
    expect(wrapper.find('#parent_count').text()).toBe('2');
    // child component won't rerender
    expect(wrapper.find('#child_count').text()).toBe(childCount);

    wrapper.find('#parent_btn').at(0).simulate('click');
    expect(wrapper.find('#parent_count').text()).toBe('3');
    // child component won't rerender
    expect(wrapper.find('#child_count').text()).toBe(childCount);
  });
});
