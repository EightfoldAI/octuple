# DateTimePicker Component Analysis

## Overview

The DateTimePicker is a comprehensive date and time selection component suite in Octuple's design system. It consists of three main components: **DatePicker**, **TimePicker**, and **RangePicker**, all built on a shared internal architecture.

## Architecture

### Core Structure

```
DateTimePicker/
├── DatePicker/          # Date selection component
│   ├── Generate/        # Component generation utilities
│   ├── Locale/         # Internationalization (40+ locales)
│   ├── Tests/          # Unit tests
│   └── Styles/         # SCSS mixins
├── TimePicker/         # Time selection component
│   └── Locale/         # Time-specific locale files
└── Internal/           # Shared core implementation
    ├── Generate/       # Date generation utilities
    ├── Hooks/          # Custom React hooks
    ├── Partials/       # UI component partials
    ├── Tests/          # Internal tests
    └── Utils/          # Utility functions
```

### Key Files

- **`DatePicker/index.tsx`** - Main DatePicker export using dayjs
- **`TimePicker/TimePicker.tsx`** - TimePicker implementation
- **`Internal/OcPicker.tsx`** - Core picker implementation (565 lines)
- **`Internal/OcPicker.types.ts`** - Comprehensive TypeScript definitions (1172 lines)
- **`Internal/OcPickerPartial.tsx`** - Partial UI renderer
- **`Internal/OcPickerTrigger.tsx`** - Dropdown trigger component

## Components

### 1. DatePicker

**Purpose**: Date selection with optional time functionality
**Key Features**:
- Multiple picker modes: `date`, `week`, `month`, `quarter`, `year`
- Optional time selection with `showTime` prop
- Range selection support via `RangePicker`
- Extensive locale support (40+ languages)
- Accessibility with arrow key navigation

**Export Structure**:
```typescript
export type DatePickerProps = OcPickerProps<Dayjs>;
export type MonthPickerProps = Omit<OcPickerDateProps<Dayjs>, 'picker'>;
export type WeekPickerProps = Omit<OcPickerDateProps<Dayjs>, 'picker'>;
export type RangePickerProps = BaseRangePickerProps<Dayjs>;
```

### 2. TimePicker

**Purpose**: Time-only selection
**Implementation**: Wrapper around DatePicker with `picker="time"`
**Key Features**:
- 12/24 hour format support
- Custom addon rendering
- Range time selection

### 3. Internal Core (OcPicker)

**Purpose**: Shared foundation for all picker components
**Key Features**:
- Generic date type support (`<DateType>`)
- Focus management with `FocusTrap`
- Keyboard navigation
- State management with `useMergedState`
- Text input parsing and formatting
- Custom hooks for value mapping and hover states

## Key Hooks

Located in `Internal/Hooks/`:

1. **`usePickerInput`** - Manages input focus, typing, and keyboard interactions
2. **`useTextValueMapping`** - Maps between text input and date values
3. **`useValueTexts`** - Converts date values to display text
4. **`useHoverValue`** - Handles hover state for date previews
5. **`useRangeViewDates`** - Manages date ranges for range picker

## Partials System

Located in `Internal/Partials/`:

- **`DatePartial/`** - Calendar date selection UI
- **`TimePartial/`** - Time selection spinners
- **`MonthPartial/`** - Month selection grid
- **`YearPartial/`** - Year selection grid
- **`QuarterPartial/`** - Quarter selection
- **`DecadePartial/`** - Decade selection
- **`WeekPartial/`** - Week selection
- **`DatetimePartial/`** - Combined date/time

Each partial follows a consistent structure:
- Header component with navigation
- Body component with selection grid
- Types definition file

## Styling

### SCSS Architecture
- **`ocpicker.module.scss`** - Main styles with CSS custom properties
- **`datepicker.module.scss`** - DatePicker specific styles
- **Responsive design** with size variants: `small`, `medium`, `large`, `flex`
- **Shape variants**: `rectangle`, `pill`, `underline`

### CSS Classes Pattern
```scss
.picker {
  &-body { /* Main container */ }
  &-content { /* Calendar grid */ }
  &-cell { /* Individual date cells */ }
  &-header { /* Navigation header */ }
  &-input { /* Text input */ }
  &-focused { /* Focus states */ }
  &-disabled { /* Disabled states */ }
}
```

## Internationalization

### Locale Structure
Each locale file (40+ supported) defines:
```typescript
interface Locale {
  locale: string;
  monthBeforeYear?: boolean;
  yearFormat: string;
  monthFormat?: string;
  today: string;
  now: string;
  ok: string;
  clear: string;
  // ... extensive locale strings
}
```

**Supported Languages**: Arabic, Bulgarian, Chinese (Simplified/Traditional), Czech, Danish, Dutch, English (GB/US), Finnish, French (BE/CA/FR), German, Greek, Hebrew, Croatian, Haitian, Hungarian, Italian, Japanese, Korean, Malay, Norwegian, Polish, Portuguese (BR/PT), Russian, Slovak, Swedish, Thai, Turkish, Ukrainian, Spanish (DO/ES/MX)

## TypeScript Architecture

### Core Types

