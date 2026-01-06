import React, { useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tabs, Tab, TabIconAlign, TabSize, TabVariant } from './';
import { IconName } from '../Icon';

export default {
  title: 'Tabs',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Tabs</h1>
              <p>
                Tabs are used for navigating frequently accessed, distinct
                content categories. Tabs allow for navigation between two or
                more content views and relies on text headers to articulate the
                different sections of content.
              </p>
              <ul>
                <li>Tapping on a item navigates to that section content.</li>
                <li>
                  Tabs use a combination of icons and text or just icons to
                  articulate section content.
                </li>
              </ul>
            </section>
            <section>
              <Stories includePrimary title="" />
            </section>
          </article>
        </main>
      ),
    },
  },
  argTypes: {
    alignIcon: {
      options: [TabIconAlign.Start, TabIconAlign.End],
      control: { type: 'inline-radio' },
    },
    size: {
      options: [TabSize.Large, TabSize.Medium, TabSize.Small],
      control: { type: 'radio' },
    },
    theme: {
      options: [
        'red',
        'redOrange',
        'orange',
        'yellow',
        'yellowGreen',
        'green',
        'blueGreen',
        'blue',
        'blueViolet',
        'violet',
        'violetRed',
        'grey',
        'aiAgent',
      ],
      control: 'select',
    },
    variant: {
      options: [TabVariant.default, TabVariant.pill],
      control: { type: 'inline-radio' },
    },
  },
} as ComponentMeta<typeof Tabs>;

const tabs = [1, 2, 3, 4].map((i) => ({
  value: `tab${i}`,
  label: `Tab ${i}`,
  ariaLabel: `Tab ${i}`,
  ...(i === 4 ? { disabled: true } : {}),
}));

const badgeTabs = [1, 2, 3, 4].map((i) => ({
  value: `tab${i}`,
  label: `Tab ${i}`,
  ariaLabel: `Tab ${i}`,
  badgeContent: i,
  ...(i === 4 ? { disabled: true } : {}),
}));

const iconTabs = [1, 2, 3, 4].map((i) => ({
  value: `tab${i}`,
  icon: IconName.mdiCardsHeart,
  ariaLabel: `Tab ${i}`,
  ...(i === 4 ? { disabled: true } : {}),
}));

const iconLabelTabs = [1, 2, 3, 4].map((i) => ({
  value: `tab${i}`,
  icon: IconName.mdiCardsHeart,
  label: `Tab ${i}`,
  ariaLabel: `Tab ${i}`,
  ...(i === 4 ? { disabled: true } : {}),
}));

const dropdownTabs = [
  {
    value: 'tab1',
    label: 'Tab 1',
    ariaLabel: 'Tab 1',
  },
  {
    value: 'tab2',
    label: 'Tab 2',
    ariaLabel: 'Tab 2',
    dropdownItems: [
      { value: 'tab2-1', label: 'Sub Tab 2-1', ariaLabel: 'Sub Tab 2-1' },
      { value: 'tab2-2', label: 'Sub Tab 2-2', ariaLabel: 'Sub Tab 2-2' },
      { value: 'tab2-3', label: 'Sub Tab 2-3', ariaLabel: 'Sub Tab 2-3', disabled: true },
    ],
  },
  {
    value: 'tab3',
    label: 'Tab 3',
    ariaLabel: 'Tab 3',
  },
  {
    value: 'tab4',
    label: 'Tab 4',
    ariaLabel: 'Tab 4',
  },
];

const scrollableTabs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => ({
  value: `tab${i}`,
  label: `Tab ${i}`,
  ariaLabel: `Tab ${i}`,
  ...(i === 4 ? { disabled: true } : {}),
}));

const defaultArrowNavTabs = [1, 2, 3, 4].map((i) => ({
  value: `tab${i}`,
  label: `Tab ${i}`,
  ariaLabel: `Tab ${i}`,
  id: `tab-${i}`,
  ...(i === 4 ? { disabled: true } : {}),
}));

