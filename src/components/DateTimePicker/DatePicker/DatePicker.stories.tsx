import React, { useState } from 'react';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { Stories } from '@storybook/addon-docs';
import { ButtonVariant } from '../../Button';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DatePicker from './';
import { DatePickerShape, DatePickerSize } from './';
import type { DatePickerProps, RangePickerProps } from './';
import { Stack } from '../../Stack';

export default {
  title: 'Date Picker',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Date Picker</h1>
              <p>
                Use the <b>DatePicker</b> To select or input a date. By clicking
                the input box, you can select a date from a popup calendar.
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
    allowClear: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    autoFocus: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    bordered: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    changeOnBlur: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    dropdownClassNames: {
      control: { type: 'text' },
    },
    inputReadOnly: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    open: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    shape: {
      options: [
        DatePickerShape.Rectangle,
        DatePickerShape.Pill,
        DatePickerShape.Underline,
      ],
      control: { type: 'inline-radio' },
    },
    size: {
      options: [
        DatePickerSize.Flex,
        DatePickerSize.Large,
        DatePickerSize.Medium,
        DatePickerSize.Small,
      ],
      control: { type: 'radio' },
    },
    status: {
      options: ['error', 'warning'],
      control: { type: 'radio' },
    },
    popupPlacement: {
      options: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof DatePicker>;

const Single_Picker_Story: ComponentStory<typeof DatePicker> = (args) => {
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Stack direction="vertical" flexGap="m">
      <DatePicker {...args} onChange={onChange} />
      <DatePicker {...args} onChange={onChange} picker="week" />
      <DatePicker {...args} onChange={onChange} picker="month" />
      <DatePicker {...args} onChange={onChange} picker="quarter" />
      <DatePicker {...args} onChange={onChange} picker="year" />
    </Stack>
  );
};

const Single_Picker_Readonly_Story: ComponentStory<typeof DatePicker> = (
  args
) => {
  return (
    <Stack direction="vertical" flexGap="m">
      <DatePicker {...args} defaultValue={dayjs('2023-10-24', dateFormat)} />
    </Stack>
  );
};

const Single_Picker_Disabled_Story: ComponentStory<typeof DatePicker> = (
  args
) => {
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Stack direction="vertical" flexGap="m">
      <DatePicker {...args} onChange={onChange} />
      <DatePicker {...args} defaultValue={dayjs('2015-06-06', dateFormat)} />
    </Stack>
  );
};

const Single_Picker_Disabled_Date_and_Time_Story: ComponentStory<
  typeof DatePicker
> = (args) => {
  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };

  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  });
  return (
    <Stack direction="vertical" flexGap="m">
      <DatePicker
        {...args}
        format="YYYY-MM-DD HH:mm:ss"
        disabledDate={disabledDate}
        disabledTime={disabledDateTime}
        showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
      />
      <DatePicker {...args} picker="month" disabledDate={disabledDate} />
    </Stack>
  );
};

const Single_Picker_Choose_Time_Story: ComponentStory<typeof DatePicker> = (
  args
) => {
  const onChange = (
    value: DatePickerProps['value'],
    dateString: [string, string] | string
  ) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };

  const onOk = (value: DatePickerProps['value']) => {
    console.log('onOk: ', value);
  };

  return <DatePicker {...args} showTime onChange={onChange} onOk={onOk} />;
};

const Single_Picker_Choose_Time_Hide_Buttons_Story: ComponentStory<
  typeof DatePicker
> = (args) => {
  const onChange = (
    value: DatePickerProps['value'],
    dateString: [string, string] | string
  ) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };

  return <DatePicker {...args} showTime onChange={onChange} />;
};

const { RangePicker } = DatePicker;

const Range_Picker_Story: ComponentStory<typeof RangePicker> = (args) => {
  return (
    <Stack direction="vertical" flexGap="m">
      <RangePicker {...args} />
      <RangePicker {...args} picker="week" />
      <RangePicker {...args} picker="month" />
      <RangePicker {...args} picker="quarter" />
      <RangePicker {...args} picker="year" />
    </Stack>
  );
};

