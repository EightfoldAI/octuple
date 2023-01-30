import React, { useState } from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { ButtonSize } from './Button.types';
import {
  DefaultButton,
  NeutralButton,
  PrimaryButton,
  SecondaryButton,
  SystemUIButton,
} from './';
import { NudgeAnimation } from './Nudge';
import { fireEvent, getByTestId, render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

const sleep: (ms: number) => Promise<unknown> = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

describe('Button', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('simulate click on button', () => {
    const ButtonToClick = (): JSX.Element => {
      const [total, setTotal] = useState<number>(0);
      return (
        <>
          <PrimaryButton
            data-testid="button-1"
            onClick={() => {
              setTotal(12);
            }}
            text={`The value is ${total}`}
          />
        </>
      );
    };
    const { container } = render(<ButtonToClick />);
    const buttonTestElement: HTMLElement = getByTestId(container, 'button-1');
    expect(buttonTestElement.innerHTML).toContain('The value is 0');
    fireEvent.click(buttonTestElement);
    expect(buttonTestElement.innerHTML).toContain('The value is 12');
  });

  test('simulate click on enabled button', () => {
    let testCounter = 0;
    const disabled = false;
    const { container } = render(
      <PrimaryButton
        data-testid="button-2"
        disabled={disabled}
        onClick={() => (testCounter += 1)}
        text="test Button"
      />
    );
    const buttonTestElement: HTMLElement = getByTestId(container, 'button-2');
    fireEvent.click(buttonTestElement);
    fireEvent.click(buttonTestElement);
    expect(testCounter).toEqual(2);
  });

  test('simulate click on disabled button', () => {
    let testCounter = 0;
    const disabled = true;
    const { container } = render(
      <PrimaryButton
        data-testid="button-3"
        disabled={disabled}
        onClick={() => (testCounter += 1)}
        text="test Button"
      />
    );
    const buttonTestElement: HTMLElement = getByTestId(container, 'button-3');
    fireEvent.click(buttonTestElement);
    fireEvent.click(buttonTestElement);
    expect(testCounter).toEqual(0);
    expect(container).toMatchSnapshot();
  });

  test('Button is default', () => {
    const { container } = render(<DefaultButton text="test default" />);
    expect(container.getElementsByClassName('button-default')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Button is neutral', () => {
    const { container } = render(<NeutralButton text="test neutral" />);
    expect(container.getElementsByClassName('button-neutral')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Button is primary', () => {
    const { container } = render(<PrimaryButton text="test" />);
    expect(container.getElementsByClassName('button-primary')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Button is secondary', () => {
    const { container } = render(<SecondaryButton text="test secondary" />);
    expect(container.getElementsByClassName('button-secondary')).toHaveLength(
      1
    );
    expect(container).toMatchSnapshot();
  });

  test('Button is system ui', () => {
    const { container } = render(<SystemUIButton text="test system ui" />);
    expect(container.getElementsByClassName('button-system-ui')).toHaveLength(
      1
    );
    expect(container).toMatchSnapshot();
  });

  test('Button is large', () => {
    const { container } = render(
      <PrimaryButton size={ButtonSize.Large} text="test" />
    );
    expect(container.getElementsByClassName('button-large')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Button is medium', () => {
    const { container } = render(
      <PrimaryButton size={ButtonSize.Medium} text="test" />
    );
    expect(container.getElementsByClassName('button-medium')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Button is small', () => {
    const { container } = render(
      <PrimaryButton size={ButtonSize.Small} text="test" />
    );
    expect(container.getElementsByClassName('button-small')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Button nudge is background', async () => {
    const { container } = render(
      <PrimaryButton
        nudgeProps={{
          animation: NudgeAnimation.Background,
          delay: 400,
          enabled: true,
          iterations: 1,
        }}
        size={ButtonSize.Small}
        text="test"
      />
    );
    await sleep(500);
    expect(container.getElementsByClassName('background')).toHaveLength(1);
  });

  test('Button nudge is bounce', async () => {
    const { container } = render(
      <PrimaryButton
        nudgeProps={{
          animation: NudgeAnimation.Bounce,
          delay: 400,
          enabled: true,
          iterations: 1,
        }}
        size={ButtonSize.Small}
        text="test"
      />
    );
    await sleep(500);
    expect(container.getElementsByClassName('bounce')).toHaveLength(1);
  });

  test('Button nudge is conic', () => {
    const { container } = render(
      <PrimaryButton
        nudgeProps={{
          animation: NudgeAnimation.Conic,
          delay: 0,
          enabled: true,
          iterations: 1,
        }}
        size={ButtonSize.Small}
        text="test"
      />
    );
    expect(container.getElementsByClassName('conic')).toHaveLength(1);
  });

  test('Button nudge is ring', async () => {
    const { container } = render(
      <PrimaryButton
        nudgeProps={{
          animation: NudgeAnimation.Ring,
          delay: 400,
          enabled: true,
          iterations: 1,
        }}
        size={ButtonSize.Small}
        text="test"
      />
    );
    await sleep(500);
    expect(container.getElementsByClassName('ring')).toHaveLength(1);
  });

  test('Button nudge is size', async () => {
    const { container, rerender } = render(
      <PrimaryButton
        nudgeProps={{
          animation: NudgeAnimation.Size,
          delay: 400,
          enabled: true,
          iterations: 1,
        }}
        size={ButtonSize.Small}
        text="test"
      />
    );
    await sleep(500);
    expect(container.getElementsByClassName('size')).toHaveLength(1);
  });
});
