import React, { FC, useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
    ButtonSize,
    DefaultButton,
    PrimaryButton,
    SecondaryButton,
    TwoStateButton,
} from '../Button';
import { Tab, Tabs, TabVariant } from '../Tabs';
import { Icon, IconName } from '../Icon';
import { CompactPicker } from 'react-color';
import { ConfigProvider, OcThemeNames, ThemeOptions, useConfig } from './';
import { MatchScore } from '../MatchScore';
import { Spinner } from '../Spinner';
import { Stack } from '../Stack';
import { RadioGroup } from '../RadioButton';
import { CheckBoxGroup } from '../CheckBox';
import { Link } from '../Link';
import { Navbar, NavbarContent } from '../Navbar';
import { Dropdown } from '../Dropdown';
import { Menu, MenuVariant } from '../Menu';

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
                        <section>
                            <Stories includePrimary title="" />
                        </section>
                    </article>
                </main>
            ),
        },
    },
} as ComponentMeta<typeof ConfigProvider>;

const ThemedComponents: FC = () => {
    const [customPrimaryColor, setCustomPrimaryColor] = useState<string>('');
    const [customAccentColor, setCustomAccentColor] = useState<string>('');
    const { themeOptions, setThemeOptions } = useConfig();
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
    const iconTabs = [1, 2, 3, 4].map((i) => ({
        value: `tab${i}`,
        icon: IconName.mdiCardsHeart,
        ariaLabel: `Tab ${i}`,
        ...(i === 4 ? { disabled: true } : {}),
    }));

    return (
        <Stack direction="vertical" gap="xxl">
            <h1 style={{ marginBottom: 0 }}>
                Selected Theme:
                <span
                    style={{
                        textTransform: 'capitalize',
                        marginLeft: '4px',
                        color: 'var(--primary-color)',
                    }}
                >
                    Primary |
                </span>
                <span
                    style={{
                        textTransform: 'capitalize',
                        marginLeft: '4px',
                        color: 'var(--accent-color-30)',
                    }}
                >
                    | Accent
                </span>
            </h1>
            <Stack direction="horizontal" gap="m" style={{ marginTop: 0 }}>
                <div>
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
                <div>
                    <p>Custom Primary</p>
                    <CompactPicker
                        color={customPrimaryColor}
                        onChange={async (color) => {
                            setThemeOptions({
                                name: 'custom',
                                customTheme: {
                                    primaryColor: color.hex,
                                    accentColor: customAccentColor,
                                },
                            });
                            setCustomPrimaryColor(color.hex);
                        }}
                    />
                </div>
                <div>
                    <p>Custom Accent</p>
                    <CompactPicker
                        color={customAccentColor}
                        onChange={async (color) => {
                            setThemeOptions({
                                name: 'custom',
                                customTheme: {
                                    primaryColor: customPrimaryColor,
                                    accentColor: color.hex,
                                },
                            });
                            setCustomAccentColor(color.hex);
                        }}
                    />
                </div>
            </Stack>
            <Stack direction="horizontal" gap="m">
                <PrimaryButton
                    ariaLabel="Primary Button"
                    size={ButtonSize.Small}
                    text="Primary Button"
                />
                <PrimaryButton
                    ariaLabel="Primary Button"
                    size={ButtonSize.Small}
                    iconProps={{ path: IconName.mdiCardsHeart }}
                />
                <PrimaryButton
                    ariaLabel="Primary Button"
                    size={ButtonSize.Small}
                    iconProps={{ path: IconName.mdiCardsHeart }}
                    text="Primary Button"
                />
            </Stack>
            <Stack direction="horizontal" gap="m">
                <SecondaryButton
                    ariaLabel="Secondary Button"
                    size={ButtonSize.Small}
                    text="Secondary Button"
                />
                <SecondaryButton
                    ariaLabel="Secondary Button"
                    iconProps={{ path: IconName.mdiCardsHeart }}
                    size={ButtonSize.Small}
                />
                <SecondaryButton
                    ariaLabel="Secondary Button"
                    size={ButtonSize.Small}
                    text="Secondary Button"
                    iconProps={{ path: IconName.mdiCardsHeart }}
                />
            </Stack>
            <Stack direction="horizontal" gap="m">
                <DefaultButton
                    ariaLabel="Default Button"
                    size={ButtonSize.Small}
                    text="Default Button"
                />
                <DefaultButton
                    ariaLabel="Default Button"
                    iconProps={{ path: IconName.mdiCardsHeart }}
                    size={ButtonSize.Small}
                />
                <DefaultButton
                    ariaLabel="Default Button"
                    iconProps={{ path: IconName.mdiCardsHeart }}
                    size={ButtonSize.Small}
                    text="Default Button"
                />
            </Stack>
            <Stack direction="horizontal" gap="m">
                <TwoStateButton
                    ariaLabel="Two state button"
                    size={ButtonSize.Small}
                    iconOneProps={{
                        path: IconName.mdiCardsHeart,
                        ariaHidden: true,
                        classNames: 'my-two-state-btn-icon-one',
                        id: 'myTwoStateButtonIconOne',
                        role: 'presentation',
                        rotate: 0,
                        spin: false,
                        vertical: false,
                        'data-test-id': 'myTwoStateButtonIconOneTestId',
                    }}
                    iconTwoProps={{
                        path: IconName.mdiChevronDown,
                        ariaHidden: true,
                        classNames: 'my-two-state-btn-icon-two',
                        id: 'myTwoStateButtonIconTwo',
                        role: 'presentation',
                        rotate: 0,
                        spin: false,
                        vertical: false,
                        'data-test-id': 'myTwoStateButtonIconTwoTestId',
                    }}
                    text="Two state button"
                />
                <TwoStateButton
                    ariaLabel="Two state button"
                    size={ButtonSize.Small}
                    text="Two state button checked"
                    iconOneProps={{
                        path: IconName.mdiCardsHeart,
                        ariaHidden: true,
                        classNames: 'my-two-state-btn-icon-one',
                        id: 'myTwoStateButtonIconOne',
                        role: 'presentation',
                        rotate: 0,
                        spin: false,
                        vertical: false,
                        'data-test-id': 'myTwoStateButtonIconOneTestId',
                    }}
                    iconTwoProps={{
                        path: IconName.mdiChevronDown,
                        ariaHidden: true,
                        classNames: 'my-two-state-btn-icon-two',
                        id: 'myTwoStateButtonIconTwo',
                        role: 'presentation',
                        rotate: 0,
                        spin: false,
                        vertical: false,
                        'data-test-id': 'myTwoStateButtonIconTwoTestId',
                    }}
                    checked
                />
            </Stack>
            <Tabs value={'tab1'}>
                {tabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
            <Tabs value={'tab1'}>
                {iconTabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
            <Tabs value={'tab1'} variant={TabVariant.small}>
                {tabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
            <Tabs value={'tab1'} variant={TabVariant.pill}>
                {tabs.map((tab) => (
                    <Tab key={tab.value} {...tab} />
                ))}
            </Tabs>
            <Navbar style={{ position: 'relative' }}>
                <NavbarContent>
                    <Link
                        href="/"
                        target="_self"
                        variant="default"
                        style={{ padding: '8px', color: 'inherit' }}
                    >
                        Home
                    </Link>
                </NavbarContent>
                <NavbarContent>
                    <Link
                        href="https://www.twitter.com"
                        target="_self"
                        variant="default"
                        style={{ padding: '8px', color: 'inherit' }}
                    >
                        <Icon path={IconName.mdiTwitter} />
                    </Link>
                    <Link
                        href="https://www.facebook.com"
                        target="_self"
                        variant="default"
                        style={{ padding: '8px', color: 'inherit' }}
                    >
                        <Icon path={IconName.mdiFacebook} />
                    </Link>
                    <Link
                        href="https://www.instagram.com"
                        target="_self"
                        variant="default"
                        style={{ padding: '8px', color: 'inherit' }}
                    >
                        <Icon path={IconName.mdiInstagram} />
                    </Link>
                </NavbarContent>
            </Navbar>
            <MatchScore score={3} />
            <Spinner />
            <CheckBoxGroup
                {...{
                    value: ['First'],
                    defaultChecked: ['First'],
                    items: [
                        {
                            name: 'group',
                            value: 'First',
                            label: 'First',
                            id: 'test-1',
                        },
                        {
                            name: 'group',
                            value: 'Second',
                            label: 'Second',
                            id: 'test-2',
                        },
                        {
                            name: 'group',
                            value: 'Third',
                            label: 'Third',
                            id: 'test-3',
                        },
                    ],
                }}
            />
            <RadioGroup
                {...{
                    ariaLabel: 'Radio Group',
                    value: 'Radio1',
                    items: [1, 2, 3].map((i) => ({
                        value: `Radio${i}`,
                        label: `Radio${i}`,
                        name: 'group',
                        id: `oea2exk-${i}`,
                    })),
                }}
            />
            <Dropdown overlay={Overlay()} placement="top">
                <DefaultButton text={'Menu dropdown'} />
            </Dropdown>
        </Stack>
    );
};

const Overlay = () => (
    <Menu
        {...{
            variant: MenuVariant.neutral,
            classNames: 'my-menu-class',
            style: {},
            itemClassNames: 'my-menu-item-class',
            itemStyle: {},
            listType: 'ul',
        }}
        items={[
            {
                iconProps: { path: IconName.mdiCalendar },
                text: 'Date',
                value: 'date 1',
                counter: '8',
            },
            {
                iconProps: { path: IconName.mdiThumbUpOutline },
                text: 'Thumbs up',
                value: 'date 1',
                disabled: true,
            },
            {
                iconProps: { path: IconName.mdiSchool },
                text: 'School',
                value: 'date 1',
            },
            {
                iconProps: { path: IconName.mdiCalendar },
                text: 'Date',
                value: 'date 1',
            },
        ]}
        onChange={(item) => {
            console.log(item);
        }}
    />
);

const DEFAULT_FOCUS_VISIBLE: boolean = true;
const DEFAULT_FOCUS_VISIBLE_ELEMENT: HTMLElement = document.documentElement;

const Theming_Story: ComponentStory<typeof ConfigProvider> = (args) => {
    return (
        <ConfigProvider {...args}>
            <ThemedComponents />
        </ConfigProvider>
    );
};

export const Theming = Theming_Story.bind({});

Theming.args = {
    focusVisibleOptions: {
        focusVisible: DEFAULT_FOCUS_VISIBLE,
        focusVisibleElement: DEFAULT_FOCUS_VISIBLE_ELEMENT,
    },
    themeOptions: {
        name: 'blue',
        customTheme: {
            tabsTheme: {
                label: '--text-secondary-color',
                activeLabel: '--primary-color',
                activeBackground: 'transparent',
                hoverLabel: '--primary-color',
                hoverBackground: 'transparent',
                indicatorColor: '--primary-color',
                smallActiveBackground: 'transparent',
                smallHoverBackground: 'transparent',
                pillLabel: '--text-secondary-color',
                pillActiveLabel: '--primary-color',
                pillActiveBackground: '--accent-color-20',
                pillHoverLabel: '--primary-color',
                pillBackground: '--grey-color-10',
            },
            navbarTheme: {
                background: '--primary-color-80',
                textColor: '--primary-color-10',
                textHoverBackground: '--primary-color-80',
                textHoverColor: '--primary-color-20',
            },
        },
    } as ThemeOptions,
    icomoonIconSet: {},
    children: <ThemedComponents />,
};
