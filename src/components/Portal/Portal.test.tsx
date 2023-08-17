import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Popup } from '../Popup';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Portal', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Portal works', async () => {
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
