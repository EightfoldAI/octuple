# Octuple → Talent Forge: React 19 & Build Compatibility Investigation

**Author:** K Karthik (kkarthik@eightfold.ai)
**Date:** 2026-08-07
**Status:** Investigation complete — no code changed. Awaiting sign-off before PR 1.

**Repos analysed**

| Repo                       | Ref                                     | Version  |
| -------------------------- | --------------------------------------- | -------- |
| `EightfoldAI/octuple`      | `main` @ `fac85484`                     | `2.58.4` |
| `EightfoldAI/talent-forge` | `kkarthik/octuple-dep-add` @ `df9efe50` | —        |

**Everything below is reproduced, not inferred.** The published `@eightfold.ai/octuple@2.58.4`
package was installed against `react@19.2.8` / `react-dom@19.2.8` in a clean sandbox and each
component rendered under `react-dom/client` + jsdom; `octuple.css` was run through `lightningcss`
directly. Raw evidence is in Appendix A.

---

## Executive summary

Five distinct blockers exist, not the two we started with. Two are new findings and one is worse
than `findDOMNode`.

| #   | Blocker                                                                     | Severity          | Owner                     | Symptom                                                                                            |
| --- | --------------------------------------------------------------------------- | ----------------- | ------------------------- | -------------------------------------------------------------------------------------------------- |
| B1  | `DialogHelper` imports `render` / `unmountComponentAtNode` from `react-dom` | **Critical**      | Octuple                   | **Module-link failure — importing _anything_ from the package barrel fails**                       |
| B2  | `findDOMNode` called with `null` in `SingleObserver`                        | **Critical**      | Octuple                   | `TypeError: default.findDOMNode is not a function` — Select, and anything under `<ResizeObserver>` |
| B3  | Three CSS selectors put a class _after_ `:before` / `:after`                | High              | Octuple                   | `lightningcss` hard-fails the Vite/Tailwind v4 build                                               |
| B4  | `react-is@18.1.0` cannot recognise React 19 elements                        | **High (silent)** | Octuple                   | `toArray()` stops flattening fragments — **no error, wrong output**                                |
| B5  | `@react-spring/web@9.6.1` peer range excludes React 19                      | Medium            | Octuple                   | Install-time peer warnings; `--force` / overrides needed                                           |
| B6  | `octuple.css` is a single 1.31 MB non-tree-shakeable artifact               | Medium            | Octuple (+ TF mitigation) | ~130 KB gzip added to every generated app, unconditionally                                         |

**The headline:** the reported `findDOMNode` error is not the first thing that breaks. Under React 19,
`import { Button } from '@eightfold.ai/octuple'` fails to _link_ — before any component renders —
because `DialogHelper` reaches for `ReactDOM.render`, which React 19 deleted. We only ever saw the
`findDOMNode` error because our test imported a component from a deep path and bypassed the barrel.

**Ownership is lopsided and that is good news:** essentially every fix belongs in Octuple. Talent
Forge needs no compatibility shims — only an adapter layer and a CSS import placement rule. Nothing
in Talent Forge should be patched to work around Octuple bugs.

---

## 1. Repository analysis

### 1.1 Is this Octuple or the integration?

**Octuple.** Every blocker reproduces in a bare sandbox containing only `react@19`, `react-dom@19`
and `@eightfold.ai/octuple@2.58.4` — no Vite, no Tailwind, no Talent Forge code. There is nothing
unusual about how Talent Forge consumes the library.

The root cause is a version-support gap, visible in `octuple/package.json`:

```jsonc
"peerDependencies": { "react": ">=16.8", "react-dom": ">=16.8" },   // claims React 19 support
"devDependencies":  { "react": "17.0.2", "react-dom": "17.0.2",     // but is built and tested on 17
                      "@types/react": "17.0.80",
                      "@wojtekmaj/enzyme-adapter-react-17": "0.3.2" }
```

The peer range is an **unverified promise**. Octuple has never been built, tested, or type-checked
against React 18 _or_ 19 — its entire test suite runs on React 17 with an Enzyme React-17 adapter.
`>=16.8` should have been `>=16.8 <19`, and the real work is earning the `19` back.

### 1.2 Ownership split

| Fix                                            | Owner                                            | Rationale                                                                                                                             |
| ---------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| B1 `DialogHelper` → `createRoot`               | **Octuple**                                      | Uses APIs deleted in React 19. Cannot be shimmed by a consumer.                                                                       |
| B2 `findDOMNode` removal / guarding            | **Octuple**                                      | Internal implementation detail of `shared/ResizeObserver` and `Trigger`.                                                              |
| B3 Invalid `:before` selectors                 | **Octuple**                                      | Malformed CSS in `Form/Styles/rtl.scss` + `Tree/Styles/rtl.scss`. Objectively invalid per CSS Selectors L4, not a lightningcss quirk. |
| B4 `react-is` 18 → 19                          | **Octuple**                                      | Direct dependency of Octuple.                                                                                                         |
| B5 `@react-spring/web` bump                    | **Octuple**                                      | Direct dependency of Octuple.                                                                                                         |
| B6 CSS splitting / tree-shaking                | **Octuple** (structural), Talent Forge (interim) | Only Octuple can emit per-component CSS. TF can meanwhile control _where_ the single file is imported.                                |
| Peer range correction + React 19 CI matrix     | **Octuple**                                      | Prevents this recurring.                                                                                                              |
| `components/ui/*` adapter layer                | **Talent Forge**                                 | TF's public component contract; Octuple must not know about Shadcn.                                                                   |
| CSS import placement (JS entry, not `@import`) | **Talent Forge**                                 | A Vite/Tailwind pipeline decision.                                                                                                    |
| Generation prompt / skill updates              | **Talent Forge**                                 | `.claude/skills/frontend/**` is TF-owned.                                                                                             |

### 1.3 Explicit non-goals for Talent Forge

Do **not** add any of these — each would hide an Octuple bug and make the eventual upstream fix
un-releasable:

- A `resolutions` / `overrides` pin forcing `react-is@19` into Octuple's tree.
- `css: { transformer: 'postcss' }` or `lightningcss: { errorRecovery: true }` in `vite.config.ts`
  to swallow B3.
- A local `findDOMNode` polyfill on `ReactDOM`.
- Patch-package patches against `node_modules/@eightfold.ai/octuple`.

---

## 2. React 19 compatibility investigation

### 2.1 What React 19 actually removed

Verified directly against `react-dom@19.2.8`:

