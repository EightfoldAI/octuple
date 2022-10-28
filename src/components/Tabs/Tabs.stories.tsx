import React, { useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { OcThemeNames } from '../ConfigProvider';
import { Stat, Tabs, Tab, TabSize, TabVariant } from './';
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
                                Tabs are used for navigating frequently
                                accessed, distinct content categories. Tabs
                                allow for navigation between two or more content
                                views and relies on text headers to articulate
                                the different sections of content.
                            </p>
                            <ul>
                                <li>
                                    Tapping on a item navigates to that section
                                    content.
                                </li>
                                <li>
                                    Tabs use a combination of icons and text or
                                    just icons to articulate section content.
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
        variant: {
            options: [
                TabVariant.default,
                TabVariant.small,
                TabVariant.pill,
                TabVariant.stat,
            ],
            control: { type: 'inline-radio' },
        },
        bordered: {
            control: { type: 'boolean' },
        },
        divider: {
            control: { type: 'boolean' },
        },
        size: {
            options: [TabSize.Medium, TabSize.Small],
            control: { type: 'inline-radio' },
        },
        groupTheme: {
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

const themes: OcThemeNames[] = [
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

const scrollableTabs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => ({
    value: `tab${i}`,
    label: `Tab ${i}`,
    ariaLabel: `Tab ${i}`,
    ...(i === 4 ? { disabled: true } : {}),
}));

const statTabs = [1, 2, 3, 4].map((i) => ({
    ariaLabel: `Label ${i}, 2 out of 5%`,
    icon: IconName.mdiAccountAlert,
    label: `Label ${i}`,
    ratioA: 2,
    ratioB: '(5%)',
    value: `tab${i}`,
    ...(i === 4 ? { disabled: true } : {}),
}));

const statTabsThemed = [1, 2, 3, 4].map((i) => ({
    ariaLabel: `Label ${i}, 2 out of 5%`,
    icon: IconName.mdiAccountAlert,
    label: `Label ${i}`,
    ratioA: 2,
    ratioB: '(5%)',
    value: `tab${i}`,
    ...(i === 2 ? { theme: themes[8] } : {}),
    ...(i === 4 ? { disabled: true } : {}),
}));

const Default_Story: ComponentStory<typeof Tabs> = (args) => {
    const [activeTabs, setActiveTabs] = useState({ defaultTab: 'tab1' });
    return (
        <Tabs
            {...args}
            onChange={(tab) =>
                setActiveTabs({ ...activeTabs, defaultTab: tab })
            }
            value={activeTabs.defaultTab}
        />
    );
};

export const Default = Default_Story.bind({});

export const DefaultUnderlined = Default_Story.bind({});

const Default_Loading_Story: ComponentStory<typeof Tabs> = (args) => {
    const [activeTabs, setActiveTabs] = useState({ defaultTab: 'tab1' });
    return (
        <Tabs
            {...args}
            onChange={(tab) =>
                setActiveTabs({ ...activeTabs, defaultTab: tab })
            }
            value={activeTabs.defaultTab}
        />
    );
};

export const DefaultLoader = Default_Loading_Story.bind({});

const Small_Story: ComponentStory<typeof Tabs> = (args) => {
    const [activeTabs, setActiveTabs] = useState({ defaultTab: 'tab1' });
    return (
        <Tabs
            {...args}
            onChange={(tab) =>
                setActiveTabs({ ...activeTabs, defaultTab: tab })
            }
            value={activeTabs.defaultTab}
        />
    );
};

export const Small = Small_Story.bind({});

const With_Badge_Story: ComponentStory<typeof Tabs> = (args) => {
    const [activeTabs, setActiveTabs] = useState({ defaultTab: 'tab1' });
    return (
        <Tabs
            {...args}
            onChange={(tab) =>
                setActiveTabs({ ...activeTabs, defaultTab: tab })
            }
            value={activeTabs.defaultTab}
        />
    );
};

export const With_Badge = With_Badge_Story.bind({});

const Icon_Story: ComponentStory<typeof Tabs> = (args) => {
    const [activeTabs, setActiveTabs] = useState({ defaultTab: 'tab1' });
    return (
        <Tabs
            {...args}
            onChange={(tab) =>
                setActiveTabs({ ...activeTabs, defaultTab: tab })
            }
            value={activeTabs.defaultTab}
        />
    );
};

export const Icon = Icon_Story.bind({});

const Icon_Label_Story: ComponentStory<typeof Tabs> = (args) => {
    const [activeTabs, setActiveTabs] = useState({ defaultTab: 'tab1' });
    return (
        <Tabs
            {...args}
            onChange={(tab) =>
                setActiveTabs({ ...activeTabs, defaultTab: tab })
            }
            value={activeTabs.defaultTab}
        />
    );
};

export const Icon_Label = Icon_Label_Story.bind({});

const Scrollable_Story: ComponentStory<typeof Tabs> = (args) => {
    const [activeTabs, setActiveTabs] = useState({ defaultTab: 'tab1' });
    return (
        <Tabs
            {...args}
            onChange={(tab) =>
                setActiveTabs({ ...activeTabs, defaultTab: tab })
            }
            value={activeTabs.defaultTab}
        />
    );
};

export const Scrollable = Scrollable_Story.bind({});

const Pill_Default_Story: ComponentStory<typeof Tabs> = (args) => {
    const [activeTabs, setActiveTabs] = useState({ defaultTab: 'tab1' });
    return (
        <Tabs
            {...args}
            onChange={(tab) =>
                setActiveTabs({ ...activeTabs, defaultTab: tab })
            }
            value={activeTabs.defaultTab}
        />
    );
};

export const Pill_Default = Pill_Default_Story.bind({});

const Pill_With_Badge_Story: ComponentStory<typeof Tabs> = (args) => {
    const [activeTabs, setActiveTabs] = useState({ defaultTab: 'tab1' });
    return (
        <Tabs
            {...args}
            onChange={(tab) =>
                setActiveTabs({ ...activeTabs, defaultTab: tab })
            }
            value={activeTabs.defaultTab}
        />
    );
};

export const Pill_With_Badge = Pill_With_Badge_Story.bind({});

const Pill_Icon_Story: ComponentStory<typeof Tabs> = (args) => {
    const [activeTabs, setActiveTabs] = useState({ defaultTab: 'tab1' });
    return (
        <Tabs
            {...args}
            onChange={(tab) =>
                setActiveTabs({ ...activeTabs, defaultTab: tab })
            }
            value={activeTabs.defaultTab}
        />
    );
};

export const Pill_Icon = Pill_Icon_Story.bind({});

const Pill_Icon_Label_Story: ComponentStory<typeof Tabs> = (args) => {
    const [activeTabs, setActiveTabs] = useState({ defaultTab: 'tab1' });
    return (
        <Tabs
            {...args}
            onChange={(tab) =>
                setActiveTabs({ ...activeTabs, defaultTab: tab })
            }
            value={activeTabs.defaultTab}
        />
    );
};

export const Pill_Icon_Label = Pill_Icon_Label_Story.bind({});

const Stat_Story: ComponentStory<typeof Tabs> = (args) => {
    const [activeTabs, setActiveTabs] = useState({ defaultTab: 'tab1' });
    return (
        <Tabs
            {...args}
            onChange={(tab) =>
                setActiveTabs({ ...activeTabs, defaultTab: tab })
            }
            value={activeTabs.defaultTab}
        />
    );
};

export const Stat_Medium = Stat_Story.bind({});
export const Stat_Small = Stat_Story.bind({});
export const Stat_Group_Theme = Stat_Story.bind({});
export const Stat_Item_Theme_Override = Stat_Story.bind({});

const tabsArgs: Object = {
    scrollable: false,
    variant: TabVariant.default,
    size: TabSize.Medium,
    underlined: false,
    children: tabs.map((tab) => <Tab key={tab.value} {...tab} />),
    style: {},
};

Default.args = {
    ...tabsArgs,
};

DefaultUnderlined.args = {
    ...tabsArgs,
    underlined: true,
};

DefaultLoader.args = {
    ...tabsArgs,
    children: badgeTabs.map((tab, index) => (
        <Tab key={tab.value} {...tab} loading={index % 2 === 0} />
    )),
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
    variant: TabVariant.pill,
};

Pill_With_Badge.args = {
    ...tabsArgs,
    variant: TabVariant.pill,
    children: badgeTabs.map((tab) => <Tab key={tab.value} {...tab} />),
};

Pill_Icon.args = {
    ...tabsArgs,
    variant: TabVariant.pill,
    children: iconTabs.map((tab) => <Tab key={tab.value} {...tab} />),
};

Pill_Icon_Label.args = {
    ...tabsArgs,
    variant: TabVariant.pill,
    children: iconLabelTabs.map((tab) => <Tab key={tab.value} {...tab} />),
};

Stat_Medium.args = {
    ...tabsArgs,
    bordered: true,
    divider: true,
    variant: TabVariant.stat,
    children: statTabs.map((tab) => <Stat key={tab.value} {...tab} />),
};

Stat_Small.args = {
    ...tabsArgs,
    bordered: true,
    divider: true,
    size: TabSize.Small,
    variant: TabVariant.stat,
    children: statTabs.map((tab) => <Stat key={tab.value} {...tab} />),
};

Stat_Group_Theme.args = {
    ...tabsArgs,
    bordered: true,
    divider: true,
    groupTheme: themes[6],
    variant: TabVariant.stat,
    children: statTabs.map((tab) => <Stat key={tab.value} {...tab} />),
};

Stat_Item_Theme_Override.args = {
    ...tabsArgs,
    bordered: true,
    divider: true,
    groupTheme: themes[6],
    variant: TabVariant.stat,
    children: statTabsThemed.map((tab) => <Stat key={tab.value} {...tab} />),
};