const Tabs_Story: ComponentStory<typeof Tabs> = (args) => {
  const [activeTabs, setActiveTabs] = useState({ defaultTab: 'tab1' });
  return (
    <div
      style={{
        background: args.colorInvert
          ? 'var(--blueviolet-gradient)'
          : 'transparent',
        height: 90,
        padding: args.colorInvert ? 20 : 0,
        width: args.colorInvert ? 'calc(100% - 40px)' : '100%',
      }}
    >
      <Tabs
        {...args}
        onChange={(tab) => setActiveTabs({ ...activeTabs, defaultTab: tab })}
        value={activeTabs.defaultTab}
      />
    </div>
  );
};

export const Default = Tabs_Story.bind({});
export const Default_Underlined = Tabs_Story.bind({});
export const Default_Loader = Tabs_Story.bind({});
export const Default_Arrow_Nav = Tabs_Story.bind({});
export const Small = Tabs_Story.bind({});
export const With_Badge = Tabs_Story.bind({});
export const Icon = Tabs_Story.bind({});
export const Icon_Label = Tabs_Story.bind({});
export const Scrollable = Tabs_Story.bind({});
export const Pill_Default = Tabs_Story.bind({});
export const Pill_With_Badge = Tabs_Story.bind({});
export const Pill_Icon = Tabs_Story.bind({});
export const Pill_Icon_Label = Tabs_Story.bind({});
export const With_Dropdown = Tabs_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Default',
  'Default_Underlined',
  'Default_Loader',
  'Default_Arrow_Nav',
  'Small',
  'With_Badge',
  'Icon',
  'Icon_Label',
  'Scrollable',
  'Pill_Default',
  'Pill_With_Badge',
  'Pill_Icon',
  'Pill_Icon_Label',
  'With_Dropdown',
];

const tabsArgs: Object = {
  alignIcon: TabIconAlign.Start,
  configContextProps: {
    noThemeContext: false,
  },
  theme: '',
  themeContainerId: 'my-tabs-theme-container',
  scrollable: false,
  variant: TabVariant.default,
  size: TabSize.Medium,
  underlined: false,
  enableArrowNav: true,
  children: tabs.map((tab) => <Tab key={tab.value} {...tab} />),
  style: {},
};

Default.args = {
  ...tabsArgs,
};

Default_Underlined.args = {
  ...tabsArgs,
  underlined: true,
};

Default_Loader.args = {
  ...tabsArgs,
  children: badgeTabs.map((tab, index) => (
    <Tab key={tab.value} {...tab} loading={index % 2 === 0} />
  )),
};

Default_Arrow_Nav.args = {
  ...tabsArgs,
  enableArrowNav: true,
  children: defaultArrowNavTabs.map((tab) => <Tab key={tab.value} {...tab} />),
};

Small.args = {
  ...tabsArgs,
  size: TabSize.Small,
};

With_Badge.args = {
  ...tabsArgs,
  children: badgeTabs.map((tab) => <Tab key={tab.value} {...tab} />),
};

Icon.args = {
  ...tabsArgs,
  children: iconTabs.map((tab) => <Tab key={tab.value} {...tab} />),
};

Icon_Label.args = {
  ...tabsArgs,
  children: iconLabelTabs.map((tab) => <Tab key={tab.value} {...tab} />),
};

Scrollable.args = {
  ...tabsArgs,
  scrollable: true,
  style: {
    maxWidth: '400px',
  },
  children: scrollableTabs.map((tab) => <Tab key={tab.value} {...tab} />),
};

Pill_Default.args = {
  ...tabsArgs,
  colorInvert: false,
  variant: TabVariant.pill,
};

Pill_With_Badge.args = {
  ...tabsArgs,
  colorInvert: false,
  variant: TabVariant.pill,
  children: badgeTabs.map((tab) => <Tab key={tab.value} {...tab} />),
};

Pill_Icon.args = {
  ...tabsArgs,
  colorInvert: false,
  variant: TabVariant.pill,
  children: iconTabs.map((tab) => <Tab key={tab.value} {...tab} />),
};

Pill_Icon_Label.args = {
  ...tabsArgs,
  colorInvert: false,
  variant: TabVariant.pill,
  children: iconLabelTabs.map((tab) => <Tab key={tab.value} {...tab} />),
};

With_Dropdown.args = {
  ...tabsArgs,
  children: dropdownTabs.map((tab) => <Tab key={tab.value} {...tab} />),
};
