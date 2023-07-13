import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { PersistentBar, PersistentBarType } from './';
import { render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}

window.ResizeObserver = ResizeObserver;

describe('PersistentBar', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Renders without crashing', () => {
    const { container, getByRole } = render(
      <PersistentBar content={'PersistentBar test render'} />
    );
    const infoBar = getByRole('region');
    expect(() => container).not.toThrowError();
    expect(infoBar).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('PersistentBar is bottomBarButtonsOnLeft', () => {
    const { container } = render(
      <PersistentBar
        content={'PersistentBar test bottomBarButtonsOnLeft'}
        type={PersistentBarType.bottomBarButtonsOnLeft}
      />
    );
    expect(container.querySelector('.bottom-left-align')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('PersistentBar is bottomBarButtonsOnRight', () => {
    const { container } = render(
      <PersistentBar
        content={'PersistentBar test bottomBarButtonsOnRight'}
        type={PersistentBarType.bottomBarButtonsOnRight}
      />
    );
    expect(container.querySelector('.bottom-right-align')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('PersistentBar is bottomBarSecondaryButtons', () => {
    const { container } = render(
      <PersistentBar
        content={'PersistentBar test bottomBarSecondaryButtons'}
        type={PersistentBarType.bottomBarSecondaryButtons}
      />
    );
    expect(container.querySelector('.bottom-secondary-buttons')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('PersistentBar is bottomBarWithText', () => {
    const { container } = render(
      <PersistentBar
        content={'PersistentBar test bottomBarWithText'}
        type={PersistentBarType.bottomBarWithText}
      />
    );
    expect(container.querySelector('.bottom-with-text')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('PersistentBar is topBarButtons', () => {
    const { container } = render(
      <PersistentBar
        content={'PersistentBar test topBarButtons'}
        type={PersistentBarType.topBarButtons}
      />
    );
    expect(container.querySelector('.top-button-menu')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('PersistentBar is topBarPagination', () => {
    const { container } = render(
      <PersistentBar
        content={'PersistentBar test topBarPagination'}
        type={PersistentBarType.topBarPagination}
      />
    );
    expect(container.querySelector('.top-pagination')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('PersistentBar is topBarWithText', () => {
    const { container } = render(
      <PersistentBar
        content={'PersistentBar test topBarWithText'}
        type={PersistentBarType.topBarWithText}
      />
    );
    expect(container.querySelector('.top-with-text')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('PersistentBar is custom', () => {
    const { container } = render(
      <PersistentBar
        children={<div className="custom">PersistentBar test custom</div>}
      />
    );
    expect(container.querySelector('.custom')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
