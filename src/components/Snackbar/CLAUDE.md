# Snackbar Component

This file provides guidance when working with the Snackbar component in Octuple.

## Overview

The Snackbar component is a notification system built on top of the InfoBar component. It provides a global, event-driven API for displaying toast-style notifications with automatic dismissal, positioning, and comprehensive accessibility features.

## Breaking Changes (v2.54+)

### Accessibility Improvements - January 2025

Several accessibility improvements were made to comply with WCAG 2.x standards. These changes may affect existing behavior:

#### 1. Auto-focus Removed (BREAKING)
**Previous behavior:**
- Snackbars would automatically receive focus when they appeared
- `moveFocusToSnackbar` was set to `true` for closable snackbars

**New behavior:**
- Snackbars NO LONGER auto-focus when they appear
- `moveFocusToSnackbar` is always `false`
- Users stay in their current context

**Migration:**
If your application relied on snackbars receiving focus:
```typescript
// Before: Focus moved automatically
snack.serve({ content: 'Message', closable: true });
// Focus would move to snackbar

// After: Focus stays with user
snack.serve({ content: 'Message', closable: true });
// Focus remains where it was
// Screen reader still announces via role="status"
```

**Why this change:**
- WCAG 3.2.2 (On Input) - Focus should not move unexpectedly
- Better user experience - users stay in context
- Screen reader announcements are sufficient

#### 2. TabIndex Removed from Containers (BREAKING)
**Previous behavior:**
- Closable snackbar containers had `tabIndex={0}`
- Users had to tab twice: once to container, once to close button

**New behavior:**
- Containers are no longer focusable
- Only interactive elements (close button, action button) receive focus

**Migration:**
No code changes needed. This improves keyboard navigation automatically.

**Why this change:**
- WCAG 2.4.3 (Focus Order) - Only interactive elements should be focusable
- Better keyboard experience - single tab to close button
- Eliminates confusing double-focus

#### 3. New Props Available (Non-breaking)

**`domPosition` prop on SnackbarContainer:**
```typescript
<SnackbarContainer domPosition="start" /> // Position at top of DOM
<SnackbarContainer domPosition="end" />   // Default, position at end
```

Benefits:
- Better tab order when positioned at start
- Complies with accessibility recommendations
- Backward compatible (defaults to 'end')

### Recommended Migration Steps

1. **Test keyboard navigation** - Verify tab order works as expected
2. **Test screen reader** - Confirm announcements work correctly
3. **Check focus management** - If you relied on auto-focus, update your code
4. **Consider `domPosition="start"`** - For better accessibility, position notifications early in DOM

### What Stays the Same

- All public APIs remain unchanged
- `snack.serve()` and variants work identically
- Visual appearance unchanged
- Auto-dismiss behavior unchanged
- Focus restoration when all closed still works

## Architecture

### File Structure

```
src/components/Snackbar/
├── Snackbar.tsx                 # Main component (thin wrapper around InfoBar)
├── SnackbarContainer.tsx        # Container managing all active snackbars
├── snack.ts                     # Event-driven API for serving notifications
├── Snackbar.types.ts            # TypeScript type definitions
├── snackbar.module.scss         # SCSS styles with responsive behavior
├── Snackbar.stories.tsx         # Storybook stories
├── Snackbar.test.tsx            # Jest tests
└── index.ts                     # Public exports
```

### Component Hierarchy

```
SnackbarContainer (Portal to document.body)
  └─ 6 position containers (one per position)
      └─ Snackbar[] (filtered by position)
          └─ InfoBar (actual UI rendering)
```

### Core Components

#### 1. Snackbar.tsx (Lines 11-30)
- Thin wrapper around InfoBar component
- Accepts `SnackbarProps` and forwards to InfoBar
- Adds Snackbar-specific styling classes
- Uses `useMergedRefs` to combine parent and internal refs

#### 2. SnackbarContainer.tsx (Lines 16-122)
- Manages global snackbar state via React hooks
- Listens for custom DOM events (SERVE/EAT)
- Renders snackbars in Portal outside React tree
- Handles focus management and stacking
- Groups snackbars by position

