import React, { FC, useState } from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Tooltip, TooltipSize } from './';
import { Button, ButtonVariant } from '../Button';
import { Truncate } from '../Truncate';
import useGestures, { Gestures } from '../../hooks/useGestures';
import {
  fireEvent,
  getByTestId,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import '@testing-library/jest-dom/extend-expect';
import 'window-resizeto/polyfill';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

const mockNavigator = (agent: string): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (navigator as any).__defineGetter__('userAgent', (): string => {
    return agent;
  });
};

jest.useFakeTimers();

const fireResize = (width: number) => {
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
};

describe('Tooltip', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Tooltip shows and hides on click', async () => {
    const { container } = render(
      <Tooltip
        content={<div data-testid="tooltip">This is a tooltip.</div>}
        trigger="click"
      >
        <div className="test-div">test</div>
      </Tooltip>
    );
    fireEvent.click(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('tooltip'));
    expect(container.querySelector('.tooltip')).toBeTruthy();
    fireEvent.click(container.querySelector('.test-div'));
    await waitForElementToBeRemoved(() => screen.getByTestId('tooltip'));
    expect(container.querySelector('.tooltip')).toBeFalsy();
  });

  test('Tooltip shows and hides on hover', async () => {
    const { container } = render(
      <Tooltip
        content={<div data-testid="tooltip">This is a tooltip.</div>}
        trigger="hover"
      >
        <div className="test-div">test</div>
      </Tooltip>
    );
    fireEvent.mouseOver(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('tooltip'));
    expect(container.querySelector('.tooltip')).toBeTruthy();
    fireEvent.mouseOut(container.querySelector('.test-div'));
    await waitForElementToBeRemoved(() => screen.getByTestId('tooltip'));
    expect(container.querySelector('.tooltip')).toBeFalsy();
  });

  test('Tooltip shows and hides on focus and blur', async () => {
    const { container } = render(
      <Tooltip
        content={<div data-testid="tooltip">This is a tooltip.</div>}
        trigger="hover"
      >
        <div className="test-div">test</div>
      </Tooltip>
    );
    fireEvent.focus(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('tooltip'));
    expect(container.querySelector('.tooltip')).toBeTruthy();
    fireEvent.blur(container.querySelector('.test-div'));
    await waitForElementToBeRemoved(() => screen.getByTestId('tooltip'));
    expect(container.querySelector('.tooltip')).toBeFalsy();
  });

  test('Tooltip is dismissed on escape when hover only', async () => {
    const { container } = render(
      <Tooltip
        content={<div data-testid="tooltip">This is a tooltip.</div>}
        trigger="hover"
      >
        <div className="test-div">test</div>
      </Tooltip>
    );
    fireEvent.mouseOver(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('tooltip'));
    expect(container.querySelector('.tooltip')).toBeTruthy();
    fireEvent.keyDown(container, { key: 'Escape' });
    await waitForElementToBeRemoved(() => screen.getByTestId('tooltip'));
    expect(container.querySelector('.tooltip')).toBeFalsy();
  });

  test('Tooltip is dismissed on escape when move hover on tooltip element only', async () => {
    const { container } = render(
      <Tooltip
        content={<div data-testid="tooltip">This is a tooltip.</div>}
        trigger="hover"
      >
        <div className="test-div">test</div>
      </Tooltip>
    );
    fireEvent.mouseOver(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('tooltip'));
    expect(container.querySelector('.tooltip')).toBeTruthy();
    fireEvent.mouseOver(container.querySelector('.tooltip'));
    expect(container.querySelector('.tooltip')).toBeTruthy();
    fireEvent.keyDown(container, { key: 'Escape' });
    await waitForElementToBeRemoved(() => screen.getByTestId('tooltip'));
    expect(container.querySelector('.tooltip')).toBeFalsy();
  });

  test('Tooltip is not dismissed on random key when hover only', async () => {
    const { container } = render(
      <Tooltip
        content={<div data-testid="tooltip">This is a tooltip.</div>}
        trigger="hover"
      >
        <div className="test-div">test</div>
      </Tooltip>
    );
    fireEvent.mouseOver(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('tooltip'));
    expect(container.querySelector('.tooltip')).toBeTruthy();
    fireEvent.keyDown(container, { key: 'Enter' });
    expect(container.querySelector('.tooltip')).toBeTruthy();
  });

  test('Tooltip reference element is clickable when Tooltip is disabled', () => {
    let testCounter = 0;
    const { container } = render(
      <Tooltip
        animate={false}
        content={<div data-testid="tooltip">This is a tooltip.</div>}
        disabled
        trigger="hover"
      >
        <Button
          data-testid="test-button"
          onClick={() => (testCounter += 1)}
          text="Test button"
          variant={ButtonVariant.Primary}
        />
      </Tooltip>
    );
    const buttonTestElement: HTMLElement = getByTestId(
      container,
      'test-button'
    );
    fireEvent.mouseOver(buttonTestElement);
    expect(container.querySelector('.tooltip')).toBeFalsy();
    fireEvent.click(buttonTestElement);
    fireEvent.click(buttonTestElement);
    expect(testCounter).toEqual(2);
  });

  test('Tooltip uses custom width and height', async () => {
    const { container } = render(
      <Tooltip
        content={<div data-testid="tooltip">This is a tooltip.</div>}
        height={500}
        width={500}
      >
        <div className="test-div">test</div>
      </Tooltip>
    );
    fireEvent.mouseOver(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('tooltip'));
    expect(container.querySelector('.tooltip')).toBeTruthy();
    expect(container.querySelector('.tooltip').getAttribute('style')).toContain(
      'height: 500px'
    );
    expect(container.querySelector('.tooltip').getAttribute('style')).toContain(
      'width: 500px'
    );
  });

  test('Tooltip is bordered with no drop shadow', async () => {
    const { container } = render(
      <Tooltip
        bordered
        content={<div data-testid="tooltipBordered">This is a tooltip.</div>}
        dropShadow={false}
      >
        <div className="test-div">test</div>
      </Tooltip>
    );
    fireEvent.mouseOver(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('tooltipBordered'));
    expect(container.querySelector('.bordered')).toBeTruthy();
    expect(container.querySelector('.drop-shadow')).toBeFalsy();
  });

  test('Tooltip is animated by default', async () => {
    const { container } = render(
      <Tooltip
        content={<div data-testid="tooltipAnimated">This is a tooltip.</div>}
      >
        <div className="test-div">test</div>
      </Tooltip>
    );
    fireEvent.mouseOver(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('tooltipAnimated'));
    expect(container.querySelector('.animate')).toBeTruthy();
  });

  test('Tooltip not animated', async () => {
    const { container } = render(
      <Tooltip
        animate={false}
        content={<div data-testid="tooltipNotAnimated">This is a tooltip.</div>}
      >
        <div className="test-div">test</div>
      </Tooltip>
    );
    fireEvent.mouseOver(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('tooltipNotAnimated'));
    expect(container.querySelector('.animate')).toBeFalsy();
  });

  test('Tooltip is large', async () => {
    const { container } = render(
      <Tooltip
        size={TooltipSize.Large}
        content={<div data-testid="tooltipLarge">This is a tooltip.</div>}
      >
        <div className="test-div">test</div>
      </Tooltip>
    );
    fireEvent.mouseOver(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('tooltipLarge'));
    expect(container.querySelector('.large')).toBeTruthy();
  });

  test('Tooltip is medium', async () => {
    const { container } = render(
      <Tooltip
        size={TooltipSize.Medium}
        content={<div data-testid="tooltipMedium">This is a tooltip.</div>}
      >
        <div className="test-div">test</div>
      </Tooltip>
    );
    fireEvent.mouseOver(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('tooltipMedium'));
    expect(container.querySelector('.medium')).toBeTruthy();
  });

  test('Tooltip is small', async () => {
    const { container } = render(
      <Tooltip
        size={TooltipSize.Small}
        content={<div data-testid="tooltipSmall">This is a tooltip.</div>}
      >
        <div className="test-div">test</div>
      </Tooltip>
    );
    fireEvent.mouseOver(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('tooltipSmall'));
    expect(container.querySelector('.small')).toBeTruthy();
  });

  test('Tooltip is portaled', async () => {
    const { container } = render(
      <>
        <Tooltip
          portal
          content={<div data-testid="tooltipPortaled">This is a tooltip.</div>}
        >
          <div className="test-div">test</div>
        </Tooltip>
      </>,
      { container: document.body }
    );
    fireEvent.mouseOver(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('tooltipPortaled'));
    expect(container.querySelector('.tooltip')).toBeTruthy();
  });

  test('Tooltip is portaled in a defined root element', async () => {
    const { container } = render(
      <>
        <Tooltip
          portal
          portalRoot={document.body}
          content={<div data-testid="tooltipPortaled">This is a tooltip.</div>}
        >
          <div className="test-div">test</div>
        </Tooltip>
      </>,
      { container: document.body }
    );
    fireEvent.mouseOver(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('tooltipPortaled'));
    expect(container.querySelector('.tooltip')).toBeTruthy();
  });

  test('Tooltip reference uses custom id when disabled', async () => {
    const { container } = render(
      <>
        <Tooltip
          disabled
          portal
          portalRoot={document.body}
          content={<div>This is a tooltip.</div>}
        >
          <div className="test-div" id="test-div-id">
            test
          </div>
        </Tooltip>
      </>,
      { container: document.body }
    );
    expect(container.querySelector('#test-div-id')).toBeTruthy();
  });

  test('Tooltip reference uses custom id when enabled', async () => {
    const { container } = render(
      <>
        <Tooltip
          portal
          portalRoot={document.body}
          content={<div>This is a tooltip.</div>}
        >
          <div className="test-div" id="test-div-id">
            test
          </div>
        </Tooltip>
      </>,
      { container: document.body }
    );
    expect(container.querySelector('#test-div-id')).toBeTruthy();
  });

  test('Tooltip preserves custom aria-describedby on reference element', async () => {
    const { container } = render(
      <Tooltip
        content={<div data-testid="tooltip">This is a tooltip.</div>}
        trigger="hover"
      >
        <div className="test-div" aria-describedby="custom-description">
          test
        </div>
      </Tooltip>
    );
    fireEvent.mouseOver(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('tooltip'));
    expect(
      container.querySelector('.test-div').getAttribute('aria-describedby')
    ).toBe('custom-description');
  });

  test('Tooltip is dismissed on click outside', async () => {
    const { container } = render(
      <Tooltip
        content={<div data-testid="tooltip">This is a tooltip.</div>}
        trigger="click"
      >
        <div className="test-div">test</div>
      </Tooltip>
    );
    fireEvent.click(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('tooltip'));
    expect(container.querySelector('.tooltip')).toBeTruthy();
    fireEvent.mouseDown(container);
    await waitForElementToBeRemoved(() => screen.getByTestId('tooltip'));
    expect(container.querySelector('.tooltip')).toBeFalsy();
  });

  test('Tooltip uses touch to show, hide and show again', async () => {
    mockNavigator(
      `Mozilla/5.0 (iPad; CPU OS 10_2_1 like Mac OS X)
      AppleWebKit/602.4.6 (KHTML, like Gecko)
      Version/10.0 Mobile/14D27 Safari/602.1`
    );
    const { container } = render(
      <Tooltip
        data-testid="tooltip-test"
        content={<div data-testid="tooltip">This is a tooltip.</div>}
      >
        <Button
          data-testid="test-button"
          text="Test button"
          variant={ButtonVariant.Primary}
        />
      </Tooltip>
    );
    const swipeTarget = screen.getByTestId('test-button');
    const { result } = renderHook(() => useGestures(window));
    fireEvent.touchStart(swipeTarget);
    jest.advanceTimersByTime(300);
    fireEvent.touchEnd(swipeTarget);
    fireEvent.click(swipeTarget);
    expect(result.current).toBe(Gestures.TapAndHold);
    await waitFor(() => screen.getByTestId('tooltip'));
    expect(container.querySelector('.tooltip')).toBeTruthy();
    fireEvent.touchStart(swipeTarget);
    jest.advanceTimersByTime(50);
    fireEvent.touchEnd(swipeTarget);
    fireEvent.click(swipeTarget);
    expect(result.current).toBe(Gestures.Tap);
    await waitForElementToBeRemoved(() => screen.getByTestId('tooltip'));
    expect(container.querySelector('.tooltip')).toBeFalsy();
    fireEvent.touchStart(swipeTarget);
    jest.advanceTimersByTime(300);
    fireEvent.touchEnd(swipeTarget);
    fireEvent.click(swipeTarget);
    expect(result.current).toBe(Gestures.TapAndHold);
    await waitFor(() => screen.getByTestId('tooltip'));
    expect(container.querySelector('.tooltip')).toBeTruthy();
  });

  test('disables tooltip when content is not truncated', async () => {
    const TestComponent: FC = () => {
      const [truncationStatus, setTruncationStatus] = useState<
        Record<string, boolean>
      >({});
      const handleTruncationChange = (id: string, isTruncated: boolean) => {
        setTruncationStatus((prev: Record<string, boolean>) => ({
          ...prev,
          [id]: isTruncated,
        }));
      };
      return (
        <Tooltip
          content="Short content"
          disabled={!truncationStatus['truncate2']}
          data-testid="tooltip"
        >
          <Truncate
            id="truncate2"
            onTruncateChange={handleTruncationChange}
            text="Short content"
            data-testid="test-truncate-id"
          />
        </Tooltip>
      );
    };
    const { getByTestId } = render(<TestComponent />);
    const content = getByTestId('test-truncate-id');
    fireEvent.mouseEnter(content);
    await waitFor(() => expect(screen.queryByTestId('tooltip')).toBeNull());
    expect(content.getAttribute('aria-describedby')).toBeNull();
  });

  test('enables tooltip when content is truncated', async () => {
    // Mock clientWidth and scrollWidth
    Object.defineProperties(HTMLElement.prototype, {
      clientWidth: {
        get() {
          return 100;
        }, // Mock clientWidth to be 100
        configurable: true,
      },
      scrollWidth: {
        get() {
          return 200;
        }, // Mock scrollWidth to be larger than clientWidth to simulate truncation
        configurable: true,
      },
    });
    const TestComponent: FC = () => {
      const [truncationStatus, setTruncationStatus] = useState<
        Record<string, boolean>
      >({});
      const handleTruncationChange = (id: string, isTruncated: boolean) => {
        setTruncationStatus((prev: Record<string, boolean>) => ({
          ...prev,
          [id]: isTruncated,
        }));
      };
      return (
        <Tooltip
          content="Very long content that will definitely be truncated"
          disabled={!truncationStatus['truncate2']}
          data-testid="tooltip"
        >
          <Truncate
            id="truncate2"
            onTruncateChange={handleTruncationChange}
            text="Very long content that will definitely be truncated"
            data-testid="test-truncate-id"
          />
        </Tooltip>
      );
    };
    await waitFor(() => {
      fireResize(100);
    });
    const { getByTestId } = render(<TestComponent />);
    const content = getByTestId('test-truncate-id');
    fireEvent.mouseEnter(content);
    await waitFor(() => screen.getByTestId('tooltip'));
    await waitFor(() => {
      const updatedContent = screen.getByTestId('test-truncate-id');
      expect(updatedContent.getAttribute('aria-describedby')).not.toBeNull();
    });
  });
});
