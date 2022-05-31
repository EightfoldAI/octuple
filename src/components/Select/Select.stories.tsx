import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IconName } from '../Icon';
import { Select } from './';
import { Option } from './Select';
import { SelectOption, SelectProps } from './Select.types';

export default {
    title: 'Select',
    parameters: {},
    argTypes: {
        type: {
            options: ['round', 'square'],
            control: { type: 'inline-radio' },
        },
    },
} as ComponentMeta<typeof Select>;

const Basic_Story: ComponentStory<typeof Select> = (args) => (
    <Select {...args}></Select>
);

export type T = ComponentStory<React.FC<SelectProps>>;
export const Basic: T = Basic_Story.bind({});
export const With_DefaultValue: T = Basic_Story.bind({});
export const Disabled: T = Basic_Story.bind({});
export const With_Option_Disabled: T = Basic_Story.bind({});
export const With_Clear: T = Basic_Story.bind({});
export const With_Filterable: T = Basic_Story.bind({});

const defaultOptions: SelectOption[] = [
    {
        iconProps: { path: IconName.mdiThumbUpOutline },
        text: 'Thumbs up',
        value: 'thumbsup',
    },
    {
        iconProps: { path: IconName.mdiSchool },
        text: 'School',
        value: 'school',
    },
    {
        iconProps: { path: IconName.mdiCalendar },
        text: 'Date',
        value: 'date',
    },
    {
        iconProps: { path: IconName.mdiAccount },
        text: 'Account',
        value: 'account',
    },
    {
        iconProps: { path: IconName.mdiAccountHardHat },
        text: 'Hat',
        value: 'hat',
    },
    {
        iconProps: { path: IconName.mdiAccountTie },
        text: 'Tie',
        value: 'tie',
    },
    {
        iconProps: { path: IconName.mdiCalendarAlert },
        text: 'Date alert',
        value: 'datealert',
    },
    {
        iconProps: { path: IconName.mdiBell },
        text: 'Bell',
        value: 'bell',
    },
];
const SelectArgs: SelectProps = {
    children: 'JD',
    classNames: 'my-Select-class',
    'data-test-id': 'my-Select-test-id',
    style: {},
    options: defaultOptions,
};

Basic.args = {
    ...SelectArgs,
};

With_DefaultValue.args = {
    ...Basic.args,
    defaultValue: 'date 2',
};

Disabled.args = {
    ...With_DefaultValue.args,
    disabled: true,
};

With_Option_Disabled.args = {
    ...Basic.args,
    options: [
        {
            iconProps: { path: IconName.mdiShare },
            text: 'option taken',
            value: 'option1',
            disabled: true,
        },
        ...defaultOptions,
    ],
};

With_Clear.args = {
    ...With_DefaultValue.args,
    clearable: true,
};

With_Filterable.args = {
    ...Basic.args,
    filterable: true,
    clearable: true,
};
