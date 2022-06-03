import React, { FC, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IconName } from '../Icon';
import { Select } from './';
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

const Wrapper: FC<SelectProps> = ({ ...rest }) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                width: '200px',
                height: '200px',
                margin: '0 auto',
            }}
        >
            <Select {...rest}></Select>
        </div>
    );
};

const Basic_Story: ComponentStory<typeof Select> = (args) => (
    <div>
        <Wrapper {...args}></Wrapper>
    </div>
);

export type SelectStory = ComponentStory<React.FC<SelectProps>>;
export const Basic: SelectStory = Basic_Story.bind({});
export const With_DefaultValue: SelectStory = Basic_Story.bind({});
export const Disabled: SelectStory = Basic_Story.bind({});
export const Options_Disabled: SelectStory = Basic_Story.bind({});
export const With_Clear: SelectStory = Basic_Story.bind({});
export const Filterable: SelectStory = Basic_Story.bind({});
export const Multiple: SelectStory = Basic_Story.bind({});
export const Multiple_With_NoFilter: SelectStory = Basic_Story.bind({});

const usAllStates = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
];

const DynamicSelect: FC<SelectProps> = () => {
    let timer: any;
    const [usStates, setUsStates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const loadUsStates = (searchString: string) => {
        setIsLoading(true);
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            const filtered = usAllStates.filter((state) =>
                state.toLowerCase().includes(searchString.toLowerCase())
            );
            const options: SelectOption[] = filtered.map((state) => {
                return {
                    text: state,
                    value: state,
                };
            });
            setUsStates(options);
            setIsLoading(false);
        }, 2000);
    };
    return (
        <Select
            filterable={true}
            isLoading={isLoading}
            loadOptions={loadUsStates}
            options={usStates}
        ></Select>
    );
};

const Dynamic_Story: ComponentStory<typeof Select> = (args) => (
    <DynamicSelect {...args}></DynamicSelect>
);

export const Dynamic: SelectStory = Dynamic_Story.bind({});

const defaultOptions: SelectOption[] = [
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
        iconProps: { path: IconName.mdiFlagVariant },
        text: 'Supercalifragilisticexpialidocious',
        value: 'verylarge',
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
    classNames: 'octuple-select-class',
    'data-test-id': 'octuple-select-test-id',
    style: {},
    options: defaultOptions,
};

Basic.args = {
    ...SelectArgs,
};

With_DefaultValue.args = {
    ...Basic.args,
    defaultValue: 'school',
};

Disabled.args = {
    ...With_DefaultValue.args,
    textInputProps: {
        ...With_DefaultValue.args.textInputProps,
        disabled: true,
    },
};

Options_Disabled.args = {
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
    textInputProps: {
        ...With_DefaultValue.args.textInputProps,
        clearable: true,
    },
};

Filterable.args = {
    ...Basic.args,
    filterable: true,
    textInputProps: {
        ...Basic.args.textInputProps,
        clearable: true,
    },
};

Multiple.args = {
    ...Basic.args,
    filterable: true,
    multiple: true,
    textInputProps: {
        ...Basic.args.textInputProps,
        clearable: true,
    },
};

Multiple_With_NoFilter.args = {
    ...Basic.args,
    filterable: false,
    multiple: true,
    textInputProps: {
        ...Basic.args.textInputProps,
        clearable: true,
    },
};

Dynamic.args = {
    ...Basic.args,
    textInputProps: {
        ...Basic.args.textInputProps,
        clearable: true,
    },
};
