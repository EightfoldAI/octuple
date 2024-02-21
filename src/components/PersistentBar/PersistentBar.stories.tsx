import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PersistentBar, PersistentBarType } from './';
import { IconName } from '../Icon';
import { PaginationLayoutOptions } from '../Pagination';
import {
  ButtonVariant,
  ButtonVariant as ButtonType,
  ButtonShape,
} from '../Button';

export default {
  title: 'Persistent Bar',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Persistent Bar</h1>
              <p>
                Persistent bars are sticky sections that can be used to
                highlight a few actions that are out of the view to be displayed
                inside the view. For example, if there's a very long form with
                Save and Cancel buttons at the bottom, we can use the bottom bar
                to show those two buttons in the view. We are making these bars
                to be flexible in height and also allowing any component to be
                added inside for now, to understand use cases from the team.
              </p>
              <p>
                The placement of the buttons can be left, center, or right. UX
                designers can decide on what type of buttons they should use
                depending on the product and design goals they are trying to
                achieve.
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
} as ComponentMeta<typeof PersistentBar>;

const PersistentBar_Story: ComponentStory<typeof PersistentBar> = (args) => (
  <PersistentBar {...args} />
);

export const Bottom_Bar_With_Text = PersistentBar_Story.bind({});
export const Bottom_Bar_Secondary_Buttons = PersistentBar_Story.bind({});
export const Bottom_Bar_Buttons_On_Left = PersistentBar_Story.bind({});
export const Bottom_Bar_Buttons_On_Right = PersistentBar_Story.bind({});
export const Top_Bar_Buttons = PersistentBar_Story.bind({});
export const Top_Bar_Buttons_Legacy = PersistentBar_Story.bind({});
export const Top_Bar_With_Text = PersistentBar_Story.bind({});
export const Top_Bar_Pagination = PersistentBar_Story.bind({});
export const Custom = PersistentBar_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Bottom_Bar_With_Text',
  'Bottom_Bar_Secondary_Buttons',
  'Bottom_Bar_Buttons_On_Left',
  'Bottom_Bar_Buttons_On_Right',
  'Top_Bar_Buttons',
  'Top_Bar_Buttons_Legacy',
  'Top_Bar_With_Text',
  'Top_Bar_Pagination',
  'Custom',
];

const paginationArgs: Object = {
  classNames: 'my-pagination-class',
  currentPage: 1,
  dots: false,
  goToText: 'Go to',
  layout: [
    PaginationLayoutOptions.Previous,
    PaginationLayoutOptions.Pager,
    PaginationLayoutOptions.Next,
  ],
  nextIconButtonAriaLabel: 'Next',
  pageSize: 10,
  pageSizeButtonAriaLabel: 'Selected page size',
  pageSizes: [10, 20, 30, 40, 50, 100],
  pageSizeText: 'page',
  previousIconButtonAriaLabel: 'Previous',
  quickNextIconButtonAriaLabel: 'Next 5',
  quickPreviousIconButtonAriaLabel: 'Previous 5',
  totalText: 'Total',
  'data-testid': 'myPaginationTestId',
};

const persistentBarArgs: Object = {
  bordered: false,
  configContextProps: {
    noGradientContext: false,
    noThemeContext: false,
  },
  theme: '',
  themeContainerId: 'my-persistentbar-theme-container',
  gradient: false,
  style: {},
  classNames: 'my-persistent-bar-class',
  role: 'toolbar',
  type: PersistentBarType.bottomBarWithText,
  paginationTotal: 150,
};

Bottom_Bar_With_Text.args = {
  ...persistentBarArgs,
  actionButtonOneProps: {
    ariaLabel: 'Primary',
    classNames: 'my-primary-btn-class',
    'data-testid': 'my-primary-btn-test-id',
    iconProps: null,
    id: 'myPrimaryButton',
    text: 'Primary',
  },
  actionButtonTwoProps: {
    ariaLabel: 'Default',
    classNames: 'my-default-btn-class',
    'data-testid': 'my-default-btn-test-id',
    iconProps: null,
    id: 'myDefaultButton',
    text: 'Default',
  },
  content: 'Body2 is used for supporting text.',
  title: 'Header 4 as Title:',
  type: PersistentBarType.bottomBarWithText,
};

