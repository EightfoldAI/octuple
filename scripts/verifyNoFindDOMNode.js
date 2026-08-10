/**
 * Static regression check for the `ReactDOM.findDOMNode` React 19 hazard.
 *
 * React 19 removed `ReactDOM.findDOMNode` entirely. This repo's own
 * devDependency is still pinned to React 17 (see `package.json`) so that
 * the Enzyme-based test suite keeps working — which means a reintroduced
 * `ReactDOM.findDOMNode(...)` call would run fine under `yarn test` and
 * fail silently for real consumers on React 19. `findDOMNode.ts`
 * (src/shared/utilities) and `DomWrapper` (src/shared/utilities/domWrapper.tsx)
 * are the supported replacements — see their own comments for why.
 *
 * This scans production source under `src/` (excluding tests, which are
 * allowed to reference the string/API in comments and mocks when
 * documenting the migration) for:
 *   - `ReactDOM.findDOMNode(` / `SomeAlias.findDOMNode(` member calls
 *   - `import { findDOMNode } from 'react-dom'` (or `require(...)`)
 * and fails with a non-zero exit code (breaking `yarn lint`) if any match
 * is found. It intentionally does not touch `.eslintrc.js` (a full
 * `no-restricted-properties`/`no-restricted-imports` ESLint rule was the
 * first choice, but this repository's config-protection tooling blocks
 * all edits to that file) — wiring this into the existing `lint` script
 * keeps the check in the same place a developer already looks (`yarn
 * lint`), without touching CI configuration.
 *
 * Run automatically as part of `yarn lint` (see `package.json`).
 */
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, '../src');

// Matches `ReactDOM.findDOMNode(` (or any identifier before `.findDOMNode(`
// that could plausibly be a `react-dom` import alias), and named imports
// of `findDOMNode` from `react-dom`.
const UNSAFE_CALL_RE = /\bfindDOMNode\s*\(/;
const UNSAFE_IMPORT_RE =
  /(?:import\s*\{[^}]*\bfindDOMNode\b[^}]*\}\s*from\s*['"]react-dom['"])|(?:require\(['"]react-dom['"]\)[^;\n]*findDOMNode)/;
// The one place `findDOMNode` is a legitimate identifier: this repo's own
// safe local utility and its call sites/tests/re-exports.
const ALLOWED_PATH_FRAGMENT = path.join('shared', 'utilities');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules') {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
      continue;
    }
    if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

function main() {
  const offenders = [];

  for (const filePath of walk(SRC_DIR)) {
    const isTestFile = /\.test\.(ts|tsx|js|jsx)$/.test(filePath);
    const contents = fs.readFileSync(filePath, 'utf8');

    if (UNSAFE_IMPORT_RE.test(contents)) {
      offenders.push(`${filePath}: imports \`findDOMNode\` from 'react-dom'`);
      continue;
    }

    if (!isTestFile && UNSAFE_CALL_RE.test(contents)) {
      // The local `findDOMNode` utility and its own module are allowed to
      // reference the identifier by name (that's the safe replacement).
      if (filePath.includes(ALLOWED_PATH_FRAGMENT)) {
        continue;
      }
      // Every other call site must go through the safe local utility via
      // an explicit import — verify that import exists rather than just
      // trusting the call.
      if (!/from ['"].*utilities['"]/.test(contents)) {
        offenders.push(
          `${filePath}: calls \`findDOMNode(...)\` without importing the safe local utility`
        );
      }
    }
  }

  if (offenders.length > 0) {
    console.error(
      '[verifyNoFindDOMNode] Found usage that looks like the removed ' +
        '`ReactDOM.findDOMNode` API instead of the safe local replacement:\n' +
        offenders.map((o) => `  - ${o}`).join('\n')
    );
    process.exit(1);
  }

  console.log('[verifyNoFindDOMNode] No unsafe findDOMNode usage found. OK.');
}

main();