| API                                | React 19                                | Octuple uses it?                |
| ---------------------------------- | --------------------------------------- | ------------------------------- |
| `ReactDOM.findDOMNode`             | ❌ **removed**                          | Yes — 5 call sites              |
| `ReactDOM.render`                  | ❌ **removed**                          | Yes — `DialogHelper`            |
| `ReactDOM.unmountComponentAtNode`  | ❌ **removed**                          | Yes — `DialogHelper` (×2)       |
| `ReactDOM.unstable_batchedUpdates` | ✅ **still present**                    | Yes — `addEventListenerWrapper` |
| `ReactDOM.createPortal`            | ✅ present                              | Yes — `Portal`                  |
| `ReactDOM.flushSync`               | ✅ present                              | Yes — `Upload`                  |
| `element.ref` (element property)   | ❌ removed — `ref` is now a normal prop | Yes — 4 call sites              |

Note `unstable_batchedUpdates` **survives** in React 19 (a deprecated passthrough, since batching is
automatic). `src/shared/utilities/addEventListenerWrapper.ts` is therefore _safe_ and needs no change
in PR 1 — flag it for a later cleanup, not now. This matters: a scattergun "remove every ReactDOM
legacy API" PR would touch it unnecessarily.

### 2.2 Complete `findDOMNode` inventory

Five call sites, all funnelling through one utility. This concentration is the single best thing
about this problem.

```
src/shared/utilities/findDOMNode.ts:15         ← the only ReactDOM.findDOMNode in the shared layer
  ├─ src/shared/ResizeObserver/SingleObserver/SingleObserver.tsx:111   (×2 in one expression)
  ├─ src/components/VirtualList/hooks/useHeights.tsx:29
  ├─ src/components/Motion/CSSMotion.tsx:43
  └─ src/components/Trigger/Trigger.tsx:384

src/components/Trigger/Trigger.tsx:392         ← a SECOND, direct ReactDOM.findDOMNode(this)
```

The utility itself:

```ts
// src/shared/utilities/findDOMNode.ts
export const findDOMNode = <T = Element | Text>(
  node: React.ReactInstance | HTMLElement
): T => {
  if (node instanceof HTMLElement) return node as unknown as T;
  return ReactDOM.findDOMNode(node) as unknown as T; // ← line 15: throws on React 19
};
```

### 2.3 The exact crash path

Stack captured from the sandbox render of `<Select options={[...]} />`:

```
TypeError: o.findDOMNode is not a function
  at findDOMNode  (lib/shared/utilities/findDOMNode.mjs:1:76)
  at             (lib/shared/ResizeObserver/SingleObserver/SingleObserver.mjs:2:1313)
  at commitHookEffectListMount → commitPassiveMountOnFiber   (react-dom-client 19.2.8)
```

The offending line, `SingleObserver.tsx:111`:

```ts
const currentElement: HTMLElement =
  findDOMNode?.(elementRef.current) || findDOMNode?.(wrapperRef.current);
```

Three things are wrong here and they compound:

1. **The optional chain is on the wrong operand.** `findDOMNode?.(x)` guards that _the function_
   exists — it never guards `x`. `elementRef.current` is legitimately `null` whenever the observed
   child is a component that does not forward its ref to a DOM element. So `findDOMNode(null)` is
   called, `null instanceof HTMLElement` is `false`, and it falls straight through to
   `ReactDOM.findDOMNode(null)` — which under React 19 is `undefined(null)`. **The crash is a null
   argument, not a legitimate fiber lookup.**
2. Even with a null guard, the second operand `findDOMNode(wrapperRef.current)` passes a
   `DomWrapper` **class instance**. That is a genuine fiber lookup and the _only_ reason
   `findDOMNode` exists here: `DomWrapper` renders `this.props.children` and no DOM of its own, so
   there is no ref to read. Removing `findDOMNode` without replacing this path silently disables
   the ResizeObserver.
3. Line 44 reads `(mergedChildren as any).ref` — **`element.ref` is removed in React 19**, so
   `originRef` is always `null` and any ref the caller put on the child is dropped from the composed
   ref. Under React 19 this must read `mergedChildren.props.ref`.

### 2.4 Blast radius

`shared/ResizeObserver` has **12 consumers**, so B2 is not a Select bug:

`Select`, `Table` (`OcTable`, `MeasureRow`, `MeasureCell`), `Slider`, `Stepper`, `Progress`
(`Line`, `Steps`), `Carousel`, `VirtualList/Filler`, `Skill/SkillBlock`.

Measured render results under React 19 (deep-path imports, bypassing the broken barrel):

| Component   | Result                                                           |
| ----------- | ---------------------------------------------------------------- |
| `Select`    | ❌ `findDOMNode is not a function`                               |
| `Button`    | ✅ renders                                                       |
| `Table`     | ✅ renders (static, unmeasured path)                             |
| `Dialog`    | ✅ renders                                                       |
| `Tooltip`   | ✅ renders                                                       |
| `Dropdown`  | ✅ renders (`visible` pre-set — the align path is not exercised) |
| `Menu`      | ✅ renders                                                       |
| `Accordion` | ✅ renders                                                       |
| `Form`      | ✅ renders                                                       |

**Do not read the ✅ column as "safe."** These are first-paint renders in jsdom with a stubbed
`ResizeObserver`. Table's measure rows, Dropdown/Tooltip repositioning, CSSMotion transitions and
VirtualList height collection all run on interaction, resize or animation frames that a mount-only
test never reaches. Real-browser interaction testing is required before any of these is called
compatible (see §6).

### 2.5 B1 — the blocker that fires first

```ts
// src/components/Dialog/DialogHelper.tsx:4
import { render, unmountComponentAtNode } from 'react-dom';
```

Neither export exists in React 19. `DialogHelper` is re-exported from `src/octuple.ts`, so this is a
**module-graph failure, not a runtime one**:

```
SyntaxError: Named export 'render' not found. The requested module 'react-dom'
is a CommonJS module, which may not support all module.exports as named exports.
  at lib/components/Dialog/DialogHelper.mjs
```

Under Vite the equivalent is a dep-optimizer failure at build/dev-server start. **Any** import from
the package barrel — `import { Button } from '@eightfold.ai/octuple'` — fails. This must be fixed
first or nothing else is testable.

### 2.6 B4 — the silent one

`react-is@18.1.0` is a direct dependency. React 19 changed the element brand from
`Symbol.for('react.element')` to `Symbol.for('react.transitional.element')`. Measured:

```
React 19 element $$typeof:              Symbol(react.transitional.element)
react-is@18.1.0 isFragment(<>…</>):     false      ← wrong
react-is@18.1.0 isElement(<div/>):      false      ← wrong
react-is@19.x   isFragment(<>…</>):     true       ← correct
```

`src/shared/utilities/toArray.ts` branches on `isFragment(child)` to flatten fragment children.
Under React 19 that branch is dead, so a fragment is pushed into the array as a single opaque child
instead of being flattened. **21 modules** consume `toArray`, including `ResizeObserver`, `Form`
(`OcField`, `FormItem`, `useForm`, `valueUtil`), `Table/useColumns`, `Carousel`, `Tree/treeUtil`,
`Avatar/AvatarGroup` and `DateTimePicker/OcPicker`.

