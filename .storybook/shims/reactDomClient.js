/**
 * Storybook-only shim for `react-dom/client`.
 *
 * This repo's own devDependencies are pinned to React 17 (see
 * package.json) to avoid breaking the Enzyme-based test suite (Enzyme has
 * no official React 18/19 adapter). `react-dom/client` was added in React
 * 18, so it doesn't exist as a real file in the installed `react-dom@17`
 * package — which breaks webpack's module resolution when building
 * Storybook, since `DialogHelper.tsx` imports `createRoot` from it.
 *
 * This shim is wired in via `NormalModuleReplacementPlugin` in
 * `.storybook/main.js`, ONLY for the Storybook build. It implements just
 * enough of the `createRoot` API, backed by React 17's `ReactDOM.render` /
 * `unmountComponentAtNode`, to let Storybook resolve and run.
 *
 * Real consumers of the published package (e.g. on React 18/19) never see
 * this file — they resolve the genuine `react-dom/client` from their own
 * React install.
 */
const ReactDOM = require('react-dom');

exports.createRoot = function createRoot(container) {
  return {
    render(children) {
      ReactDOM.render(children, container);
    },
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
    },
  };
};
