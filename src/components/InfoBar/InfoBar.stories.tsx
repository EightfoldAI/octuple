import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InfoBar, InfoBarType } from './';
import { IconName } from '../Icon';

export default {
  title: 'Info Bar',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Info Bar</h1>
              <p>
                Info bars are used to display information people will need to
                pay attention to immediately. Depending on the severeity and
                context of the alert, info bars can have close button on the
                right and another call-to-action for someone to take action.
                They spread across the full width of a section.
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
} as ComponentMeta<typeof InfoBar>;

const InfoBar_Story: ComponentStory<typeof InfoBar> = (args) => (
  <InfoBar {...args} />
);

export const Neutral = InfoBar_Story.bind({});
export const Positive = InfoBar_Story.bind({});
export const Warning = InfoBar_Story.bind({});
export const Disruptive = InfoBar_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Neutral',
  'Positive',
  'Warning',
  'Disruptive',
];

const infoBarArgs: Object = {
  actionButtonProps: {
    ariaLabel: 'Action',
    classNames: 'my-action-btn-class',
    'data-test-id': 'my-action-btn-test-id',
    iconProps: null,
    id: 'myActionButton',
    text: 'Action',
  },
  bordered: false,
  closable: true,
  content: 'Body2 is used inside here.',
  style: {},
  classNames: 'my-info-bar-class',
  closeButtonProps: {
    classNames: 'my-close-btn-class',
    'data-test-id': 'my-close-btn-test-id',
    id: 'myCloseButton',
  },
  closeIcon: IconName.mdiClose,
  configContextProps: {
    noGradientContext: false,
    noThemeContext: false,
  },
  theme: '',
  themeContainerId: 'my-infobar-theme-container',
  gradient: false,
  icon: IconName.mdiCheckCircle,
  role: 'alert',
  type: InfoBarType.positive,
};

Neutral.args = {
  ...infoBarArgs,
  icon: IconName.mdiInformation,
  type: InfoBarType.neutral,
};

Positive.args = {
  ...infoBarArgs,
};

Warning.args = {
  ...infoBarArgs,
  icon: IconName.mdiAlertCircle,
  type: InfoBarType.warning,
};

Disruptive.args = {
  ...infoBarArgs,
  icon: IconName.mdiInformation,
  type: InfoBarType.disruptive,
};
