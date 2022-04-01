import React from 'react';
import { Pill, PillSize, PillType } from './';
import { OcThemeNames } from '../ConfigProvider';
import { Icon, IconName, IconSize } from '../Icon';

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
        <h2>Pills ({PillSize.Large})</h2>
        <div style={{ display: 'flex', gap: '30px' }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                {themes.map((theme) => (
                    <Pill label={theme} theme={theme} key={theme} />
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
                        label={theme}
                        theme={theme}
                        key={theme}
                        type={PillType.closable}
                    />
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
                        label={theme}
                        theme={theme}
                        key={theme}
                        icon={IconName.mdiInformationOutline}
                    />
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
                        label={theme}
                        theme={theme}
                        key={theme}
                        type={PillType.withButton}
                        buttonContent={
                            <>
                                <Icon
                                    path={IconName.mdiThumbUpOutline}
                                    size={IconSize.Small}
                                />
                                <span style={{ marginLeft: '4px' }}>2</span>
                            </>
                        }
                    />
                ))}
            </div>
        </div>
        <br />
        <br />
        <br />
        <h2>Pills ({PillSize.Medium})</h2>
        <div style={{ display: 'flex', gap: '30px' }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                {themes.map((theme) => (
                    <Pill
                        label={theme}
                        theme={theme}
                        key={theme}
                        size={PillSize.Medium}
                    />
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
                        label={theme}
                        theme={theme}
                        key={theme}
                        size={PillSize.Medium}
                        type={PillType.closable}
                    />
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
                        label={theme}
                        theme={theme}
                        key={theme}
                        icon={IconName.mdiInformationOutline}
                        size={PillSize.Medium}
                    />
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
                        label={theme}
                        theme={theme}
                        key={theme}
                        type={PillType.withButton}
                        size={PillSize.Medium}
                        buttonContent={
                            <>
                                <Icon
                                    path={IconName.mdiThumbUpOutline}
                                    size={IconSize.Small}
                                />
                                <span style={{ marginLeft: '4px' }}>2</span>
                            </>
                        }
                    />
                ))}
            </div>
        </div>
        <br />
        <br />
        <br />
        <h2>Pills ({PillSize.Small})</h2>
        <div style={{ display: 'flex', gap: '30px' }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                {themes.map((theme) => (
                    <Pill
                        label={theme}
                        theme={theme}
                        key={theme}
                        size={PillSize.Small}
                    />
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
                        label={theme}
                        theme={theme}
                        key={theme}
                        size={PillSize.Small}
                        type={PillType.closable}
                    />
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
                        label={theme}
                        theme={theme}
                        key={theme}
                        icon={IconName.mdiInformationOutline}
                        size={PillSize.Small}
                    />
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
                        label={theme}
                        theme={theme}
                        key={theme}
                        type={PillType.withButton}
                        size={PillSize.Small}
                        buttonContent={
                            <>
                                <Icon
                                    path={IconName.mdiThumbUpOutline}
                                    size={IconSize.Small}
                                />
                                <span style={{ marginLeft: '4px' }}>2</span>
                            </>
                        }
                    />
                ))}
            </div>
        </div>
    </>
);
