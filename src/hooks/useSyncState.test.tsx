import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { useSyncState } from './useSyncState';

Enzyme.configure({ adapter: new Adapter() });

describe('Table values are not the previous value', () => {
  it('useSyncState', () => {
    const Test = () => {
      const [getVal, setVal] = useSyncState('light');

      return (
        <span
          onClick={() => {
            setVal('bamboo');
          }}
        >
          {getVal()}
        </span>
      );
    };

    const wrapper = mount(<Test />);
    expect(wrapper.text()).toEqual('light');
    wrapper.find('span').simulate('click');
    expect(wrapper.text()).toEqual('bamboo');
  });
});
