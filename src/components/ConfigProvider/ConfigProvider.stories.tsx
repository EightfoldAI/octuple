import React, { useState } from 'react';
import { ButtonSize, PrimaryButton } from '../Button';
import { Tab, Tabs, TabVariant } from '../Tabs';
import { IconName } from '../Icon';
import { CompactPicker } from 'react-color';
import { ConfigProvider, OcThemeNames, useConfig } from './';

export default {
    title: 'ConfigProvider',
    component: ConfigProvider,
};

const ThemedComponents = () => {
    const [customColor, setCustomColor] = useState<string>('');
    const { themeOptions, setThemeOptions } = useConfig();
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
            <h2>
                Selected Theme:
                <span
                    style={{ textTransform: 'capitalize', marginLeft: '4px' }}
                >
                    {themeOptions.name}
                </span>
            </h2>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{ marginRight: '40px' }}>
                    <h3>Predefined</h3>
                    <select
                        value={themeOptions.name}
                        onChange={(e) => {
                            setThemeOptions({
                                name: e.target.value as OcThemeNames,
                            });
                        }}
                    >
                        {themes.map((theme) => (
                            <option value={theme} key={theme}>
                                {theme}
                            </option>
                        ))}
                    </select>
                </div>
                <br />
                <div>
                    <h3>Custom</h3>
                    <CompactPicker
                        color={customColor}
                        onChange={(color) => {
                            setThemeOptions({
                                name: 'custom',
                                customTheme: {
                                    primaryColor: color.hex,
                                },
                            });
                            setCustomColor(color.hex);
                        }}
                    />
                </div>
            </div>
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
            <br />
            <br />
            <Tabs onChange={click} activeTab={'tab1'} variant={TabVariant.pill}>
                {tabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
        </>
    );
};

export const Theming = () => {
    return (
        <ConfigProvider
            themeOptions={{
                name: 'custom',
                customTheme: {
                    primaryColor: 'red',
                },
            }}
        >
            <ThemedComponents />
        </ConfigProvider>
    );
};

function click(): void {}
