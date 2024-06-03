import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Trigger from '../Trigger';
import CSSMotion from '../../Motion/CSSMotion';
import { placementAlignMap } from './util';
import '@testing-library/jest-dom';

describe('Trigger.Mask', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('mask should support motion', () => {
    const cssMotionSpy = jest.spyOn(CSSMotion, 'render');
    const { container } = render(
      <Trigger
        action={['click']}
        popupAlign={placementAlignMap.left}
        popup={<strong className="x-content" />}
        mask
        maskMotion={{
          motionName: 'bamboo',
        }}
      >
        <div className="target">click</div>
      </Trigger>
    );

    const target = container.querySelector('.target');
    fireEvent.click(target);

    expect(cssMotionSpy).toHaveBeenCalledWith(
      expect.objectContaining({ motionName: 'bamboo' }),
      null
    );
  });
});