Bottom_Bar_Secondary_Buttons.args = {
  ...persistentBarArgs,
  actionButtonOneProps: {
    ariaLabel: 'Default 1',
    classNames: 'my-default-btn-class',
    'data-testid': 'my-default-btn-test-id-1',
    iconProps: null,
    id: 'myDefaultButton1',
    text: 'Default 1',
  },
  actionButtonTwoProps: {
    ariaLabel: 'Default 2',
    classNames: 'my-default-btn-class',
    'data-testid': 'my-default-btn-test-id-2',
    iconProps: null,
    id: 'myDefaultButton2',
    text: 'Default 2',
  },
  actionButtonThreeProps: {
    ariaLabel: 'Default',
    classNames: 'my-default-btn-class',
    'data-testid': 'my-default-btn-test-id',
    iconProps: null,
    id: 'myDefaultButton',
    text: 'Default',
  },
  type: PersistentBarType.bottomBarSecondaryButtons,
};

Bottom_Bar_Buttons_On_Left.args = {
  ...persistentBarArgs,
  actionButtonOneProps: {
    ariaLabel: 'Default 1',
    classNames: 'my-default-btn-class',
    'data-testid': 'my-default-btn-test-id-1',
    iconProps: null,
    id: 'myDefaultButton1',
    text: 'Default',
  },
  actionButtonTwoProps: {
    ariaLabel: 'Default 2',
    classNames: 'my-default-btn-class',
    'data-testid': 'my-default-btn-test-id-2',
    iconProps: null,
    id: 'myDefaultButton2',
    text: 'Default',
  },
  actionButtonThreeProps: {
    ariaLabel: 'Primary',
    classNames: 'my-primary-btn-class',
    'data-testid': 'my-primary-btn-test-id',
    iconProps: null,
    id: 'myPrimaryButton',
    text: 'Primary',
  },
  type: PersistentBarType.bottomBarButtonsOnLeft,
};

Bottom_Bar_Buttons_On_Right.args = {
  ...persistentBarArgs,
  actionButtonOneProps: {
    ariaLabel: 'Default 1',
    classNames: 'my-default-btn-class',
    'data-testid': 'my-default-btn-test-id-1',
    iconProps: null,
    id: 'myDefaultButton1',
    text: 'Default',
  },
  actionButtonTwoProps: {
    ariaLabel: 'Default 2',
    classNames: 'my-default-btn-class',
    'data-testid': 'my-default-btn-test-id-2',
    iconProps: null,
    id: 'myDefaultButton2',
    text: 'Default',
  },
  actionButtonThreeProps: {
    ariaLabel: 'Primary',
    classNames: 'my-primary-btn-class',
    'data-testid': 'my-primary-btn-test-id',
    iconProps: null,
    id: 'myPrimaryButton',
    text: 'Primary',
  },
  type: PersistentBarType.bottomBarButtonsOnRight,
};

Top_Bar_Buttons.args = {
  ...persistentBarArgs,
  buttonMenuProps: [
    {
      ariaLabel: 'Bookmark Icon Button 1',
      iconProps: { path: IconName.mdiBookmark },
      id: 'myBookmarkButton1',
      shape: ButtonShape.Round,
      text: null,
      variant: ButtonVariant.Secondary,
    },
    {
      ariaLabel: 'Secondary 1',
      classNames: 'my-primary-btn-class',
      'data-testid': 'my-primary-btn-test-id-1',
      iconProps: null,
      id: 'mySecondaryButton1',
      text: 'Secondary 1',
      variant: ButtonVariant.Secondary,
    },
    {
      ariaLabel: 'Secondary 2',
      classNames: 'my-primary-btn-class',
      'data-testid': 'my-primary-btn-test-id-2',
      iconProps: null,
      id: 'mySecondaryButton2',
      text: 'Secondary 2',
      variant: ButtonVariant.Secondary,
    },
    {
      ariaLabel: 'Secondary 3',
      classNames: 'my-primary-btn-class',
      'data-testid': 'my-primary-btn-test-id-3',
      iconProps: null,
      id: 'mySecondaryButton3',
      text: 'Secondary 3',
      variant: ButtonVariant.Secondary,
    },
    {
      ariaLabel: 'Secondary 4',
      classNames: 'my-primary-btn-class',
      'data-testid': 'my-primary-btn-test-id-4',
      iconProps: null,
      id: 'mySecondaryButton4',
      text: 'Secondary 4',
      variant: ButtonVariant.Secondary,
    },
    {
      ariaLabel: 'Secondary 5',
      classNames: 'my-primary-btn-class',
      'data-testid': 'my-primary-btn-test-id-5',
      iconProps: null,
      id: 'mySecondaryButton5',
      text: 'Secondary 5',
      variant: ButtonVariant.Secondary,
    },
    {
      ariaLabel: 'Bookmark Icon Button 2',
      iconProps: { path: IconName.mdiBookmark },
      id: 'myBookmarkButton2',
      shape: ButtonShape.Round,
      text: null,
      variant: ButtonVariant.Secondary,
    },
  ],
  type: PersistentBarType.topBarButtons,
};

