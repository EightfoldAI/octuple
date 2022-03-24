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
import { classNames } from '../../shared/utilities';

import styles from 'component.module.scss';

export const Component: FC<ComponentProps> = ({
    className,
    style,
    // How to set defaults for props
    type = ComponentType.base,
    ...
}) => {
    // Combining class names can be done using the classNames utility
    const componentClasses: string = classNames([
        styles.componentWrapper,
        className,
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

-   Create a file called `/src/components/Component/component.module.scss`
-   Use camel case for the class names, they are easier to reference in the component

For eg: `styles.componentWrapper` as apposed to `styles['component-wrapper']`

```scss
.componentWrapper {

  &.active {
    ...
  }

  .componentChild {
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
     * Custom class name
     * @default null
     */
    className?: string;
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

-   Export all the components and typing created

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
