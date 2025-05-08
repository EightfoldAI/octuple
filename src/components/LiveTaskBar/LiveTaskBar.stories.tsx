import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LiveTaskBar } from './';
import { IconName, IconSize } from '../Icon';
import { Icon } from '../Icon';
import { Button, ButtonShape, ButtonVariant } from '../Button';
import { PanelSize } from '../Panel';
import { Menu, MenuSize } from '../Menu';
import { MenuItemType } from '../Menu/MenuItem/MenuItem.types';

export default {
  title: 'LiveTaskBar',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Live Task Bar</h1>
              <p>
                The Live Task Bar component provides a convenient way to display
                tasks with badges, notifications, and actions in a unified
                interface. It's useful for showing activity counts,
                notifications, and providing quick access to frequently used
                features.
              </p>
              <p>This component is highly customizable and supports:</p>
              <ul>
                <li>
                  <strong>Custom header:</strong> Pass any React component as
                  the header
                </li>
                <li>
                  <strong>Task components:</strong> Display an array of custom
                  task components
                </li>
                <li>
                  <strong>Panel integration:</strong> Pass props to the Panel
                  component and a button to toggle it
                </li>
                <li>
                  <strong>Dropdown menu:</strong> Pass props to the Dropdown
                  component and customize its trigger button
                </li>
                <li>
                  <strong>Theme support:</strong> Apply custom themes including
                  aiAgent gradient
                </li>
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
        'aiAgent',
      ],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof LiveTaskBar>;

// Create a custom header component
const CustomHeader = () => (
  <>
    <div className="logo-wrapper">
      <Icon
        path={IconName.mdiStarFourPoints}
        color="#8467D4"
        size={IconSize.Small}
      />
    </div>
    <div className="status-wrapper">
      <span className="status-label">Live Status</span>
    </div>
  </>
);

// Create task components
const taskComponents = [
  <Button
    key="hours-saved"
    iconProps={{ path: IconName.mdiClockOutline, color: '#4CAF50' }}
    text="124 hours saved"
    badgeProps={{
      children: '+12%',
      active: true,
      style: { backgroundColor: 'rgba(76, 175, 80, 0.15)', color: '#2e7d32' },
    }}
    shape={ButtonShape.Pill}
    variant={ButtonVariant.SystemUI}
    data-testid="time-saved-action"
    style={{ background: 'transparent', pointerEvents: 'none' }}
  />,
  <Button
    key="tasks"
    iconProps={{ path: IconName.mdiCheckboxMarkedOutline, color: '#2196F3' }}
    text="85 tasks"
    shape={ButtonShape.Pill}
    variant={ButtonVariant.SystemUI}
    data-testid="tracking-action"
    style={{ background: 'transparent', pointerEvents: 'none' }}
  />,
  <Button
    key="needs-review"
    iconProps={{ path: IconName.mdiInformationOutline, color: '#F44336' }}
    text="7 need review"
    badgeProps={{
      children: '2',
      active: true,
      disruptive: true,
      style: { backgroundColor: 'rgba(244, 67, 54, 0.15)', color: '#d32f2f' },
    }}
    shape={ButtonShape.Pill}
    variant={ButtonVariant.SystemUI}
    style={{ background: 'transparent', pointerEvents: 'none' }}
    data-testid="needs-review-action"
  />,
];

// Create panel props
const panelProps = {
  title: 'Interactive AIR Assistant',
  size: PanelSize.large,
  headerIcon: IconName.mdiLightbulb,
  children: (
    <div>
      <p>
        Hello! I'm AIR, your intelligent assistant. How can I help you today?
      </p>
    </div>
  ),
  footer: (
    <div>
      <Button text="Done" variant={ButtonVariant.Secondary} />
    </div>
  ),
};

// Create panel button props
const panelButtonProps = {
  text: 'Ask AIR',
  iconProps: { path: IconName.mdiLightbulb },
  variant: ButtonVariant.Secondary,
  shape: ButtonShape.Pill,
  theme: 'aiAgent',
};

// Create dropdown menu items using the correct Menu component structure
const menuItems = [
  {
    text: 'Create AIR',
    iconProps: { path: IconName.mdiPlus },
    onClick: () => console.log('Create AIR clicked'),
    type: MenuItemType.button,
  },
  {
    text: 'All activity',
    iconProps: { path: IconName.mdiClockOutline },
    onClick: () => console.log('All activity clicked'),
    type: MenuItemType.button,
  },
  {
    text: 'Settings',
    iconProps: { path: IconName.mdiCogOutline },
    onClick: () => console.log('Settings clicked'),
    type: MenuItemType.button,
  },
];

// Create dropdown props
const dropdownProps = {
  placement: 'bottom-end',
  trigger: 'click',
  overlay: <Menu items={menuItems} size={MenuSize.medium} />,
  closeOnDropdownClick: true,
  offset: 8,
};

// Create dropdown button props
const dropdownButtonProps = {
  iconProps: { path: IconName.mdiDotsHorizontal },
  variant: ButtonVariant.Secondary,
  shape: ButtonShape.Round,
  theme: 'aiAgent',
};

const LiveTaskBarStory: ComponentStory<typeof LiveTaskBar> = (args) => (
  <LiveTaskBar {...args} />
);

export const Default = LiveTaskBarStory.bind({});

Default.args = {
  header: <CustomHeader />,
  tasks: taskComponents,
  panel: panelProps,
  panelButton: panelButtonProps,
  dropdown: dropdownProps,
  dropdownButton: dropdownButtonProps,
  theme: 'aiAgent',
};
