import React from 'react';
import { Tabs, Tab, TabVariant, TabValue } from './';
import { IconName } from '../Icon';

export default {
    title: 'Tabs',
    component: Tabs,
};

const tabs = [1, 2, 3, 4].map((i) => ({
    value: `tab${i}`,
    label: `Tab ${i}`,
    ariaLabel: `Tab ${i}`,
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

export const Default = () => (
    <>
        <p>Default Tabs</p>
        <Tabs onChange={_tabClicked} activeTab={'tab1'}>
            {tabs.map((tab) => (
                <Tab key={tab.value} {...tab} />
            ))}
        </Tabs>
        <p>Icon Tabs</p>
        <Tabs onChange={_tabClicked} activeTab={'tab1'}>
            {iconTabs.map((tab) => (
                <Tab key={tab.value} {...tab} />
            ))}
        </Tabs>
        <p>Icon Label Tabs</p>
        <Tabs onChange={_tabClicked} activeTab={'tab1'}>
            {iconLabelTabs.map((tab) => (
                <Tab key={tab.value} {...tab} />
            ))}
        </Tabs>
        <p>Scrollable tabs</p>
        <div style={{ maxWidth: '500px' }}>
            <Tabs onChange={_tabClicked} activeTab={'tab1'} scrollable>
                {scrollableTabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
        </div>
    </>
);

export const Small = () => (
    <>
        <p>Default Tabs</p>
        <Tabs
            onChange={_tabClicked}
            activeTab={'tab1'}
            variant={TabVariant.small}
        >
            {tabs.map((tab) => (
                <Tab key={tab.value} {...tab} />
            ))}
        </Tabs>
        <p>Icon Tabs</p>
        <Tabs
            onChange={_tabClicked}
            activeTab={'tab1'}
            variant={TabVariant.small}
        >
            {iconTabs.map((tab) => (
                <Tab key={tab.value} {...tab} />
            ))}
        </Tabs>
        <p>Icon Label Tabs</p>
        <Tabs
            onChange={_tabClicked}
            activeTab={'tab1'}
            variant={TabVariant.small}
        >
            {iconLabelTabs.map((tab) => (
                <Tab key={tab.value} {...tab} />
            ))}
        </Tabs>
        <p>Scrollable tabs</p>
        <div style={{ maxWidth: '500px' }}>
            <Tabs
                onChange={_tabClicked}
                activeTab={'tab1'}
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

export const Pill = () => (
    <>
        <h3>
            <b>Experimental (do not use in production)</b>
        </h3>
        <p>Default Tabs</p>
        <Tabs
            onChange={_tabClicked}
            activeTab={'tab1'}
            variant={TabVariant.pill}
        >
            {tabs.map((tab) => (
                <Tab key={tab.value} {...tab} />
            ))}
        </Tabs>
        <p>Icon Tabs</p>
        <Tabs
            onChange={_tabClicked}
            activeTab={'tab1'}
            variant={TabVariant.pill}
        >
            {iconTabs.map((tab) => (
                <Tab key={tab.value} {...tab} />
            ))}
        </Tabs>
        <p>Icon Label Tabs</p>
        <Tabs
            onChange={_tabClicked}
            activeTab={'tab1'}
            variant={TabVariant.pill}
        >
            {iconLabelTabs.map((tab) => (
                <Tab key={tab.value} {...tab} />
            ))}
        </Tabs>
    </>
);

function _tabClicked(tab: TabValue): void {
    console.log(tab);
}
