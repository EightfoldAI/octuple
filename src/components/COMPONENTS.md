# Component Guidelines

---

## Directory structure

For a basic component

```
├── Component
│   ├── component.module.scss
│   ├── Component.tsx
│   ├── Component.types.ts
│   ├── Component.stories.tsx
│   ├── Component.test.tsx
│   └── index.ts
```

For a component suite

```
├── Component
│   ├── BaseComponent
│   │   ├── BaseComponent.tsx
│   │   ├── baseComponent.module.scss
│   │   └── BaseComponent.test.tsx
│   ├── SecondaryComponent
│   │   ├── SecondaryComponent.tsx
│   │   ├── secondaryComponent.module.scss
│   │   └── SecondaryComponent.test.tsx
│   ├── Component.types.ts
│   ├── Component.stories.tsx
│   └── index.ts
```

## Component definition

Create a file called `/src/components/Component/Component.tsx`

```tsx
import React, { FC } from 'react';
import { ComponentProps, ComponentType } from './Component.types';
import { mergeClasses } from '../../shared/utilities';

import styles from 'component.module.scss';

export const Component: FC<ComponentProps> = ({
    classNames,
    style,
    // How to set defaults for props
    type = ComponentType.base,
    ...
}) => {
    // Combining class names can be done using the mergeClasses utility
    const componentClasses: string = mergeClasses([
        styles.componentWrapper,
        classNames,
        // Conditional classes can also be handled as follows
        { [styles.active]: type === ComponentType.base }
    ]);
    return (
        <div className={componentClasses} style={style}>
            <div className={styles.componentChild}>
                ...
            </div>
        </div>
    );
};
```

## Styling

Defining a scss module

- Create a file called `/src/components/Component/component.module.scss`
- Use kebab case for the class names, they can be referenced in the component using camel case.

For eg: `styles.componentWrapper` as apposed to `styles['component-wrapper']`

```scss
.component-wrapper {

  &.active {
    ...
  }

  .component-child {
    ...
  }
}
```

## Defining types

Create a file called `/src/components/Component/Component.types.ts`

```ts
import React from 'react';

// Use enums of property with fixed set of values
export enum ComponentType {
    base = 'base',
    secondary = 'secondary'
}

export interface ComponentProps {
    /**
     * Child of the component
     */
    children: React.ReactNode;
    /**
     * Custom class names
     * @default null
     */
    classNames?: string;
    /**
     * Style of the component
     * @default null
     */
    style?: React.CSSProperties;
    /**
     * Type of the component
     * @default ComponentType.base
     */
    type?: ComponentType;
    ...
}
```

## Exporting component

Create a file called `/src/components/Component/index.ts`

- Export all the components and typing created

```ts
export * from './Component.types';
export * from './Component';
export * from './BaseComponent/BaseComponent';
export * from './SecondaryComponent/SecondaryComponent';
...
```

## Storybook

Create a file called `/src/components/Component/Component.stories.tsx`

```tsx
import React from 'react';
import { Component, SecondaryComponent } from './';

export default {
  title: 'Component',
  component: Component,
};

export const Primary = () => (
  <>
    <p>Primary</p>
    <Component />
  </>
);

export const Secondary = () => (
  <>
    <p>Secondary</p>
    <SecondaryComponent />
  </>
);
```

## Unit testing

Create a file called `/src/components/Component/Component.test.tsx`

```tsx
import React, { useState } from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { ComponentType } from './Component.types';
import { Component } from './';
import { act } from 'react-dom/test-utils';
import { fireEvent, getByTestId, render, waitFor } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

// Some APIs require mocks.
let matchMedia: any;

class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}

window.ResizeObserver = ResizeObserver;

describe('Component', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Component renders', () => {
    const { container } = render(
      <Component />
    );
    expect(() => container).not.toThrowError();
    expect(container).toMatchSnapshot();
  });

  test('Component type', () => {
    const { container } = render(
      <Component
          data-testid="component-1"
          type={ComponentType.base}
        />
    );
    const componentTestElement: HTMLElement = getByTestId(
      container,
      'component-1'
    );
    // Validate an appropriate pointer in memory unique to the type considered.
    expect(componentTestElement.classList.contains('.base')).toBe(true);
  });

  test('Simulate synchronous event on Component', () => {
    const Component = (): JSX.Element => {
      const [value, setValue] = useState<number>(0);
      return (
        <Component
          data-testid="component-1"
          onClick={() => {
            setValue(1);
          }}
          text={`The value is ${value}`}
          type={ComponentType.base}
        />
      );
    };
    const { container } = render(<Component />);
    const componentTestElement: HTMLElement = getByTestId(
      container,
      'component-1'
    );
    expect(componentTestElement.innerHTML).toContain('The value is 0');
    act(() => {
      fireEvent.click(componentTestElement);
    });
    expect(componentTestElement.innerHTML).toContain('The value is 1');
  });

  test('Simulate asynchronous event on Component', async () => {
    const Component = (): JSX.Element => {
      const [value, setValue] = useState<number>(0);
      return (
        <Component
          data-testid="component-1"
          onClick={() => {
            setValue(1);
          }}
          text={`The value is ${value}`}
          type={ComponentType.base}
        />
      );
    };
    const { container } = render(<Component />);
    const componentTestElement: HTMLElement = getByTestId(
      container,
      'component-1'
    );
    expect(componentTestElement.innerHTML).toContain('The value is 0');
    act(() => {
      fireEvent.click(componentTestElement);
    });
    await waitFor(() =>
      expect(componentTestElement.innerHTML).toContain('The value is 1');
    );
  });
});
```

## License

MIT (c) 2024 Eightfold
