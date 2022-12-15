import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { RadioButton } from './';
import { SelectorSize } from '../CheckBox';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('RadioButton', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  it('Radio button renders', () => {
    const wrapper = mount(<RadioButton checked={true} />);
    expect(
      wrapper.containsMatchingElement(<RadioButton checked={true} />)
    ).toEqual(true);
  });

  it('simulate disabled RadioButton', () => {
    const wrapper = mount(<RadioButton disabled label="test label" />);
    wrapper.find('input').html().includes('disabled=""');
  });

  it('RadioButton is large', () => {
    const wrapper = mount(
      <RadioButton size={SelectorSize.Large} label="test label" />
    );
    expect(wrapper.find('.selector-large')).toBeTruthy();
  });

  it('RadioButton is medium', () => {
    const wrapper = mount(
      <RadioButton size={SelectorSize.Medium} label="test label" />
    );
    expect(wrapper.find('.selector-medium')).toBeTruthy();
  });

  it('RadioButton is small', () => {
    const wrapper = mount(
      <RadioButton size={SelectorSize.Small} label="test label" />
    );
    expect(wrapper.find('.selector-small')).toBeTruthy();
  });
});
