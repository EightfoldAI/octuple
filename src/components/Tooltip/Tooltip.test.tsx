import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Tooltip, TooltipSize } from './';
import { PrimaryButton } from '../Button';
import {
  fireEvent,
  getByTestId,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Tooltip', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
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

  test('Tooltip reference element is clickable when Tooltip is disabled', () => {
    let testCounter = 0;
    const { container } = render(
      <Tooltip
        animate={false}
        content={<div data-testid="tooltip">This is a tooltip.</div>}
        disabled
        trigger="hover"
      >
        <PrimaryButton
          data-testid="test-button"
          onClick={() => (testCounter += 1)}
          text="Test button"
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
});
