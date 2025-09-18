import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { StoryFn, Meta } from '@storybook/react';
import { ConfigProvider } from '../ConfigProvider';
import { Icon, IconName, IconSize } from './index';
import iconSet from './selection.json';

export default {
  title: 'Icon',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Icons</h1>
              <p>
                In a user interface, an icon is an image that represents an
                application, a capability, or some other concept or specific
                entity with meaning for the user. An icon is usually selectable
                but can also be a non-selectable mono-color svg path, such as a
                company's logo.
              </p>
              <p>
                For a list of available icons, take a look at{' '}
                <a
                  href="https://github.com/EightfoldAI/octuple/blob/main/src/components/Icon/mdi.ts"
                  target="_bank"
                >
                  the enumerated list
                </a>
                . You may contribute additional icons by sending a{' '}
                <a
                  href="https://github.com/EightfoldAI/octuple/pulls"
                  target="_bank"
                ></a>
                pull request
                <a />, or by using a custom svg path as the path prop value. To
                pick an icon visit the{' '}
                <a href="https://materialdesignicons.com/" target="_blank">
                  MDI site
                </a>
                . You may also contribute custom mono-line, mono-color icons by
                providing an svg path with a custom name like "mdiMyIcon".
              </p>
              <h2>Best practices</h2>
              <h3>Do</h3>
              <ul>
                <li>
                  Adjust to proper size to highlight importance but not
                  occupying too much space.
                </li>
                <li>Be simple and concise.</li>
                <li>
                  Provide an ariaLabel (and setrole="img") for screen reader
                  users if the icon is not accompanied by text that conveys the
                  same meaning.
                </li>
              </ul>
              <h3>Don't</h3>
              <ul>
                <li>Use Icons to show pictures.</li>
                <li>Use photos or long sentences as icons.</li>
              </ul>
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
    path: {
      options: IconName,
      control: { type: 'select' },
    },
    size: {
      options: [
        IconSize.Large,
        IconSize.Medium,
        IconSize.Small,
        IconSize.XSmall,
      ],
      control: { type: 'select' },
    },
  },
} as Meta<typeof Icon>;

const Basic_Story: StoryFn<typeof Icon> = (args) => <Icon {...args} />;

const Icomoon_Story: StoryFn<typeof Icon> = (args) => (
  <ConfigProvider
    icomoonIconSet={iconSet}
    themeOptions={{
      name: 'blue',
    }}
  >
    <Icon {...args} />
  </ConfigProvider>
);

export const Basic = Basic_Story.bind({});
export const Icomoon = Icomoon_Story.bind({});
export const Icomoon_Multicolor = Icomoon_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = ['Basic', 'Icomoon', 'Icomoon_Multicolor'];

const iconArgs: Object = {
  path: IconName.mdiCardsHeart,
  ariaHidden: false,
  classNames: 'my-icon-class',
  description: 'My icon description.',
  horizontal: false,
  id: 'myIconId',
  role: 'presentation',
  rotate: 0,
  size: IconSize.Medium,
  spin: false,
  title: 'My icon title.',
  vertical: false,
  'data-test-id': 'myIconTestId',
};

Basic.args = {
  ...iconArgs,
  color: '#000000',
};

Icomoon.args = {
  ...iconArgs,
  color: '#000000',
  icomoonIconName: 'pencil',
};

Icomoon_Multicolor.args = {
  ...iconArgs,
  size: IconSize.Large,
  icomoonIconName: 'CareerHub',
};
