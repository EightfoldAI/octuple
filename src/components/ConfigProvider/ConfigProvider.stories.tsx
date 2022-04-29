import React, { useState } from 'react';
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
        'bluegreen',
        'blue',
        'violet',
        'grey',
    ];

    return (
        <>
            <h1>
                Selected Theme:
                <span
                    style={{
                        textTransform: 'capitalize',
                        marginLeft: '4px',
                        color: 'var(--primary-color)',
                    }}
                >
                    {themeOptions.name}
                </span>
            </h1>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{ marginRight: '40px' }}>
                    <p>Predefined</p>
                    <select
                        value={themeOptions.name}
                        onChange={(e) => {
                            setThemeOptions({
                                name: e.target.value as OcThemeNames,
                            });
                        }}
                        style={{ fontSize: '1rem' }}
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
                    <p>Custom</p>
                    <CompactPicker
                        color={customColor}
                        onChange={(color) => {
                            setThemeOptions({
                                name: 'custom',
                                customTheme: {
                                    primaryColor: color.hex,
                                    styles: {
                                        global: {
                                            borderRadius: '24px',
                                        },
                                        button: {
                                            borderRadius: '2px',
                                        },
                                    },
                                },
                            });
                            setCustomColor(color.hex);
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export const Theming = () => {
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
