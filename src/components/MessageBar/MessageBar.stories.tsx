import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MessageBar, MessageBarType } from '.';
import { IconName } from '../Icon';

export default {
  title: 'Message Bar',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Message Bar</h1>
              <p>
                These alret banners run across the whole viewport of the
                interface. They are to be put at the top of the page to alert
                the important message to the user. Depending on the severeity
                and context of the alert, these banners can have close button on
                the right and another CTA for the users to take action.
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
} as ComponentMeta<typeof MessageBar>;

const Neutral_Story: ComponentStory<typeof MessageBar> = (args) => (
  <MessageBar {...args} />
);

export const Neutral = Neutral_Story.bind({});

const Positive_Story: ComponentStory<typeof MessageBar> = (args) => (
  <MessageBar {...args} />
);

export const Positive = Positive_Story.bind({});

const Warning_Story: ComponentStory<typeof MessageBar> = (args) => (
  <MessageBar {...args} />
);

export const Warning = Warning_Story.bind({});

const Disruptive_Story: ComponentStory<typeof MessageBar> = (args) => (
  <MessageBar {...args} />
);

export const Disruptive = Disruptive_Story.bind({});

const messageBarArgs: Object = {
  actionButtonProps: {
    ariaLabel: 'Action',
    classNames: 'my-action-btn-class',
    'data-test-id': 'my-action-btn-test-id',
    iconProps: null,
    id: 'myActionButton',
    text: 'Action',
  },
  closable: true,
  header: 'Header 4 used in this MessageBar',
  content:
    'Body 2 which is at 16px font size is used here in the body section of the MessageBar. The body text can wrap to multiple lines and the buttons will be vertically centered.',
  style: {},
  classNames: 'my-message-bar-class',
  closeButtonProps: {
    classNames: 'my-close-btn-class',
    'data-test-id': 'my-close-btn-test-id',
    id: 'myCloseButton',
  },
  closeIcon: IconName.mdiClose,
  icon: IconName.mdiCheckCircle,
  role: 'alert',
  type: MessageBarType.positive,
};

Neutral.args = {
  ...messageBarArgs,
  icon: IconName.mdiInformation,
  type: MessageBarType.neutral,
};

Positive.args = {
  ...messageBarArgs,
};

Warning.args = {
  ...messageBarArgs,
  icon: IconName.mdiAlert,
  type: MessageBarType.warning,
};

Disruptive.args = {
  ...messageBarArgs,
  icon: IconName.mdiAlertCircle,
  type: MessageBarType.disruptive,
};
