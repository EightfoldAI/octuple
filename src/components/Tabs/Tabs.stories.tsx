import React, { useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tabs, Tab, TabVariant } from './';
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
                        <hr />
                        <section>
                            <Stories includePrimary />
                        </section>
                    </article>
                </main>
            ),
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

const scrollableTabs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => ({
    value: `tab${i}`,
    label: `Tab ${i}`,
    ariaLabel: `Tab ${i}`,
    ...(i === 4 ? { disabled: true } : {}),
}));

export const Default: ComponentStory<typeof Tabs> = () => {
    const [activeTabs, setActiveTabs] = useState({
        defaultTab: 'tab1',
        defaultTabBadge: 'tab1',
        iconTab: 'tab1',
        iconLabelTab: 'tab1',
        scrollableTab: 'tab1',
    });

    return (
        <>
            <p>Default Tabs</p>
            <Tabs
                onChange={(tab) =>
                    setActiveTabs({ ...activeTabs, defaultTab: tab })
                }
                value={activeTabs.defaultTab}
            >
                {tabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
            <p>Tabs with badge</p>
            <Tabs
                onChange={(tab) =>
                    setActiveTabs({ ...activeTabs, defaultTabBadge: tab })
                }
                value={activeTabs.defaultTabBadge}
            >
                {badgeTabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
            <p>Icon Tabs</p>
            <Tabs
                onChange={(tab) =>
                    setActiveTabs({ ...activeTabs, iconTab: tab })
                }
                value={activeTabs.iconTab}
            >
                {iconTabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
            <p>Icon Label Tabs</p>
            <Tabs
                onChange={(tab) =>
                    setActiveTabs({ ...activeTabs, iconLabelTab: tab })
                }
                value={activeTabs.iconLabelTab}
            >
                {iconLabelTabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
            <p>Scrollable tabs</p>
            <div style={{ maxWidth: '500px' }}>
                <Tabs
                    onChange={(tab) =>
                        setActiveTabs({ ...activeTabs, scrollableTab: tab })
                    }
                    value={activeTabs.scrollableTab}
                    scrollable
                >
                    {scrollableTabs.map((tab) => (
                        <Tab key={tab.value} {...tab} />
                    ))}
                </Tabs>
            </div>
        </>
    );
};

export const Small: ComponentStory<typeof Tabs> = () => {
    const [activeTabs, setActiveTabs] = useState({
        defaultTab: 'tab1',
        defaultTabBadge: 'tab1',
        iconTab: 'tab1',
        iconLabelTab: 'tab1',
        scrollableTab: 'tab1',
    });

    return (
        <>
            <p>Default Tabs</p>
            <Tabs
                onChange={(tab) =>
                    setActiveTabs({ ...activeTabs, defaultTab: tab })
                }
                value={activeTabs.defaultTab}
                variant={TabVariant.small}
            >
                {tabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
            <p>Tabs with badge</p>
            <Tabs
                onChange={(tab) =>
                    setActiveTabs({ ...activeTabs, defaultTabBadge: tab })
                }
                value={activeTabs.defaultTabBadge}
                variant={TabVariant.small}
            >
                {badgeTabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
            <p>Icon Tabs</p>
            <Tabs
                onChange={(tab) =>
                    setActiveTabs({ ...activeTabs, iconTab: tab })
                }
                value={activeTabs.iconTab}
                variant={TabVariant.small}
            >
                {iconTabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
            <p>Icon Label Tabs</p>
            <Tabs
                onChange={(tab) =>
                    setActiveTabs({ ...activeTabs, iconLabelTab: tab })
                }
                value={activeTabs.iconLabelTab}
                variant={TabVariant.small}
            >
                {iconLabelTabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
            <p>Scrollable tabs</p>
            <div style={{ maxWidth: '500px' }}>
                <Tabs
                    onChange={(tab) =>
                        setActiveTabs({ ...activeTabs, scrollableTab: tab })
                    }
                    value={activeTabs.scrollableTab}
                    variant={TabVariant.small}
                    scrollable
                >
                    {scrollableTabs.map((tab) => (
                        <Tab key={tab.value} {...tab} />
                    ))}
                </Tabs>
            </div>
        </>
    );
};

export const Pill: ComponentStory<typeof Tabs> = () => {
    const [activeTabs, setActiveTabs] = useState({
        defaultTab: 'tab1',
        defaultTabBadge: 'tab1',
        iconTab: 'tab1',
        iconLabelTab: 'tab1',
        scrollableTab: 'tab1',
    });
    return (
        <>
            <h3>
                <b>Experimental (do not use in production)</b>
            </h3>
            <p>Default Tabs</p>
            <Tabs
                onChange={(tab) =>
                    setActiveTabs({ ...activeTabs, defaultTab: tab })
                }
                value={activeTabs.defaultTab}
                variant={TabVariant.pill}
            >
                {tabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
            <p>Tabs with badge</p>
            <Tabs
                onChange={(tab) =>
                    setActiveTabs({ ...activeTabs, defaultTabBadge: tab })
                }
                value={activeTabs.defaultTabBadge}
                variant={TabVariant.pill}
            >
                {badgeTabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
            <p>Icon Tabs</p>
            <Tabs
                onChange={(tab) =>
                    setActiveTabs({ ...activeTabs, iconTab: tab })
                }
                value={activeTabs.iconTab}
                variant={TabVariant.pill}
            >
                {iconTabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
            <p>Icon Label Tabs</p>
            <Tabs
                onChange={(tab) =>
                    setActiveTabs({ ...activeTabs, iconLabelTab: tab })
                }
                value={activeTabs.iconLabelTab}
                variant={TabVariant.pill}
            >
                {iconLabelTabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
        </>
    );
};