1. **`OcPickerProps<DateType>`** - Main picker props interface
2. **`OcRangePickerProps<DateType>`** - Range picker props
3. **`PartialMode`** - Picker view modes (`'date'`, `'month'`, `'year'`, etc.)
4. **`GenerateConfig<DateType>`** - Date library abstraction
5. **`Locale`** - Internationalization interface

### Prop Categories

- **Basic Props**: `value`, `defaultValue`, `onChange`, `onSelect`
- **UI Props**: `size`, `shape`, `bordered`, `disabled`, `readonly`
- **Behavior Props**: `allowClear`, `autoFocus`, `changeOnBlur`, `trapFocus`
- **Dropdown Props**: `open`, `dropdownClassNames`, `popupPlacement`
- **Time Props**: `showTime`, `use12Hours`, `disabledTime`
- **Accessibility Props**: `announceArrowKeyNavigation`, various aria labels

## Testing Strategy

### Test Structure
- **Unit Tests**: Component behavior, prop handling, interactions
- **Snapshot Tests**: UI regression prevention
- **Integration Tests**: Picker modes, range selection, time functionality

### Test Files
- `DatePicker/Tests/` - DatePicker specific tests
- `Internal/Tests/` - Core functionality tests
- **Coverage Areas**: Component rendering, user interactions, edge cases, accessibility

## Accessibility Features

1. **Keyboard Navigation**:
   - Arrow keys for date navigation
   - Page Up/Down for month navigation
   - Ctrl+Arrow for year navigation
   - Enter/Space for selection
   - Escape to close

2. **ARIA Support**:
   - `role="combobox"` on input
   - `aria-expanded` for dropdown state
   - `aria-haspopup="dialog"` for popup
   - Screen reader announcements for navigation

3. **Focus Management**:
   - `FocusTrap` component for modal behavior
   - Proper focus return on close
   - Visual focus indicators

## Advanced Features

### 1. Range Selection
- **Dual input fields** for start/end dates
- **Visual range highlighting** in calendar
- **Preset ranges** for quick selection
- **Flexible validation** with `allowEmpty` options

### 2. Custom Rendering
- **`dateRender`** - Custom date cell rendering
- **`monthCellRender`** - Custom month cell rendering
- **`renderExtraFooter`** - Custom footer content
- **`inputRender`** - Custom input rendering

### 3. Validation & Constraints
- **`disabledDate`** function for date constraints
- **`disabledTime`** function for time constraints
- **Custom validation** with status indicators

## Performance Optimizations

1. **Memoization**: Extensive use of `useMemo` and `useCallback`
2. **Lazy Loading**: Partial components loaded on demand
3. **Virtual Scrolling**: For large date ranges
4. **Efficient Re-renders**: Smart state management with `useMergedState`

## Usage Patterns

### Basic DatePicker
```typescript
<DatePicker
  value={date}
  onChange={(date, dateString) => setDate(date)}
  placeholder="Select date"
/>
```

### DatePicker with Time
```typescript
<DatePicker
  showTime
  value={datetime}
  onChange={(datetime, datetimeString) => setDateTime(datetime)}
  format="YYYY-MM-DD HH:mm:ss"
/>
```

### Range Picker
```typescript
<DatePicker.RangePicker
  value={dateRange}
  onChange={(dates, dateStrings) => setDateRange(dates)}
  placeholder={['Start date', 'End date']}
/>
```

### TimePicker
```typescript
<TimePicker
  value={time}
  onChange={(time, timeString) => setTime(time)}
  use12Hours
  format="h:mm:ss A"
/>
```

## Development Guidelines

### Adding New Features
1. **Extend types** in `OcPicker.types.ts`
2. **Implement in core** `OcPicker.tsx` if shared
3. **Add specific logic** in individual picker components
4. **Update partials** if UI changes needed
5. **Add tests** and **update stories**

### Styling Guidelines
1. **Use CSS custom properties** for theming
2. **Follow size/shape patterns** established
3. **Maintain responsive behavior**
4. **Test across all themes**

### Locale Support
1. **Add locale file** in respective `Locale/` directory
2. **Follow existing patterns** for date/time formatting
3. **Test with RTL languages** if applicable
4. **Update type exports**

## Common Issues & Solutions

### 1. Date Library Integration
- **Issue**: Different date libraries (moment, dayjs, date-fns)
- **Solution**: `GenerateConfig` abstraction layer

### 2. Timezone Handling
- **Issue**: Timezone conversion and display
- **Solution**: Use library-specific timezone utilities

### 3. Performance with Large Ranges
- **Issue**: Slow rendering with many selectable dates
- **Solution**: Virtual scrolling and lazy loading

### 4. Mobile Responsiveness
- **Issue**: Touch interactions and small screens
- **Solution**: `inputReadOnly` prop and responsive sizing

## Component Dependencies

### Internal Dependencies
- `ConfigProvider` - Theme and configuration context
- `Button` - Action buttons (OK, Today, Now)
- `Icon` - Navigation and status icons
- `FocusTrap` - Focus management
- `Align` - Dropdown positioning

### External Dependencies
- `dayjs` - Default date library (can be swapped)
- `@floating-ui/react` - Dropdown positioning
- Various utility libraries for date manipulation

This DateTimePicker component suite represents a mature, feature-rich solution for date and time selection with extensive customization options, robust accessibility support, and comprehensive internationalization capabilities.