#### 3. snack.ts (Lines 1-106)
- Event-driven API for creating/dismissing snackbars
- Tracks active snack count for focus restoration
- Provides typed variants (neutral, positive, warning, disruptive)
- Auto-dismiss logic for non-closable snacks

## Key Features

### 1. Event-Driven Architecture

The component uses CustomEvents for decoupled state management:

```typescript
// Serving a snack
serve(props)
  → dispatches 'serveSnack' CustomEvent
  → SnackbarContainer listens
  → adds to state
  → renders Snackbar

// Dismissing a snack
eat(id)
  → dispatches 'eatSnack' CustomEvent
  → SnackbarContainer listens
  → removes from state
```

**Benefits:**
- No prop drilling required
- Can be called from anywhere in the application
- Decouples snackbar creation from rendering
- Works across component boundaries

**Event Types (snack.ts:17-20):**
- `SERVE`: 'serveSnack' - Add new snackbar
- `EAT`: 'eatSnack' - Remove snackbar

### 2. Positioning System

Six positioning options (Snackbar.types.ts:4-10):
- `top-center` (default)
- `top-left`
- `top-right`
- `bottom-center`
- `bottom-left`
- `bottom-right`

**Implementation (SnackbarContainer.tsx:49-56):**
```typescript
const positionToClassMap: Record<SnackbarPosition, string> = {
  'top-left': styles.topLeft,
  'top-right': styles.topRight,
  'top-center': styles.topCenter,
  'bottom-left': styles.bottomLeft,
  'bottom-right': styles.bottomRight,
  'bottom-center': styles.bottomCenter,
};
```

**CSS Positioning (snackbar.module.scss:61-94):**
- Fixed positioning with z-index 600
- Center positions use `transform: translateX(-50%)`
- Spacing from edges: `$space-m`

### 3. Type Variants

Four semantic variants inherited from InfoBar:
- **Neutral** (default) - General information
- **Positive** - Success messages
- **Warning** - Caution/attention needed
- **Disruptive** - Errors/critical alerts

**Convenience Methods (snack.ts:75-97):**
```typescript
snack.serveNeutral(props)    // InfoBarType.neutral
snack.servePositive(props)   // InfoBarType.positive
snack.serveWarning(props)    // InfoBarType.warning
snack.serveDisruptive(props) // InfoBarType.disruptive
```

### 4. Focus Management

Comprehensive focus handling for accessibility:

#### Focus Capture (snack.ts:38-44)
```typescript
// Only store element when first snack appears
if (activeSnacksCount === 0) {
  if (props.lastFocusableElement) {
    elementToFocus = props.lastFocusableElement;
  } else {
    elementToFocus = document.activeElement as HTMLElement;
  }
}
```

#### Focus Restoration (snack.ts:69-72)
```typescript
// Return focus when all snacks are dismissed
if (activeSnacksCount === 0 && elementToFocus) {
  elementToFocus.focus();
}
```

#### Sequential Focus (SnackbarContainer.tsx:90-103)
When a snackbar is closed:
1. Find its index in the ref array
2. Remove it from refs
3. Focus next snackbar (or previous if it was last)

#### Auto-Focus on Serve (SnackbarContainer.tsx:25-30)
```typescript
setTimeout(() => {
  const newSnackIndex = newSnacks.length - 1;
  snackContainerRef.current[newSnackIndex]?.focus();
}, 0);
```

### 5. Auto-Dismiss Behavior

**Logic (snack.ts:48-52):**
```typescript
if (!props.closable || props.actionButtonProps) {
  setTimeout(() => {
    eat(id);
  }, props.duration || 3000);
}
```

**Rules:**
- Default duration: 3000ms
- Auto-dismiss if NOT closable
- Auto-dismiss if has action button
- Closable snacks without actions must be manually dismissed

**Return Value:**
`serve()` returns a dismiss function for programmatic control

### 6. Stacking Behavior

**Position-Based Stacking (SnackbarContainer.tsx:58-66):**
```typescript
const getPositionSnacks = (position: SnackbarPosition): SnackbarProps[] => {
  const positionSnacks = [...snacks.filter((snack) => snack.position === position)];
  if (position.includes('bottom')) {
    positionSnacks.reverse(); // Newest appears at bottom visually
  }
  return positionSnacks;
};
```

