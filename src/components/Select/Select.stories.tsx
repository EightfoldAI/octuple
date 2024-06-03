import React, { FC, useState, useRef, useCallback } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { OcThemeName } from '../ConfigProvider';
import { IconName } from '../Icon';
import { Label, LabelSize } from '../Label';
import { List } from '../List';
import { Stack } from '../Stack';
import { Select } from './';
import {
  SelectOption,
  SelectProps,
  SelectShape,
  SelectSize,
} from './Select.types';
import { Stories } from '@storybook/addon-docs';
import { TextInputWidth } from '../Inputs';

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
    text: 'Supercalifragilisticexpialidocious and another Supercalifragilisticexpialidocious',
    value: 'verylarge',
    wrap: true,
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

export const locations = {
  current: 'Current location',
  bengalaru: 'Bengalaru, Karnataka, India',
  noida: 'Noida, Uttar Pradesh, India',
  santa: 'Santa Clara, CA, United States',
  london: 'London, England, United Kingdom',
  hybrid: 'Hybrid',
};

const locationOptions: SelectOption[] = [
  {
    text: 'Current location',
    value: locations.current,
  },
  {
    text: 'Bengalaru, Karnataka, India',
    value: locations.bengalaru,
  },
  {
    text: 'Noida, Uttar Pradesh, India',
    value: locations.noida,
  },
  {
    text: 'Santa Clara, CA, United States',
    value: locations.santa,
  },
  {
    text: 'London, England, United Kingdom',
    value: locations.london,
  },
  {
    text: 'Hybrid',
    value: locations.hybrid,
  },
];

export interface Role {
  current?: boolean;
  geo?: string | string[];
  index?: number;
  location?: string;
  role?: string;
  selected?: boolean;
  title?: string;
}

export const sampleRoleList: Role[] = [
  {
    current: false,
    geo: 'Bangalore, Karnataka, India',
    index: 0,
    location: 'Hybrid',
    role: 'Engineering',
    selected: false,
    title: 'Software Engineer, Customer Engineering',
  },
  {
    current: false,
    geo: ['Bangalore, Karnataka, India', 'Noida, Uttar Pradesh, India'],
    index: 1,
    location: 'Hybrid',
    role: 'Product',
    selected: false,
    title: 'Product Manager II - Talent Management',
  },
  {
    current: false,
    geo: 'Bangalore, Karnataka, India',
    index: 2,
    location: 'Hybrid',
    role: 'Engineering',
    selected: false,
    title: 'Lead SDET (Accessibility)',
  },
  {
    current: true,
    geo: 'Santa Clara, CA, United States',
    index: 3,
    location: 'Hybrid',
    role: 'Engineering',
    selected: false,
    title: 'Staff Machine Learning Engineer',
  },
  {
    current: false,
    geo: 'London, England, United Kingdom',
    index: 4,
    location: 'Hybrid',
    role: 'Operations',
    selected: false,
    title: 'Senior Director, Field Operations - EMEA & APJ',
  },
  {
    current: true,
    geo: 'Santa Clara, CA, United States',
    index: 5,
    location: 'Hybrid',
    role: 'Engineering',
    selected: false,
    title: 'Machine Learning Engineer - AI/ML',
  },
  {
    current: false,
    geo: ['Bangalore, Karnataka, India', 'Noida, Uttar Pradesh, India'],
    index: 6,
    location: 'Hybrid',
    role: 'Engineering',
    selected: false,
    title: 'Lead Engineer - Backend',
  },
  {
    current: false,
    geo: 'Bangalore, Karnataka, India',
    index: 7,
    location: 'Hybrid',
    role: 'Product',
    selected: false,
    title: 'Sr Product Manager - Talent Management',
  },
  {
    current: false,
    geo: ['Bangalore, Karnataka, India', 'Noida, Uttar Pradesh, India'],
    index: 8,
    location: 'Hybrid',
    role: 'Engineering',
    selected: false,
    title: 'Senior Engineer',
  },
  {
    current: false,
    geo: ['Bengalaru, Karnataka, India', 'Noida, Uttar Pradesh, India'],
    index: 9,
    location: 'Hybrid',
    role: 'Engineering',
    selected: false,
    title: 'Staff/Lead Engineer - Frontend',
  },
  {
    current: true,
    geo: 'Santa Clara, CA, United States',
    index: 10,
    location: 'Hybrid',
    role: 'Engineering',
    selected: false,
    title: 'Senior Software Engineer - AI Product Dev Teams',
  },
  {
    current: false,
    geo: 'Bangalore, Karnataka, India',
    index: 11,
    location: 'Hybrid',
    role: 'Engineering',
    selected: false,
    title: 'Support Language Specialist (On Contract)',
  },
  {
    current: false,
    geo: ['Bangalore, Karnataka, India', 'Noida, Uttar Pradesh, India'],
    index: 12,
    location: 'Hybrid',
    role: 'Product',
    selected: false,
    title: 'UX Designer',
  },
  {
    current: true,
    geo: 'Santa Clara, CA, United States',
    index: 13,
    location: 'Hybrid',
    role: 'Engineering',
    selected: false,
    title:
      'Staff Software Engineer - Core Infrastructure (Distributed Systems)',
  },
  {
    current: true,
    geo: 'San Francisco, CA, United States',
    index: 14,
    location: 'Hybrid',
    role: 'Marketing',
    selected: false,
    title: 'Senior Events Marketing Contractor',
  },
  {
    current: false,
    geo: 'London, England, United Kingdom',
    index: 15,
    location: 'Hybrid',
    role: 'Operations',
    selected: false,
    title: 'Deal Desk Manager - EMEA',
  },
  {
    current: false,
    geo: ['Bangalore, Karnataka, India', 'Noida, Uttar Pradesh, India'],
    index: 16,
    location: 'Hybrid',
    role: 'Customer Support',
    selected: false,
    title: 'Senior Technical Support Engineer',
  },
  {
    current: false,
    geo: ['Bangalaru, Karnataka, India', 'Noida, Uttar Pradesh, India'],
    index: 17,
    location: 'Hybrid',
    role: 'G&A',
    selected: false,
    title: 'Sr. Accountant',
  },
  {
    current: false,
    geo: 'London, England, United Kingdom',
    index: 18,
    location: 'Hybrid',
    role: 'Product Delivery',
    selected: false,
    title: 'Product Delivery Manager - EMEA',
  },
  {
    current: true,
    geo: 'Santa Clara, CA, United States',
    index: 19,
    location: 'Hybrid',
    role: 'Sales',
    selected: false,
    title: 'Senior Solutions Consultant',
  },
];

