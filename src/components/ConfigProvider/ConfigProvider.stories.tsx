import React, { FC, useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
    ButtonSize,
    DefaultButton,
    PrimaryButton,
    SecondaryButton,
} from '../Button';
import { Tab, Tabs, TabVariant } from '../Tabs';
import { IconName } from '../Icon';
import { CompactPicker } from 'react-color';
import { ConfigProvider, OcThemeNames, useConfig } from './';
import { MatchScore } from '../MatchScore';
import { Spinner } from '../Spinner';

export default {
    title: 'Config Provider',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Config Provider</h1>
                            <p>
                                Config provider is a utility that applies
                                contextual theming to its child components.
                                Themes can be applied to your entire app, to
                                specific subtrees, or to individual components.
                                By default, components use a blue theme. It also
                                provides mouse vs. keyboard detection to improve
                                accessibility.
                            </p>
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
} as ComponentMeta<typeof ConfigProvider>;

const ThemedComponents: FC = () => {
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
                                },
                            });
                            setCustomColor(color.hex);
                        }}
                    />
                </div>
            </div>
            <br />
            <br />
            <div style={{ display: 'flex', gap: '16px' }}>
                <PrimaryButton
                    ariaLabel="Primary Button"
                    onClick={click}
                    size={ButtonSize.Large}
                    text="Primary Button"
                />
                <PrimaryButton
                    ariaLabel="Primary Button"
                    onClick={click}
                    size={ButtonSize.Large}
                    iconProps={{ path: IconName.mdiCardsHeart }}
                />
                <PrimaryButton
                    ariaLabel="Primary Button"
                    onClick={click}
                    size={ButtonSize.Large}
                    iconProps={{ path: IconName.mdiCardsHeart }}
                    text="Primary Button"
                />
            </div>
            <br />
            <br />
            <div style={{ display: 'flex', gap: '16px' }}>
                <SecondaryButton
                    ariaLabel="Secondary Button"
                    onClick={click}
                    size={ButtonSize.Large}
                    text="Secondary Button"
                />
                <SecondaryButton
                    ariaLabel="Secondary Button"
                    iconProps={{ path: IconName.mdiCardsHeart }}
                    onClick={click}
                    size={ButtonSize.Large}
                />
                <SecondaryButton
                    ariaLabel="Secondary Button"
                    onClick={click}
                    size={ButtonSize.Large}
                    text="Secondary Button"
                    iconProps={{ path: IconName.mdiCardsHeart }}
                />
            </div>
            <br />
            <br />
            <div style={{ display: 'flex', gap: '16px' }}>
                <DefaultButton
                    ariaLabel="Default Button"
                    onClick={click}
                    size={ButtonSize.Large}
                    text="Default Button"
                />
                <DefaultButton
                    ariaLabel="Default Button"
                    iconProps={{ path: IconName.mdiCardsHeart }}
                    onClick={click}
                    size={ButtonSize.Large}
                />
                <DefaultButton
                    ariaLabel="Default Button"
                    iconProps={{ path: IconName.mdiCardsHeart }}
                    onClick={click}
                    size={ButtonSize.Large}
                    text="Default Button"
                />
            </div>
            <br />
            <br />
            <Tabs onChange={click} value={'tab1'}>
                {tabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
            <br />
            <br />
            <Tabs onChange={click} value={'tab1'}>
                {iconTabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
            <br />
            <br />
            <Tabs onChange={click} value={'tab1'} variant={TabVariant.small}>
                {tabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
            <br />
            <br />
            <Tabs onChange={click} value={'tab1'} variant={TabVariant.pill}>
                {tabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
            <br />
            <br />
            <MatchScore score={3} />
            <br />
            <br />
            <Spinner />
        </>
    );
};

export const Theming: ComponentStory<typeof ConfigProvider> = ({}) => {
    return (
        <ConfigProvider
            themeOptions={{
                name: 'blue',
            }}
            focusVisibleOptions={{
                focusVisible: true,
                focusVisibleElement: document.getElementById('root'),
            }}
        >
            <ThemedComponents />
        </ConfigProvider>
    );
};

function click(): void {}
