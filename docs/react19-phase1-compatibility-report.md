# Octuple React 19 Compatibility — Phase 1 Report

**Branch:** `kkarthik/react19-compatibility`
**Scope:** minimum targeted changes so Octuple continues to work on React 17 and becomes safe on React 19 — no wholesale migration.

This report covers only the work done in _this_ session, on top of the branch's pre-existing commits
(`dc7b127b`, `443e01c2`, `aa8008d9`, and the already-authored `findDOMNode.ts` / `domWrapper.tsx` /
`ref.ts` / `Trigger.tsx` / `CSSMotion.tsx` / `SingleObserver.tsx` / `useHeights.tsx` / `Align.tsx` /
`useItemRef.ts` / `DialogHelper.tsx` rework, and the `toArray.ts` Fragment-detection rewrite).

---

## 1. `react-is` investigation and fix

**Before:** `react-is` was a direct Octuple `dependencies` entry pinned to `19.2.8`, plus
`@types/react-is` at `19.2.0` — despite nothing in `src/` importing `react-is` (the `toArray.ts` /
`ref.ts` Fragment/element checks had already been rewritten to do their own `$$typeof` symbol
comparison, covering both React <19's `Symbol.for('react.element')` and React 19's
`Symbol.for('react.transitional.element')`). The lockfile also carried `react-is@16.13.1` and
`react-is@17.0.2` from unrelated transitive dev/test tooling.

**Investigation findings** (`yarn why react-is`, `yarn why prop-types`, lockfile inspection):

| Version   | Who requires it                                                     | Why                                                                                                                                                                                                                              |
| --------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `19.2.8`  | Octuple's own `dependencies`                                        | **Unused** — no source file imported it                                                                                                                                                                                          |
| `16.13.1` | `prop-types@15.8.1` (hoisted)                                       | `prop-types` is a transitive dependency of Octuple's own runtime deps `react-flip-toolkit` and `@mdi/react` (confirmed via `yarn why prop-types`), plus several dev-only tools (`react-color`, storybook addons, enzyme adapter) |
| `17.0.2`  | `pretty-format`, `react-test-renderer`, `ts-jest`, storybook addons | All dev/test-only, pulled in via Jest's snapshot serializer and the React-17 test harness                                                                                                                                        |

None of the 16.x/17.x copies are Octuple-owned duplication — they're legitimate, version-pinned
transitive requirements of dev/test tooling that has no bearing on what ships to consumers.
The **only** duplication was Octuple's own unused `19.2.8` entry.

**Change made:** removed `react-is` and `@types/react-is` from `package.json` `dependencies`
entirely (`package.json`), then ran `yarn install` to regenerate `yarn.lock`.

- **Before:** `react-is@16.13.1`, `react-is@17.0.2`, `react-is@19.2.8` all resolved.
- **After:** only `react-is@16.13.1` (hoisted, transitive via `prop-types`) and `react-is@17.0.2`
  (transitive, dev/test-only) resolve. `19.2.8` is gone from the graph entirely.

**Is `react-is` bundled into `lib/`?** Yes — confirmed via `yarn build` + a new script,
[`scripts/verifyReactIsBundle.js`](../scripts/verifyReactIsBundle.js): exactly one copy lands at
`lib/node_modules/react-is/`, byte-identical (modulo terser's renaming) to the `16.13.1` source
pulled in transitively via `prop-types`, itself required directly by `react-flip-toolkit` and
`@mdi/react` — both genuine Octuple runtime dependencies. This is expected and out of this branch's
scope to eliminate (would require replacing `react-flip-toolkit`/`@mdi/react` or vendoring around
`prop-types`, neither justified by Phase 1).

**Would published consumers load multiple copies?** No — before this fix, Octuple's own direct
`react-is@19.2.8` would ship as a _sibling_ dependency declaration in the published
`package.json`, and depending on the consumer's own dependency tree and hoisting, a consumer could
end up with two distinct `react-is` installs (Octuple's declared `^19` and whatever `prop-types`
needs, `^16`) — non-deduplicable since they're different majors. After this fix, Octuple no longer
declares `react-is` at all, so a consumer only ever gets the one copy `prop-types` already needs.

**Should `react-is` remain a dependency, be externalized, or removed?** Removed entirely, as done.
Externalizing it (via `rollup-plugin-peer-deps-external`, which already externalizes `react`/
`react-dom`) was considered and rejected: `react-is` isn't imported by Octuple's own source at all,
so there's nothing to externalize — the only copy that ships is the transitive one already resolved
independently by each consumer's own `prop-types` install. Declaring it as a peer dependency would
force every consumer to add an otherwise-invisible dependency for no functional benefit.

**Does this affect Octuple's `>=16.8` React support?** No — `react-is` was never version-coupled to
the peer React range in the first place (Fragment/element detection is done directly against
`$$typeof` symbols in `toArray.ts`, which already spans every supported React major). Removing the
unused dependency has zero effect on runtime React-version compatibility.

---

## 2. Fixed the misleading `reactIs.test.tsx`

**Before:** `src/shared/utilities/reactIs.test.tsx` tested `toArray`'s own Fragment-detection logic
and never imported the `react-is` package at all — a misleading name (this predates this session;
already renamed on this branch before this session started).

**Change:** confirmed the rename to
[`toArrayFragmentDetection.test.tsx`](../src/shared/utilities/toArrayFragmentDetection.test.tsx) is
in place and accurately describes what's tested (React 19 Fragment detection inside `toArray`, with
no dependency on `react-is`). No behavioral coverage was dropped — same three assertions
(flat Fragment, nested Fragment, non-Fragment element) as before.

