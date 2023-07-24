import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Badge, BadgeProps, BadgeSize } from './';
import { render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

const badgeProps: BadgeProps = {
  active: false,
  classNames: 'my-badge-class',
  style: {},
  children: '8',
  disruptive: false,
  'data-testid': 'test-badge',
};

describe('Badge', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Renders without crashing', () => {
    const { container, getByTestId } = render(<Badge {...badgeProps} />);
    const badge = getByTestId('test-badge');
    expect(() => container).not.toThrowError();
    expect(badge).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Badge accepts custom style', () => {
    const { container, getByTestId } = render(
      <Badge {...badgeProps} style={{ color: '#000000' }} />
    );
    const badge = getByTestId('test-badge');
    expect(badge.style.color).toBe('rgb(0, 0, 0)');
    expect(container).toMatchSnapshot();
  });

  test('Badge accepts custom class', () => {
    const { container, getByTestId } = render(<Badge {...badgeProps} />);
    const badge = getByTestId('test-badge');
    expect(badge.classList.contains('my-badge-class')).toBe(true);
  });

  test('Badge is disruptive', () => {
    const { container } = render(<Badge {...badgeProps} disruptive />);
    expect(container.querySelector('.disruptive')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Badge is active', () => {
    const { container } = render(<Badge {...badgeProps} active />);
    expect(container.querySelector('.active')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Badge is large', () => {
    const { container } = render(
      <Badge {...badgeProps} size={BadgeSize.Large} />
    );
    expect(container.querySelector('.badge-large')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Badge is medium', () => {
    const { container } = render(
      <Badge {...badgeProps} size={BadgeSize.Medium} />
    );
    expect(container.querySelector('.badge-medium')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Badge is small', () => {
    const { container } = render(
      <Badge {...badgeProps} size={BadgeSize.Small} />
    );
    expect(container.querySelector('.badge-small')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