const Range_Picker_Choose_Time_Story: ComponentStory<typeof RangePicker> = (
  args
) => {
  const onChange = (
    value: RangePickerProps['value'],
    dateString: [string, string] | string
  ) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };

  const onOk = (value: RangePickerProps['value']) => {
    console.log('onOk: ', value);
  };

  return (
    <RangePicker
      {...args}
      showTime={{ format: 'HH:mm' }}
      format="YYYY-MM-DD HH:mm"
      onChange={onChange}
      onOk={onOk}
    />
  );
};

const Range_Picker_Choose_Time_Hide_Buttons_Story: ComponentStory<
  typeof RangePicker
> = (args) => {
  const onChange = (
    value: RangePickerProps['value'],
    dateString: [string, string] | string
  ) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };

  return (
    <RangePicker
      {...args}
      showTime={{ format: 'HH:mm' }}
      format="YYYY-MM-DD HH:mm"
      onChange={onChange}
    />
  );
};

const Range_Picker_Readonly_Story: ComponentStory<typeof RangePicker> = (
  args
) => {
  return (
    <Stack direction="vertical" flexGap="m">
      <RangePicker
        {...args}
        defaultValue={[
          dayjs('2023-10-23', dateFormat),
          dayjs('2023-10-27', dateFormat),
        ]}
      />
    </Stack>
  );
};

const Range_Picker_Disabled_Story: ComponentStory<typeof RangePicker> = (
  args
) => {
  return (
    <Stack direction="vertical" flexGap="m">
      <RangePicker {...args} />
      <RangePicker
        {...args}
        defaultValue={[
          dayjs('2015-06-06', dateFormat),
          dayjs('2015-06-06', dateFormat),
        ]}
      />
    </Stack>
  );
};

const Range_Picker_Disabled_Date_and_Time_Story: ComponentStory<
  typeof RangePicker
> = (args) => {
  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };

  const disabledRangeTime: RangePickerProps['disabledTime'] = (_, type) => {
    if (type === 'start') {
      return {
        disabledHours: () => range(0, 60).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    }
    return {
      disabledHours: () => range(0, 60).splice(20, 4),
      disabledMinutes: () => range(0, 31),
      disabledSeconds: () => [55, 56],
    };
  };

  return (
    <Stack direction="vertical" flexGap="m">
      <RangePicker {...args} disabledDate={disabledDate} />
      <RangePicker
        {...args}
        disabledDate={disabledDate}
        disabledTime={disabledRangeTime}
        showTime={{
          hideDisabledOptions: true,
          defaultValue: [
            dayjs('00:00:00', 'HH:mm:ss'),
            dayjs('11:59:59', 'HH:mm:ss'),
          ],
        }}
        format="YYYY-MM-DD HH:mm:ss"
      />
    </Stack>
  );
};

const Preset_Ranges_Story: ComponentStory<typeof RangePicker> = (args) => {
  const onChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
    if (dates) {
      console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    } else {
      console.log('Clear');
    }
  };

  return (
    <Stack direction="vertical" flexGap="m">
      <RangePicker
        {...args}
        ranges={{
          Today: [dayjs(), dayjs()],
          'This Month': [dayjs().startOf('month'), dayjs().endOf('month')],
        }}
        onChange={onChange}
      />
      <RangePicker
        {...args}
        ranges={{
          Today: [dayjs(), dayjs()],
          'This Month': [dayjs().startOf('month'), dayjs().endOf('month')],
        }}
        showTime
        format="YYYY/MM/DD HH:mm:ss"
        onChange={onChange}
      />
    </Stack>
  );
};

const Select_Range_By_Day_Limit_Story: ComponentStory<typeof RangePicker> = (
  args
) => {
  type RangeValue = [Dayjs | null, Dayjs | null] | null;

  const [dates, setDates] = useState<RangeValue>(null);
  const [hackValue, setHackValue] = useState<RangeValue>(null);
  const [value, setValue] = useState<RangeValue>(null);

  const disabledDate = (current: Dayjs) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 7;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 7;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setHackValue([null, null]);
      setDates([null, null]);
    } else {
      setHackValue(null);
    }
  };

  return (
    <RangePicker
      {...args}
      value={hackValue || value}
      disabledDate={disabledDate}
      onCalendarChange={(val) => setDates(val)}
      onChange={(val) => setValue(val)}
      onOpenChange={onOpenChange}
    />
  );
};

