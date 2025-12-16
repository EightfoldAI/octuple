import React, { useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Stat, StatThemeName, Tabs, TabSize, TabVariant } from './';
import type { StatValidationStatus } from './';
import { ButtonShape, ButtonVariant } from '../Button';
import { IconName } from '../Icon';

export default {
  title: 'Stat Tabs',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Stat Tabs</h1>
              <p>
                Stat Tabs are used for navigating frequently accessed, distinct
                content categories. Stat Tabs allow for navigation between two
                or more content views and rely on text headers to articulate the
                different sections of content.
              </p>
              <ul>
                <li>Tapping on a item navigates to that section content.</li>
                <li>
                  Stat Tabs use a combination of icons and text to articulate
                  section content.
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
    bordered: {
      control: { type: 'boolean' },
    },
    divider: {
      control: { type: 'boolean' },
    },
    readOnly: {
      control: { type: 'boolean' },
    },
    size: {
      options: [TabSize.Medium, TabSize.Small, TabSize.XSmall],
      control: { type: 'radio' },
    },
    statgrouptheme: {
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
      ],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Tabs>;

const themes: StatThemeName[] = [
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
];

const statTabs = [1, 2, 3, 4].map((i) => ({
  ariaLabel: `Label ${i}, 2 out of 5%`,
  icon: IconName.mdiAccountAlert,
  label: `Label ${i}`,
  ratioA: 2,
  ratioB: '(5%)',
  status: i === 3 ? ('success' as StatValidationStatus) : '',
  value: `tab${i}`,
  interactive: false,
  ...(i === 4 ? { disabled: true } : {}),
}));

const statTabsThemed = [1, 2, 3, 4].map((i) => ({
  ariaLabel: `Label ${i}, 2 out of 5%`,
  icon: IconName.mdiAccountAlert,
  label: `Label ${i}`,
  ratioA: 2,
  ratioB: '(5%)',
  status: i === 3 ? ('success' as StatValidationStatus) : '',
  value: `tab${i}`,
  ...(i === 2 ? { theme: themes[8] } : {}),
  ...(i === 4 ? { disabled: true } : {}),
}));

const statTabsWithButtons = [1, 2, 3, 4].map((i) => ({
  ariaLabel: `Label ${i}, 2 out of 5%`,
  buttonProps: {
    ariaLabel: 'Send reminder',
    iconProps: { path: IconName.mdiBellOutline },
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      console.log('clicked');
    },
    shape: ButtonShape.Round,
    variant: ButtonVariant.Neutral,
  },
  icon: IconName.mdiAccountAlert,
  label: `Label ${i}`,
  ratioA: 2,
  ratioB: '(5%)',
  status: i === 3 ? ('success' as StatValidationStatus) : '',
  value: `tab${i}`,
  ...(i === 4 ? { disabled: true } : {}),
}));

const Stat_Story: ComponentStory<typeof Tabs> = (args) => {
  const [activeTabs, setActiveTabs] = useState({ defaultTab: 'tab1' });
  return (
    <Tabs
      {...args}
      children={statTabs.map((tab) => (
        <Stat key={tab.value} size={args.size} {...tab} />
      ))}
      onChange={(tab) => setActiveTabs({ ...activeTabs, defaultTab: tab })}
      value={activeTabs.defaultTab}
    />
  );
};

const Stat_Themed_Story: ComponentStory<typeof Tabs> = (args) => {
  const [activeTabs, setActiveTabs] = useState({ defaultTab: 'tab1' });
  return (
    <Tabs
      {...args}
      children={statTabsThemed.map((tab) => (
        <Stat key={tab.value} size={args.size} {...tab} />
      ))}
      onChange={(tab) => setActiveTabs({ ...activeTabs, defaultTab: tab })}
      value={activeTabs.defaultTab}
    />
  );
};

const Stat_With_Button_Story: ComponentStory<typeof Tabs> = (args) => {
  const [activeTabs, setActiveTabs] = useState({ defaultTab: 'tab1' });
  return (
    <Tabs
      {...args}
      children={statTabsWithButtons.map((tab) => (
        <Stat key={tab.value} size={args.size} {...tab} />
      ))}
      onChange={(tab) => setActiveTabs({ ...activeTabs, defaultTab: tab })}
      value={activeTabs.defaultTab}
    />
  );
};

export const Stat_Medium = Stat_Story.bind({});
export const Stat_Small = Stat_Story.bind({});
export const Stat_XSmall = Stat_Story.bind({});
export const Stat_With_Button = Stat_With_Button_Story.bind({});
export const Stat_Vertical = Stat_Story.bind({});
export const Stat_Group_Read_Only = Stat_Story.bind({});
export const Stat_Group_Theme = Stat_Story.bind({});
export const Stat_Item_Theme_Override = Stat_Themed_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Stat_Medium',
  'Stat_Small',
  'Stat_XSmall',
  'Stat_With_Button',
  'Stat_Vertical',
  'Stat_Group_Read_Only',
  'Stat_Group_Theme',
  'Stat_Item_Theme_Override',
];

const tabsArgs: Object = {
  bordered: true,
  buttonProps: null,
  divider: true,
  variant: TabVariant.stat,
  readOnly: false,
  size: TabSize.Medium,
  style: {},
  interactive: false,
};

Stat_Medium.args = {
  ...tabsArgs,
  lineClamp: 2,
  maxWidth: 240,
};

Stat_Small.args = {
  ...tabsArgs,
  lineClamp: 2,
  maxWidth: 240,
  size: TabSize.Small,
};

Stat_XSmall.args = {
  ...tabsArgs,
  lineClamp: 1,
  maxWidth: 240,
  size: TabSize.XSmall,
};

Stat_With_Button.args = {
  ...tabsArgs,
  lineClamp: 1,
};

Stat_Vertical.args = {
  ...tabsArgs,
  direction: 'vertical',
  fullWidth: false,
  lineClamp: 2,
};

Stat_Group_Read_Only.args = {
  ...tabsArgs,
  statgrouptheme: themes[6],
  readOnly: true,
};

Stat_Group_Theme.args = {
  ...tabsArgs,
  statgrouptheme: themes[6],
};

Stat_Item_Theme_Override.args = {
  ...tabsArgs,
  statgrouptheme: themes[6],
};