This throws no error. It produces wrong output — dropped form fields, mis-counted table columns,
mis-keyed carousel items — under exactly the pattern (`<>…</>` around a group of children) that
generated code produces constantly. **This is the finding most likely to reach production
undetected**, and it is invisible to any test that does not specifically render fragment children.

### 2.7 Third-party dependency status

| Dependency                                                            | Pinned   | React 19 OK?                                 | Action                                                                                      |
| --------------------------------------------------------------------- | -------- | -------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `react-is`                                                            | `18.1.0` | ❌ wrong results                             | → `^19.0.0` (+ `@types/react-is`)                                                           |
| `@react-spring/web`                                                   | `9.6.1`  | ❌ peer excludes 19                          | → `^10.0.1` (first version with `^19.0.0` in its peer range; latest is `10.1.2`)            |
| `@floating-ui/react`                                                  | `0.20.1` | ⚠️ peer `>=16.8.0` — permissive but 2023-era | Evaluate `0.27.x` (peer `>=17.0.0`) as a **separate** PR — the 0.20→0.27 API delta is large |
| `react-easy-crop`                                                     | `4.6.1`  | ⚠️ peer `>=16.4.0`                           | Runtime-verify; bump only if it fails                                                       |
| `react-flip-toolkit`                                                  | `7.0.13` | ⚠️ peer `>= 16.x`                            | Runtime-verify                                                                              |
| `react-use-measure`                                                   | `2.1.1`  | ⚠️ peer `>=16.13`                            | Runtime-verify                                                                              |
| `dom-align`, `resize-observer-polyfill`, `scroll-into-view-if-needed` | —        | ✅ no React peer                             | No action                                                                                   |

`npm ls react` against a React 19 install reports `@react-spring/web@9.6.1` and its four
sub-packages as `invalid` — that is B5, and it is what forces `--force` / `overrides` at install.

### 2.8 Recommended solution, per the requested format

---

**B1 — DialogHelper**

- **Current behaviour:** `DialogHelper.show()` imperatively mounts a `<Dialog>` into a body-appended
  `<div>` via the React 17 legacy `render()`, and tears it down with `unmountComponentAtNode()`.
- **Problem:** both APIs are deleted in React 19. Failure is at **module link time**, poisoning the
  entire package barrel.
- **Recommended React 19 solution:** move to `createRoot` from `react-dom/client`, keeping a
  `Map<containerId, Root>` so `close()` can call `root.unmount()` on the right root. Keep the public
  `DialogHelper` API (`show` / `showSmall` / `showMedium` / `close`) byte-identical.
  - _API behaviour change to expect:_ `createRoot().render()` is **asynchronous**. Code that calls
    `DialogHelper.show()` and synchronously queries the DOM on the next line will now find nothing.
    This is the one genuine behavioural break in PR 1 — call it out in the changelog and check it
    against Octuple's existing consumers.
  - _Import strategy:_ `react-dom/client` exists in React 18 and 19 but **not** in 16/17. Since the
    peer floor is `>=16.8`, either (a) raise the peer floor to `>=18` in the same PR — recommended,
    and honest — or (b) lazily resolve `react-dom/client` with a fallback to legacy `render`.
    **Recommend (a)** — Octuple has no verified React 16/17-only consumer that a major bump can't serve.

---

**B2 — findDOMNode**

- **Current behaviour:** `findDOMNode()` returns `node` when it is already an `HTMLElement`,
  otherwise defers to `ReactDOM.findDOMNode()` to walk the fiber tree. Call sites pass a mixture of
  DOM nodes, class instances, and — accidentally — `null`.
- **Problem:** `ReactDOM.findDOMNode` does not exist in React 19. The most common path is a `null`
  argument that never needed a fiber lookup at all.
- **Recommended React 19 solution — three layers, in this order:**

  1. **Harden the utility (safety net).** Null-guard the input and feature-detect the API, returning
     `null` instead of throwing. This converts a hard crash into graceful degradation across all five
     call sites for a few lines of change. It is _not_ sufficient on its own — see layer 2.

  2. **Remove the need for it at each call site (the real fix).**

     - `SingleObserver.tsx` — fix the `element.ref` read (line 44) to `props.ref` so caller refs
       compose correctly, then obtain the DOM node from `elementRef.current` directly. React 19
       accepts `ref` as a plain prop on function components, which **shrinks the set of children that
       cannot receive a ref** considerably. For the residual case (a child that genuinely cannot hold
       a ref), give `DomWrapper` a real DOM handle rather than relying on a fiber walk. Two candidate
       designs — a hidden zero-size sentinel sibling read via `nextElementSibling`, or requiring
       observed children to be ref-able and warning otherwise — should be benchmarked against the 12
       consumers before choosing. **This is the one design decision in PR 1 that needs a reviewer's
       opinion, and it should be settled before coding.**
     - `useHeights.tsx:29` — `instance` is already typed `HTMLElement` and the code guards on
       `element.offsetParent` before calling. The `findDOMNode` call here is **dead weight**; delete
       it and use `element` directly. Zero risk.
     - `CSSMotion.tsx:43` — already prefers `nodeRef.current instanceof HTMLElement` and only falls
       back for the wrapper. Same `DomWrapper` resolution as `SingleObserver`; already wrapped in
       `try/catch`.
     - `Trigger.tsx:384/392` — `getRootDomNode()` has a documented escape hatch, the
       `getTriggerDOMNode` prop. Compose `triggerRef` properly (line 785 also reads
       `(child as any).ref` — same React 19 fix) and drop the `ReactDOM.findDOMNode(this)` last
       resort, which cannot work under React 19 regardless.

  3. **Prevent regression.** Add an ESLint `no-restricted-imports` / `no-restricted-properties` rule
     banning `ReactDOM.findDOMNode`, `ReactDOM.render` and `ReactDOM.unmountComponentAtNode` in
     `src/`. Cheap, permanent.

- **Is replacing `findDOMNode` with refs safe?** For `useHeights` — yes, trivially. For `Trigger` and
  `CSSMotion` — yes, with the existing prop escape hatches. For `SingleObserver` — **only once
  `DomWrapper` has a real DOM handle**; a naive ref swap silently disables resize observation for 12
  components, which is worse than a crash because it is invisible. Layer 1 must ship _with_ layer 2,
  never instead of it.

---

**B4 — react-is**

- **Current behaviour:** `toArray()` flattens fragment children using `isFragment` from
  `react-is@18.1.0`.
- **Problem:** react-is 18 does not recognise React 19's element brand. `isFragment` always returns
  `false`; fragments are never flattened. No error is raised.
