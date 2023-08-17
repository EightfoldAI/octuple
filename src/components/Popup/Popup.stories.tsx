import React, { useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ButtonSize, PrimaryButton } from '../Button';
import { Icon, IconName, IconSize } from '../Icon';
import { Link } from '../Link';
import { Stack } from '../Stack';
import { Popup, PopupTheme } from './';

export default {
  title: 'Popup',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Popups</h1>
              <p>
                Derived from Tooltip, Popups may also provide actionable
                elements like links and buttons.
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
    trigger: {
      options: ['click', 'hover', 'contextmenu'],
      control: { type: 'radio' },
    },
    placement: {
      options: [
        'top',
        'right',
        'bottom',
        'left',
        'top-start',
        'top-end',
        'right-start',
        'right-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
      ],
      control: { type: 'select' },
    },
    height: {
      control: { type: 'number' },
    },
    width: {
      control: { type: 'number' },
    },
    positionStrategy: {
      options: ['absolute', 'fixed'],
      control: { type: 'inline-radio' },
    },
    theme: {
      options: ['light', 'dark'],
      control: { type: 'inline-radio' },
    },
    portal: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    triggerAbove: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
  },
} as ComponentMeta<typeof Popup>;

const Popup_Story: ComponentStory<typeof Popup> = (args) => {
  const [visible, setVisibility] = useState(false);
  return (
    <Popup {...args} onVisibleChange={(isVisible) => setVisibility(isVisible)}>
      <PrimaryButton
        onClick={() => {
          console.log('clicked');
        }}
        size={ButtonSize.Medium}
        text={visible ? 'Hide Popup' : 'Show Popup'}
      />
    </Popup>
  );
};

export const Popups = Popup_Story.bind({});

Popups.args = {
  offset: 8,
  theme: PopupTheme.light,
  animate: true,
  bordered: false,
  dropShadow: true,
  content: (
    <>
      <Stack
        direction="vertical"
        align="flex-start"
        justify="space-between"
        fullWidth
      >
        <img
          src="https://static.vscdn.net/images/career_hub/upskilling/more_projects.svg"
          style={{
            height: 172,
            margin: 4,
            width: 'calc(100% - 8px)',
          }}
        />
        <div className="octuple">
          <div className="octuple-content" style={{ padding: '16px' }}>
            <h5>Header 5</h5>
            <p className="octuple-content__small">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Link tabIndex={0} variant="primary">
              <span
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <span>Learn more</span>
                <Icon
                  size={IconSize.Small}
                  path={IconName.mdiOpenInNew}
                  style={{ margin: '0 4px' }}
                />
              </span>
            </Link>
          </div>
        </div>
      </Stack>
    </>
  ),
  placement: 'bottom-start',
  disabled: false,
  visibleArrow: true,
  classNames: 'my-popup-class',
  closeOnPopupClick: false,
  openDelay: 0,
  hideAfter: 200,
  tabIndex: 0,
  trigger: 'click',
  triggerAbove: false,
  positionStrategy: 'absolute',
  portal: false,
  portalId: 'my-portal-id',
  portalRoot: null,
};
