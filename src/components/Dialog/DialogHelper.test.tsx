import React from 'react';
import { act } from 'react-dom/test-utils';
import MatchMediaMock from 'jest-matchmedia-mock';
import { DialogHelper } from './DialogHelper';
import { unstableSetRender } from '../../shared/utilities/unstableSetRender';

describe('DialogHelper', () => {
  const containerId = 'dialog-helper-test-container';
  let matchMedia: MatchMediaMock;

  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
    act(() => {
      DialogHelper.close(containerId);
    });
    document.getElementById(containerId)?.remove();
    document.body.innerHTML = '';
  });

  describe('legacy path (React <=18, no registered renderer)', () => {
    it('show() mounts and close() unmounts via ReactDOM.render', () => {
      act(() => {
        DialogHelper.show({ header: 'Header', body: 'Body' }, containerId);
      });
      expect(document.getElementById(containerId)).toBeTruthy();
      expect(document.body.textContent).toContain('Body');

      act(() => {
        DialogHelper.close(containerId);
      });
      expect(document.body.textContent).not.toContain('Body');
    });

    it('close() without a prior show() does not throw', () => {
      expect(() => {
        act(() => {
          DialogHelper.close('never-shown');
        });
      }).not.toThrow();
    });
  });

    it('the dialog close button still works after its container div is removed', () => {
      act(() => {
        DialogHelper.show(
          { header: 'Header', body: 'Removable body' },
          containerId
        );
      });
      document.getElementById(containerId).remove();

      const closeButton = document.querySelector(
        '[class*="dialog"] button'
      ) as HTMLButtonElement;
      expect(closeButton).toBeTruthy();
      act(() => {
        closeButton.click();
      });
      expect(document.body.textContent).not.toContain('Removable body');
    });

    it('close() reports whether something was unmounted', () => {
      act(() => {
        DialogHelper.show({ body: 'Body' }, containerId);
      });
      let closed: boolean | null;
      act(() => {
        closed = DialogHelper.close(containerId);
      });
      expect(closed).toBe(true);
      expect(DialogHelper.close('never-shown')).toBe(false);
    });

  describe('registered renderer path (React 19 apps)', () => {
    it('uses the registered renderer and its unmount closure', () => {
      const unmount = jest.fn();
      const renderFn = jest.fn((_node: unknown, _container: unknown) => unmount);
      const previous = unstableSetRender(renderFn);

      act(() => {
        DialogHelper.show({ body: 'Body' }, containerId);
      });
      expect(renderFn).toHaveBeenCalledTimes(1);
      expect(renderFn.mock.calls[0][1]).toBe(
        document.getElementById(containerId)
      );

      act(() => {
        DialogHelper.close(containerId);
      });
      expect(unmount).toHaveBeenCalledTimes(1);

      unstableSetRender(previous);
      expect(unstableSetRender()).toBe(previous);
    });

    it('defers re-show mount until an async unmount resolves', async () => {
      let resolveUnmount: () => void;
      const unmountDone = new Promise<void>((r) => (resolveUnmount = r));
      const unmount = jest.fn(() => unmountDone);
      const renderFn = jest.fn(() => unmount);
      const previous = unstableSetRender(renderFn);

      act(() => {
        DialogHelper.show({ body: 'One' }, containerId);
        DialogHelper.show({ body: 'Two' }, containerId);
      });
      expect(renderFn).toHaveBeenCalledTimes(1);
      expect(unmount).toHaveBeenCalledTimes(1);

      resolveUnmount();
      await act(async () => unmountDone);
      expect(renderFn).toHaveBeenCalledTimes(2);

      unstableSetRender(previous);
    });

    it('close() during a deferred re-show cancels the pending mount', async () => {
      let resolveUnmount: () => void;
      const unmountDone = new Promise<void>((r) => (resolveUnmount = r));
      const renderFn = jest.fn(() => () => unmountDone);
      const previous = unstableSetRender(renderFn);

      act(() => {
        DialogHelper.show({ body: 'One' }, containerId);
        DialogHelper.show({ body: 'Two' }, containerId);
        DialogHelper.close(containerId);
      });
      resolveUnmount();
      await act(async () => unmountDone);
      expect(renderFn).toHaveBeenCalledTimes(1);

      unstableSetRender(previous);
    });

    it('show() after close() defers until the async unmount resolves', async () => {
      let resolveUnmount: () => void;
      const unmountDone = new Promise<void>((r) => (resolveUnmount = r));
      const renderFn = jest.fn(() => () => unmountDone);
      const previous = unstableSetRender(renderFn);

      act(() => {
        DialogHelper.show({ body: 'One' }, containerId);
        DialogHelper.close(containerId);
        DialogHelper.show({ body: 'Two' }, containerId);
      });
      expect(renderFn).toHaveBeenCalledTimes(1);

      resolveUnmount();
      await act(async () => unmountDone);
      expect(renderFn).toHaveBeenCalledTimes(2);

      unstableSetRender(previous);
    });

    it('a newer show() supersedes a deferred mount without close()', async () => {
      let resolveUnmount: () => void;
      const unmountDone = new Promise<void>((r) => (resolveUnmount = r));
      const renderFn = jest.fn(
        (_node: unknown, _container: unknown) => () => unmountDone
      );
      const previous = unstableSetRender(renderFn);

      act(() => {
        DialogHelper.show({ body: 'One' }, containerId);
        DialogHelper.show({ body: 'Two' }, containerId);
        DialogHelper.show({ body: 'Three' }, containerId);
      });
      expect(renderFn).toHaveBeenCalledTimes(1);

      resolveUnmount();
      await act(async () => unmountDone);
      expect(renderFn).toHaveBeenCalledTimes(2);
      expect((renderFn.mock.calls[1][0] as any).props.body).toBe('Three');

      unstableSetRender(previous);
    });

    it('re-show on the same container unmounts the previous render first', () => {
      const unmount = jest.fn();
      const renderFn = jest.fn(() => unmount);
      const previous = unstableSetRender(renderFn);

      act(() => {
        DialogHelper.show({ body: 'One' }, containerId);
        DialogHelper.show({ body: 'Two' }, containerId);
      });
      expect(renderFn).toHaveBeenCalledTimes(2);
      expect(unmount).toHaveBeenCalledTimes(1);

      unstableSetRender(previous);
    });
  });
});
