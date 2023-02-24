import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Icon, IconName, IconSize } from './';
import { render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Icon', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Renders without crashing', () => {
    const { container } = render(<Icon path={IconName.mdiMagnify} />);
    expect(() => container).not.toThrowError();
    expect(container.querySelector('.icon-wrapper')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Renders with the correct icon', () => {
    const { container } = render(<Icon path={IconName.mdiMagnify} />);
    expect(container.querySelector('path').getAttribute('d')).toBe(
      'M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z'
    );
  });

  test('Renders with the correct color', () => {
    const { container } = render(
      <Icon path={IconName.mdiMagnify} color="#666666" />
    );
    expect(container.querySelector('path').getAttribute('style')).toBe(
      'fill: #666666;'
    );
    expect(container).toMatchSnapshot();
  });

  test('Renders with the correct additional classes', () => {
    const { container } = render(
      <Icon path={IconName.mdiMagnify} classNames="custom-class" />
    );
    expect(
      container
        .querySelector('.icon-wrapper')
        .classList.contains('custom-class')
    ).toBe(true);
  });

  test('Renders with the correct title attribute', () => {
    const { container } = render(
      <Icon path={IconName.mdiMagnify} title="Search Icon" />
    );
    expect(container.querySelector('title').innerHTML).toBe('Search Icon');
  });

  test('Icon is large', () => {
    const { container } = render(
      <Icon path={IconName.mdiMagnify} size={IconSize.Large} />
    );
    expect(container.querySelector('svg').getAttribute('style')).toBe(
      'width: 24px; height: 24px;'
    );
    expect(container).toMatchSnapshot();
  });

  test('Icon is medium', () => {
    const { container } = render(
      <Icon path={IconName.mdiMagnify} size={IconSize.Medium} />
    );
    expect(container.querySelector('svg').getAttribute('style')).toBe(
      'width: 20px; height: 20px;'
    );
    expect(container).toMatchSnapshot();
  });

  test('Icon is small', () => {
    const { container } = render(
      <Icon path={IconName.mdiMagnify} size={IconSize.Small} />
    );
    expect(container.querySelector('svg').getAttribute('style')).toBe(
      'width: 16px; height: 16px;'
    );
    expect(container).toMatchSnapshot();
  });

  test('Icon is xsmall', () => {
    const { container } = render(
      <Icon path={IconName.mdiMagnify} size={IconSize.XSmall} />
    );
    expect(container.querySelector('svg').getAttribute('style')).toBe(
      'width: 14px; height: 14px;'
    );
    expect(container).toMatchSnapshot();
  });
});
