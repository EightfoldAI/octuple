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

const Select_Basic_Story: ComponentStory<typeof Select> = (args) => (
    <Select {...args}>
    </Select>
);

export type T = ComponentStory<React.FC<SelectProps>>
export const Select_Basic: T  = Select_Basic_Story.bind({});
export const Select_With_DefaultValue: T = Select_Basic_Story.bind({});
export const Select_Disabled: T = Select_Basic_Story.bind({});
export const Select_With_Option_Disabled: T = Select_Basic_Story.bind({});

const defaultOptions: SelectOption[] = [
    {
        iconProps: { path: IconName.mdiCalendar },
        text: 'Date',
        value: 'date 1',
    },
    {
        iconProps: { path: IconName.mdiThumbUpOutline },
        text: 'Thumbs up',
        value: 'date 2',
    },
    {
        iconProps: { path: IconName.mdiSchool },
        text: 'School',
        value: 'date 3',
    },
    {
        iconProps: { path: IconName.mdiCalendar },
        text: 'Date',
        value: 'date 4',
    },
    {
        iconProps: { path: IconName.mdiThumbUpOutline },
        text: 'Thumbs up',
        value: 'date 5',
    },
    {
        iconProps: { path: IconName.mdiSchool },
        text: 'School',
        value: 'date 6',
    },
    {
        iconProps: { path: IconName.mdiCalendar },
        text: 'Date',
        value: 'date 7',
    },
    {
        iconProps: { path: IconName.mdiThumbUpOutline },
        text: 'Thumbs up',
        value: 'date 8',
    },
    {
        iconProps: { path: IconName.mdiSchool },
        text: 'School',
        value: 'date 9',
    },
];
const SelectArgs: SelectProps = {
    children: 'JD',
    classNames: 'my-Select-class',
    'data-test-id': 'my-Select-test-id',
    style: {},
    options: defaultOptions,
};

Select_Basic.args = {
    ...SelectArgs,
};

Select_With_DefaultValue.args = {
    ...Select_Basic.args,
    defaultValue: 'date 2',
}

Select_Disabled.args = {
    ...Select_With_DefaultValue.args,
    disabled: true,
}

Select_With_Option_Disabled.args = {
    ...Select_Basic.args,
    options: [
        {
            iconProps: { path: IconName.mdiShare },
            text: 'option taken',
            value: 'option1',
            disabled: true,
        },
        ...defaultOptions
    ]
}