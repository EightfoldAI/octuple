import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Pill, PillSize, PillType } from './';
import { OcThemeNames } from '../ConfigProvider';
import { IconName } from '../Icon';
import { Stack } from '../Stack';

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
    argTypes: {
        onClick: {
            action: 'click',
        },
        onClose: {
            action: 'close',
        },
        size: {
            options: [
                PillSize.Large,
                PillSize.Medium,
                PillSize.Small,
                PillSize.XSmall,
            ],
            control: { type: 'radio' },
        },
        type: {
            options: [PillType.default, PillType.closable, PillType.withButton],
            control: { type: 'radio' },
        },
    },
} as ComponentMeta<typeof Pill>;

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

const Default_Story: ComponentStory<typeof Pill> = (args) => (
    <Stack direction="vertical" gap="l">
        {themes.map((theme) => (
            <Pill {...args} label={theme} theme={theme} key={theme} />
        ))}
    </Stack>
);

export const Default = Default_Story.bind({});

const With_Icon_Story: ComponentStory<typeof Pill> = (args) => (
    <Stack direction="vertical" gap="l">
        {themes.map((theme) => (
            <Pill {...args} label={theme} theme={theme} key={theme} />
        ))}
    </Stack>
);

export const With_Icon = With_Icon_Story.bind({});

const Closable_Story: ComponentStory<typeof Pill> = (args) => (
    <Stack direction="vertical" gap="l">
        {themes.map((theme) => (
            <Pill {...args} label={theme} theme={theme} key={theme} />
        ))}
    </Stack>
);

export const Closable = Closable_Story.bind({});

const With_Button_Story: ComponentStory<typeof Pill> = (args) => (
    <Stack direction="vertical" gap="l">
        {themes.map((theme) => (
            <Pill {...args} label={theme} theme={theme} key={theme} />
        ))}
    </Stack>
);

export const With_Button = With_Button_Story.bind({});

const pillArgs: Object = {
    size: PillSize.Large,
    type: PillType.default,
    label: 'Pill label',
    disabled: false,
    configContextProps: {
        noDisabledContext: false,
        noSizeContext: false,
    },
    closeButtonProps: {
        ariaLabel: 'Close',
    },
    pillButtonProps: {
        iconProps: { path: IconName.mdiThumbUpOutline },
        text: '2',
        ariaLabel: 'Thumbs up',
    },
};

Default.args = {
    ...pillArgs,
};

With_Icon.args = {
    ...pillArgs,
    iconProps: {
        path: IconName.mdiInformationOutline,
    },
};

Closable.args = {
    ...pillArgs,
    type: PillType.closable,
};

With_Button.args = {
    ...pillArgs,
    type: PillType.withButton,
};
