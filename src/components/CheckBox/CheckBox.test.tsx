import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import {
  CheckBox,
  CheckBoxGroup,
  SelectorSize,
  SelectorWidth,
  SelectorVariant,
} from './';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('CheckBox', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('CheckBox renders', () => {
    const wrapper = mount(<CheckBox checked={true} />);
    expect(
      wrapper.containsMatchingElement(<CheckBox checked={true} />)
    ).toEqual(true);
  });

  test('Checkbox renders as toggle switch', () => {
    const wrapper = mount(<CheckBox checked={true} toggle />);
    expect(wrapper.find('.toggle')).toBeTruthy();
  });

  test('Simulate disabled CheckBox', () => {
    const wrapper = mount(<CheckBox disabled label="test label" />);
    wrapper.find('input').html().includes('disabled=""');
  });

  test('Simulate indeterminate CheckBox', () => {
    const wrapper = mount(<CheckBox indeterminate label="test label" />);
    wrapper.find('input').html().includes('indeterminate');
  });

  test('Checkbox is pill', () => {
    const wrapper = mount(
      <CheckBox variant={SelectorVariant.Pill} label="test label" />
    );
    expect(wrapper.find('.selector-pill')).toBeTruthy();
  });

  test('Checkbox is fill pill', () => {
    const wrapper = mount(
      <CheckBox
        selectorWidth={SelectorWidth.fill}
        variant={SelectorVariant.Pill}
        label="test label"
      />
    );
    expect(wrapper.find('.selector-pill-stretch')).toBeTruthy();
  });

  test('CheckBox is large', () => {
    const wrapper = mount(
      <CheckBox size={SelectorSize.Large} label="test label" />
    );
    expect(wrapper.find('.selector-large')).toBeTruthy();
  });

  test('CheckBox is medium', () => {
    const wrapper = mount(
      <CheckBox size={SelectorSize.Medium} label="test label" />
    );
    expect(wrapper.find('.selector-medium')).toBeTruthy();
  });

  test('CheckBox is small', () => {
    const wrapper = mount(
      <CheckBox size={SelectorSize.Small} label="test label" />
    );
    expect(wrapper.find('.selector-small')).toBeTruthy();
  });

  test('CheckBoxGroup renders', () => {
    const wrapper = mount(
      <CheckBoxGroup
        items={[
          {
            name: 'group',
            value: 'First',
            label: 'First',
            id: 'test-1',
          },
          {
            name: 'group',
            value: 'Second',
            label: 'Second',
            id: 'test-2',
          },
          {
            name: 'group',
            value: 'Third',
            label: 'Third',
            id: 'test-3',
          },
        ]}
        layout="vertical"
      />
    );
    expect(
      wrapper.containsMatchingElement(
        <CheckBoxGroup
          items={[
            {
              name: 'group',
              value: 'First',
              label: 'First',
              id: 'test-1',
            },
            {
              name: 'group',
              value: 'Second',
              label: 'Second',
              id: 'test-2',
            },
            {
              name: 'group',
              value: 'Third',
              label: 'Third',
              id: 'test-3',
            },
          ]}
          layout="vertical"
        />
      )
    ).toEqual(true);
  });

  test('CheckBox with toggle is not readOnly', () => {
    const wrapper = mount(<CheckBox toggle label="test label" />);
    expect(wrapper.find('input').prop('readOnly')).toBeFalsy();
  });
});
