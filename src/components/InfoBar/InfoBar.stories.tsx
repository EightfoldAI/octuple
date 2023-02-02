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
} as ComponentMeta<typeof InfoBar>;

const Neutral_Story: ComponentStory<typeof InfoBar> = (args) => (
  <InfoBar {...args} />
);

export const Neutral = Neutral_Story.bind({});

const Positive_Story: ComponentStory<typeof InfoBar> = (args) => (
  <InfoBar {...args} />
);

export const Positive = Positive_Story.bind({});

const Warning_Story: ComponentStory<typeof InfoBar> = (args) => (
  <InfoBar {...args} />
);

export const Warning = Warning_Story.bind({});

const Disruptive_Story: ComponentStory<typeof InfoBar> = (args) => (
  <InfoBar {...args} />
);

export const Disruptive = Disruptive_Story.bind({});

const infoBarArgs: Object = {
  actionButtonProps: {
    ariaLabel: 'Action',
    classNames: 'my-action-btn-class',
    'data-test-id': 'my-action-btn-test-id',
    iconProps: null,
    id: 'myActionButton',
    text: 'Action',
  },
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