- **Top positions**: Natural order (newest on top)
- **Bottom positions**: Reversed (newest on bottom visually)
- Vertical spacing: `margin-bottom: $space-s`

## Usage Patterns

### Basic Usage

```typescript
import { snack } from '@eightfold/octuple';

// Simple notification
snack.serve({ content: 'Hello World!' });

// With custom duration
snack.serve({
  content: 'This stays longer',
  duration: 5000
});

// With position
snack.serve({
  content: 'Bottom right',
  position: 'bottom-right'
});
```

### Type Variants

```typescript
// Success message
snack.servePositive({ content: 'Operation successful!' });

// Warning
snack.serveWarning({ content: 'Please review your changes' });

// Error
snack.serveDisruptive({ content: 'Failed to save' });

// Neutral/info
snack.serveNeutral({ content: 'New updates available' });
```

### With Action Button

```typescript
snack.serveWarning({
  content: 'Are you sure you want to delete this?',
  actionButtonProps: {
    text: 'Undo',
    onClick: (e) => {
      console.log('Undo clicked');
      // Snackbar auto-closes after action
    }
  }
});
```

### Closable Snackbar

```typescript
// User must manually close
snack.serve({
  content: 'Important information',
  closable: true,
  // No auto-dismiss for closable snacks without actions
});
```

### Programmatic Dismiss

```typescript
// Get dismiss function
const dismiss = snack.serve({
  content: 'Processing...',
  closable: true
});

// Later, dismiss programmatically
setTimeout(() => {
  dismiss();
}, 2000);
```

### Custom Focus Restoration

```typescript
const myButton = document.getElementById('submit-btn');

snack.servePositive({
  content: 'Form submitted',
  lastFocusableElement: myButton // Focus returns here
});
```

### SnackbarContainer Setup

Add once at app root level:

```typescript
import { SnackbarContainer } from '@eightfold/octuple';

function App() {
  return (
    <div>
      {/* Your app content */}
      <SnackbarContainer />
    </div>
  );
}
```

Or with custom parent:

```typescript
<SnackbarContainer parent={customElement} />
```

## Implementation Details

### Props Interface

**SnackbarProps (Snackbar.types.ts:14-41):**
```typescript
interface SnackbarProps extends Omit<InfoBarsProps, 'onClick'> {
  content: React.ReactNode;           // Required
  duration?: number;                  // Default: 3000ms
  id?: string;                        // Auto-generated if not provided
  position?: SnackbarPosition;        // Default: 'top-center'
  parentRef?: React.MutableRefObject<HTMLDivElement>;
  lastFocusableElement?: HTMLElement; // For focus restoration
}
```

### ID Generation

**Auto-generated IDs (snack.ts:23):**
```typescript
const id = props.id ?? generateId();
```

Custom IDs useful for:
- Preventing duplicates
- External dismiss control
- Testing

### State Management

**Container State (SnackbarContainer.tsx:19-20):**
```typescript
const [snacks, setSnacks] = useState<SnackbarProps[]>([]);
const snackContainerRef = useRef<(HTMLDivElement | null)[]>([]);
```

- Array of all active snackbars
- Ref array for focus management

**Global State (snack.ts:12-13):**
```typescript
let elementToFocus: HTMLElement | null = null;
let activeSnacksCount: number = 0;
```

Module-level state for focus restoration across all instances.

### Event Listeners

**Setup (SnackbarContainer.tsx:36-47):**
```typescript
useEffect(() => {
  if (canUseDocElement()) {
    document.addEventListener(SNACK_EVENTS.SERVE, addSnack);
    document.addEventListener(SNACK_EVENTS.EAT, removeSnack);
  }
  return () => {
    if (canUseDocElement()) {
      document.removeEventListener(SNACK_EVENTS.SERVE, addSnack);
      document.removeEventListener(SNACK_EVENTS.EAT, removeSnack);
    }
  };
}, []);
```

