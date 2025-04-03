import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { LiveTaskBar } from './';
import { Button, ButtonVariant } from '../Button';
import { IconName } from '../Icon';
import { PanelSize } from '../Panel';
import { Placement } from '@floating-ui/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('LiveTaskBar', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Renders with various configurations', () => {
    // Test basic rendering
    const { container, rerender } = render(
      <LiveTaskBar tasks={[]} data-testid="test-live-task-bar" />
    );
    expect(
      container.querySelector('[data-testid="test-live-task-bar"]')
    ).toBeTruthy();

    // Test with tasks
    rerender(
      <LiveTaskBar
        tasks={[
          <Button
            key="task1"
            text="Task 1"
            variant={ButtonVariant.Secondary}
          />,
          <Button
            key="task2"
            text="Task 2"
            variant={ButtonVariant.Secondary}
          />,
          <Button
            key="task3"
            text="Task 3"
            variant={ButtonVariant.Secondary}
          />,
        ]}
        data-testid="test-live-task-bar"
      />
    );
    expect(container.querySelectorAll('.task-items button').length).toBe(3);

    // Test with custom header
    const CustomHeader = () => (
      <div className="custom-header">Custom Header</div>
    );

    rerender(
      <LiveTaskBar
        header={<CustomHeader />}
        tasks={[]}
        data-testid="test-live-task-bar"
      />
    );
    expect(container.querySelector('.custom-header')).toBeTruthy();

    // Test with aiAgent theme
    rerender(
      <LiveTaskBar
        theme="aiAgent"
        tasks={[
          <Button
            key="task1"
            text="Task 1"
            variant={ButtonVariant.Secondary}
          />,
        ]}
        data-testid="test-live-task-bar"
      />
    );
    expect(container.querySelector('.ai-agent')).toBeTruthy();

    // Test with custom styles and classNames
    rerender(
      <LiveTaskBar
        tasks={[]}
        style={{ color: '#000000' }}
        classNames="custom-class"
        data-testid="test-live-task-bar"
      />
    );

    const taskBar = container.querySelector('.live-task-bar');
    if (taskBar instanceof HTMLElement) {
      expect(taskBar.style.color).toBe('rgb(0, 0, 0)');
    }
    expect(container.querySelector('.custom-class')).toBeTruthy();

    // Create one comprehensive snapshot
    expect(container).toMatchSnapshot();
  });

  test('Panel functionality works correctly', async () => {
    const panelProps = {
      title: 'Test Panel',
      size: PanelSize.medium,
      headerIcon: IconName.mdiInformation,
      children: <div>Panel content</div>,
    };

    const panelButtonProps = {
      text: 'Open Panel',
      iconProps: { path: IconName.mdiLightbulb },
      'data-testid': 'panel-button',
    };

    render(
      <LiveTaskBar
        tasks={[]}
        panel={panelProps}
        panelButton={panelButtonProps}
        data-testid="test-live-task-bar"
      />
    );

    // Panel should be initially hidden - checking in the document body since Panel uses Portal
    expect(document.querySelector('.panel-backdrop.visible')).toBeFalsy();

    // Click the button to show the panel
    const button = screen.getByTestId('panel-button');
    fireEvent.click(button);

    // Wait for the panel to be visible in the DOM
    await waitFor(() => {
      const visiblePanel = document.querySelector('.panel-backdrop.visible');
      expect(visiblePanel).toBeTruthy();
    });

    // Click again to hide
    fireEvent.click(button);

    // Wait for the panel to be hidden
    await waitFor(() => {
      const hiddenPanelAgain = document.querySelector(
        '.panel-backdrop.visible'
      );
      expect(hiddenPanelAgain).toBeFalsy();
    });

    // Test panel close button functionality
    fireEvent.click(button); // Open panel again

    // Wait for the panel to be visible again
    await waitFor(() => {
      expect(document.querySelector('.panel-backdrop.visible')).toBeTruthy();
    });

    // Find and click the close button within the panel
    const closeButton = document.querySelector(
      '.panel button[aria-label="Close"]'
    );
    if (closeButton) {
      fireEvent.click(closeButton as HTMLElement);
    }

    // Wait for the panel to be hidden after clicking close
    await waitFor(() => {
      const hiddenPanelAfterClose = document.querySelector(
        '.panel-backdrop.visible'
      );
      expect(hiddenPanelAfterClose).toBeFalsy();
    });
  });

  test('Dropdown functionality works correctly', () => {
    const dropdownProps = {
      placement: 'bottom-end' as Placement,
      trigger: 'click' as const,
      overlay: (
        <div className="dropdown-content">
          <button>Option 1</button>
          <button>Option 2</button>
        </div>
      ),
    };

    const dropdownButtonProps = {
      iconProps: { path: IconName.mdiDotsHorizontal },
      'data-testid': 'custom-dropdown-button',
      style: { backgroundColor: 'red' },
    };

    const { container } = render(
      <LiveTaskBar
        tasks={[]}
        dropdown={dropdownProps}
        dropdownButton={dropdownButtonProps}
        data-testid="test-live-task-bar"
      />
    );

    // Verify the custom dropdown button is rendered
    const dropdownButton = screen.getByTestId('custom-dropdown-button');
    expect(dropdownButton).toBeTruthy();

    // Verify the custom style is applied
    if (dropdownButton instanceof HTMLElement) {
      expect(dropdownButton.style.backgroundColor).toBe('red');
    }
  });
});