---

## 3. `react-is` regression protection (added this session)

Three layers, matching the three places the dependency situation could regress:

| Layer             | File                                                                                                        | What it protects                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dependency graph  | [`src/shared/utilities/reactIsDependency.test.ts`](../src/shared/utilities/reactIsDependency.test.ts) (new) | Fails if `react-is`/`@types/react-is` is reintroduced into `package.json` `dependencies`, or if any production source file imports `react-is` directly                                                                                                                                                                                                                                   |
| Built artifact    | [`scripts/verifyReactIsBundle.js`](../scripts/verifyReactIsBundle.js) (new, wired into `yarn build`)        | Walks `lib/` after `rollup -c` and fails if **more than one** `react-is` module directory is found — the expected steady state is exactly one (the transitive `prop-types` copy) or zero. Catches the exact regression this branch fixed: Octuple re-adding its own `react-is` at a different version than `prop-types` resolves, forcing two physically distinct copies into the bundle |
| Published package | Not automated — see "Not verified" below                                                                    |

`scripts/verifyReactIsBundle.js` intentionally checks _module-directory count_, not file contents,
so it stays resilient to unrelated rollup/terser output changes — exactly the "not brittle" bar the
task asked for.

**NOT VERIFIED:** the actual published tarball (`npm pack` / `yarn pack` output) was not inspected
in this session. `clean-package` (already configured via `prepublishOnly`/`postpublish`) strips
`devDependencies`-only fields from the published `package.json`, and since `react-is` is no longer a
`dependencies` entry at all, it will not appear in the published manifest — but this wasn't
independently confirmed by actually running `yarn pack` and inspecting the resulting tarball's
`package.json` and file listing.

---

## 4. Function-component `defaultProps` — audit and fix

**Audit method:** `grep -rn "defaultProps" src` across all of `src/`, then inspected every hit to
classify it as a class (`static defaultProps = {...}` inside a `class` body — safe, React 19 still
honors these) or a function/`forwardRef`/plain-function assignment (`X.defaultProps = {...}` as a
statement — unsafe, React 19 ignores it silently).

**Classification of every occurrence found:**

| File                                | Component                             | Type                                                 | React 19 affected?                                                         |
| ----------------------------------- | ------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------- |
| `Tree/Tree.tsx`                     | `Tree`                                | `forwardRef`                                         | **Yes — fixed**                                                            |
| `Tree/BaseTree.tsx`                 | `BaseTree`                            | `forwardRef`                                         | **Yes — fixed**                                                            |
| `Tree/DirectoryTree.tsx`            | `ForwardDirectoryTree`                | `forwardRef`                                         | **Yes — fixed**                                                            |
| `Tree/Internal/TreeNode.tsx`        | `ContextTreeNode`                     | `React.FC` (plain function)                          | **Yes — fixed**                                                            |
| `Table/Table.tsx`                   | `Table` (`forwardRef(InternalTable)`) | `forwardRef`                                         | **Yes — fixed**                                                            |
| `Table/Internal/OcTable.tsx`        | `OcTable`                             | plain function                                       | **Yes — fixed**                                                            |
| `Tree/Internal/OcTree.tsx`          | `Tree` (class)                        | `class`                                              | No — safe, untouched                                                       |
| `Form/Internal/OcField.tsx`         | `OcField`                             | `class`                                              | No — safe, untouched                                                       |
| `Trigger/Trigger.tsx`               | `Trigger`                             | `class`                                              | No — safe, untouched (already handled by an earlier commit on this branch) |
| `LocaleProvider/index.tsx`          | `LocaleProvider`                      | `class`                                              | No — safe, untouched                                                       |
| `LocaleProvider/LocaleReceiver.tsx` | `LocaleReceiver`                      | `class`                                              | No — safe, untouched                                                       |
| `Motion/CSSMotionList.tsx`          | `CSSMotionList`                       | `class`                                              | No — safe, untouched                                                       |
| `Upload/Internal/OcUpload.tsx`      | `OcUpload`                            | `class`                                              | No — safe, untouched                                                       |
| `Upload/UploadList/index.tsx`       | —                                     | local `const defaultProps` variable, not a React API | No — false positive, untouched                                             |

### Fixes applied

**`src/components/Table/Internal/OcTable.tsx`** (plain function component)

- **Before:** `OcTable.defaultProps = { rowKey: 'key', emptyText: () => 'No data found' }`.
- **After:** `rowKey = 'key'` and `emptyText = DEFAULT_EMPTY_TEXT` (a module-level stable function
  reference, to avoid allocating a new closure every render) are parameter defaults on the function's
  destructuring. `DEFAULT_EMPTY_TEXT` preserves the exact same string.
- **Why required:** `OcTable` is not a class; React 19 stops honoring `.defaultProps` on it.
- **React 17 compatibility:** identical resolved values — a destructuring default applies exactly
  when React 17's `createElement`-time defaultProps merge would have applied (prop is `undefined`).
