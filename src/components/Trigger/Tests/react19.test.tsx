import React from 'react';
import MatchMediaMock from 'jest-matchmedia-mock';

describe('Trigger on React 19 (findDOMNode absent)', () => {
  let Trigger: any;
  let rtl: any;
  let matchMedia: MatchMediaMock;
  let warnSpy: jest.SpyInstance;

  beforeAll(() => {
    matchMedia = new MatchMediaMock();
    jest.resetModules();
    jest.doMock('react-dom', () => {
      const actual = jest.requireActual('react-dom');
      return { ...actual, findDOMNode: undefined };
    });
    rtl = require('@testing-library/react/pure');
    Trigger = require('../Trigger').default;
  });

  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  afterAll(() => {
    rtl.cleanup();
    matchMedia.clear();
    jest.dontMock('react-dom');
    jest.resetModules();
  });

  it('returns null for an un-refable child instead of throwing, with a warning', async () => {
    const FnChild = () => <button>trigger</button>;

    expect(() => {
      rtl.render(
        <Trigger
          action={['click']}
          popupVisible
          popup={<div>popup</div>}
          popupAlign={{ points: ['cr', 'cl'] }}
        >
          <FnChild />
        </Trigger>
      );
    }).not.toThrow();

    await rtl.waitFor(() =>
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'Trigger cannot resolve its DOM node on React 19'
        )
      )
    );
  });
});
