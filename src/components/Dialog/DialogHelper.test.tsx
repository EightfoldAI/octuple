import MatchMediaMock from 'jest-matchmedia-mock';
import { act } from 'react-dom/test-utils';

// This repo's own devDependencies are still pinned to React 17 (see
// package.json) to avoid breaking the large existing Enzyme-based test
// suite (Enzyme has no official React 18/19 adapter), so `react-dom/client`
// does not exist on disk here. Real consumers on React 18/19 get the real
// module — this virtual mock exists only so this test can exercise
// `DialogHelper`'s public API against this repo's own React 17 runtime.
jest.mock(
  'react-dom/client',
  () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ReactDOM = require('react-dom');
    return {
      createRoot: (container: Element) => ({
        render: (children: any) => ReactDOM.render(children, container),
        unmount: () => ReactDOM.unmountComponentAtNode(container),
      }),
    };
  },
  { virtual: true }
);

import { DialogHelper } from './DialogHelper';

// Regression coverage for the React 19 migration off `ReactDOM.render` /
// `ReactDOM.unmountComponentAtNode` onto `createRoot` / `root.unmount()`
// (see `DialogHelper.tsx`). Public API (`show`/`showSmall`/`showMedium`/
// `close`) must keep working exactly as before.
//
// Note: `Dialog` portals into `document.body` regardless of the `parent`
// container `DialogHelper` creates (a pre-existing behavior, unrelated to
// this migration — `Dialog.tsx` never forwards its `parent` prop down to
// `BaseDialog`), so assertions here look at `document.body` rather than
// the helper's own container element.
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

  it('show() mounts the dialog into the DOM', () => {
    act(() => {
      DialogHelper.show({ header: 'Header', body: 'Body' }, containerId);
    });

    expect(document.getElementById(containerId)).toBeTruthy();
    expect(document.body.textContent).toContain('Body');
  });

  it('showSmall()/showMedium() also mount successfully', () => {
    act(() => {
      DialogHelper.showSmall({ body: 'Small body' }, containerId);
    });
    expect(document.body.textContent).toContain('Small body');

    act(() => {
      DialogHelper.showMedium({ body: 'Medium body' }, containerId);
    });
    expect(document.body.textContent).toContain('Medium body');
  });

  it('close() unmounts the dialog without throwing', () => {
    act(() => {
      DialogHelper.show({ body: 'Body' }, containerId);
    });

    expect(() => {
      act(() => {
        DialogHelper.close(containerId);
      });
    }).not.toThrow();

    expect(document.body.textContent).not.toContain('Body');
  });

  it('close() without a prior show() does not throw', () => {
    expect(() => {
      act(() => {
        DialogHelper.close('never-shown-container');
      });
    }).not.toThrow();
  });
});