export default {
  title: 'Select',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Select</h1>
              <p>
                Basic select component which supports searching, multi select
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
    filterable: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    multiple: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    onOptionsChange: {
      action: 'click',
    },
    shape: {
      options: [SelectShape.Rectangle, SelectShape.Pill, SelectShape.Underline],
      control: { type: 'inline-radio' },
    },
    size: {
      options: [
        SelectSize.Flex,
        SelectSize.Large,
        SelectSize.Medium,
        SelectSize.Small,
      ],
      control: { type: 'radio' },
    },
    status: {
      options: ['success', 'warning', 'error', 'validating', 'highlight', ''],
      control: 'select',
    },
    theme: {
      options: [
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
      ],
      control: 'select',
    },
  },
} as ComponentMeta<typeof Select>;

const Wrapper: FC<SelectProps> = ({ children }) => {
  return <div style={{ marginTop: 80 }}>{children}</div>;
};

const DynamicSelect: FC<SelectProps> = (args) => {
  const timer = useRef<ReturnType<typeof setTimeout>>(null);
  const [options, setOptions] = useState(defaultOptions);
  const [isLoading, setIsLoading] = useState(false);
  const loadOptions = (searchString: string) => {
    setIsLoading(true);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      const filtered = defaultOptions.filter((option) =>
        option.text.toLowerCase().includes(searchString.toLowerCase())
      );
      const options: SelectOption[] = filtered;
      setOptions(options);
      setIsLoading(false);
    }, 2000);
  };
  return (
    <Select
      {...args}
      filterable={true}
      isLoading={isLoading}
      loadOptions={loadOptions}
      options={options}
    ></Select>
  );
};

const Basic_Story: ComponentStory<typeof Select> = (args) => {
  if (args.multiple) {
    return (
      <Wrapper>
        <Select {...args} />
      </Wrapper>
    );
  }
  return <Select {...args} />;
};

const Dynamic_Story: ComponentStory<typeof Select> = (args) => (
  <DynamicSelect {...args} />
);

