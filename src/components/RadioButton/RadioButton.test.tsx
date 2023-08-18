import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { RadioButton } from './';
import { SelectorSize, SelectorWidth, SelectorVariant } from '../CheckBox';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('RadioButton', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Radio button renders', () => {
    const wrapper = mount(<RadioButton checked={true} />);
    expect(
      wrapper.containsMatchingElement(<RadioButton checked={true} />)
    ).toEqual(true);
  });

  test('simulate disabled RadioButton', () => {
    const wrapper = mount(<RadioButton disabled label="test label" />);
    wrapper.find('input').html().includes('disabled=""');
  });

  test('RadioButton is pill', () => {
    const wrapper = mount(
      <RadioButton variant={SelectorVariant.Pill} label="test label" />
    );
    expect(wrapper.find('.selector-pill')).toBeTruthy();
  });

  test('RadioButton is fill pill', () => {
    const wrapper = mount(
      <RadioButton
        selectorWidth={SelectorWidth.fill}
        variant={SelectorVariant.Pill}
        label="test label"
      />
    );
    expect(wrapper.find('.selector-pill-stretch')).toBeTruthy();
  });

  test('RadioButton is large', () => {
    const wrapper = mount(
      <RadioButton size={SelectorSize.Large} label="test label" />
    );
    expect(wrapper.find('.selector-large')).toBeTruthy();
  });

  test('RadioButton is medium', () => {
    const wrapper = mount(
      <RadioButton size={SelectorSize.Medium} label="test label" />
    );
    expect(wrapper.find('.selector-medium')).toBeTruthy();
  });

  test('RadioButton is small', () => {
    const wrapper = mount(
      <RadioButton size={SelectorSize.Small} label="test label" />
    );
    expect(wrapper.find('.selector-small')).toBeTruthy();
  });
});
