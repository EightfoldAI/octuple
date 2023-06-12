import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { MessageBar, MessageBarType } from '.';
import { fireEvent, render } from '@testing-library/react';
import { IconName } from '../Icon';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('MessageBar', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Renders without crashing', () => {
    const { container, getByRole } = render(
      <MessageBar
        content={'MessageBar test content'}
        header={'MessageBar header'}
      />
    );
    const infoBar = getByRole('alert');
    expect(() => container).not.toThrowError();
    expect(infoBar).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Calls onClose callback when close button is clicked', () => {
    const onClose = jest.fn();
    const { container } = render(
      <MessageBar
        closable
        content={'MessageBar test onClose'}
        header={'MessageBar header'}
        onClose={onClose}
        closeButtonProps={{
          classNames: 'close-button',
        }}
      />
    );
    fireEvent.click(container.querySelector('.close-button'));
    expect(onClose).toHaveBeenCalled();
  });

  test('Renders a custom icon when the icon prop uses a custom icon', () => {
    const { container } = render(
      <MessageBar
        content={'MessageBar test icon'}
        header={'MessageBar header'}
        icon={IconName.mdiAccountGroup}
      />
    );
    expect(container.querySelector('.icon')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('MessageBar is Disruptive', () => {
    const { container } = render(
      <MessageBar
        content={'MessageBar test disruptive'}
        header={'MessageBar header'}
        type={MessageBarType.disruptive}
      />
    );
    expect(container.querySelector('.disruptive')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('MessageBar is Neutral', () => {
    const { container } = render(
      <MessageBar
        content={'MessageBar test neutral'}
        header={'MessageBar header'}
        type={MessageBarType.neutral}
      />
    );
    expect(container.querySelector('.neutral')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('MessageBar is Positive', () => {
    const { container } = render(
      <MessageBar
        content={'MessageBar test positive'}
        header={'MessageBar header'}
        type={MessageBarType.positive}
      />
    );
    expect(container.querySelector('.positive')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('MessageBar is Warning', () => {
    const { container } = render(
      <MessageBar
        content={'MessageBar test warning'}
        header={'MessageBar header'}
        type={MessageBarType.warning}
      />
    );
    expect(container.querySelector('.warning')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