- Minimal, single-purpose change.

**`src/components/Table/Table.tsx`** (`forwardRef(InternalTable)`)

- **Before:** `Table.defaultProps = { rowKey: 'key' }` set on the `forwardRef` value after the fact.
- **After:** `rowKey = 'key'` added to `InternalTable`'s existing parameter-destructuring block
  (which already used this pattern for a dozen other props, e.g. `alternateRowColor = true`) —
  consistent with the file's established style.
- Confirmed `getRowKey` (computed from the now-defaulted local `rowKey`) is spread into `<OcTable>`
  _after_ `{...tableProps}` in JSX prop order, so it always wins regardless of what raw
  (non-defaulted) `rowKey` `tableProps` carries.

**`src/components/Tree/BaseTree.tsx`** (`forwardRef`)

- **Before:** `BaseTree.defaultProps = { checkable: false, selectable: true, showIcon: false, motion: {...}, blockNode: false }`.
- **After:** each moved to a parameter default in the destructuring (`checkable = false`,
  `selectable = true`, `showIcon = false`, `blockNode = false`, `motion = DEFAULT_TREE_MOTION`, the
  last being a module-level constant to avoid a fresh object every render and to avoid a
  shared-mutable-default footgun).
- **Regression found and fixed during this work:** the resolved `showIcon` value was being used only
  to compute a CSS class locally (`tree-icon-hide`) — it was **never explicitly forwarded** to the
  child `<OcTree>` element. Previously this worked by accident: `Tree.defaultProps`/
  `BaseTree.defaultProps` merged `showIcon` into the _raw_ `props` object at element-creation time,
  and `newProps = {...props, ...}` then carried that resolved value down implicitly. Once
  `defaultProps` was migrated to a destructuring default, the _local_ `showIcon` variable no longer
  round-trips back into `props`/`newProps`, so `<OcTree>` (a **class** component with its own
  `static defaultProps.showIcon = true`) silently won instead, incorrectly showing icons by default.
  Fixed by explicitly passing `showIcon={showIcon}` to `<OcTree>`, the same pattern already used for
  `checkable`/`selectable`. Caught by the existing snapshot suite in `Tree/Tests/index.test.js`
  (3 failing snapshots) and `Tree/Internal/tests/util.test.js` before being fixed — see "Test
  changes" below for how the _new_ tests also cover this.

**`src/components/Tree/Tree.tsx`** (`forwardRef`)

- **Before:** `Tree.defaultProps` was a byte-for-byte duplicate of `BaseTree.defaultProps`.
- **After:** removed outright — `Tree` forwards every prop untouched to `<BaseTree>`, so
  `BaseTree`'s own defaults (now migrated) are the only ones that ever mattered. No behavior lost;
  proven by `Tree/Tests/TreeDefaultProps.test.tsx`'s "Tree forwards the same resolved defaults as
  BaseTree" case.

**`src/components/Tree/DirectoryTree.tsx`** (`forwardRef`)

- **Before:** `ForwardDirectoryTree.defaultProps = { showIcon: true, expandAction: 'click' }`.
- **After:** `showIcon = true` and `expandAction = 'click'` are now parameter defaults on the inner
  `DirectoryTree` render function's destructuring, then folded back into a local `props` object so
  the rest of the function body (which reads `props.expandAction` in two places, and spreads `props`
  down to `<BaseTree>`) is otherwise unchanged.

**`src/components/Tree/Internal/TreeNode.tsx`** (`React.FC`, plain function)