- **Recommended React 19 solution:** bump `react-is` to `^19.0.0` and `@types/react-is`
  correspondingly. Add a regression test asserting `toArray(<><a/><b/></>).length === 2`. Consider
  dropping the dependency entirely — `isFragment` is a three-line check against `React.Fragment` — to
  remove the version-coupling permanently. Verified: `react-is@19.2.8` returns `true` for a React 19
  fragment.

---

## 3. CSS and build investigation

### 3.1 Why `octuple.css` is large

Measured on the published artifact:

```
lib/octuple.css      1,375,877 bytes  (1.31 MiB / 1.376 MB)  — matches the 1.36 MB report
gzipped                ~130 KB
top-level rules              5,326
module-scoped selectors     19,170
CSS custom properties        5,015   (122 KB, 8.9% of the file, in 3 :root blocks)
@keyframes                      57
@media blocks                   62
```

Selector count by component — the distribution is extremely skewed:

| Component  | Selectors | Component    | Selectors |
| ---------- | --------- | ------------ | --------- |
| `stepper`  | 2,931     | `slider`     | 934       |
| `input`    | 2,731     | `button`     | 794       |
| `ocpicker` | 1,888     | `skill`      | 732       |
| `table`    | 1,215     | `upload`     | 689       |
| `tabs`     | 1,060     | `datepicker` | 580       |
| `grid`     | 1,009     | `pills`      | 537       |

`stepper` + `input` + `ocpicker` alone are ~7,550 selectors — roughly **40% of the stylesheet for
three components**, at least two of which a typical generated Talent Forge page never renders. The
size is not one pathological file; it is the combination of (a) 82 SCSS modules concatenated
unconditionally, (b) a 5,015-variable theming layer, and (c) per-component variant explosion.

**Perspective:** 130 KB gzip is real but not catastrophic — roughly one mid-size JS chunk. The
problem is that it is **unconditional**: a generated app using only `Button` and `Table` pays the
full 130 KB. That is what makes it worth fixing, not the absolute number.

### 3.2 Is tree-shaking possible?

**Not today, and not by configuration.** The build emits exactly one CSS file:

```js
// rollup.config.mjs
postcss({ modules: {...}, minimize: true, extract: 'octuple.css', inject: false })
```

`extract: 'octuple.css'` collapses every `*.module.scss` into one artifact. `package.json` exposes a
single CSS entry (`"./lib/octuple.css"`) and marks `"sideEffects": ["**/*.css"]`, so **no bundler can
eliminate any part of it** — correctly so, since it has no idea which rules are reachable.

Three paths forward, in increasing order of cost:

| Option                       | Change                                                                                                                                     | Consumer impact                                                                                                     | Verdict                                                                                                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **A. Per-component CSS**     | Drop `extract`, let `preserveModules` emit `lib/components/<X>/<x>.css` next to each `.mjs`; add `"./lib/components/*/*.css"` to `exports` | `import '@eightfold.ai/octuple/lib/components/Button/button.css'`, or automatic if components self-import their CSS | **Recommended.** Aligns CSS granularity with the JS build, which already uses `preserveModules`.                                                                                           |
| **B. Split the theme layer** | Emit `octuple-theme.css` (the 122 KB of custom properties) separately from component CSS                                                   | Import theme once, components à la carte                                                                            | Good companion to A; smaller and independently shippable                                                                                                                                   |
| **C. Consumer-side purge**   | Talent Forge runs PostCSS `purgecss` over `octuple.css`                                                                                    | None on Octuple                                                                                                     | **Reject.** Octuple class names are hashed CSS-module identifiers assembled at runtime by `mergeClasses` — a static purge will delete rules that are actually used. Genuinely unsafe here. |

Option A is a build-config change, not a source rewrite, and it is the only one that makes
`sideEffects` meaningful. It is **not** required for PR 1 and should not be bundled into it.

### 3.3 Should CSS imports change?

Yes — on both sides, for different reasons.

**Octuple:** ship per-component CSS (option A) and keep `lib/octuple.css` as a deprecated all-in-one
for existing consumers. Removing it outright is a breaking change for every current Octuple app.

**Talent Forge — this is the important one.** Where you import `octuple.css` decides whether the
build survives B3:

```css
/* frontend/src/styles/tailwind.css — DO NOT do this */
@import '@eightfold.ai/octuple/lib/octuple.css';
```

`@tailwindcss/vite` processes this file with **lightningcss**, which hard-fails on B3.

```ts
// frontend/src/main.tsx — do this instead
import '@eightfold.ai/octuple/lib/octuple.css';
```

A JS-side import goes through Vite's normal CSS pipeline (esbuild minification by default), which
tolerates the malformed selectors. **This is a placement rule, not a workaround** — Octuple's CSS is
a vendor stylesheet and has no business inside the Tailwind layer graph, where it would also fight
Tailwind's cascade layers. It should be written down in the boilerplate regardless of B3.

### 3.4 Why lightningcss rejects the selector

Reproduced with `lightningcss.transform({ errorRecovery: false })` on the published CSS:

```
Pseudo-elements like '::before' or '::after' can't be followed by selectors like 'Delim('.')'
  at octuple.css:309:182342
```

Exactly **three** selectors, all in RTL stylesheets:

```css
.form-module_…form-item-label__…>label.form-module_form-item-required__…:before .form-module_form-rtl__…
.form-module_…form-item-label__…>label:after                                   .form-module_form-rtl__…
.tree-module_tree-show-line__… .tree-module_tree-indent-unit__…:before          .tree-module_tree-rtl__…
```

Each has a **descendant combinator after a pseudo-element**. A pseudo-element must terminate a
compound selector — nothing can descend from `::before`, because it is not a real element with
children. This is invalid per CSS Selectors Level 4; **lightningcss is right and the browsers are
being lenient.** Chrome/Firefox silently discard these rules today, which is why nobody noticed.

The source is a Sass nesting mistake — the RTL modifier is nested _inside_ the pseudo-element block
instead of scoping it:

```scss
// src/components/Form/Styles/rtl.scss:13-25   ← WRONG
> label {
  &.form-item-required:before {
    .form-rtl {
      margin-right: 0;
      margin-left: 4px;
    } // compiles to ":before .form-rtl"
  }
  &::after {
    .form-rtl {
      margin: 0 $space-xxxs 0 $space-xs;
    }
  }
}
```

```scss
// src/components/Tree/Styles/rtl.scss:38-45   ← WRONG, same shape
&-unit {
  &:before {
    .tree-rtl {
      right: auto;
      left: …;
    }
  }
}
```

The correct pattern already exists in the same repo — `src/components/Table/Styles/rtl.scss:20`
nests the pseudo-element _inside_ the RTL scope, not the other way round.

