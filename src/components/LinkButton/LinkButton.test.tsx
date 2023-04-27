import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { LinkButtonSize } from './LinkButton.types';
import {
  DefaultLinkButton,
  NeutralLinkButton,
  PrimaryLinkButton,
  SecondaryLinkButton,
  SystemUILinkButton,
} from '.';
import { NudgeAnimation } from '../Button/Nudge';
import {
  fireEvent,
  getByTestId,
  render,
  waitFor,
} from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Link button', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('simulate click on link button', () => {
    const LinkButtonToClick = (): JSX.Element => {
      return (
        <>
          <PrimaryLinkButton
            data-testid="link-button-1"
            href="https://eightfold.ai"
            text="test LinkButton"
          />
        </>
      );
    };
    const { container } = render(<LinkButtonToClick />);
    const linkButtonTestElement: HTMLElement = getByTestId(
      container,
      'link-button-1'
    );
    fireEvent.click(linkButtonTestElement);
    expect(linkButtonTestElement.getAttribute('href')).toBe(
      'https://eightfold.ai'
    );
  });

  test('simulate click on enabled link button', () => {
    let testCounter = 0;
    const disabled = false;
    const { container } = render(
      <PrimaryLinkButton
        data-testid="link-button-2"
        disabled={disabled}
        href="https://eightfold.ai"
        onClick={() => (testCounter += 1)}
        text="test LinkButton"
      />
    );
    const linkButtonTestElement: HTMLElement = getByTestId(
      container,
      'link-button-2'
    );
    fireEvent.click(linkButtonTestElement);
    fireEvent.click(linkButtonTestElement);
    expect(testCounter).toEqual(2);
    expect(linkButtonTestElement.getAttribute('href')).toBe(
      'https://eightfold.ai'
    );
  });

  test('simulate click on disabled link button', () => {
    let testCounter = 0;
    const disabled = true;
    const { container } = render(
      <PrimaryLinkButton
        data-testid="link-button-3"
        disabled={disabled}
        href="https://eightfold.ai"
        onClick={() => (testCounter += 1)}
        text="test LinkButton"
      />
    );
    const linkButtonTestElement: HTMLElement = getByTestId(
      container,
      'link-button-3'
    );
    fireEvent.click(linkButtonTestElement);
    fireEvent.click(linkButtonTestElement);
    expect(testCounter).toEqual(0);
    expect(container).toMatchSnapshot();
  });

  test('Link button is default', () => {
    const { container } = render(
      <DefaultLinkButton href="https://eightfold.ai" text="test default" />
    );
    expect(
      container.getElementsByClassName('link-button-default')
    ).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Link button is neutral', () => {
    const { container } = render(
      <NeutralLinkButton href="https://eightfold.ai" text="test neutral" />
    );
    expect(
      container.getElementsByClassName('link-button-neutral')
    ).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Link button is primary', () => {
    const { container } = render(
      <PrimaryLinkButton href="https://eightfold.ai" text="test primary" />
    );
    expect(
      container.getElementsByClassName('link-button-primary')
    ).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Link button is secondary', () => {
    const { container } = render(
      <SecondaryLinkButton href="https://eightfold.ai" text="test secondary" />
    );
    expect(
      container.getElementsByClassName('link-button-secondary')
    ).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Link button is system ui', () => {
    const { container } = render(
      <SystemUILinkButton href="https://eightfold.ai" text="test system ui" />
    );
    expect(
      container.getElementsByClassName('link-button-system-ui')
    ).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Link button is large', () => {
    const { container } = render(
      <PrimaryLinkButton
        href="https://eightfold.ai"
        size={LinkButtonSize.Large}
        text="test"
      />
    );
    expect(container.getElementsByClassName('link-button-large')).toHaveLength(
      1
    );
    expect(container).toMatchSnapshot();
  });

  test('Link button is medium', () => {
    const { container } = render(
      <PrimaryLinkButton
        href="https://eightfold.ai"
        size={LinkButtonSize.Medium}
        text="test"
      />
    );
    expect(container.getElementsByClassName('link-button-medium')).toHaveLength(
      1
    );
    expect(container).toMatchSnapshot();
  });

  test('Link button is small', () => {
    const { container } = render(
      <PrimaryLinkButton
        href="https://eightfold.ai"
        size={LinkButtonSize.Small}
        text="test"
      />
    );
    expect(container.getElementsByClassName('link-button-small')).toHaveLength(
      1
    );
    expect(container).toMatchSnapshot();
  });

  test('Link button nudge is background', async () => {
    const { container } = render(
      <PrimaryLinkButton
        href="https://eightfold.ai"
        nudgeProps={{
          animation: NudgeAnimation.Background,
          delay: 0,
          enabled: true,
          iterations: 1,
        }}
        size={LinkButtonSize.Small}
        text="test"
      />
    );
    await waitFor(() =>
      expect(container.getElementsByClassName('background')).toHaveLength(1)
    );
    expect(container.getElementsByClassName('background')).toHaveLength(1);
  });

  test('Link button nudge is bounce', async () => {
    const { container } = render(
      <PrimaryLinkButton
        href="https://eightfold.ai"
        nudgeProps={{
          animation: NudgeAnimation.Bounce,
          delay: 0,
          enabled: true,
          iterations: 1,
        }}
        size={LinkButtonSize.Small}
        text="test"
      />
    );
    await waitFor(() =>
      expect(container.getElementsByClassName('bounce')).toHaveLength(1)
    );
    expect(container.getElementsByClassName('bounce')).toHaveLength(1);
  });

  test('Link button nudge is conic', async () => {
    const { container } = render(
      <PrimaryLinkButton
        href="https://eightfold.ai"
        nudgeProps={{
          animation: NudgeAnimation.Conic,
          delay: 0,
          enabled: true,
          iterations: 1,
        }}
        size={LinkButtonSize.Small}
        text="test"
      />
    );
    await waitFor(() =>
      expect(container.getElementsByClassName('conic')).toHaveLength(1)
    );
    expect(container.getElementsByClassName('conic')).toHaveLength(1);
  });

  test('Link button nudge is ring', async () => {
    const { container } = render(
      <PrimaryLinkButton
        href="https://eightfold.ai"
        nudgeProps={{
          animation: NudgeAnimation.Ring,
          delay: 0,
          enabled: true,
          iterations: 1,
        }}
        size={LinkButtonSize.Small}
        text="test"
      />
    );
    await waitFor(() =>
      expect(container.getElementsByClassName('ring')).toHaveLength(1)
    );
    expect(container.getElementsByClassName('ring')).toHaveLength(1);
  });

  test('Link button nudge is size', async () => {
    const { container, rerender } = render(
      <PrimaryLinkButton
        href="https://eightfold.ai"
        nudgeProps={{
          animation: NudgeAnimation.Size,
          delay: 0,
          enabled: true,
          iterations: 1,
        }}
        size={LinkButtonSize.Small}
        text="test"
      />
    );
    await waitFor(() =>
      expect(container.getElementsByClassName('size')).toHaveLength(1)
    );
    expect(container.getElementsByClassName('size')).toHaveLength(1);
  });

  test('Link button is loading', () => {
    const { container } = render(
      <PrimaryLinkButton
        href="https://eightfold.ai"
        loading
        size={LinkButtonSize.Medium}
        text="test"
      />
    );
    expect(container.getElementsByClassName('loader')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });
});
