import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Pill, PillIconAlign, PillSize, PillThemeName, PillType } from './';
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
                Pills should be used when representing an input, as a way to
                filter content, or to represent an attribute.
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
    alignIcon: {
      options: [PillIconAlign.Start, PillIconAlign.End],
      control: { type: 'radio' },
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

const themes: PillThemeName[] = [
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
  'white',
];

const Pill_Story: ComponentStory<typeof Pill> = (args) => (
  <Stack direction="vertical" flexGap="l">
    {themes.map((theme) => (
      <Pill {...args} label={theme} theme={theme} key={theme} />
    ))}
  </Stack>
);

const With_Long_Text_Story: ComponentStory<typeof Pill> = (args) => (
  <Stack direction="vertical" flexGap="l" style={{ width: 216 }}>
    {themes.map((theme) => (
      <Pill
        {...args}
        label={'Some very long text is present here'}
        theme={theme}
        key={theme}
      />
    ))}
  </Stack>
);

export const Default = Pill_Story.bind({});
export const With_Icon = Pill_Story.bind({});
export const Closable = Pill_Story.bind({});
export const Custom_Closable = Pill_Story.bind({});
export const With_Button = Pill_Story.bind({});
export const With_Long_Text = With_Long_Text_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Default',
  'With_Icon',
  'Closable',
  'Custom_Closable',
  'With_Button',
  'With_Long_Text',
];

const pillArgs: Object = {
  alignIcon: PillIconAlign.Start,
  gradient: false,
  size: PillSize.Large,
  type: PillType.default,
  label: 'Pill label',
  lineClamp: 0,
  disabled: false,
  configContextProps: {
    noDisabledContext: false,
    noGradientContext: false,
    noSizeContext: false,
  },
  closeButtonProps: {
    ariaLabel: 'Close',
  },
  pillButtonProps: {
    iconProps: { path: IconName.mdiThumbUpOutline },
    counter: 2,
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

Custom_Closable.args = {
  ...pillArgs,
  closeButtonProps: {
    ariaLabel: 'Remove',
    iconProps: {
      path: IconName.mdiTrashCanOutline,
    },
  },
  size: PillSize.Medium,
  type: PillType.closable,
};

With_Button.args = {
  ...pillArgs,
  type: PillType.withButton,
};

With_Long_Text.args = {
  ...pillArgs,
  lineClamp: 1,
};