- SSR-safe with `canUseDocElement()` guards
- Cleanup on unmount

## Accessibility

### Recent Accessibility Improvements (2025)

The Snackbar component has been significantly improved to meet WCAG 2.x standards:

#### WCAG 2.4.3 Focus Order - Fixed
- **Removed `tabIndex=0` from notification containers** - Notifications are no longer focusable, only their interactive elements (close button, action button) receive focus
- Eliminates double-tab issue where users had to tab twice (container + button)
- Cleaner focus order and better keyboard navigation

#### WCAG 3.2.2 On Input - Fixed
- **Removed auto-focus behavior** - Focus no longer moves to snackbars when they appear
- Users stay in their current context
- Screen reader announcements via `role="status"` or `role="alert"` provide sufficient notification

#### WCAG 2.4.6 Headings and Labels - Fixed
- **Descriptive close button labels** - Changed from generic "Close" to "Close notification"
- **aria-describedby on close button** - Points to notification content for context
- Users always know what they're closing, even with multiple notifications

#### Additional Improvements
- **Semantic grouping** - All notifications wrapped in `<div role="group" aria-label="Notifications">`
  - Screen reader users can jump directly to notification area
  - Keyboard shortcuts work for navigation
- **Configurable DOM positioning** - New `domPosition` prop ('start' | 'end')
  - Can position at beginning of DOM for better tab order
  - Default 'end' maintains backward compatibility

### ARIA Roles (SnackbarContainer.tsx:143)

```typescript
role={hasClosableSnack ? 'status' : 'alert'}
```

**Logic:**
- `role="alert"` - For non-closable snacks
  - Announces immediately to screen readers
  - Interrupts current reading
  - Best for urgent messages

- `role="status"` - For closable snacks
  - Announces politely (waits for pause)
  - Less intrusive
  - Better for non-urgent updates

### Keyboard Navigation

**No Focusable Containers:**
- Notification containers are NOT focusable (no tabIndex)
- Only interactive elements (close button, action button) receive focus
- Simpler tab order following WCAG 2.4.3

**Sequential Close Button Focus:**
- When closing a snackbar, focus moves to next/previous close button
- Maintains keyboard navigation context
- Focus restoration when all snackbars are dismissed

### Focus Management Features

1. **No auto-focus** - Respects user context (WCAG 3.2.2)
2. **Focus restoration** - Returns to original element when all closed
3. **Custom focus targets** - Via `lastFocusableElement` prop
4. **Sequential navigation** - Focus moves intelligently between close buttons

### Screen Reader Support

- Content announced via `role="alert"` or `role="status"`
- Close button labeled "Close notification"
- Close button has `aria-describedby` pointing to notification content
- All notifications grouped in `role="group"` with `aria-label="Notifications"`
- Action buttons are keyboard accessible with proper labels

## Styling

### Main Snackbar (snackbar.module.scss:1-59)

```scss
.snackbar {
  align-items: start;
  box-shadow: $shadow-object-l;
  border: none;
  font-family: var(--font-stack-full);
  min-width: 21vw;
  max-width: min(42vw, 640px);
  animation: slideUpIn $motion-duration-extra-fast $motion-easing-easeinout 0s forwards;
  margin-bottom: $space-s;
  background-color: var(--white-color);
  border: var(--snackbar-border);
}
```

**Key Properties:**
- Shadow for elevation
- Responsive width constraints
- Slide-up animation on appear
- Bottom margin for stacking

### Responsive Behavior

```scss
// Small screens (< 768px)
@media (max-width: $small-screen-size) {
  max-width: 90vw;
}

// Medium screens (768px - 1024px)
@media (min-width: $small-screen-size) and (max-width: $medium-screen-size) {
  max-width: min(80vw, 640px);
}

// Large screens (> 1024px)
// Uses default: min(42vw, 640px)
```

### Layout Changes (snackbar.module.scss:34-50)

```scss
@media (min-width: $medium-screen-size) {
  .content-wrapper {
    flex-direction: row;    // Horizontal layout
    flex-wrap: nowrap;
    gap: $space-m;
  }
}

// Mobile: Vertical stacking
.content-wrapper {
  flex-direction: column;
  gap: $space-xs;
}
```

