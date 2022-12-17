# Component Guidelines

---

## Directory structure

For a basic component

```
├── Component
│   ├── component.module.scss
│   ├── Component.tsx
│   ├── Component.types.ts
│   ├── Component.stories.ts
│   ├── Component.test.js
│   └── index.ts
```

For a component suite

```
├── Component
│   ├── BaseComponent
│   │   ├── BaseComponent.tsx
│   │   ├── baseComponent.module.scss
│   │   └── BaseComponent.test.js
│   ├── SecondaryComponent
│   │   ├── SecondaryComponent.tsx
│   │   ├── secondaryComponent.module.scss
│   │   └── SecondaryComponent.test.js
│   ├── Component.types.ts
│   ├── Component.stories.ts
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

Create a file called `/src/components/Component/Component.stories.ts`

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

## Unit testing [WIP]

Create a file called `/src/components/Component/Component.test.js`

TBD