- **Before:** `ContextTreeNode.defaultProps = { title: DEFAULT_TREE_NODE_TITLE }` (`'---'`).
- **After:** `title = DEFAULT_TREE_NODE_TITLE` is a parameter default.
- **Second-order regression found and fixed:** `treeUtil.ts`'s `convertTreeToData()` reads
  `treeNode.props.title` directly off the **raw, unrendered** React element (it never renders
  `ContextTreeNode`). Under React 17, `React.createElement()` itself merges `defaultProps` into an
  element's `props` at creation time — independent of whether the component is ever rendered — so
  `treeNode.props.title` already reflected the `'---'` default even for an element that never
  mounts. Migrating to a parameter default removes that createElement-time merge entirely (matching
  React 19's actual behavior — it removes this merge for non-class types too), so
  `treeNode.props.title` becomes genuinely `undefined` for a `<TreeNode>` with no explicit title, and
  `convertTreeToData()`'s `{ key, ...rest }` spread silently drops the `title` key altogether. Fixed
  in `src/components/Tree/Internal/utils/treeUtil.ts`'s `convertTreeToData()` by explicitly applying
  `DEFAULT_TREE_NODE_TITLE` when `rest.title === undefined`, replicating the createElement-time merge
  explicitly rather than relying on React to do it implicitly. This is a **second real hazard** of
  the same root cause the task called out for defaultProps — not just "the component renders wrong,"
  but "code that reads `element.props` without rendering sees a different value" — worth flagging for
  anyone auditing other `treeUtil.ts`-style raw-props readers elsewhere in the codebase (none other
  were found for `title`, or for any other migrated prop, during this audit).

All six fixes preserve explicit falsy values exactly as `defaultProps` did (a JS default parameter
only applies when the argument is `undefined`, never for `false`/`0`/`''`), and none introduce a
shared mutable default (object/array defaults are hoisted to module-level `const`s).

---

## 5. `defaultProps` regression tests (added this session)

| Test file                                                                                                          | Component(s)       | What it proves                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`Table/Tests/Table.rowKey.test.tsx`](../src/components/Table/Tests/Table.rowKey.test.tsx)                         | `Table`            | `rowKey` defaults to `'key'` (via the rendered `data-row-key` attribute) when omitted; an explicit string `rowKey` and an explicit function `rowKey` are both respected, not overridden by the default                                                                                                                                                                                   |
| [`Table/Internal/Tests/OcTable.rowKey.test.tsx`](../src/components/Table/Internal/Tests/OcTable.rowKey.test.tsx)   | `OcTable`          | Same `rowKey` behavior at the `OcTable` layer directly, plus `emptyText` defaults to `'No data found'` when there's no data and no explicit `emptyText`, and an explicit `emptyText` is respected                                                                                                                                                                                        |
| [`Tree/Tests/TreeDefaultProps.test.tsx`](../src/components/Tree/Tests/TreeDefaultProps.test.tsx)                   | `Tree`, `BaseTree` | `showIcon` defaults to `false` (icon hidden), `selectable` defaults to `true` (no "unselectable" class), `blockNode` defaults to `false` — each proven via the actual resulting CSS class, not just "renders without throwing"; explicit `selectable={false}` and `blockNode={true}` are proven to still override the defaults; `Tree` proven to resolve the same defaults as `BaseTree` |
| [`Tree/Tests/DirectoryTreeDefaultProps.test.tsx`](../src/components/Tree/Tests/DirectoryTreeDefaultProps.test.tsx) | `DirectoryTree`    | `showIcon` defaults to `true` (overriding `BaseTree`'s own `false` default — proves default _resolution order_ across two migrated components still composes correctly), and explicit `showIcon={false}` is respected                                                                                                                                                                    |

Every test asserts an actual resolved DOM outcome (a class, an attribute, visible text) rather than
"the component renders without an error," per the task's requirement. All four files run under the
existing React 17 Jest/RTL harness (`yarn test`) — no test-architecture change was needed, and all
pass as of the final `yarn test` run (see §12).

Deliberately not added: a defaultProps test for any of the class components in the table in §4 —
they're unaffected by React 19, so a regression test there would only cover behavior the migration
never touched.

---

## 6. `findDOMNode` regression protection

**Audit:** `grep -rn "findDOMNode\|ReactDOM\.findDOMNode" src` across all of `src/` (production and
test). Zero remaining calls to the removed `ReactDOM.findDOMNode` API — every call site already
funnels through the local `src/shared/utilities/findDOMNode.ts` utility (pre-existing work on this
branch), which no longer touches `ReactDOM.findDOMNode` at all.

**Protection chosen:** a static source-scanning script,
[`scripts/verifyNoFindDOMNode.js`](../scripts/verifyNoFindDOMNode.js), wired into `yarn lint`
(`"lint": "eslint . --ext .js,.jsx,.ts,.tsx && node scripts/verifyNoFindDOMNode.js"`).

**Why this over an ESLint rule:** an ESLint `no-restricted-imports`/`no-restricted-properties` rule
in `.eslintrc.js` was the first choice — it's the more idiomatic mechanism and would surface inline
in editors — but this repository's `.eslintrc.js` is protected from edits by this environment's
tooling. A plain Node script achieves the same practical outcome (non-zero exit breaks `yarn lint`,
which is already a required, always-run step ahead of `yarn build`) without needing to touch the
protected file, and it's arguably easier for a future maintainer to read top-to-bottom than a
regex buried in an ESLint config array. It distinguishes the one legitimate place the identifier
`findDOMNode` should appear (`shared/utilities`, the safe local replacement and its own tests) from
every other call site, which must go through an explicit import of that utility.

Run and confirmed passing as part of `yarn lint` (see §12).

---

## 7. Cascading failure / integration coverage

**Traced existing coverage** for the `Trigger → Motion → ref/DomWrapper → Align → overlay` chain:

- [`Tooltip/Tooltip.test.tsx`](../src/components/Tooltip/Tooltip.test.tsx) — `'Tooltip shows and hides on click'` mounts a `<Tooltip>` (built on `Trigger` + `CSSMotion`), fires a click, waits for
  the tooltip content to appear in the DOM (`waitFor(() => screen.getByTestId('tooltip'))`,
  `container.querySelector('.tooltip')`), fires a second click, and asserts it's removed. This
  exercises the full open → position → render → close path using `@testing-library/react`
  (`render`/`fireEvent`/`waitFor`), which surfaces unhandled React warnings/errors as visible
  `console.error` output during the test run.
- [`Dropdown/Dropdown.test.tsx`](../src/components/Dropdown/Dropdown.test.tsx) and
  [`Select/Select.test.tsx`](../src/components/Select/Select.test.tsx) — both mount components built
  on the same `Trigger`/overlay stack and exercise open/close and keyboard interaction extensively
  (29 and 90+ cases respectively).

All of the above ran clean as part of the full `yarn test` run in §12 (2674 passed, 0 failed), which
means the `findDOMNode`/`defaultProps`/`ref` changes made across this branch's commits did not
regress this chain under React 17.

**Decision:** existing coverage is judged sufficient for Phase 1 — no new integration test added.
Per the task's own instruction ("if existing tests already provide sufficient cascading coverage,
document exactly which tests provide it"), the three files above are that documentation.

**NOT VERIFIED:** none of this was re-run against a real `react-dom@19` runtime (see §9) — the
above only proves the chain is intact under React 17, plus that the source-level changes made for
React 19 (removing `findDOMNode`, migrating `defaultProps`) didn't alter the React-17 behavior these
tests already pinned down.

---

## 8. React 17 preservation

- `devDependencies` still pin `react@17.0.2` / `react-dom@17.0.2` / `@types/react@17.0.80` /
  `@wojtekmaj/enzyme-adapter-react-17@0.3.2` — untouched.
- `yarn test`, `yarn typecheck`, `yarn lint`, `yarn build` all run unmodified (aside from the two
  additive script hooks in §3 and §6) against this React 17 environment and all pass (§12).
- No test-architecture change (Enzyme, RTL version, Jest config) was made.

---

## 9. React 19 runtime verification

**NOT VERIFIED — and explicitly out of reach without a larger infrastructure change, per the task's
own instruction to document rather than force it.**

This repository's entire test harness (`jest.config`, `@wojtekmaj/enzyme-adapter-react-17`,
`@testing-library/react@12` pinned against React 17 types) resolves a single `react`/`react-dom`
install per Jest run. Standing up a genuine React 19 runtime check would require either:

1. A second, fully isolated Jest project/config with its own `react`/`react-dom@19` installed
   (via `moduleNameMapper` pointing at a differently-located `node_modules`, or a `resolutions`
   override + a separate `--config` invocation), verified to not interfere with the primary suite; or
2. A throwaway sandbox script (outside Jest) that installs `react@19`/`react-dom@19` fresh and
   renders the affected components via `react-dom/client`, similar to the methodology described in
   the (pre-existing, unrelated-scope) `docs/react19-octuple-investigation.md` in this repo.

Both are real infrastructure changes, not "minimum targeted" ones, and the task explicitly says not
to make that kind of change without a specific justified reason. What _was_ done instead, as the
smallest practical substitute:

- Every hazard fix in this session (`react-is`, `defaultProps` ×6, plus the pre-existing
  `findDOMNode`/`DialogHelper`/`ref` work from earlier commits) was verified by direct **source
  inspection** against React 19's actual documented removals (no `ReactDOM.findDOMNode`, no
  `defaultProps` merge for non-class `createElement` calls, `react-is`'s `$$typeof` generation-lock),
  not by running React 19 itself.
- `scripts/verifyReactIsBundle.js` and `scripts/verifyNoFindDOMNode.js` are React-version-agnostic
  static/artifact checks — they hold regardless of which React major is installed.