### Animation (snackbar.module.scss:96-107)

```scss
@keyframes slideUpIn {
  0% {
    opacity: 0;
    transform: scaleY(0.8);
    transform-origin: 0% 0%;
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
    transform-origin: 0% 0%;
  }
}
```

**Animation Properties:**
- Duration: `$motion-duration-extra-fast`
- Easing: `$motion-easing-easeinout`
- Effect: Scale Y + fade in

**Note:** No exit animation currently implemented

### Position Containers (snackbar.module.scss:61-94)

```scss
.snackbar-container {
  position: fixed;
  z-index: $z-index-600;  // Above most content
  width: fit-content;

  // Center positioning
  &.top-center, &.bottom-center {
    left: 50%;
    transform: translateX(-50%);
  }

  // Vertical positioning
  &.top-center, &.top-left, &.top-right {
    top: $space-m;
  }
  &.bottom-center, &.bottom-left, &.bottom-right {
    bottom: $space-m;
  }

  // Horizontal positioning
  &.top-left, &.bottom-left {
    left: $space-m;
  }
  &.top-right, &.bottom-right {
    right: $space-m;
  }
}
```

## Dependencies

### Internal Dependencies

1. **InfoBar** - Base component providing UI rendering
   - Handles icons, colors, borders by type
   - Provides close button functionality
   - Action button support

2. **Portal** - Renders outside normal React tree
   - Mounts to document.body by default
   - Prevents z-index conflicts
   - Allows positioning relative to viewport

3. **useMergedRefs** - Combines multiple refs
   - Merges parent ref with internal ref
   - Required for forwarding refs properly

4. **mergeClasses** - Conditional class name utility
   - Combines base styles with custom classes
   - Filters out falsy values

5. **Utilities**
   - `canUseDocElement()` - SSR safety check
   - `generateId()` - Unique ID generation

### External Dependencies

- React (hooks: useState, useEffect, useRef, forwardRef)
- TypeScript for type safety
- SCSS modules for styling

## Component Interaction

### With InfoBar

Snackbar delegates all rendering to InfoBar:

```typescript
<InfoBar
  role="status"
  ref={mergedRef}
  moveFocusToSnackbar={moveFocusToSnackbar}
  {...rest}
  classNames={snackbarClasses}
  contentClassNames={styles.content}
  contentWrapperClassNames={styles.contentWrapper}
  actionButtonClassNames={styles.actionButton}
/>
```

**Overrides:**
- `role` - Set dynamically based on closable state
- `classNames` - Snackbar-specific styles
- `moveFocusToSnackbar` - Focus management prop

### With Portal

All snackbars render through Portal:

```typescript
<Portal getContainer={() => parent}>
  {getSnackContainers()}
</Portal>
```

**Benefits:**
- Escape parent overflow/z-index constraints
- Consistent positioning relative to viewport
- No DOM hierarchy conflicts

## Testing Considerations

### Unit Testing

When testing components that use snackbars:

```typescript
import { snack } from './snack';

// Mock the serve function
jest.mock('./snack', () => ({
  snack: {
    serve: jest.fn(),
    servePositive: jest.fn(),
    // ... other methods
  }
}));

// Verify snackbar was called
expect(snack.servePositive).toHaveBeenCalledWith({
  content: 'Success!',
  duration: 3000
});
```

### Integration Testing

Render SnackbarContainer and test event flow:

```typescript
import { render } from '@testing-library/react';
import { SnackbarContainer } from './SnackbarContainer';
import { serve } from './snack';

test('displays snackbar when served', () => {
  const { getByText } = render(<SnackbarContainer />);

  serve({ content: 'Test message' });

  expect(getByText('Test message')).toBeInTheDocument();
});
```

### SSR Testing

Ensure `canUseDocElement()` guards work:

```typescript
// Should not crash in SSR environment
const result = serve({ content: 'Test' });
expect(result).toBeDefined();
```

## Strengths