const dateFormat = 'YYYY/MM/DD';
const weekFormat = 'MM/DD/YYYY';
const monthFormat = 'YYYY/MM';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const weekStartEndFormat: DatePickerProps['format'] = (value) =>
  `${dayjs(value).startOf('week').format(weekFormat)} to ${dayjs(value)
    .endOf('week')
    .format(weekFormat)}`;

const customFormat: DatePickerProps['format'] = (value) =>
  `custom format: ${value.format(dateFormat)}`;

const Date_Format_Basic_Story: ComponentStory<typeof DatePicker> = (args) => {
  return (
    <Stack direction="vertical" flexGap="m">
      <DatePicker
        {...args}
        defaultValue={dayjs('2023/01/01', dateFormat)}
        format={dateFormat}
      />
      <DatePicker
        {...args}
        defaultValue={dayjs('01/01/2023', dateFormatList[0])}
        format={dateFormatList}
      />
      <DatePicker
        {...args}
        defaultValue={dayjs('2023/01', monthFormat)}
        format={monthFormat}
        picker="month"
      />
      <DatePicker
        {...args}
        defaultValue={dayjs()}
        format={weekStartEndFormat}
        picker="week"
      />
      <DatePicker
        {...args}
        defaultValue={dayjs('2023/01/01', dateFormat)}
        format={customFormat}
      />
    </Stack>
  );
};

const Date_Format_Range_Story: ComponentStory<typeof RangePicker> = (args) => (
  <RangePicker
    {...args}
    defaultValue={[
      dayjs('2023/01/01', dateFormat),
      dayjs('2023/01/01', dateFormat),
    ]}
    format={dateFormat}
  />
);

const Extra_Footer_Story: ComponentStory<typeof DatePicker> = (args) => (
  <DatePicker {...args} renderExtraFooter={() => 'extra footer'} />
);

const Customized_Date_Styling_Story: ComponentStory<typeof RangePicker> = (
  args
) => (
  <RangePicker
    {...args}
    dateRender={(current) => {
      const style: React.CSSProperties = {};
      if (current.date() === 1) {
        style.border = '1px solid green';
        style.background = 'green';
        style.color = 'white';
        style.borderRadius = '0';
        style.height = '100%';
        style.display = 'flex';
        style.justifyContent = 'center';
        style.alignItems = 'center';
      }
      return (
        <div className="picker-cell-inner" style={style}>
          {current.date()}
        </div>
      );
    }}
  />
);

const Single_Borderless_Story: ComponentStory<typeof DatePicker> = (args) => {
  return <DatePicker {...args} />;
};

const Range_Borderless_Story: ComponentStory<typeof RangePicker> = (args) => {
  return <RangePicker {...args} />;
};

const Single_Status_Story: ComponentStory<typeof DatePicker> = (args) => {
  return (
    <Stack direction="vertical" flexGap="m">
      <DatePicker {...args} status="error" />
      <DatePicker {...args} status="warning" />
    </Stack>
  );
};

const Range_Status_Story: ComponentStory<typeof RangePicker> = (args) => {
  return (
    <Stack direction="vertical" flexGap="m">
      <RangePicker {...args} status="error" />
      <RangePicker {...args} status="warning" />
    </Stack>
  );
};

export const Single_Picker = Single_Picker_Story.bind({});
export const Single_Picker_Readonly = Single_Picker_Readonly_Story.bind({});
export const Single_Picker_Disabled = Single_Picker_Disabled_Story.bind({});
export const Single_Picker_Disabled_Date_and_Time =
  Single_Picker_Disabled_Date_and_Time_Story.bind({});
export const Single_Picker_Choose_Time = Single_Picker_Choose_Time_Story.bind(
  {}
);
export const Single_Picker_Choose_Time_Hide_Buttons =
  Single_Picker_Choose_Time_Hide_Buttons_Story.bind({});
export const Range_Picker = Range_Picker_Story.bind({});
export const Range_Picker_Readonly = Range_Picker_Readonly_Story.bind({});
export const Range_Picker_Disabled = Range_Picker_Disabled_Story.bind({});
export const Range_Picker_Disabled_Date_and_Time =
  Range_Picker_Disabled_Date_and_Time_Story.bind({});