// TODO: Remove in Octuple v3.0.0
Top_Bar_Buttons_Legacy.args = {
  ...persistentBarArgs,
  buttonMenuProps: [
    {
      ariaLabel: 'Bookmark Icon Button 1',
      iconProps: { path: IconName.mdiBookmark },
      id: 'myBookmarkButton1',
      shape: ButtonShape.Round,
      text: null,
      type: ButtonType.Secondary,
    },
    {
      ariaLabel: 'Secondary 1',
      classNames: 'my-primary-btn-class',
      'data-testid': 'my-primary-btn-test-id-1',
      iconProps: null,
      id: 'mySecondaryButton1',
      text: 'Secondary 1',
      type: ButtonType.Secondary,
    },
    {
      ariaLabel: 'Secondary 2',
      classNames: 'my-primary-btn-class',
      'data-testid': 'my-primary-btn-test-id-2',
      iconProps: null,
      id: 'mySecondaryButton2',
      text: 'Secondary 2',
      type: ButtonType.Secondary,
    },
    {
      ariaLabel: 'Secondary 3',
      classNames: 'my-primary-btn-class',
      'data-testid': 'my-primary-btn-test-id-3',
      iconProps: null,
      id: 'mySecondaryButton3',
      text: 'Secondary 3',
      type: ButtonType.Secondary,
    },
    {
      ariaLabel: 'Secondary 4',
      classNames: 'my-primary-btn-class',
      'data-testid': 'my-primary-btn-test-id-4',
      iconProps: null,
      id: 'mySecondaryButton4',
      text: 'Secondary 4',
      type: ButtonType.Secondary,
    },
    {
      ariaLabel: 'Secondary 5',
      classNames: 'my-primary-btn-class',
      'data-testid': 'my-primary-btn-test-id-5',
      iconProps: null,
      id: 'mySecondaryButton5',
      text: 'Secondary 5',
      type: ButtonType.Secondary,
    },
    {
      ariaLabel: 'Bookmark Icon Button 2',
      iconProps: { path: IconName.mdiBookmark },
      id: 'myBookmarkButton2',
      shape: ButtonShape.Round,
      text: null,
      type: ButtonType.Secondary,
    },
  ],
  type: PersistentBarType.topBarButtons,
};

Top_Bar_With_Text.args = {
  ...persistentBarArgs,
  type: PersistentBarType.topBarWithText,
  content: 'Body2 is used for supporting text.',
  title: 'Header 4 as Title:',
};

Top_Bar_Pagination.args = {
  ...persistentBarArgs,
  type: PersistentBarType.topBarPagination,
  paginationArgs,
};

Custom.args = {
  ...persistentBarArgs,
  children: (
    <div className="octuple">
      <div className="octuple-content" style={{ padding: 0 }}>
        <h4
          style={{
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: '18px',
            margin: 0,
            padding: 0,
          }}
        >
          Header 4 as Title:
        </h4>
        <div className="octuple-content__small" style={{ padding: 0 }}>
          content small is used for supporting text.
        </div>
      </div>
    </div>
  ),
};