**Scope discipline for the PR:** these two files contain many _other_ `.form-rtl { … }` blocks with
the same inverted nesting (e.g. `.form-item-label .form-rtl { text-align: left }`, which means "a
`.form-rtl` inside a label" — almost certainly not the intent). Those compile to _valid_ CSS and
merely do nothing. **Fix only the three invalid selectors in the compatibility PR.** The broader RTL
correctness cleanup changes rendered output in RTL locales and deserves its own PR with RTL visual
review. Conflating them turns a mechanical fix into a design review.

### 3.5 Vite config changes vs. Octuple fix

**Octuple fixes this. Talent Forge changes nothing.**

`vite.config.ts` currently sets no `css.transformer`, so lightningcss reaches `octuple.css` only via
the `@tailwindcss/vite` plugin — i.e. only if someone `@import`s it into `tailwind.css`. The correct
response is the import-placement rule in §3.3 plus the upstream selector fix. Adding
`errorRecovery: true` or forcing the PostCSS transformer would suppress a real bug in a shared
library and leave it broken for every other Octuple consumer.

One genuine Talent Forge concern to verify, unrelated to B3: `vite.config.ts` sets
`resolve.dedupe: ["react", "react-dom"]`, which is correct and should stay. Octuple bundles
`react-is` into its own `node_modules`, so after the B4 bump confirm only one `react-is` resolves in
the final graph.

---

## 4. Migration architecture recommendation

### 4.1 What already exists (this changes the answer)

Talent Forge **already has the abstraction layer** the brief proposes building:

```
frontend/src/components/ef-design-system.ts   — 51 lines, ~9 export groups
  "Barrel re-export of shadcn UI primitives for the headless boilerplate.
   Existing imports of `import { Button } from '@/components/ef-design-system'`
   continue to work."
```

And the generation prompt already mandates it. From
`.claude/skills/frontend/references/component-standards.md`:

> **Component-source order (use the first that fits)**
>
> 1. `@/components/ef-design-system` — the curated barrel … **Import from here first.**
> 2. `@/components/ui/*` — raw shadcn primitives not yet re-exported by the barrel.

So Option B is not a greenfield decision — it is **finishing a layer that is 12% built**. Measured in
the boilerplate today:

| Import path                              | Occurrences |
| ---------------------------------------- | ----------- |
| `@/components/ui/*` (direct)             | **88**      |
| `@/components/ef-design-system` (barrel) | **8**       |

The barrel exists and is documented as the preferred path, but 88 direct imports bypass it, and
`src/components/ui/` holds 65 Shadcn component files. **The single highest-leverage migration task is
widening the barrel and closing the direct-import path** — and that work is valuable whether or not
Octuple ever lands.

### 4.2 Option A vs Option B

**Option A — replace Shadcn imports with Octuple directly.**

|                 |                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Benefits        | No indirection; smallest possible diff _if_ the APIs matched                                                                                                                                                                                                                                                                                                                         |
| Risks           | **Severe.** 88 call sites edited by hand. Octuple's API is not Shadcn's: `<Button text="Save"/>` vs `<Button>Save</Button>`; `<Select options={[...]}/>` vs Radix's `<Select><SelectTrigger/><SelectContent/></Select>` compound pattern. Rollback means reverting every call site. Every generated app produced during the transition is stranded on whichever library was current. |
| Effort          | High and irreducible — 88 sites × API translation, plus every generation prompt                                                                                                                                                                                                                                                                                                      |
| Maintainability | Poor. A third UI library later repeats the whole exercise.                                                                                                                                                                                                                                                                                                                           |

**Option B — adapter layer behind `@/components/ui/*` and the barrel.** ✅ **Recommended**

```
Feature code
  └─ @/components/ef-design-system   (curated barrel — the only import path)
       └─ @/components/ui/<name>     (adapter: Shadcn-shaped API, Octuple internals)
            └─ @eightfold.ai/octuple
```

|                 |                                                                                                                                                                                                                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Benefits        | Call sites never change. Swap per component, not big-bang. Adapters absorb the API delta (`children` → `text`, compound → `options[]`) in one reviewed place. A `USE_OCTUPLE` flag makes rollback a one-line revert. Generation prompts keep pointing at one import path forever. |
| Risks           | Adapter drift (an adapter that quietly diverges from the Shadcn contract); a thin veneer over a fat component tempts leaky props; ~65 adapters is real work                                                                                                                       |
| Effort          | Moderate but **incremental and parallelisable** — one component per PR, each independently reviewable and revertible                                                                                                                                                              |
| Maintainability | Strong. The adapter layer is the contract; both Shadcn and Octuple become implementation details.                                                                                                                                                                                 |

**Recommendation: Option B, implemented as an in-place rewrite of `src/components/ui/<name>.tsx`, not
a parallel directory.** Keeping the existing file paths means the 88 direct imports and the 8 barrel
imports both keep working untouched — the swap happens entirely inside files that already exist. A
parallel `components/octuple-ui/` would force a second migration later.

Sequence per component:

1. Widen `ef-design-system.ts` to re-export the component (if it doesn't already).
2. Rewrite `ui/<name>.tsx` to render Octuple internally while preserving the exported prop types.
3. Diff-test the generated output (§6) against the Shadcn baseline.
4. Merge. Repeat.

Start with the four named in the brief — **Button, Table, Select, Dialog** — in that order: Button is
the simplest adapter and validates the pattern; Table and Select are the two that exercise
`ResizeObserver` and therefore prove the React 19 fixes hold under real interaction; Dialog validates
the `createRoot` rework from B1.

### 4.3 The question worth asking out loud

Talent Forge already ships `src/styles/ef-design-system/` — Eightfold's design tokens expressed as
Tailwind v4 CSS variables — plus a working theme switcher. **A meaningful share of "make generated
apps look like Eightfold" is already solved without Octuple.** Octuple's remaining value is
behavioural component parity with the Eightfold product (Table interactions, Select semantics,
DateTimePicker, a11y baked in) rather than visual tokens.

That is a legitimate reason to adopt it — but it argues for **adopting the complex components and
leaving the trivial ones on Shadcn+tokens**, rather than a wholesale swap. A 1.31 MB stylesheet and a
`@floating-ui@0.20` transitive dependency are a steep price for an Octuple `Badge`. Worth an explicit
decision with your mentor before PR 3, not an assumption.

---

## 5. PR strategy

Six PRs across two repos. PRs 1–2 are Octuple and unblock everything; the rest are Talent Forge.

---

### PR 1 — Octuple: React 19 compatibility ⭐ _this is the one to raise now_

**Repo:** `EightfoldAI/octuple` · **Branch:** `fix/react-19-compatibility` ·
**Commit:** `fix(react19): remove removed-in-19 ReactDOM APIs and unsafe findDOMNode calls`

**Scope:** make the package importable and renderable under React 19 without changing any public API.
Explicitly excludes CSS, `@floating-ui`, and the RTL semantic cleanup.

**Files changed (~10):**

| File                                                          | Change                                                                                                                         |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `src/components/Dialog/DialogHelper.tsx`                      | `render`/`unmountComponentAtNode` → `createRoot` + root registry _(B1)_                                                        |
| `src/shared/utilities/findDOMNode.ts`                         | Null-guard + feature-detect; return `null` rather than throw _(B2 layer 1)_                                                    |
| `src/shared/ResizeObserver/SingleObserver/SingleObserver.tsx` | Fix `element.ref` → `props.ref` (line 44); real DOM handle for `DomWrapper`; correct the `?.` misuse (line 111) _(B2 layer 2)_ |
| `src/shared/utilities/domWrapper.tsx`                         | Expose a DOM handle (design per §2.8)                                                                                          |
| `src/components/VirtualList/hooks/useHeights.tsx`             | Delete the redundant `findDOMNode` call (line 29)                                                                              |
| `src/components/Motion/CSSMotion.tsx`                         | Use the new `DomWrapper` handle (line 43)                                                                                      |
| `src/components/Trigger/Trigger.tsx`                          | Remove `ReactDOM.findDOMNode(this)` (line 392); fix `(child as any).ref` (line 785)                                            |
| `src/shared/utilities/toArray.ts` _(via `package.json`)_      | `react-is` → `^19` _(B4)_                                                                                                      |
| `package.json`                                                | `react-is` `^19`, `@react-spring/web` `^10.0.1`, `@types/react-is`; peer range `>=18` _(B5)_; dev-dep React 19                 |
| `.eslintrc.js`                                                | Ban `ReactDOM.findDOMNode` / `render` / `unmountComponentAtNode` in `src/`                                                     |
| `src/components/Motion/tests/CSSMotion.test.tsx`              | Rewrite the four `findDOMNode` spy assertions (lines 150–216)                                                                  |

**Testing required:**

- `yarn typecheck` + `yarn lint` green (expect churn from `@types/react` 17 → 19).
- Full Jest suite. **Expect real pain:** the suite runs Enzyme with
  `@wojtekmaj/enzyme-adapter-react-17` and `@testing-library/react@12`, neither of which supports
  React 19. Migrating the harness is arguably PR 0 — see "Biggest risks."
- New regression tests: `toArray` flattens fragments; `findDOMNode(null)` returns `null` and does not
  throw; `DialogHelper.show()` mounts and `close()` unmounts.
- **Manual Storybook pass on React 19** for the 12 `ResizeObserver` consumers — resize the viewport
  and confirm each still reflows. This is the check automated tests will miss.
- Reproduce the sandbox matrix in §2.4 and confirm every ✅ _and_ `Select` pass.

**Rollback:** self-contained revert. Consumers on React 17/18 are unaffected at runtime by everything
except the `DialogHelper` async-render change and the peer-floor bump — both of which make this a
**minor or major** release, not a patch. Ship as `2.59.0` behind a pre-release tag (`2.59.0-rc.0`)
and let Talent Forge validate before promoting.

---

### PR 2 — Octuple: CSS / build fixes

**Scope:** the three invalid selectors _(B3)_. Nothing else.

**Files:** `src/components/Form/Styles/rtl.scss` (lines 13–25),
`src/components/Tree/Styles/rtl.scss` (lines ~38–45).

**Testing:** build; run `lightningcss.transform({ errorRecovery: false })` over `lib/octuple.css` and
assert zero warnings — **add this as a CI step** so it cannot regress. Visual RTL check on Form
(required-field asterisk, optional label) and Tree (indent guide lines).

**Rollback:** trivial — two files, no JS. Lowest-risk PR in the set. Could ship _before_ PR 1 if you
want an early win, since it is independent.

**Deliberately deferred to PR 2b:** per-component CSS emission (§3.2 option A) and theme-layer
splitting. Both are build-architecture changes needing their own release note.

---

### PR 3 — Talent Forge: Octuple integration behind the adapter layer

**Scope:** CSS import in `main.tsx` (§3.3); `USE_OCTUPLE` flag; rewrite `ui/button.tsx`,
`ui/table.tsx`, `ui/select.tsx`, `ui/dialog.tsx` internals; widen `ef-design-system.ts`. Depends on
PR 1 + PR 2 being published.

**Files:** `headless-boilerplate/frontend/src/main.tsx`,
`.../src/components/ui/{button,table,select,dialog}.tsx`,
`.../src/components/ef-design-system.ts`, `.../package.json` (version bump).

⚠️ **Root `CLAUDE.md` says: "NEVER modify files under `boilerplate/` or `headless-boilerplate/`."**
That rule is aimed at project builds, not at platform work — but confirm with the Talent Forge owners
before the PR, because a boilerplate change propagates to every future generated app.

**Testing:** `pnpm check` (lint + build + quality); `pnpm test:unit`; Playwright e2e; the a11y quality
gates (`a11y.quality.test.tsx`, `axe-core`) — Octuple's a11y story differs from Radix's and this is
where that surfaces. Generate two reference apps (§6) and diff.

**Rollback:** flip `USE_OCTUPLE` off — adapters fall back to Shadcn, call sites untouched.

---

### PR 4 — Talent Forge: prompt / skill updates

**Scope:** teach the generator the Octuple rules.
**Files:** `.claude/skills/frontend/references/component-standards.md` (primary — this is where the
component-source order lives), `.../build-checklist.md`, `.../SKILL.md`, plus a new
`references/octuple-guidelines.md`.
**Testing:** generate 3–5 apps from fixed stories and grade against the checklist. This is the only
PR whose "tests" are qualitative — budget review time accordingly.
**Rollback:** revert markdown; no runtime impact.

---

### PR 5 — Talent Forge: remaining ~61 component adapters

Batched by risk (forms → overlays → data display → exotic), one PR per batch. Same testing shape as
PR 3.

---

### PR 6 — Talent Forge: remove Shadcn

**Only after** every adapter is Octuple-backed, generated-app parity is signed off, and at least one
real project has shipped on the Octuple path. Drops `shadcn`, `radix-ui`, `cmdk`, `vaul`, `input-otp`
and friends from `package.json`.
**Rollback:** hardest of the set — restoring deleted primitives is real work. Do not start this until
PRs 3–5 have been stable in production for a full release cycle.

---

## 6. Testing strategy

### 6.1 Component level

For **Button, Table, Select, Dialog, Forms** — the same five checks each, run against React 19:

| Check                                   | Tool                                      | Why it matters here                                                                                                                                                     |
| --------------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Renders without error                   | Vitest + RTL 16                           | Catches B1/B2 class failures                                                                                                                                            |
| **Fragment children flatten correctly** | Vitest                                    | The _only_ thing that catches B4. `<Select><>{opts}</></Select>` must behave identically to a flat list. Non-negotiable for Table columns, Form fields, Select options. |
| Resize/measure behaviour                | Playwright, real browser                  | jsdom stubs `ResizeObserver`, so unit tests **cannot** validate the B2 fix. Table column measurement and Select dropdown width need a real viewport resize.             |
| Keyboard + a11y                         | `axe-core` via the existing quality gates | Octuple ≠ Radix a11y semantics; regressions here are the likeliest silent quality loss                                                                                  |
| Prop-contract parity                    | Type-level + snapshot                     | The adapter still satisfies the Shadcn-shaped API the 88 call sites expect                                                                                              |

Component-specific must-cover cases:

- **Button** — variant/size/disabled/loading; icon slots; `children` → `text` mapping.
- **Table** — sort, filter, pagination, empty state, **column measurement on resize**, virtualised rows.
- **Select** — single + multi, search, async options, keyboard nav, **dropdown positioning on scroll**
  (the `Trigger`/`findDOMNode` path).
- **Dialog** — open/close, focus trap, Escape, scroll lock, and **`DialogHelper.show()` imperative
  mount** (the `createRoot` rework — assert async mount explicitly, since the timing changed).
- **Forms** — validation, error display, controlled/uncontrolled, `react-hook-form` integration
  (Talent Forge uses `react-hook-form` + `zod`, Octuple ships its own `async-validator` Form —
  **decide which owns validation before adapting**; this is an unresolved design question, not a test
  case).

### 6.2 Application generation level

The real acceptance test is that the generator still produces good apps.

**Golden-app differential.** Freeze 3 story sets (a list+detail CRUD screen, a dashboard with filters,
a multi-step form). Generate each twice — `USE_OCTUPLE=false` and `true` — from the same input, then
compare:

| Dimension | Method                                  | Gate                                                                                                          |
| --------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Build     | `pnpm check`                            | Must pass on both                                                                                             |
| Bundle    | `dist/` JS + CSS size                   | Record the delta; ~130 KB gzip CSS regression is expected and must be **accepted explicitly**, not discovered |
| Layout    | Playwright screenshots at 3 viewports   | Human review — "different" is fine, "broken" is not                                                           |
| Behaviour | Same Playwright e2e script against both | Must pass identically                                                                                         |
| a11y      | `axe-core` violation count              | Octuple must be ≤ Shadcn. **Hard gate.**                                                                      |
| Console   | Zero React errors/warnings              | Catches B4-class silent issues surfacing as key warnings                                                      |

**Fragment canary.** Add one generated screen that deliberately wraps children in `<>…</>` inside a
Table, Select and Form. If B4 ever regresses — including via a transitive `react-is` — this screen
breaks visibly instead of silently.

**Console-error gate in CI.** Fail the e2e run on any `console.error`. Most B4-style failures announce
themselves as a React key or child warning long before a user notices.

---

## 7. Documentation strategy

### 7.1 Where each rule lives

Three homes, and the distinction is _who the rule constrains_:

| Home                                                          | Owns                                                                                                  | Example                                                   |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| **Octuple docs** (Storybook + `src/components/COMPONENTS.md`) | How a component _works_ — props, variants, a11y contract, DOM structure. True for every consumer.     | "`Table` accepts `columns[]` with `dataIndex` and `key`." |
| **Talent Forge `component-standards.md`**                     | How the _generator_ should assemble components. Opinionated, TF-specific, changes with product taste. | "Import from `@/components/ef-design-system` first."      |
| **Adapter JSDoc** (`ui/<name>.tsx`)                           | The Shadcn↔Octuple contract, at the point of translation.                                             | "`children` maps to Octuple's `text` prop."               |

### 7.2 The worked example

> **Rule:** "Table filters must always be rendered inside the table toolbar."

This is a **layout/composition convention**, not a component capability. Octuple's `Table` does not
enforce it and shouldn't — other Eightfold products may legitimately place filters elsewhere.

**It belongs in Talent Forge's `component-standards.md`,** as a new "Composition rules" section
alongside the existing "Required states (every screen)" block, which already encodes exactly this kind
of rule ("Loading — skeletons, not spinner-only").

The full picture:

| Layer                                               | Carries                                | This rule?                                                                                                                                |
| --------------------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Octuple docs                                        | Component capability                   | No — Octuple must stay product-agnostic                                                                                                   |
| Component guidelines (`COMPONENTS.md`)              | Contributor conventions                | No — that's about authoring Octuple, not using it                                                                                         |
| **Talent Forge prompts** (`component-standards.md`) | **Generation conventions**             | ✅ **Yes — primary home**                                                                                                                 |
| Claude skills (`.claude/skills/frontend/`)          | The mechanism that _delivers_ the rule | ✅ Yes — this _is_ the delivery vehicle; `SKILL.md` step 4 already says "Use components + states per `references/component-standards.md`" |
| `build-checklist.md`                                | The **enforcement**                    | ✅ Add a HARD-fail check — a rule the checklist doesn't verify is a suggestion                                                            |

Note that "Talent Forge prompts" and "Claude skills" are the same thing in this repo — the skills
directory _is_ the prompt layer. So: **write the rule in `component-standards.md`, enforce it in
`build-checklist.md`.** One rule, two files, both TF-owned.

### 7.3 Concrete additions

**Octuple:**

- `docs/REACT_19.md` — supported React versions, what changed in the compat release, the
  `DialogHelper` async-mount migration note.
- Update `CLAUDE.md` "Key Dependencies" — it currently says "React 17+", which is the claim that got
  us here.
- Storybook a11y notes per component, since Talent Forge gates on `axe-core`.

**Talent Forge:**

- New `.claude/skills/frontend/references/octuple-guidelines.md` — the Shadcn→Octuple prop-mapping
  table, per-component gotchas, composition rules like the filter/toolbar example.
- Extend `component-standards.md` with a "Composition rules" section and the `USE_OCTUPLE` note.
- Add Octuple checks to `build-checklist.md` as HARD fails.
- A short ADR in `platform/docs/` recording _why_ Octuple, and the §4.3 scope decision.

---

## 8. Final recommendation

### 8.1 Order of work

```
PR 0   Octuple test-harness modernisation  ─┐  (Enzyme/RTL-12 → RTL 16; may be
       ↓                                    │   folded into PR 1 if the suite
PR 1   Octuple React 19 compatibility ⭐     │   survives — decide on day 1)
       ↓                                    │
PR 2   Octuple CSS selector fix  ───────────┘  (independent — can land first)
       ↓
       Publish 2.59.0-rc.0
       ↓
PR 3   TF: Button / Table / Select / Dialog behind the adapter layer + USE_OCTUPLE
       ↓
PR 4   TF: prompt + skill updates
       ↓
       ── Decision gate: is Octuple worth it for simple components? (§4.3) ──
       ↓
PR 5   TF: remaining ~61 adapters, batched by risk
       ↓
PR 6   TF: remove Shadcn   ← only after a real project ships on Octuple
```

PR 2 has no dependency on PR 1 and is two files. **If you want something merged this week, PR 2 is the
safest possible first contribution** — but PR 1 is the one that actually unblocks the migration, and
it is the one your mentor asked for.

### 8.2 Biggest risks

1. **Octuple's test harness cannot run React 19.** Enzyme + `@wojtekmaj/enzyme-adapter-react-17` +
   `@testing-library/react@12` all stop at React 17. You may have to modernise the harness _before_
   you can prove PR 1 works. **This is the most likely thing to blow up the estimate** and the first
   thing to check on day 1 — before writing any fix.
2. **B4 is silent.** Everything else fails loudly. A fragment-flattening regression ships clean and
   surfaces as "the form is missing a field" weeks later. The canary test in §6.2 is the mitigation
   and it is not optional.
3. **`SingleObserver`'s `DomWrapper` design is genuinely unsolved.** `findDOMNode` exists there
   precisely because a wrapper that renders no DOM has no ref to read. Get the design agreed before
   coding — the fallback of "guard and return null" silently disables resize observation for 12
   components, which is worse than the crash it replaces.
4. **Octuple has other React 19 consumers.** This is a shared Eightfold library. The `DialogHelper`
   async-mount change and the peer-floor bump affect everyone. Ship as an RC and socialise it.
5. **`@floating-ui@0.20.1` is a latent risk.** Its peer range permits React 19, so it will not warn —
   but it is a 2023 release and the positioning path (`Trigger`, `Tooltip`, `Dropdown`, `Select`) is
   exactly where React 19 ref semantics changed. Exercise it hard in a real browser; if it misbehaves,
   the 0.20 → 0.27 upgrade is a substantial separate project.
6. **Boilerplate changes are high-blast-radius.** `CLAUDE.md` forbids editing `headless-boilerplate/`;
   every change propagates to all future generated apps. Get explicit owner sign-off for PR 3.

### 8.3 Complexity estimate

| PR                   | Complexity           | Notes                                                                  |
| -------------------- | -------------------- | ---------------------------------------------------------------------- |
| PR 0 (harness)       | **High**             | Contingent — may be unnecessary, may dominate PR 1                     |
| PR 1 (React 19)      | **High**             | Low line count, high blast radius; the `DomWrapper` design is the crux |
| PR 2 (CSS)           | **Low**              | Two files, mechanical, verifiable in CI                                |
| PR 3 (4 adapters)    | **Medium**           | Select and Table carry the API-shape delta                             |
| PR 4 (prompts)       | **Low–Medium**       | Cheap to write, expensive to validate                                  |
| PR 5 (61 adapters)   | **High (aggregate)** | Individually trivial, collectively large; parallelisable               |
| PR 6 (remove Shadcn) | **Medium**           | Mechanical but irreversible in practice                                |

Deliberately no day estimates — they'd be invented. The one number worth committing to a plan is
**PR 0's go/no-go, which is answerable in under a day**: check out Octuple, force React 19 into
`devDependencies`, run `yarn test`, and count what breaks. Everything downstream depends on that
answer.

### 8.4 Before switching the Talent Forge default from Shadcn to Octuple

A checklist, all of which must be true:

- [ ] Octuple `2.59.x` published with PRs 1 + 2, consumed as a normal registry dep — no overrides, no patches
- [ ] `npm ls react` clean — no `invalid` peers
- [ ] `lightningcss` zero-warning check on `octuple.css` running in Octuple CI
- [ ] All 65 `components/ui/*` adapters Octuple-backed and type-compatible
- [ ] Golden-app differential (§6.2) passing on all 3 story sets, with the CSS-size delta explicitly accepted
- [ ] `axe-core` violation count ≤ the Shadcn baseline
- [ ] Zero `console.error` in e2e
- [ ] Generation prompts + build-checklist updated and validated on 3–5 fresh generations
- [ ] At least **one real project shipped** on the Octuple path with `USE_OCTUPLE` opt-in
- [ ] `USE_OCTUPLE` rollback verified end-to-end — not assumed
- [ ] The §4.3 scope decision made and written down
- [ ] Octuple owners have committed to a React 19 CI matrix so this cannot silently regress

Shadcn stays installed until every box is ticked. PR 6 is the last step, not a cleanup task.

---

## Appendix A — how each claim was verified

Sandbox: clean npm project, `@eightfold.ai/octuple@2.58.4`, `react@19.2.8`, `react-dom@19.2.8`,
`jsdom`, `lightningcss`. Components rendered via `react-dom/client` `createRoot` inside `act()`.

| Claim                                                                                   | Method                                                                                 | Result                                                               |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `findDOMNode`/`render`/`unmountComponentAtNode` removed; `unstable_batchedUpdates` kept | `typeof` probe on `react-dom@19.2.8`                                                   | `undefined` ×3, `function` ×1                                        |
| B1 blocks the barrel                                                                    | ESM import of `DialogHelper.mjs`                                                       | `SyntaxError: Named export 'render' not found`                       |
| B2 crash + origin                                                                       | `<Select>` render, stack captured                                                      | `TypeError: o.findDOMNode is not a function` at `SingleObserver.mjs` |
| Component render matrix                                                                 | 11 components rendered from deep paths                                                 | §2.4 table                                                           |
| B4                                                                                      | `react-is@18.1.0` vs `@19.2.8` against a React 19 fragment                             | `false` vs `true`                                                    |
| B5                                                                                      | `npm ls react --all`                                                                   | `@react-spring/web@9.6.1` + 4 sub-packages `invalid`                 |
| `@react-spring/web` fix version                                                         | `npm view @react-spring/web@10.0.1 peerDependencies.react`                             | first range including `^19.0.0`                                      |
| B3 error + count                                                                        | `lightningcss.transform({errorRecovery:false})`, then `true`                           | 1 hard error / 3 warnings; all 3 selectors extracted                 |
| B3 source                                                                               | Traced hashed class names → `Form/Styles/rtl.scss:13-25`, `Tree/Styles/rtl.scss:38-45` | Sass nesting inversion confirmed                                     |
| CSS metrics                                                                             | Byte count, gzip, regex analysis of `lib/octuple.css`                                  | 1,375,877 B / ~130 KB gzip / 19,170 module selectors                 |
| `findDOMNode` inventory                                                                 | `grep -rn` across `src/`                                                               | 5 call sites + 1 direct                                              |
| `ResizeObserver` consumers                                                              | `grep -rln` across `src/components`                                                    | 12 files                                                             |
| `toArray` consumers                                                                     | `grep -rln` across `src/`                                                              | 21 modules                                                           |
| TF import counts                                                                        | `grep -rn` across `headless-boilerplate/frontend/src`                                  | 88 direct / 8 barrel                                                 |
| TF stack                                                                                | `package.json`, `vite.config.ts`, `styles/tailwind.css`                                | React 19.2.1, Vite 7.3.2, Tailwind v4, `@tailwindcss/vite`           |