1. **Clean API** - Event-driven design separates concerns
2. **Accessibility First** - Comprehensive focus management and ARIA support
3. **Flexible Positioning** - Six position options with smart stacking
4. **Type Safety** - Full TypeScript support
5. **Responsive** - Adapts to screen sizes gracefully
6. **Composition** - Built on InfoBar for consistency
7. **SSR Safe** - Guards for server-side rendering
8. **Developer Experience** - Simple API, programmatic control

## Considerations and Limitations

### Current Limitations

1. **No Max Stack Limit**
   - Unlimited snackbars can stack
   - Could overwhelm UI if many served quickly
   - Consider adding `maxSnacks` prop to SnackbarContainer

2. **No Exit Animation**
   - Only entrance animation (slideUpIn)
   - Dismissal is instant
   - Could enhance UX with exit transition

3. **Global State Outside React**
   - `elementToFocus` and `activeSnacksCount` are module-level
   - Not React-managed state
   - Works but less idiomatic

4. **Single Container Instance**
   - Multiple SnackbarContainers would conflict
   - Event system is global
   - Enforce single instance in documentation

5. **No Duplicate Prevention**
   - Same content can create multiple snackbars
   - Consider deduplication logic if needed
   - Can use custom IDs to manage externally

### Performance Considerations

1. **CustomEvents**
   - Global event dispatching/listening
   - Minimal overhead but worth noting
   - Alternative: Context API (would require wrapper)

2. **Portal Rendering**
   - All snackbars render outside React tree
   - Slightly less efficient than in-tree
   - Trade-off for positioning flexibility

3. **Ref Array Management**
   - Growing/shrinking array on each add/remove
   - Could use Map for O(1) lookups
   - Current implementation sufficient for typical use

### Best Practices

1. **Container Setup**
   ```typescript
   // Add once at app root
   <SnackbarContainer />
   ```

2. **Duration Guidelines**
   - Short messages: 3000ms (default)
   - Longer messages: 5000-7000ms
   - Important info: Use `closable: true`

3. **Content Length**
   - Keep messages concise
   - Use action buttons for details
   - Consider max-width constraints

4. **Type Selection**
   - Positive: Success confirmations
   - Warning: Reversible actions, caution
   - Disruptive: Errors, failures
   - Neutral: General information

5. **Focus Management**
   ```typescript
   // For forms, restore to submit button
   snack.serve({
     content: 'Saved',
     lastFocusableElement: submitButton
   });
   ```

6. **Avoid Spam**
   ```typescript
   // Bad: Serving in rapid loop
   items.forEach(item => {
     snack.serve({ content: `Processing ${item}` });
   });

   // Good: Single snackbar for batch operation
   snack.serve({ content: `Processing ${items.length} items` });
   ```

## Future Enhancement Ideas

1. **Exit Animations**
   - Add slideOut animation on dismiss
   - Coordinate with InfoBar animations

2. **Queuing System**
   - Max visible snacks limit
   - Queue excess snackbars
   - Auto-serve when space available

3. **Duplicate Prevention**
   - Option to dedupe by content
   - Replace existing vs queue
   - Extend duration instead of duplicate

4. **Positioning Enhancements**
   - Custom offsets
   - Viewport collision detection
   - Mobile-specific positioning

5. **Progress Indicators**
   - Show remaining duration
   - Progress bar option
   - Pause on hover

6. **Persistence**
   - LocalStorage integration
   - Show dismissed snacks on reload
   - History log

7. **Theming**
   - Dark mode support
   - Custom color schemes
   - Per-snack theme override

8. **Sound Support**
   - Optional audio cues
   - Different sounds per type
   - Accessibility preference respect

## Related Components

- **InfoBar** - Base UI component
- **Portal** - Rendering utility
- **Toast** - Similar pattern (if exists)
- **Alert** - Static notification alternative
- **Banner** - Page-level messaging

## References

- InfoBar Component: `src/components/InfoBar/`
- Portal Component: `src/components/Portal/`
- Utilities: `src/shared/utilities/`
- Hooks: `src/hooks/`

## Version History

- Initial implementation: Event-driven snackbar system
- Focus management: Auto-focus and restoration
- Positioning: Six-position support with stacking
- Accessibility: ARIA roles and keyboard navigation
