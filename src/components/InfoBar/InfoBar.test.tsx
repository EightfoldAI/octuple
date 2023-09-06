import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { InfoBar, InfoBarType } from './';
import { fireEvent, render } from '@testing-library/react';
import { IconName } from '../Icon';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('InfoBar', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Renders without crashing', () => {
    const { container, getByRole } = render(
      <InfoBar content={'InfoBar test render'} />
    );
    const infoBar = getByRole('alert');
    expect(() => container).not.toThrowError();
    expect(infoBar).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Calls onClose callback when close button is clicked', () => {
    const onClose = jest.fn();
    const { container } = render(
      <InfoBar closable content={'InfoBar test onClose'} onClose={onClose} />
    );
    fireEvent.click(container.querySelector('.close-button'));
    expect(onClose).toHaveBeenCalled();
  });

  test('Renders a custom icon when the icon prop uses a custom icon', () => {
    const { container } = render(
      <InfoBar content={'InfoBar test icon'} icon={IconName.mdiAccountGroup} />
    );
    expect(container.querySelector('.icon')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('InfoBar is Disruptive', () => {
    const { container } = render(
      <InfoBar
        content={'InfoBar test disruptive'}
        type={InfoBarType.disruptive}
      />
    );
    expect(container.querySelector('.disruptive')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('InfoBar is Neutral', () => {
    const { container } = render(
      <InfoBar content={'InfoBar test neutral'} type={InfoBarType.neutral} />
    );
    expect(container.querySelector('.neutral')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('InfoBar is Positive', () => {
    const { container } = render(
      <InfoBar content={'InfoBar test positive'} type={InfoBarType.positive} />
    );
    expect(container.querySelector('.positive')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('InfoBar is Warning', () => {
    const { container } = render(
      <InfoBar content={'InfoBar test warning'} type={InfoBarType.warning} />
    );
    expect(container.querySelector('.warning')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('InfoBar is bordered', () => {
    const { container } = render(
      <InfoBar bordered content={'InfoBar test border'} />
    );
    expect(container.querySelector('.bordered')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
