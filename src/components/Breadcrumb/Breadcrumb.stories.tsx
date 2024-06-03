import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Breadcrumb } from './';
import { IconName } from '../Icon';
import { Link } from '../Link';
import {
  LinkButton,
  LinkButtonSize,
  LinkButtonTextAlign,
  LinkButtonVariant,
  LinkButtonWidth,
} from '../LinkButton';
import { Avatar } from '../Avatar';

export default {
  title: 'Breadcrumb',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Breadcrumb</h1>
              <p>
                A breadcrumb displays the current location within a hierarchy.
                It allows going back to states higher up in the hierarchy.
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
} as ComponentMeta<typeof Breadcrumb>;

const Breadcrumb_Story: ComponentStory<typeof Breadcrumb> = (args) => (
  <Breadcrumb {...args} />
);

// Prevents :visited from persisting or being shared between links.
const testAnchor = (): string => {
  return `#${Math.floor(Math.random() * 1000)}-eftestanchor`;
};

const myLinks = [
  {
    title: 'Home',
    href: testAnchor(),
  },
  {
    title: 'Page 1',
    href: testAnchor(),
  },
  {
    title: 'Page 2',
    href: testAnchor(),
  },
  {
    title: 'Page 3',
    href: testAnchor(),
  },
  {
    title: 'Page 4',
    href: testAnchor(),
  },
  {
    title: 'Page 5',
    href: testAnchor(),
  },
  {
    ariaCurrent: true,
    readonly: true,
    title: 'Page 6',
    href: testAnchor(),
  },
];

export const Basic_Many = Breadcrumb_Story.bind({});
export const Basic_Few = Breadcrumb_Story.bind({});
export const No_Max = Breadcrumb_Story.bind({});
export const Hide_Current = Breadcrumb_Story.bind({});
export const With_Link_Tooltip = Breadcrumb_Story.bind({});
export const With_Custom_Links = Breadcrumb_Story.bind({});
export const With_Custom_Nodes = Breadcrumb_Story.bind({});

const breadcrumbArgs: Object = {
  ariaLabel: 'Breadcrumbs',
  classNames: 'my-breadcrumb-root-class',
  configContextProps: {
    noThemeContext: false,
  },
  theme: '',
  themeContainerId: 'my-breadcrumb-theme-container',
  'data-testid': 'my-breadcrumb-testid',
  displayCurrent: true,
  divider: {
    path: IconName.mdiChevronRight,
    ariaHidden: true,
    classNames: 'my-breadcrumb-icon',
    id: 'myBreadcrumbIcon',
    role: 'presentation',
    rotate: 0,
    spin: false,
    vertical: false,
    'data-testid': 'myBreadcrumbIconTestId',
  },
  id: 'myBreadcrumb',
  links: myLinks,
  linkClassNames: 'my-breadcrumb-links-class',
  maxDisplayedLinks: 3,
  overflowAriaLabel: 'More links',
  style: {},
};

Basic_Many.args = {
  ...breadcrumbArgs,
};

Basic_Few.args = {
  ...breadcrumbArgs,
  links: [
    {
      title: 'Home',
      href: testAnchor(),
    },
    {
      title: 'Page 1',
      href: testAnchor(),
    },
    {
      ariaCurrent: true,
      readonly: true,
      title: 'Page 2',
      href: testAnchor(),
    },
  ],
};

No_Max.args = {
  ...breadcrumbArgs,
  maxDisplayedLinks: false,
};

Hide_Current.args = {
  ...breadcrumbArgs,
  displayCurrent: false,
  maxDisplayedLinks: false,
};

With_Link_Tooltip.args = {
  ...breadcrumbArgs,
  links: [
    {
      title: 'Home',
      href: testAnchor(),
    },
    {
      title: 'Page 1',
      href: testAnchor(),
      tooltipprops: {
        content: 'A tooltip',
      },
    },
    {
      ariaCurrent: true,
      readonly: true,
      title: 'Page 2',
      href: testAnchor(),
    },
  ],
};

