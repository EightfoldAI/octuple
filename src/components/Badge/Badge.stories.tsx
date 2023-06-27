import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Badge } from './';

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
} as ComponentMeta<typeof Badge>;

const Badge_Story: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Badge_Default = Badge_Story.bind({});
export const Badge_Active = Badge_Story.bind({});
export const Badge_Disruptive = Badge_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Badge_Default',
  'Badge_Active',
  'Badge_Disruptive',
];

const badgeArgs: Object = {
  active: false,
  classNames: 'my-badge-class',
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
