import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { SearchBox } from './SearchBox';
import { IconName } from '../../Icon';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('SearchBox', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });
  afterEach(() => {
    matchMedia.clear();
  });

  test('Text input renders', () => {
    const wrapper = mount(<SearchBox />);
    expect(wrapper.containsMatchingElement(<SearchBox />)).toEqual(true);
  });

  test('Text input renders with partially customized icon button', () => {
    const wrapper = mount(
      <SearchBox iconButtonProps={{ htmlType: 'submit' }} />
    );
    expect(wrapper.containsMatchingElement(<SearchBox />)).toEqual(true);
  });

  test('Text input default non-interactive icon button renders as disabled and with aria-hidden', () => {
    const wrapper = mount(<SearchBox />);
    const button = wrapper.find('button');
    expect(button.prop('disabled')).toBe(true);
    expect(button.prop('aria-hidden')).toBe(true);
    expect(button.prop('aria-label')).toBeUndefined();
  });

  test('Expandable thumb uses ariaHidden and tabIndex from iconButtonProps', () => {
    const { container } = render(
      <SearchBox
        expandable
        iconButtonProps={{
          ariaHidden: true,
          iconProps: { path: IconName.mdiMagnify },
          tabIndex: -1,
        }}
      />
    );
    const thumb = container.querySelector('.expandable-thumb');
    expect(thumb).toHaveAttribute('aria-hidden', 'true');
    expect(thumb).toHaveAttribute('tabindex', '-1');
  });

  test('Form is a search landmark by default', () => {
    const { container } = render(<SearchBox />);
    expect(container.querySelector('form')).toHaveAttribute('role', 'search');
  });

  test('Form is not a landmark when searchLandmark is false', () => {
    const { container } = render(<SearchBox searchLandmark={false} />);
    expect(container.querySelector('form')).not.toHaveAttribute('role');
  });

  test('Text input is readonly', () => {
    const { container } = render(
      <SearchBox readonly defaultValue="Test value" />
    );
    expect(
      container.getElementsByTagName('input')[0].hasAttribute('readonly')
    ).toBeTruthy();
    expect(
      container.getElementsByTagName('input')[0].getAttribute('value')
    ).toBe('Test value');
  });
});