With_Custom_Links.args = {
  ...breadcrumbArgs,
  links: [
    {
      title: 'Custom Home',
      children: (
        <Link variant="primary" href={testAnchor()}>
          Custom home
        </Link>
      ),
      dropdownChildren: (
        <LinkButton
          alignText={LinkButtonTextAlign.Left}
          text="Custom home"
          href={testAnchor()}
          linkButtonWidth={LinkButtonWidth.fill}
          size={LinkButtonSize.Small}
        />
      ),
    },
    {
      title: 'Custom page 1',
      children: (
        <Link variant="disruptive" href={testAnchor()}>
          Custom page 1
        </Link>
      ),
      dropdownChildren: (
        <LinkButton
          alignText={LinkButtonTextAlign.Left}
          disruptive
          href={testAnchor()}
          linkButtonWidth={LinkButtonWidth.fill}
          size={LinkButtonSize.Small}
          text="Custom page 1"
          variant={LinkButtonVariant.Primary}
        />
      ),
      tooltipprops: {
        content: 'A tooltip',
      },
    },
    {
      title: 'Custom page 2',
      children: (
        <Link variant="primary" href={testAnchor()}>
          Custom page 2
        </Link>
      ),
      dropdownChildren: (
        <LinkButton
          alignText={LinkButtonTextAlign.Left}
          text="Custom page 2"
          href={testAnchor()}
          linkButtonWidth={LinkButtonWidth.fill}
          size={LinkButtonSize.Small}
        />
      ),
    },
    {
      title: 'Custom page 3',
      children: (
        <Link variant="primary" href={testAnchor()}>
          Custom page 3
        </Link>
      ),
      dropdownChildren: (
        <LinkButton
          alignText={LinkButtonTextAlign.Left}
          text="Custom page 3"
          href={testAnchor()}
          linkButtonWidth={LinkButtonWidth.fill}
          size={LinkButtonSize.Small}
        />
      ),
    },
    {
      title: 'Custom page 4',
      children: (
        <Link variant="primary" href={testAnchor()}>
          Custom page 4
        </Link>
      ),
      dropdownChildren: (
        <LinkButton
          alignText={LinkButtonTextAlign.Left}
          text="Custom page 4"
          href={testAnchor()}
          linkButtonWidth={LinkButtonWidth.fill}
          size={LinkButtonSize.Small}
        />
      ),
    },
    {
      title: 'Custom page 5',
      children: (
        <Link variant="primary" href={testAnchor()}>
          Custom page 5
        </Link>
      ),
      dropdownChildren: (
        <LinkButton
          alignText={LinkButtonTextAlign.Left}
          text="Custom page 5"
          href={testAnchor()}
          linkButtonWidth={LinkButtonWidth.fill}
          size={LinkButtonSize.Small}
        />
      ),
    },
    {
      ariaCurrent: true,
      dropdownChildren: (
        <LinkButton
          alignText={LinkButtonTextAlign.Left}
          disabled
          text="Custom page 6"
          href={testAnchor()}
          linkButtonWidth={LinkButtonWidth.fill}
          size={LinkButtonSize.Small}
        />
      ),
      readonly: true,
      title: 'Custom page 6',
      href: testAnchor(),
    },
  ],
};

With_Custom_Nodes.args = {
  ...breadcrumbArgs,
  links: [
    {
      customCrumb: (
        <Avatar theme="green" type="round">
          JD
        </Avatar>
      ),
      tooltipprops: {
        content: 'John Doe',
      },
      title: 'John Doe',
      readonly: true,
    },
    {
      customCrumb: (
        <Avatar theme="blue" type="round">
          AJ
        </Avatar>
      ),
      tooltipprops: {
        content: 'Adam John',
      },
      title: 'Adam John',
      readonly: true,
    },
    {
      customCrumb: (
        <Avatar theme="red" type="round">
          HG
        </Avatar>
      ),
      tooltipprops: {
        content: 'Hue Grant',
      },
      title: 'Hue Grant',
      readonly: true,
    },
  ],
};
