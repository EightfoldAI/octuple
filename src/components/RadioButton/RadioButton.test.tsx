import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { render, screen } from '@testing-library/react';
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

  test('RadioButton label is exposed only as the input accessible name', () => {
    const { container } = render(<RadioButton label="Option" value="a" />);
    expect(screen.getByRole('radio', { name: 'Option' })).toBeTruthy();
    expect(container.querySelector('label').getAttribute('aria-hidden')).toBe(
      'true'
    );
  });

  test('RadioButton ariaLabel takes precedence over the visible label', () => {
    const { container } = render(
      <RadioButton ariaLabel="Choose option A" label="Option" value="a" />
    );
    expect(screen.getByRole('radio', { name: 'Choose option A' })).toBeTruthy();
    expect(
      container.querySelector('input').hasAttribute('aria-labelledby')
    ).toBe(false);
    expect(container.querySelector('label').getAttribute('aria-hidden')).toBe(
      'true'
    );
  });

  test('RadioButton rich label stays in the a11y tree', () => {
    const { container } = render(
      <RadioButton
        value="a"
        label={
          <>
            Option with <a href="#details">details</a>
          </>
        }
      />
    );
    expect(container.querySelector('label').hasAttribute('aria-hidden')).toBe(
      false
    );
    expect(screen.getByRole('link', { name: 'details' })).toBeTruthy();
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