If a React 19 runtime job is wanted, it should be scoped as its own follow-up (a genuinely separate,
isolated CI job/config per the task's own §9 guidance), not folded into this branch.

---

## 10. Existing CI

No CI workflow files were modified. Both new checks were integrated into the **existing** `yarn build` and `yarn lint` commands (§3, §6), which CI's "Build / lint" and "Build / test" jobs already
run — so both checks are enforced by CI without any workflow-file change.

---

## 11. `date-fns` / `dayjs` — investigated, not changed

**Correction (post-report follow-up):** the original version of this section concluded "no
duplication" from `yarn why` run _inside Octuple's own repo_. That is true but insufficient — it
only shows Octuple's own tree has no internal conflict, which says nothing about what happens once
Octuple is installed as a dependency of a real consumer app. A follow-up investigation built an
actual consumer reproduction (packed `lib/` via `yarn pack`, installed it into a scratch app
declaring `date-fns: ^4.1.0` / `dayjs: ^1.11.19`, matching a real frontend) and the conclusion
reverses: **both are duplicated in the realistic consumer scenario.**

**Root cause:** Octuple's `package.json` pins both as bare, unprefixed versions —
`"date-fns": "2.28.0"`, `"dayjs": "1.11.3"` — which npm/yarn treat as _exact_ pins, not ranges. A
modern consumer's `^4.1.0`/`^1.11.19` cannot be satisfied by those exact versions, so yarn's
resolver cannot hoist a single shared copy for either and must nest a private copy inside
`node_modules/@eightfold.ai/octuple/node_modules/`.

**`yarn why` output from the actual consumer reproduction** (app declaring `date-fns: ^4.1.0`,
`dayjs: ^1.11.19`, `@eightfold.ai/octuple` installed from a packed tarball):

```text
=== date-fns ===
=> Found "date-fns@4.4.0"                          (top-level, satisfies the app's ^4.1.0)
   Has been hoisted to "date-fns"
=> Found "@eightfold.ai/octuple#date-fns@2.28.0"   (separate nested copy, 27.31 MB)
   This module exists because "@eightfold.ai#octuple" depends on it.

=== dayjs ===
=> Found "dayjs@1.11.21"                            (top-level, satisfies the app's ^1.11.19)
   Has been hoisted to "dayjs"
=> Found "@eightfold.ai/octuple#dayjs@1.11.3"       (separate nested copy, 2.03 MB)
   This module exists because "@eightfold.ai#octuple" depends on it.
```

Confirmed physically: `node_modules/@eightfold.ai/octuple/node_modules/{date-fns,dayjs}` both exist
as real, separate installs alongside the top-level ones.

|                                             | `date-fns`                                                                                                                                                                                                                                                                                              | `dayjs`                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Location                                    | `dependencies`, bare exact pin `"2.28.0"`                                                                                                                                                                                                                                                               | `dependencies`, bare exact pin `"1.11.3"`                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Duplicated in a realistic consumer install? | **Yes** — confirmed via repro                                                                                                                                                                                                                                                                           | **Yes** — confirmed via repro                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Bundled into `lib/`?                        | **No** — `grep -rl "date-fns" lib/` is empty. Its only production importer, `Generate/dateFns.ts`, is only ever imported by a _test_ file (`generate.test.tsx`), never by anything the `src/octuple.ts`/`src/locale.ts` entry graph reaches. It is dead code from the published package's point of view | **Yes, and vendored** — the compiled `lib/components/DateTimePicker/Internal/Generate/dayjs.js` does `require("../../../../node_modules/dayjs/dayjs.min.js")`, a hardcoded **relative path** into a copy of dayjs's own source Rollup physically placed at `lib/node_modules/dayjs/` at build time — not a bare `require('dayjs')` resolved by Node at runtime                                                                                            |
| Practical consequence                       | The nested duplicate (27 MB) is pure dead weight — installed because of the manifest entry, never executed                                                                                                                                                                                              | Octuple's date logic _always_ runs its own embedded `dayjs@1.11.3` regardless of what the consumer has installed (Node resolution is bypassed for this code path); the nested manifest-driven duplicate copy is _also_ unused at runtime — it exists only to satisfy npm/yarn bookkeeping. In practice there are three `dayjs` footprints in a consumer install: the app's own, an unused nested one, and one vendored directly into Octuple's shipped JS |
| React-version coupling                      | None                                                                                                                                                                                                                                                                                                    | None                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

**Conclusion (revised): both `date-fns` and `dayjs` are duplicated in the real consumer scenario.**
The original per-repo `yarn why` was necessary but not sufficient evidence — the failure mode only
appears once Octuple's exact-pinned manifest versions are checked against a consumer's own
independent version range, which no amount of inspection of Octuple's own lockfile in isolation can
surface.

### Recommended Phase 1 fix (not applied — investigation only)

|            | Before                                                                                                                            | After                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `date-fns` | `dependencies`, exact `"2.28.0"`; dead code, forces a 27 MB unused duplicate per consumer                                         | **Remove from `dependencies` entirely.** Zero behavior change — nothing in the compiled output executes it today. If `Generate/dateFns.ts` is meant to become a real, exported feature later, wire it into the entry graph and give it the same `external` + loosened-range treatment as `dayjs` below _before_ re-declaring the dependency — never re-add it as a plain bundled `dependencies` entry                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `dayjs`    | `dependencies`, exact `"1.11.3"`; vendored into `lib/` via a Rollup-resolved relative `require`, bypassing Node module resolution | Two changes together: (1) loosen the pin to a real semver range Octuple's usage actually needs, e.g. `"^1.11.3"`, so it can dedupe against a consumer's own range; (2) mark `dayjs` (and its `dayjs/plugin/*` subpath imports) `external` in `rollup.config.mjs`, so compiled output reverts to bare `require('dayjs')`/`require('dayjs/plugin/weekday')` specifiers resolved by Node at install time instead of a private vendored copy. **Keep it a regular dependency, not a peer dependency** — peer-ifying it (mirroring the `react`/`react-dom` pattern) would fully eliminate the duplication too, but is a breaking change for any consumer who doesn't already depend on `dayjs` directly (hard `Cannot find module` instead of an auto-install). The `external` + loosened-range combination gets the same deduplication for consumers with a compatible range (as in this investigation's example) with no breaking risk for anyone else, making it the more defensible Phase 1 fix; full peer-dependency-ification is a reasonable Phase 2/major-version candidate |

**React 17/19 impact:** none — neither library has any React coupling. This fix is orthogonal to
the React 19 compatibility work in the rest of this document and safe under both React 17 and 19.

**NOT VERIFIED:** the `rollup-plugin-peer-deps-external` mechanism already used for `react`/
`react-dom` was not tested against a manually-added `external` entry for `dayjs`'s subpath imports
(`dayjs/plugin/*`) — a real implementation would need to confirm Rollup's `external` matching (e.g.
via a matcher function/regex, since `dayjs/plugin/weekday` is a different specifier than bare
`dayjs`) covers every subpath Octuple imports, not just the bare package name.

---

## 12. Commands run and results

```text
$ yarn typecheck              # tsc --noEmit --skipLibCheck
Done in 11.21s.  (clean, zero errors)

$ yarn lint                   # eslint ... && node scripts/verifyNoFindDOMNode.js
[verifyNoFindDOMNode] No unsafe findDOMNode usage found. OK.
Done in 2.75s.  (clean)

$ yarn test                   # jest --collectCoverage=true
Test Suites: 230 passed, 230 total
Tests:       22 skipped, 2674 passed, 2696 total
Snapshots:   441 passed, 441 total
Time:        30.09s

$ yarn build                  # rm -rf lib && yarn lint && rollup -c && node scripts/verifyReactIsBundle.js
[verifyReactIsBundle] Exactly one bundled react-is copy found (lib/node_modules/react-is). OK.
Done in 53.45s.  (clean; only pre-existing, unrelated rollup warnings about named/default export mixing)

$ yarn why react-is            (before fix: 16.13.1, 17.0.2, 19.2.8 all present)
                                (after fix: 16.13.1, 17.0.2 only)
```

