import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { snack, Snackbar, SnackbarContainer } from './';
import { Button, ButtonSize } from '../Button';
import { InfoBarType } from '../InfoBar';
import { IconName } from '../Icon';

export default {
  title: 'Snack Bar',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Snack Bar</h1>
              <p>
                Snack bars are a type of component we can use to provide quick
                responses back to someone. There are two different types of
                snackbars; auto-dismissable and user-dismissable. Depending on
                the context of the response, they provide a call-to-action for
                people to act upon.{' '}
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
    position: {
      options: [
        'top-center',
        'top-left',
        'top-right',
        'bottom-center',
        'bottom-left',
        'bottom-right',
      ],
      control: { type: 'select' },
    },
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
    type: {
      options: [
        InfoBarType.disruptive,
        InfoBarType.warning,
        InfoBarType.positive,
        InfoBarType.neutral,
      ],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Snackbar>;

const Default_Story: ComponentStory<typeof Snackbar> = (args) => (
  <>
    <Button
      text="Serve snack"
      onClick={() => snack.serve({ ...args })}
      size={ButtonSize.Small}
    />
    <SnackbarContainer />
  </>
);

const Closable_Story: ComponentStory<typeof Snackbar> = (args) => (
  <>
    <Button
      text="Serve closable snack"
      onClick={() => snack.serve({ ...args })}
      size={ButtonSize.Small}
    />
    <SnackbarContainer />
  </>
);

const With_Action_Story: ComponentStory<typeof Snackbar> = (args) => (
  <>
    <Button
      text="Serve snack with action"
      onClick={() => snack.serve({ ...args })}
      size={ButtonSize.Small}
    />
    <SnackbarContainer />
  </>
);

export const Default = Default_Story.bind({});
export const Closable = Closable_Story.bind({});
export const With_Action = With_Action_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = ['Default', 'Closable', 'With_Action'];

const snackArgs: Object = {
  position: 'top-center',
  type: 'neutral',
  bordered: false,
  closable: false,
  icon: IconName.mdiInformation,
  closeIcon: IconName.mdiClose,
  content:
    'Body 2 is used in this snackbar. This should be straight forward but can wrap up to two lines if needed.',
  configContextProps: {
    noGradientContext: false,
    noThemeContext: false,
  },
  theme: '',
  themeContainerId: 'my-snackbar-theme-container',
  gradient: false,
  id: 'mySnackId',
};

Default.args = {
  ...snackArgs,
  duration: 3000,
};

Closable.args = {
  ...snackArgs,
  closable: true,
  closeButtonProps: {
    ariaLabel: 'Close',
  },
};

With_Action.args = {
  ...snackArgs,
  actionButtonProps: {
    text: 'Action',
  },
};
