import React from 'react';
import { Pill } from './';
import { OcThemeNames } from '../ConfigProvider';
import { IconName } from '../Icon';

export default {
    title: 'Pill',
    component: Pill,
};

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

export const Pills = () => (
    <>
        <h2>Pills</h2>
        <div style={{ display: 'flex', gap: '30px' }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                {themes.map((theme) => (
                    <Pill theme={theme} key={theme}>
                        <span style={{ textTransform: 'capitalize' }}>
                            {theme}
                        </span>
                    </Pill>
                ))}
            </div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                {themes.map((theme) => (
                    <Pill theme={theme} key={theme} closable={true}>
                        <span style={{ textTransform: 'capitalize' }}>
                            {theme}
                        </span>
                    </Pill>
                ))}
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                {themes.map((theme) => (
                    <Pill
                        theme={theme}
                        key={theme}
                        icon={IconName.mdiInformationOutline}
                    >
                        <span style={{ textTransform: 'capitalize' }}>
                            {theme}
                        </span>
                    </Pill>
                ))}
            </div>
        </div>
    </>
);
