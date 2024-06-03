import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Badge } from '../Badge';
import { Popup, PopupSize } from './';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Popup', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Popup shows and hides on hover when trigger is hover', async () => {
    const { container } = render(
      <Popup
        content={<div data-testid="popup-1">This is a popup.</div>}
        trigger="hover"
      >
        <div className="test-div">test</div>
      </Popup>
    );
    fireEvent.mouseOver(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('popup-1'));
    expect(container.querySelector('.popup')).toBeTruthy();
    fireEvent.mouseOut(container.querySelector('.test-div'));
    await waitForElementToBeRemoved(() => screen.getByTestId('popup-1'));
    expect(container.querySelector('.popup')).toBeFalsy();
  });

  test('Popup shows and hides on keydown enter and escape when trigger is hover', async () => {
    const { container, getByText } = render(
      <Popup
        content={<div data-testid="popup-2">This is a popup.</div>}
        trigger="hover"
      >
        <div className="test-div" tabIndex={0}>
          test
        </div>
      </Popup>
    );
    const testDiv = getByText('test');
    testDiv.focus();
    fireEvent.keyDown(testDiv, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13,
    });
    await waitFor(() => screen.getByTestId('popup-2'));
    expect(container.querySelector('.popup')).toBeTruthy();
    fireEvent.keyDown(testDiv, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });
    await waitForElementToBeRemoved(() => screen.getByTestId('popup-2'));
    expect(container.querySelector('.popup')).toBeFalsy();
  });

  test('Popup shows and hides on click when trigger is click', async () => {
    const { container } = render(
      <Popup
        content={<div data-testid="popup-3">This is a popup.</div>}
        trigger="click"
      >
        <div className="test-div">test</div>
      </Popup>
    );
    fireEvent.click(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('popup-3'));
    expect(container.querySelector('.popup')).toBeTruthy();
    fireEvent.click(container.querySelector('.test-div'));
    await waitForElementToBeRemoved(() => screen.getByTestId('popup-3'));
    expect(container.querySelector('.popup')).toBeFalsy();
  });

  test('Popup uses custom width and height', async () => {
    const { container } = render(
      <Popup
        content={<div data-testid="popup-4">This is a popup.</div>}
        height={500}
        width={500}
      >
        <div className="test-div">test</div>
      </Popup>
    );
    fireEvent.click(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('popup-4'));
    expect(container.querySelector('.popup')).toBeTruthy();
    expect(container.querySelector('.popup').getAttribute('style')).toContain(
      'height: 500px'
    );
    expect(container.querySelector('.popup').getAttribute('style')).toContain(
      'width: 500px'
    );
  });

  test('Popup reference element retains its classes when inheriting popup classes', async () => {
    const { container } = render(
      <Popup
        content={<div data-testid="popup-4">This is a popup.</div>}
        triggerAbove
      >
        <div className="test-div">test</div>
      </Popup>
    );
    fireEvent.click(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('popup-4'));
    expect(container.querySelector('.popup')).toBeTruthy();
    expect(container.querySelector('.test-div').classList).toContain(
      'trigger-above'
    );
  });

  test('Popup reference component retains its classes when inheriting popup classes', async () => {
    const { container } = render(
      <Popup
        content={<div data-testid="popup-5">This is a popup.</div>}
        triggerAbove
      >
        <Badge classNames="test-component">test</Badge>
      </Popup>
    );
    expect(container.querySelector('.test-component')).toBeTruthy();
    fireEvent.click(container.querySelector('.test-component'));
    await waitFor(() => screen.getByTestId('popup-5'));
    expect(container.querySelector('.popup')).toBeTruthy();
    expect(container.querySelector('.test-component').classList).toContain(
      'trigger-above'
    );
  });

  test('Popup reference component falls back to node', async () => {
    const { container } = render(
      <Popup
        content={<div data-testid="popup-5">This is a popup.</div>}
        triggerAbove
      >
        8
      </Popup>
    );
    expect(container.querySelector('.reference-wrapper')).toBeTruthy();
    fireEvent.click(
      container.querySelector('.reference-wrapper').firstElementChild
    );
    await waitFor(() => screen.getByTestId('popup-5'));
    expect(container.querySelector('.popup')).toBeTruthy();
    expect(container.querySelector('.trigger-above')).toBeTruthy();
  });

  test('Popup is large', async () => {
    const { container } = render(
      <Popup
        size={PopupSize.Large}
        content={<div data-testid="popupLarge">This is a popup.</div>}
      >
        <div className="test-div">test</div>
      </Popup>
    );
    fireEvent.click(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('popupLarge'));
    expect(container.querySelector('.large')).toBeTruthy();
  });

  test('Popup is medium', async () => {
    const { container } = render(
      <Popup
        size={PopupSize.Medium}
        content={<div data-testid="popupMedium">This is a popup.</div>}
      >
        <div className="test-div">test</div>
      </Popup>
    );
    fireEvent.click(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('popupMedium'));
    expect(container.querySelector('.medium')).toBeTruthy();
  });

  test('Popup is small', async () => {
    const { container } = render(
      <Popup
        size={PopupSize.Small}
        content={<div data-testid="popupSmall">This is a popup.</div>}
      >
        <div className="test-div">test</div>
      </Popup>
    );
    fireEvent.click(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('popupSmall'));
    expect(container.querySelector('.small')).toBeTruthy();
  });

  test('Popup is portaled', async () => {
    const { container } = render(
      <>
        <Popup
          portal
          content={<div data-testid="popupPortaled-1">This is a popup.</div>}
        >
          <div className="test-div">test</div>
        </Popup>
      </>,
      { container: document.body }
    );
    fireEvent.click(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('popupPortaled-1'));
    expect(container.querySelector('.popup')).toBeTruthy();
  });

  test('Popup is portaled in a defined root element', async () => {
    const { container } = render(
      <>
        <Popup
          portal
          portalRoot={document.body}
          content={<div data-testid="popupPortaled-2">This is a popup.</div>}
        >
          <div className="test-div">test</div>
        </Popup>
      </>,
      { container: document.body }
    );
    fireEvent.click(container.querySelector('.test-div'));
    await waitFor(() => screen.getByTestId('popupPortaled-2'));
    expect(container.querySelector('.popup')).toBeTruthy();
  });
});
