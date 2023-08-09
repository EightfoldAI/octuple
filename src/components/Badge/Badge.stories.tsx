import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Badge, BadgeSize } from './';
import { Popup, PopupTheme } from '../Popup';

export default {
  title: 'Badge',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Badge</h1>
              <p>
                Badges normally appear in proximity to notifications, labels, or
                user avatars with eye-catching appeal, typically displaying a
                count.
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
      options: [BadgeSize.Large, BadgeSize.Medium, BadgeSize.Small],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Badge>;

const Badge_Story: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;
const Badge_Popup_Story: ComponentStory<typeof Badge> = (args) => (
  <Popup
    content={
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        A popup
      </div>
    }
    height={40}
    theme={PopupTheme.dark}
    triggerAbove
    width={100}
  >
    <Badge {...args} />
  </Popup>
);

export const Badge_Default = Badge_Story.bind({});
export const Badge_Active = Badge_Story.bind({});
export const Badge_Disruptive = Badge_Story.bind({});
export const Badge_With_Popup = Badge_Popup_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Badge_Default',
  'Badge_Active',
  'Badge_Disruptive',
  'Badge_With_Popup',
];

const badgeArgs: Object = {
  active: false,
  classNames: 'my-badge-class',
  size: BadgeSize.Medium,
  style: {},
  children: '8',
  disruptive: false,
};

Badge_Default.args = {
  ...badgeArgs,
};

Badge_Active.args = {
  ...badgeArgs,
  active: true,
};

Badge_Disruptive.args = {
  ...badgeArgs,
  active: true,
  disruptive: true,
};

Badge_With_Popup.args = {
  ...badgeArgs,
};
