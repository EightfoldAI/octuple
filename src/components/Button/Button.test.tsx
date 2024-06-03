import React, { useState } from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { ButtonSize, ButtonVariant } from './Button.types';
import { Button } from './';
import { NudgeAnimation } from './Nudge';
import {
  fireEvent,
  getByTestId,
  render,
  waitFor,
} from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

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
          <Button
            data-testid="button-1"
            onClick={() => {
              setTotal(12);
            }}
            text={`The value is ${total}`}
            variant={ButtonVariant.Primary}
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
      <Button
        data-testid="button-2"
        disabled={disabled}
        onClick={() => (testCounter += 1)}
        text="test Button"
        variant={ButtonVariant.Primary}
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
      <Button
        data-testid="button-3"
        disabled={disabled}
        onClick={() => (testCounter += 1)}
        text="test Button"
        variant={ButtonVariant.Primary}
      />
    );
    const buttonTestElement: HTMLElement = getByTestId(container, 'button-3');
    fireEvent.click(buttonTestElement);
    fireEvent.click(buttonTestElement);
    expect(testCounter).toEqual(0);
    expect(container).toMatchSnapshot();
  });

  test('Button is default', () => {
    const { container } = render(
      <Button text="test default" variant={ButtonVariant.Default} />
    );
    expect(container.getElementsByClassName('button-default')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Button is neutral', () => {
    const { container } = render(
      <Button text="test neutral" variant={ButtonVariant.Neutral} />
    );
    expect(container.getElementsByClassName('button-neutral')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Button is primary', () => {
    const { container } = render(
      <Button text="test" variant={ButtonVariant.Primary} />
    );
    expect(container.getElementsByClassName('button-primary')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Button is secondary', () => {
    const { container } = render(
      <Button text="test secondary" variant={ButtonVariant.Secondary} />
    );
    expect(container.getElementsByClassName('button-secondary')).toHaveLength(
      1
    );
    expect(container).toMatchSnapshot();
  });

  test('Button is system ui', () => {
    const { container } = render(
      <Button text="test system ui" variant={ButtonVariant.SystemUI} />
    );
    expect(container.getElementsByClassName('button-system-ui')).toHaveLength(
      1
    );
    expect(container).toMatchSnapshot();
  });

  test('Button is large', () => {
    const { container } = render(
      <Button
        size={ButtonSize.Large}
        text="test"
        variant={ButtonVariant.Primary}
      />
    );
    expect(container.getElementsByClassName('button-large')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Button is medium', () => {
    const { container } = render(
      <Button
        size={ButtonSize.Medium}
        text="test"
        variant={ButtonVariant.Primary}
      />
    );
    expect(container.getElementsByClassName('button-medium')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Button is small', () => {
    const { container } = render(
      <Button
        size={ButtonSize.Small}
        text="test"
        variant={ButtonVariant.Primary}
      />
    );
    expect(container.getElementsByClassName('button-small')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Button nudge is background', async () => {
    const { container } = render(
      <Button
        nudgeProps={{
          animation: NudgeAnimation.Background,
          delay: 0,
          enabled: true,
          iterations: 1,
        }}
        size={ButtonSize.Small}
        text="test"
        variant={ButtonVariant.Primary}
      />
    );
    await waitFor(() =>
      expect(container.getElementsByClassName('background')).toHaveLength(1)
    );
    expect(container.getElementsByClassName('background')).toHaveLength(1);
  });

  test('Button nudge is bounce', async () => {
    const { container } = render(
      <Button
        nudgeProps={{
          animation: NudgeAnimation.Bounce,
          delay: 0,
          enabled: true,
          iterations: 1,
        }}
        size={ButtonSize.Small}
        text="test"
        variant={ButtonVariant.Primary}
      />
    );
    await waitFor(() =>
      expect(container.getElementsByClassName('bounce')).toHaveLength(1)
    );
    expect(container.getElementsByClassName('bounce')).toHaveLength(1);
  });

  test('Button nudge is conic', async () => {
    const { container } = render(
      <Button
        nudgeProps={{
          animation: NudgeAnimation.Conic,
          delay: 0,
          enabled: true,
          iterations: 1,
        }}
        size={ButtonSize.Small}
        text="test"
        variant={ButtonVariant.Primary}
      />
    );
    await waitFor(() =>
      expect(container.getElementsByClassName('conic')).toHaveLength(1)
    );
    expect(container.getElementsByClassName('conic')).toHaveLength(1);
  });

  test('Button nudge is ring', async () => {
    const { container } = render(
      <Button
        nudgeProps={{
          animation: NudgeAnimation.Ring,
          delay: 0,
          enabled: true,
          iterations: 1,
        }}
        size={ButtonSize.Small}
        text="test"
        variant={ButtonVariant.Primary}
      />
    );
    await waitFor(() =>
      expect(container.getElementsByClassName('ring')).toHaveLength(1)
    );
    expect(container.getElementsByClassName('ring')).toHaveLength(1);
  });

  test('Button nudge is size', async () => {
    const { container, rerender } = render(
      <Button
        nudgeProps={{
          animation: NudgeAnimation.Size,
          delay: 0,
          enabled: true,
          iterations: 1,
        }}
        size={ButtonSize.Small}
        text="test"
        variant={ButtonVariant.Primary}
      />
    );
    await waitFor(() =>
      expect(container.getElementsByClassName('size')).toHaveLength(1)
    );
    expect(container.getElementsByClassName('size')).toHaveLength(1);
  });

  test('Button is loading', () => {
    const { container } = render(
      <Button
        loading
        size={ButtonSize.Medium}
        text="test"
        variant={ButtonVariant.Primary}
      />
    );
    expect(container.getElementsByClassName('loader')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });
});
