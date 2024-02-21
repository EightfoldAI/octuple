import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Progress, { ProgressSize } from '.';
import { Stack } from '../Stack';
import { Tooltip, TooltipTheme } from '../Tooltip';
import { ProgressVariant } from './Progress.types';

export default {
  title: 'Progress',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Progress</h1>
              <p>
                Displays the current progress of an operation flow. If it'll
                take a long time to complete an operation, use Progress to show
                current progress and status.
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
    size: {
      options: [ProgressSize.Large, ProgressSize.Medium, ProgressSize.Small],
      control: { type: 'radio' },
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
    variant: {
      options: [ProgressVariant.Default, ProgressVariant.Pill],
      control: { type: 'inline-radio' },
    },
  },
} as ComponentMeta<typeof Progress>;

const Line_Story: ComponentStory<typeof Progress> = (args) => {
  return (
    <Stack direction={'vertical'} flexGap={'s'} fullWidth>
      <Progress
        {...args}
        percent={30}
        format={(percent, _successPercent) => percent + '%' + ' complete'}
        hideMax
      />
      <Progress {...args} percent={30} />
      <Progress
        {...args}
        percent={50}
        showPercentSymbol={false}
        status={'active'}
      />
      <Progress
        {...args}
        percent={50}
        showPercentSymbol={false}
        showValueLabel
      />
      <Progress {...args} percent={70} status={'exception'} />
      <Progress {...args} percent={100} />
      <Progress {...args} percent={50} showLabels={false} />
    </Stack>
  );
};

const Small_Line_Story: ComponentStory<typeof Progress> = (args) => {
  return (
    <Stack direction={'vertical'} flexGap={'s'} style={{ width: 200 }}>
      <Progress
        {...args}
        percent={30}
        showPercentSymbol={false}
        size={ProgressSize.Small}
        width={200}
      />
      <Progress
        {...args}
        percent={30}
        showPercentSymbol={false}
        showValueLabel
        size={ProgressSize.Small}
        width={200}
      />
      <Progress
        {...args}
        percent={50}
        size={ProgressSize.Small}
        status={'active'}
        width={200}
      />
      <Progress
        {...args}
        percent={70}
        size={ProgressSize.Small}
        status={'exception'}
        width={200}
      />
      <Progress {...args} percent={100} size={ProgressSize.Small} width={200} />
    </Stack>
  );
};

const Circle_Story: ComponentStory<typeof Progress> = (args) => {
  return (
    <Stack direction={'vertical'} flexGap={'s'} fullWidth>
      <Progress {...args} type={'circle'} percent={75} />
      <Progress {...args} type={'circle'} percent={70} status={'exception'} />
      <Progress {...args} type={'circle'} percent={100} />
    </Stack>
  );
};

const Small_Circle_Story: ComponentStory<typeof Progress> = (args) => {
  return (
    <Stack direction={'vertical'} flexGap={'s'} style={{ width: 200 }}>
      <Progress
        {...args}
        type={'circle'}
        percent={30}
        size={ProgressSize.Small}
        width={80}
      />
      <Progress
        {...args}
        type={'circle'}
        percent={70}
        size={ProgressSize.Small}
        status={'exception'}
        width={80}
      />
      <Progress
        {...args}
        type={'circle'}
        percent={100}
        size={ProgressSize.Small}
        width={80}
      />
    </Stack>
  );
};

const Dashboard_Story: ComponentStory<typeof Progress> = (args) => {
  return (
    <Stack direction={'vertical'} flexGap={'s'} style={{ width: 200 }}>
      <Progress {...args} type="dashboard" percent={75} />
      <Progress {...args} type="dashboard" percent={75} gapDegree={30} />
    </Stack>
  );
};

const Line_Cap_Story: ComponentStory<typeof Progress> = (args) => {
  return (
    <Stack direction={'vertical'} flexGap={'s'} style={{ width: 200 }}>
      <Progress {...args} strokeLinecap={'butt'} percent={75} />
      <Progress {...args} strokeLinecap={'butt'} type={'circle'} percent={75} />
      <Progress
        {...args}
        strokeLinecap={'butt'}
        type={'dashboard'}
        percent={75}
      />
    </Stack>
  );
};

const Steps_Story: ComponentStory<typeof Progress> = (args) => {
  return (
    <Stack direction={'vertical'} flexGap={'l'} fullWidth>
      <Progress
        {...args}
        percent={50}
        size={ProgressSize.Small}
        steps={3}
        stepWidth={24}
        width={96}
      />
      <Progress {...args} percent={30} steps={5} showValueLabel />
      <Progress
        {...args}
        percent={100}
        steps={5}
        strokeColor={'var(--progress-success-background-color)'}
      />
      <Progress
        {...args}
        percent={60}
        steps={5}
        strokeColor={[
          'var(--progress-success-background-color)',
          'var(--progress-success-background-color)',
          'var(--progress-error-background-color)',
        ]}
      />
      <Progress {...args} percent={30} steps={6} showLabels={false} />
    </Stack>
  );
};

