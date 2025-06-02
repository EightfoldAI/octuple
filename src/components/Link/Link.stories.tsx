import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Link } from './';
import { Stack } from '../Stack';
import { IconName } from '../Icon';
import { BADGE } from '@geometric-panda/storybook-addon-badges';

export default {
  title: 'Link',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Link</h1>
              <p>
                Links are navigational elements that are used to take users to
                another place, such as another page or another section within
                the same page.
              </p>
            </section>
            <section>
              <Stories includePrimary title="" />
            </section>
          </article>
        </main>
      ),
    },
    badges: [BADGE.NEEDS_REVISION],
  },
  argTypes: {
    variant: {
      options: ['default', 'primary', 'secondary', 'disruptive', 'neutral'],
      control: { type: 'select' },
    },
    target: {
      options: ['_self', '_blank', '_parent', '_top'],
      control: { type: 'select' },
    },
    underline: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    fullWidth: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    highContrastFocus: {
      options: [true, false],
      control: { type: 'inline-radio' },
      description:
        'Enables a high-contrast focus indicator for improved accessibility.',
    },
  },
} as ComponentMeta<typeof Link>;

const AllLinks_Story: ComponentStory<typeof Link> = (args) => (
  <Stack direction="vertical" gap="m">
    <Link {...args} href="https://www.eightfold.ai/">
      Default Link
    </Link>
    <Link {...args} href="https://www.eightfold.ai/" variant="primary">
      Primary Link
    </Link>
    <Link {...args} href="https://www.eightfold.ai/" variant="secondary">
      Secondary Link
    </Link>
    <Link {...args} href="https://www.eightfold.ai/" variant="disruptive">
      Disruptive Link
    </Link>
    <Link {...args} href="https://www.eightfold.ai/" variant="neutral">
      Neutral Link
    </Link>
    <Link {...args} href="https://www.eightfold.ai/" underline>
      Underlined Link
    </Link>
    <Link
      {...args}
      href="https://www.eightfold.ai/"
      variant="primary"
      underline
    >
      Primary Underlined Link
    </Link>
    <Link {...args} href="https://www.eightfold.ai/" disabled>
      Disabled Link
    </Link>
  </Stack>
);

export const All_Links = AllLinks_Story.bind({});
All_Links.args = {};

const Default_Link_Story: ComponentStory<typeof Link> = (args) => (
  <Link {...args} href="https://www.eightfold.ai/">
    Default Link
  </Link>
);

export const Default = Default_Link_Story.bind({});
Default.args = {};

const Primary_Link_Story: ComponentStory<typeof Link> = (args) => (
  <Link {...args} href="https://www.eightfold.ai/">
    Primary Link
  </Link>
);

export const Primary = Primary_Link_Story.bind({});
Primary.args = {
  variant: 'primary',
  highContrastFocus: true,
};

const Secondary_Link_Story: ComponentStory<typeof Link> = (args) => (
  <Link {...args} href="https://www.eightfold.ai/">
    Secondary Link
  </Link>
);

export const Secondary = Secondary_Link_Story.bind({});
Secondary.args = {
  variant: 'secondary',
};

const Disruptive_Link_Story: ComponentStory<typeof Link> = (args) => (
  <Link {...args} href="https://www.eightfold.ai/">
    Disruptive Link
  </Link>
);

export const Disruptive = Disruptive_Link_Story.bind({});
Disruptive.args = {
  variant: 'disruptive',
};

const Neutral_Link_Story: ComponentStory<typeof Link> = (args) => (
  <Link {...args} href="https://www.eightfold.ai/">
    Neutral Link
  </Link>
);

export const Neutral = Neutral_Link_Story.bind({});
Neutral.args = {
  variant: 'neutral',
};

const Underlined_Link_Story: ComponentStory<typeof Link> = (args) => (
  <Link {...args} href="https://www.eightfold.ai/">
    Underlined Link
  </Link>
);

export const Underlined = Underlined_Link_Story.bind({});
Underlined.args = {
  underline: true,
};

const Disabled_Link_Story: ComponentStory<typeof Link> = (args) => (
  <Link {...args} href="https://www.eightfold.ai/">
    Disabled Link
  </Link>
);

export const Disabled_Link = Disabled_Link_Story.bind({});
Disabled_Link.args = {
  disabled: true,
};

const High_Contrast_Focus_Story: ComponentStory<typeof Link> = (args) => (
  <Link {...args} href="https://www.eightfold.ai/">
    Link with High Contrast Focus
  </Link>
);

export const High_Contrast_Focus = High_Contrast_Focus_Story.bind({});
High_Contrast_Focus.args = {
  highContrastFocus: true,
  variant: 'primary', // Example with primary variant
};
High_Contrast_Focus.parameters = {
  docs: {
    description: {
      story:
        'This story demonstrates the `highContrastFocus` prop. When enabled, the link will display a more prominent focus indicator (e.g., a white outline) when it receives keyboard focus. This is particularly beneficial for users with low vision or those who rely on keyboard navigation, as it ensures the focused element is clearly distinguishable, especially on busy or colorful backgrounds.',
    },
  },
};