const Shared_State_Story: ComponentStory<typeof Select> = (args) => {
  const [filteredRoleList, setFilteredRoleList] =
    useState<Role[]>(sampleRoleList);
  const [myLocation, setMyLocation] = useState(null);

  const locationSelectOneRef = useRef<HTMLDivElement>(null);
  const locationSelectTwoRef = useRef<HTMLDivElement>(null);

  const onLocationSelectChange = useCallback(
    async (options: SelectOption[]) => {
      for (const option of options) {
        setMyLocation(option);

        const getLocationResults = async (
          option: SelectOption
        ): Promise<Role[]> => {
          if (option === locations.current) {
            return sampleRoleList.filter((role) => role.current);
          } else {
            return sampleRoleList.filter((role) =>
              Object.values(role).some((value) =>
                value.toString().includes(option)
              )
            );
          }
        };

        const results = await getLocationResults(option);
        setFilteredRoleList(results.map((role, index) => ({ ...role, index })));
      }
    },
    [sampleRoleList, filteredRoleList]
  );

  return (
    <Stack direction="vertical" flexGap="xxl" fullWidth>
      <Stack direction="vertical" flexGap="xs" fullWidth>
        <Label id="select-one-label" size={LabelSize.Medium} text="Select A" />
        <Select
          {...args}
          aria-labelledby="select-one-label"
          clearable
          value={myLocation}
          filterable
          initialFocus={false}
          inputWidth={TextInputWidth.fill}
          onClear={() => {
            setMyLocation('');
            setFilteredRoleList(sampleRoleList);
          }}
          onOptionsChange={(options: SelectOption[]) =>
            onLocationSelectChange(options)
          }
          options={locationOptions}
          ref={locationSelectOneRef}
          shape={SelectShape.Pill}
          style={{ minWidth: 'fit-content' }}
          textInputProps={{
            iconProps: { path: IconName.mdiMapMarkerOutline },
            placeholder: 'City, state, zip code, or "hybrid"',
          }}
        />
      </Stack>
      <Stack direction="vertical" flexGap="xs" fullWidth>
        <Label id="select-two-label" size={LabelSize.Medium} text="Select B" />
        <Select
          {...args}
          aria-labelledby="select-two-label"
          clearable
          value={myLocation}
          filterable
          initialFocus={false}
          inputWidth={TextInputWidth.fill}
          onClear={() => {
            setMyLocation('');
            setFilteredRoleList(sampleRoleList);
          }}
          onOptionsChange={(options: SelectOption[]) =>
            onLocationSelectChange(options)
          }
          options={locationOptions}
          ref={locationSelectTwoRef}
          shape={SelectShape.Pill}
          style={{ minWidth: 'fit-content' }}
          textInputProps={{
            iconProps: { path: IconName.mdiMapMarkerOutline },
            placeholder: 'City, state, zip code, or "hybrid"',
          }}
        />
      </Stack>
      <Stack direction="vertical" flexGap="xs" fullWidth>
        <Label
          id="filtered-location-label"
          size={LabelSize.Medium}
          text="Filtered location"
        />
        <List
          aria-labelledby="filtered-location-label"
          items={filteredRoleList}
          layout="vertical"
          renderItem={(item: Role) => (
            <p>
              {typeof item.geo === 'string' ? item.geo : item.geo?.join(' • ')}{' '}
              - {item.location ? item.location : 'Remote'}
            </p>
          )}
        />
      </Stack>
    </Stack>
  );
};

export type SelectStory = ComponentStory<React.FC<SelectProps>>;

export const Basic: SelectStory = Basic_Story.bind({});
export const Dynamic_Width: SelectStory = Basic_Story.bind({});
export const With_Default_Value: SelectStory = Basic_Story.bind({});
export const With_Default_Value_Multiple: SelectStory = Basic_Story.bind({});
export const Disabled: SelectStory = Basic_Story.bind({});
export const With_Clear: SelectStory = Basic_Story.bind({});
export const Options_Disabled: SelectStory = Basic_Story.bind({});
export const Filterable: SelectStory = Basic_Story.bind({});
export const Multiple: SelectStory = Basic_Story.bind({});
export const Multiple_With_No_Filter: SelectStory = Basic_Story.bind({});
export const Dynamic: SelectStory = Dynamic_Story.bind({});
export const Shared_State: SelectStory = Shared_State_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Basic',
  'Dynamic_Width',
  'With_Default_Value',
  'With_Default_Value_Multiple',
  'Disabled',
  'With_Clear',
  'Options_Disabled',
  'Filterable',
  'Multiple',
  'Multiple_With_No_Filter',
  'Dynamic',
  'Shared_State',
];

const SelectArgs: SelectProps = {
  classNames: 'octuple-select-class',
  configContextProps: {
    noDisabledContext: false,
    noShapeContext: false,
    noSizeContext: false,
    noThemeContext: false,
  },
  theme: '' as OcThemeName,
  themeContainerId: 'my-textinput-theme-container',
  toggleOptions: true,
  maxPillCount: true,
  disabled: false,
  status: '',
  readonly: false,
  'data-test-id': 'octuple-select-test-id',
  shape: SelectShape.Rectangle,
  size: SelectSize.Medium,
  style: {
    width: 256,
  },
  options: defaultOptions,
};

Basic.args = {
  ...SelectArgs,
};

Dynamic_Width.args = {
  ...SelectArgs,
  style: {
    width: '100%',
  },
};

With_Default_Value.args = {
  ...Basic.args,
  defaultValue: 'hat',
};

With_Default_Value_Multiple.args = {
  ...Basic.args,
  defaultValue: ['verylarge', 'account', 'hat'],
  multiple: true,
  style: {
    width: 324,
  },
};

Disabled.args = {
  ...With_Default_Value.args,
  disabled: true,
  textInputProps: {
    ...With_Default_Value.args.textInputProps,
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
  ...With_Default_Value.args,
  textInputProps: {
    ...With_Default_Value.args.textInputProps,
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
  style: {
    width: '100%',
  },
};

Multiple_With_No_Filter.args = {
  ...Basic.args,
  filterable: false,
  multiple: true,
  textInputProps: {
    ...Basic.args.textInputProps,
    clearable: true,
  },
  style: {
    width: '100%',
  },
};

Dynamic.args = {
  ...Basic.args,
  textInputProps: {
    ...Basic.args.textInputProps,
    clearable: true,
  },
};