const Success_Segment_Story: ComponentStory<typeof Progress> = (args) => {
  return (
    <Stack direction={'vertical'} flexGap={'l'} fullWidth>
      <Tooltip
        content={'3 done / 3 in progress / 4 to do'}
        offset={-24}
        theme={TooltipTheme.dark}
      >
        <Progress
          {...args}
          percent={60}
          success={{ percent: 30 }}
          showSuccessLabel
          showValueLabel
        />
      </Tooltip>
      <div style={{ width: 120 }}>
        <Tooltip
          content={'3 done / 3 in progress / 4 to do'}
          theme={TooltipTheme.dark}
        >
          <Progress
            {...args}
            percent={60}
            success={{ percent: 30 }}
            type={'circle'}
            width={120}
          />
        </Tooltip>
      </div>
      <div style={{ width: 120 }}>
        <Tooltip
          content={'3 done / 3 in progress / 4 to do'}
          theme={TooltipTheme.dark}
        >
          <Progress
            {...args}
            percent={60}
            success={{ percent: 30 }}
            type={'dashboard'}
          />
        </Tooltip>
      </div>
    </Stack>
  );
};

const Gradient_Story: ComponentStory<typeof Progress> = (args) => {
  return (
    <Stack direction={'vertical'} flexGap={'s'} fullWidth>
      <Progress
        {...args}
        strokeColor={{
          '0.01%': '#3186c8',
          '18.01%': '#269fca',
          '38.02%': '#1db4cc',
          '50.02%': '#1abbcd',
          '100.03%': '#6fc6aa',
        }}
        percent={99.9}
      />
      <Progress
        {...args}
        strokeColor={{
          from: '#3186c8',
          to: '#6fc6aa',
        }}
        percent={99.9}
        status={'active'}
      />
      <Progress
        {...args}
        type={'circle'}
        strokeColor={{
          '0.01%': '#3186c8',
          '18.01%': '#269fca',
          '38.02%': '#1db4cc',
          '50.02%': '#1abbcd',
          '100.03%': '#6fc6aa',
        }}
        percent={90}
      />
      <Progress
        {...args}
        type={'circle'}
        strokeColor={{
          '0%': '#3186c8',
          '100%': '#6fc6aa',
        }}
        percent={100}
      />
    </Stack>
  );
};

export const Line = Line_Story.bind({});
export const Line_Pill = Line_Story.bind({});
export const Small_Line = Small_Line_Story.bind({});
export const Small_Line_Pill = Small_Line_Story.bind({});
export const Circle = Circle_Story.bind({});
export const Small_Circle = Small_Circle_Story.bind({});
export const Dashboard = Dashboard_Story.bind({});
export const Line_Cap = Line_Cap_Story.bind({});
export const Steps = Steps_Story.bind({});
export const Steps_Pill = Steps_Story.bind({});
export const Success_Segment = Success_Segment_Story.bind({});
export const Gradient = Gradient_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Line',
  'Line_Pill',
  'Small_Line',
  'Small_Line_Pill',
  'Circle',
  'Small_Circle',
  'Dashboard',
  'Line_Cap',
  'Steps',
  'Steps_Pill',
  'Success_Segment',
  'Gradient',
];

const progressArgs: Object = {
  bordered: true,
  classNames: 'my-progress',
  configContextProps: {
    noThemeContext: false,
  },
  theme: '',
  themeContainerId: 'my-progress-theme-container',
  gapDegree: null,
  gapPosition: null,
  hideMax: false,
  hideMin: false,
  percent: 0,
  showLabels: true,
  showPercentSymbol: true,
  showSuccessLabel: false,
  showValueLabel: false,
  size: ProgressSize.Medium,
};

Line.args = {
  ...progressArgs,
};

Line_Pill.args = {
  ...progressArgs,
  pillBordered: true,
  variant: ProgressVariant.Pill,
};

Small_Line.args = {
  ...progressArgs,
};

Small_Line_Pill.args = {
  ...progressArgs,
  pillBordered: true,
  variant: ProgressVariant.Pill,
};

Circle.args = {
  ...progressArgs,
};

Small_Circle.args = {
  ...progressArgs,
};

Dashboard.args = {
  ...progressArgs,
};

Line_Cap.args = {
  ...progressArgs,
};

Steps.args = {
  ...progressArgs,
};

Steps_Pill.args = {
  ...progressArgs,
  pillBordered: true,
  variant: ProgressVariant.Pill,
};

Success_Segment.args = {
  ...progressArgs,
};

Gradient.args = {
  ...progressArgs,
};