export const Range_Picker_Choose_Time = Range_Picker_Choose_Time_Story.bind({});
export const Range_Picker_Choose_Time_Hide_Buttons =
  Range_Picker_Choose_Time_Hide_Buttons_Story.bind({});
export const Preset_Ranges = Preset_Ranges_Story.bind({});
export const Select_Range_By_Day_Limit = Select_Range_By_Day_Limit_Story.bind(
  {}
);
export const Date_Format_Basic = Date_Format_Basic_Story.bind({});
export const Date_Format_Range = Date_Format_Range_Story.bind({});
export const Extra_Footer = Extra_Footer_Story.bind({});
export const Customized_Date_Styling = Customized_Date_Styling_Story.bind({});
export const Single_Borderless = Single_Borderless_Story.bind({});
export const Range_Borderless = Range_Borderless_Story.bind({});
export const Single_Status = Single_Status_Story.bind({});
export const Range_Status = Range_Status_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Single_Picker',
  'Single_Picker_Readonly',
  'Single_Picker_Disabled',
  'Single_Picker_Disabled_Date_and_Time',
  'Single_Picker_Choose_Time',
  'Single_Picker_Choose_Time_Hide_Buttons',
  'Range_Picker',
  'Range_Picker_Readonly',
  'Range_Picker_Disabled',
  'Range_Picker_Disabled_Date_and_Time',
  'Range_Picker_Choose_Time',
  'Range_Picker_Choose_Time_Hide_Buttons',
  'Preset_Ranges',
  'Select_Range_By_Day_Limit',
  'Date_Format_Basic',
  'Date_Format_Range',
  'Extra_Footer',
  'Customized_Date_Styling',
  'Single_Borderless',
  'Range_Borderless',
  'Single_Status',
  'Range_Status',
];

const pickerArgs: Object = {
  classNames: 'my-picker-class',
  id: 'myPickerInputId',
  popupPlacement: 'bottomLeft',
  shape: DatePickerShape.Rectangle,
  size: DatePickerSize.Medium,
  changeOnBlur: true,
  nowButtonProps: null,
  okButtonProps: { variant: ButtonVariant.Primary },
  showNow: true,
  showOk: true,
  showToday: true,
  todayActive: true,
  todayButtonProps: null,
};

Single_Picker.args = {
  ...pickerArgs,
};

Single_Picker_Readonly.args = {
  ...pickerArgs,
  readonly: true,
};

Single_Picker_Disabled.args = {
  ...pickerArgs,
  disabled: true,
};

Single_Picker_Disabled_Date_and_Time.args = {
  ...pickerArgs,
};

Single_Picker_Choose_Time.args = {
  ...pickerArgs,
};

Single_Picker_Choose_Time_Hide_Buttons.args = {
  ...pickerArgs,
  showNow: false,
  showOk: false,
};

Range_Picker.args = {
  ...pickerArgs,
  showToday: false, // The range picker default is false, this is for Storybook args only.
};

Range_Picker_Readonly.args = {
  ...pickerArgs,
  showToday: false,
  readonly: [true, true],
};

Range_Picker_Disabled.args = {
  ...pickerArgs,
  showToday: false,
  disabled: [true, true],
};

Range_Picker_Disabled_Date_and_Time.args = {
  ...pickerArgs,
  showToday: false,
};

Range_Picker_Choose_Time.args = {
  ...pickerArgs,
  showToday: false,
};

Range_Picker_Choose_Time_Hide_Buttons.args = {
  ...pickerArgs,
  showToday: false,
  showNow: false,
  showOk: false,
};

Preset_Ranges.args = {
  ...pickerArgs,
  showToday: false,
};

Select_Range_By_Day_Limit.args = {
  ...pickerArgs,
  showToday: false,
};

Date_Format_Basic.args = {
  ...pickerArgs,
};

Date_Format_Range.args = {
  ...pickerArgs,
  showToday: false,
};

Extra_Footer.args = {
  ...pickerArgs,
};

Customized_Date_Styling.args = {
  ...pickerArgs,
  showToday: false,
};

Single_Borderless.args = {
  ...pickerArgs,
  bordered: false,
};

Range_Borderless.args = {
  ...pickerArgs,
  showToday: false,
  bordered: false,
};

Single_Status.args = {
  ...pickerArgs,
};

Range_Status.args = {
  ...pickerArgs,
  showToday: false,
};
