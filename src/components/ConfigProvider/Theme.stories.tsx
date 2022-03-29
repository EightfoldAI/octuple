import React from 'react';
import { ButtonSize, PrimaryButton } from '../Button';
import { ConfigProvider, useConfig } from './ConfigProvider';
import { OcThemeNames } from './ConfigProvider.types';
import { Tab, Tabs, TabVariant } from '../Tabs';
import { IconName } from '../Icon';

export default {
    title: 'Theme',
};

const ThemedComponents = () => {
    const { themeName, setThemeName } = useConfig();
    const themes: OcThemeNames[] = [
        'red',
        'orange',
        'yellow',
        'green',
        'blueGreen',
        'blue',
        'violet',
        'grey',
    ];
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

    return (
        <>
            <select
                value={themeName}
                onChange={(e) => {
                    setThemeName(e.target.value as OcThemeNames);
                }}
            >
                {themes.map((theme) => (
                    <option value={theme} key={theme}>
                        {theme}
                    </option>
                ))}
            </select>
            <br />
            <br />
            <PrimaryButton
                ariaLabel="Primary Button"
                onClick={click}
                size={ButtonSize.Large}
                text="Primary Button"
            />
            <br />
            <br />
            <Tabs onChange={click} activeTab={'tab1'}>
                {tabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
            <br />
            <br />
            <Tabs onChange={click} activeTab={'tab1'}>
                {iconTabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
            <br />
            <br />
            <Tabs
                onChange={click}
                activeTab={'tab1'}
                variant={TabVariant.small}
            >
                {tabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
        </>
    );
};

export const Base = () => {
    return (
        <ConfigProvider
            themeOptions={{
                name: 'blue',
            }}
        >
            <ThemedComponents />
        </ConfigProvider>
    );
};

function click(): void {}
