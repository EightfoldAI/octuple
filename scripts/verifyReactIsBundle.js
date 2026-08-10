/**
 * Build-artifact regression check for the `react-is` React 19 hazard.
 *
 * Octuple's own explicit `react-is` dependency has been removed (nothing
 * in `src/` imports it — see `reactIsDependency.test.ts`). A single
 * transitive copy is still expected in the built `lib/` output, pulled in
 * by `prop-types`, which Octuple's own `react-flip-toolkit` and
 * `@mdi/react` runtime dependencies both depend on directly (confirmed
 * with `yarn why prop-types`). That is expected and outside this branch's
 * scope to remove.
 *
 * What this guards against: a *second*, distinct `react-is` module ending
 * up nested in the bundle (e.g. because Octuple re-added its own direct
 * `react-is` dependency at a different version than the one `prop-types`
 * resolves, forcing yarn to install two physically separate copies). This
 * intentionally checks file/module *count*, not file contents or
 * minified/formatted internals, to stay resilient to unrelated rollup or
 * dependency-version changes.
 *
 * Run automatically as part of `yarn build` (see `package.json`).
 */
const fs = require('fs');
const path = require('path');

const LIB_DIR = path.resolve(__dirname, '../lib');

function findReactIsModuleDirs(dir) {
  const found = [];

  const walk = (current) => {
    if (!fs.existsSync(current)) {
      return;
    }
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'react-is') {
          found.push(fullPath);
          // Don't descend into a matched react-is package itself.
          continue;
        }
        walk(fullPath);
      }
    }
  };

  walk(dir);
  return found;
}

function main() {
  if (!fs.existsSync(LIB_DIR)) {
    console.error(
      `[verifyReactIsBundle] Expected build output at ${LIB_DIR}, but it does not exist. Run this after \`rollup -c\`.`
    );
    process.exit(1);
  }

  const reactIsDirs = findReactIsModuleDirs(LIB_DIR);

  if (reactIsDirs.length === 0) {
    // Nothing bundled at all — fine; means the transitive `prop-types`
    // chain didn't get bundled this time (e.g. Upload excluded from the
    // entry graph). Not a failure condition for this check.
    console.log('[verifyReactIsBundle] No bundled react-is copy found. OK.');
    return;
  }

  if (reactIsDirs.length > 1) {
    console.error(
      '[verifyReactIsBundle] Expected exactly one bundled react-is copy (the ' +
        'transitive prop-types dependency), but found multiple:\n' +
        reactIsDirs.map((dir) => `  - ${dir}`).join('\n') +
        '\nThis usually means Octuple re-added its own direct `react-is` ' +
        'dependency, causing a second, differently-versioned copy to be ' +
        'installed and bundled alongside the transitive one. See ' +
        'reactIsDependency.test.ts and this script for context.'
    );
    process.exit(1);
  }

  console.log(
    `[verifyReactIsBundle] Exactly one bundled react-is copy found (${reactIsDirs[0]}). OK.`
  );
}

main();
