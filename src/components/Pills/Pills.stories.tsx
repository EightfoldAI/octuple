import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Pill, PillSize, PillType } from './';
import { OcThemeNames } from '../ConfigProvider';
import { IconName } from '../Icon';

export default {
    title: 'Pill',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Pills</h1>
                            <p>
                                Pills should be used when representing an input,
                                as a way to filter content, or to represent an
                                attribute.
                            </p>
                        </section>
                        <section>
                            <Stories includePrimary title="" />
                        </section>
                    </article>
                </main>
            ),
        },
    },
} as ComponentMeta<typeof Pill>;

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

export const Pills: ComponentStory<typeof Pill> = () => {
    return (
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
                            closeButtonProps={{
                                ariaLabel: 'Close',
                            }}
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
                            iconProps={{ path: IconName.mdiInformationOutline }}
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
                            pillButtonProps={{
                                iconProps: { path: IconName.mdiThumbUpOutline },
                                text: '2',
                                ariaLabel: 'Thumbs up',
                            }}
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
                            closeButtonProps={{
                                ariaLabel: 'Close',
                            }}
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
                            iconProps={{ path: IconName.mdiInformationOutline }}
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
                            pillButtonProps={{
                                iconProps: { path: IconName.mdiThumbUpOutline },
                                text: '2',
                                ariaLabel: 'Thumbs up',
                            }}
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
                            closeButtonProps={{
                                ariaLabel: 'Close',
                            }}
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
                            iconProps={{ path: IconName.mdiInformationOutline }}
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
                            pillButtonProps={{
                                iconProps: { path: IconName.mdiThumbUpOutline },
                                text: '2',
                                ariaLabel: 'Thumbs up',
                            }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};