Every command above was actually executed in this session (not assumed).

---

## 13. Before/after compatibility matrix

| Hazard                                             | Before                                                                                                                                                                            | Change                                                                                                                                                                                              | React 17                                          | React 19                                                                 | Regression test                                                                            | Status                                                                                             |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `findDOMNode`                                      | Pre-existing branch work (prior commits) removed all `ReactDOM.findDOMNode` calls                                                                                                 | No change this session; audited and confirmed zero remaining calls                                                                                                                                  | ✅ works (local utility)                          | ✅ safe (no removed API used)                                            | `findDOMNode.test.ts` (pre-existing) + new `scripts/verifyNoFindDOMNode.js` in `yarn lint` | **PASS**                                                                                           |
| function `defaultProps`                            | 6 non-class components (`Tree`, `BaseTree`, `ForwardDirectoryTree`, `ContextTreeNode`, `Table`, `OcTable`) used `.defaultProps =`, silently ignored by React 19                   | Migrated all 6 to parameter defaults; fixed 2 second-order bugs uncovered in the process (`BaseTree`'s `showIcon` not forwarded to `OcTree`; `treeUtil.convertTreeToData`'s raw-props `title` read) | ✅ identical resolved values, proven by new tests | ✅ parameter defaults work identically                                   | 4 new test files (§5)                                                                      | **PASS**                                                                                           |
| `react-is`                                         | Direct, unused `dependencies` entry at `19.2.8`; 3 total versions in the lockfile                                                                                                 | Removed the unused direct dependency; lockfile now resolves 2 versions, both legitimate transitive/dev-only                                                                                         | ✅ unaffected (never used at runtime)             | ✅ unaffected; no version-coupling risk left                             | `reactIsDependency.test.ts` (graph) + `verifyReactIsBundle.js` in `yarn build` (artifact)  | **PASS** (published-tarball layer: **NOT VERIFIED**)                                               |
| legacy classes                                     | `defaultProps` on 8 class components (`OcTree`, `OcField`, `Trigger`, `LocaleProvider`, `LocaleReceiver`, `CSSMotionList`, `OcUpload`)                                            | None needed — confirmed React 19 still honors class `defaultProps`                                                                                                                                  | ✅ unaffected                                     | ✅ unaffected                                                            | N/A (out of scope — unaffected)                                                            | **PASS**                                                                                           |
| dependency duplication (`react-is`)                | Octuple-owned duplication (own `19.2.8` vs. transitive `16.x`/`17.x`)                                                                                                             | Eliminated by removing the unused direct dependency                                                                                                                                                 | ✅                                                | ✅                                                                       | Same as `react-is` row                                                                     | **PASS**                                                                                           |
| `date-fns`                                         | Exact-pinned `dependencies` entry; **duplicated in a real consumer install** (confirmed via repro, §11); dead code, never bundled                                                 | None made yet — recommended: remove from `dependencies` (§11)                                                                                                                                       | ✅ (dead code, unaffected either way)             | ✅ (dead code, unaffected either way)                                    | None added — recommendation only, not yet implemented                                      | **NOT FIXED — recommendation documented (§11)**                                                    |
| `dayjs`                                            | Exact-pinned `dependencies` entry; **duplicated in a real consumer install** (confirmed via repro, §11); vendored into `lib/` via a relative `require`, bypassing Node resolution | None made yet — recommended: loosen version range + mark `external` in Rollup (§11)                                                                                                                 | ✅ (unaffected by React version)                  | ✅ (unaffected by React version)                                         | None added — recommendation only, not yet implemented                                      | **NOT FIXED — recommendation documented (§11)**                                                    |
| `ConfigProvider`                                   | Not audited this session — no `defaultProps`/`findDOMNode` hits found under it in the full-repo audit                                                                             | None                                                                                                                                                                                                | —                                                 | —                                                                        | —                                                                                          | **NOT VERIFIED** (out of this session's grep hits, but not independently spot-checked beyond that) |
| `octuple.css`                                      | Out of Phase 1 scope per the task (this is the separate B3/selector-validity investigation area)                                                                                  | None                                                                                                                                                                                                | —                                                 | —                                                                        | —                                                                                          | **NOT VERIFIED / out of scope**                                                                    |
| bundle-size baseline                               | Not measured before this session's changes                                                                                                                                        | `react-is`'s removal from Octuple's own `dependencies` has no bundle-size effect (the transitive copy still ships, unchanged)                                                                       | —                                                 | —                                                                        | —                                                                                          | **NOT VERIFIED** (no before/after byte count taken)                                                |
| Storybook shim (`react-dom/client` under React 17) | Pre-existing branch work (commit `aa8008d9`)                                                                                                                                      | No change this session                                                                                                                                                                              | ✅ (per that commit)                              | N/A                                                                      | Not this session's work                                                                    | **NOT VERIFIED by this session** (inherited, not re-checked)                                       |
| React 19 runtime verification                      | N/A                                                                                                                                                                               | Investigated; determined infeasible without a real infrastructure change (§9)                                                                                                                       | N/A                                               | **NOT VERIFIED** — no actual React 19 render was executed                | N/A                                                                                        | **NOT VERIFIED — documented gap**                                                                  |
| Cascading integration coverage                     | Existing `Tooltip`/`Dropdown`/`Select` tests already exercise the full chain                                                                                                      | None added — judged sufficient (§7)                                                                                                                                                                 | ✅ (all pass)                                     | **NOT VERIFIED under React 19** (same runtime-verification gap as above) | `Tooltip.test.tsx`, `Dropdown.test.tsx`, `Select.test.tsx` (pre-existing)                  | **PASS under React 17 / NOT VERIFIED under React 19**                                              |

---

## 14. Final review

### Files changed this session

```
 M package.json                                             — removed react-is/@types/react-is deps; wired the two new scripts into build/lint
 M yarn.lock                                                 — regenerated after the package.json change
 M src/components/Table/Internal/OcTable.tsx                 — defaultProps → parameter defaults (rowKey, emptyText)
 M src/components/Table/Table.tsx                             — defaultProps → parameter default (rowKey)
 M src/components/Tree/Tree.tsx                               — removed redundant defaultProps
 M src/components/Tree/BaseTree.tsx                           — defaultProps → parameter defaults; fixed showIcon-not-forwarded bug
 M src/components/Tree/DirectoryTree.tsx                      — defaultProps → parameter defaults (showIcon, expandAction)
 M src/components/Tree/Internal/TreeNode.tsx                  — defaultProps → parameter default (title)
 M src/components/Tree/Internal/utils/treeUtil.ts             — convertTreeToData: explicit title default (fixes raw-props-read regression)
 D src/shared/utilities/reactIs.test.tsx → toArrayFragmentDetection.test.tsx (rename confirmed/kept)
?? scripts/verifyReactIsBundle.js                             — new, wired into yarn build
?? scripts/verifyNoFindDOMNode.js                             — new, wired into yarn lint
?? src/shared/utilities/reactIsDependency.test.ts             — new
?? src/components/Table/Tests/Table.rowKey.test.tsx           — new
?? src/components/Table/Internal/Tests/OcTable.rowKey.test.tsx — new
?? src/components/Tree/Tests/TreeDefaultProps.test.tsx        — new
?? src/components/Tree/Tests/DirectoryTreeDefaultProps.test.tsx — new
```

(`docs/react19-octuple-investigation.md` predates this session, covers a different, broader
Talent-Forge-integration investigation, and is out of this report's scope — left untouched.)

### Remaining `defaultProps` occurrences (all safe — see §4 table for full detail)

8 class components (`OcTree`, `OcField`, `Trigger`, `LocaleProvider`, `LocaleReceiver`,
`CSSMotionList`, `OcUpload`) plus one unrelated local variable named `defaultProps` in
`Upload/UploadList/index.tsx` (not a React API). Zero non-class `.defaultProps =` assignments remain
anywhere in `src/`.

### Remaining `findDOMNode` occurrences

Zero calls to `ReactDOM.findDOMNode`. All remaining string matches are comments explaining the
migration, or the safe local `findDOMNode.ts` utility and its own call sites/tests.

### Unresolved Phase 1 items

- React 19 runtime verification (§9) — determined infeasible without infrastructure changes;
  documented, not implemented.
- Published-tarball inspection for `react-is` (§3) — not run (`yarn pack` was not exercised).
- Bundle-size before/after baseline (§13) — not measured.
- `ConfigProvider` — not independently spot-checked beyond the full-repo grep sweeps, which found
  nothing under it.

### Changes intentionally not made

- `date-fns`/`dayjs` — investigated with a real consumer reproduction; **both are duplicated in
  practice** (§11, corrected from this report's earlier, insufficiently-scoped conclusion). A fix
  was recommended (remove `date-fns`; loosen `dayjs`'s pin + mark it `external` in Rollup) but not
  yet implemented, per this session's "investigate only, don't change production code yet" scope.
- No ESLint rule added for `findDOMNode` — `.eslintrc.js` is protected from edits in this
  environment; a script wired into `yarn lint` achieves the same enforcement (§6).
- No CI workflow file changes — both new checks integrate into existing `yarn build`/`yarn lint`
  commands that CI already runs (§10).
- No React 19 devDependency bump, no test-harness migration (Enzyme/RTL) — explicitly out of Phase 1
  scope per the task.

### Final verdict

```
PASS WITH KNOWN GAPS
```

All in-scope Phase 1 hazards (react-is duplication, function-component `defaultProps`, findDOMNode
regression protection) are fixed, tested, and verified passing under `yarn typecheck`/`yarn lint`/
`yarn test`/`yarn build` in this session. The known gaps are: no actual React 19 runtime was ever
executed against this code (§9, anticipated and explicitly documented rather than force-solved); the
published-tarball/bundle-size layers were reasoned about but not independently measured (§3, §13);
and — found via a real consumer reproduction, not just this repo's own tree — **`date-fns` and
`dayjs` are both duplicated in a realistic consumer install** (§11), with a fix recommended but not
yet implemented pending sign-off, since it was raised and investigated after the rest of this
session's changes were already verified.
