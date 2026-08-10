import fs from 'fs';
import path from 'path';

// Regression protection for the "Octuple bundles its own `react-is`" React
// 19 hazard. `react-is` used to be a direct entry in Octuple's own
// `dependencies` (pinned first at 18.1.0, later 19.2.8) even though
// nothing in `src/` ever imported it — `toArray.ts`/`ref.ts` do their own
// `$$typeof` symbol checks instead (see those files' comments). That
// unused direct dependency has been removed entirely (see `package.json`).
//
// This test protects the dependency-graph layer: it fails if `react-is`
// (or its types) is reintroduced as a direct dependency, or if any
// production source file starts importing it again. It intentionally does
// NOT assert `react-is` is absent from the *built* `lib/` output — a
// single transitive copy is still expected there via `prop-types`, which
// Octuple's own `react-flip-toolkit` and `@mdi/react` dependencies both
// depend on directly (confirmed with `yarn why prop-types`) — see
// `scripts/verifyReactIsBundle.js` for that layer's protection instead.
describe('react-is dependency-graph regression', () => {
  const packageJson = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../../package.json'), 'utf8')
  );

  it('is not a direct dependency of Octuple itself', () => {
    expect(packageJson.dependencies).not.toHaveProperty('react-is');
    expect(packageJson.dependencies).not.toHaveProperty('@types/react-is');
  });

  it('is not imported by any production source file', () => {
    const srcDir = path.resolve(__dirname, '../..');
    const offenders: string[] = [];

    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.name === 'node_modules') {
          continue;
        }
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(fullPath);
          continue;
        }
        if (!/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
          continue;
        }
        if (/\.test\.(ts|tsx|js|jsx)$/.test(entry.name)) {
          // This file itself, and any other test, is exempt — the
          // production-source contract is what matters here.
          continue;
        }
        const contents = fs.readFileSync(fullPath, 'utf8');
        if (
          /from ['"]react-is['"]|require\(['"]react-is['"]\)/.test(contents)
        ) {
          offenders.push(fullPath);
        }
      }
    };

    walk(srcDir);

    expect(offenders).toEqual([]);
  });
});
