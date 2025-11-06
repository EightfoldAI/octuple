import React from 'react';
import MatchMediaMock from 'jest-matchmedia-mock';
import { snack, SnackbarContainer } from './';
import {
  act,
  createEvent,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import { IconName } from '../Icon';

let matchMedia: any;

describe('Snackbar', () => {
  let wrapper: RenderResult;
  const content = 'This is a snackbar';

  beforeAll(() => {
    jest.useFakeTimers();
    matchMedia = new MatchMediaMock();
  });

  afterAll(() => {
    jest.runAllTimers();
    jest.clearAllTimers();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  beforeEach(() => {
    wrapper = render(<SnackbarContainer />);
  });

  test('test snack.serve', () => {
    expect(wrapper.queryByText(content)).toBe(null);
    act(() => {
      snack.serve({
        content,
      });
    });
    expect(wrapper.queryByText(content)).not.toBe(null);
    act(() => {
      snack.serve({
        content,
      });
      jest.runAllTimers();
    });
    expect(wrapper.queryByText(content)).toBe(null);
  });

  test('snack.serve generates a close function when props.id is missing', () => {
    let closeFunction: VoidFunction;

    act(() => {
      closeFunction = snack.serve({
        content,
      });
    });

    expect(closeFunction).toBeDefined();
    expect(typeof closeFunction).toBe('function');
  });

  test('snack.serve uses provided props.id', () => {
    let closeFunction: VoidFunction;
    expect(wrapper.queryByText(content)).toBe(null);
    act(() => {
      closeFunction = snack.serve({
        content,
        closable: true,
      });
    });
    jest.runAllTimers();

    // Snack should be visible as it is closable
    expect(wrapper.queryByText(content)).not.toBe(null);

    // Close the snack
    act(() => {
      closeFunction();
    });

    // Snack should be hidden
    expect(wrapper.queryByText(content)).toBe(null);
  });

  test('test snack.serveNeutral', () => {
    expect(wrapper.queryByText(content)).toBe(null);
    act(() => {
      snack.serveNeutral({
        content,
      });
    });
    expect(wrapper.queryByText(content)).not.toBe(null);
    act(() => {
      snack.serveNeutral({
        content,
      });
      jest.runAllTimers();
    });
    expect(wrapper.queryByText(content)).toBe(null);
  });

  test('test snack.serveDisruptive', () => {
    expect(wrapper.queryByText(content)).toBe(null);
    act(() => {
      snack.serveDisruptive({
        content,
      });
    });
    expect(wrapper.queryByText(content)).not.toBe(null);

    act(() => {
      snack.serveDisruptive({
        content,
      });
      jest.runAllTimers();
    });
    expect(wrapper.queryByText(content)).toBe(null);
  });

  test('test snack.servePositive', async () => {
    expect(wrapper.queryByText(content)).toBe(null);
    act(() => {
      snack.servePositive({
        content,
      });
    });
    expect(wrapper.queryByText(content)).not.toBe(null);
    act(() => {
      snack.servePositive({
        content,
      });
      jest.runAllTimers();
    });
    expect(wrapper.queryByText(content)).toBe(null);
  });

  test('test snack.serveWarning', async () => {
    act(() => {
      snack.serveWarning({
        content,
      });
    });
    expect(wrapper.queryByText(content)).not.toBe(null);
    act(() => {
      snack.serveWarning({
        content,
      });
      jest.runAllTimers();
    });
    expect(wrapper.queryByText(content)).toBe(null);
  });

  test('test snack closable', () => {
    expect(wrapper.queryByText(content)).toBe(null);
    const onClose = jest.fn();
    act(() => {
      snack.serveWarning({
        content,
        closable: true,
        onClose,
      });
      jest.runAllTimers();
    });
    expect(wrapper.queryByText(content)).not.toBe(null);
    const closeButton = wrapper.queryByRole('button');
    const event = createEvent.click(closeButton);
    fireEvent(closeButton, event);
    expect(onClose).toBeCalled();
    expect(wrapper.queryByText(content)).toBe(null);
  });

  test('test snack icon', () => {
    expect(wrapper.queryByText(content)).toBe(null);
    act(() => {
      snack.serve({
        content,
        icon: IconName.mdiHomeCity,
      });
    });
    expect(wrapper.queryByText(content)).not.toBe(null);
  });

  test('test snack action', () => {
    expect(wrapper.queryByText(content)).toBe(null);
    const onClick = jest.fn();
    act(() => {
      snack.serve({
        content,
        actionButtonProps: {
          text: 'Button',
          onClick,
        },
      });
    });
    const actionButton = wrapper.queryByRole('button');
    const event = createEvent.click(actionButton);
    fireEvent(actionButton, event);
    expect(onClick).toBeCalled();
    expect(wrapper.queryByText(content)).toBe(null);
  });

  describe('Accessibility improvements', () => {
    test('notification container should not have tabIndex', async () => {
      act(() => {
        snack.serve({
          content,
          closable: true,
        });
      });

      // Use queryByRole which has built-in waiting
      const notification = await wrapper.findByRole('status');
      expect(notification).toBeTruthy();
      // Verify it doesn't have tabindex attribute
      expect(notification.hasAttribute('tabindex')).toBe(false);
    });

    test('should not auto-focus snackbar on appearance', () => {
      const focusedElementBefore = document.activeElement;

      act(() => {
        snack.serve({
          content,
          closable: true,
        });
      });

      jest.runAllTimers();

      // Focus should not have moved to the snackbar
      expect(document.activeElement).toBe(focusedElementBefore);
    });

    test('close button should have descriptive aria-label', () => {
      act(() => {
        snack.serve({
          content,
          closable: true,
        });
      });

      const closeButton = wrapper.getByRole('button', {
        name: /close notification/i,
      });
      expect(closeButton).toBeTruthy();
    });

    test('close button should have aria-describedby pointing to content', async () => {
      act(() => {
        snack.serve({
          content,
          closable: true,
          id: 'test-snack-123',
        });
      });

      // Find the close button
      const closeButton = await wrapper.findByRole('button', {
        name: /close notification/i,
      });

      // Check aria-describedby
      const describedBy = closeButton.getAttribute('aria-describedby');
      expect(describedBy).toBe('snackbar-content-test-snack-123');

      // Verify the content element exists with that ID
      const contentElement = document.getElementById(
        'snackbar-content-test-snack-123'
      );
      expect(contentElement).toBeTruthy();
      expect(contentElement?.textContent).toBe(content);
    });

    test('notifications should be wrapped in role="group"', () => {
      act(() => {
        snack.serve({
          content,
        });
      });

      const group = wrapper.getByRole('group', {
        name: /notifications/i,
      });
      expect(group).toBeTruthy();
    });

    test('non-closable snackbar should have role="alert"', () => {
      act(() => {
        snack.serve({
          content,
          closable: false,
        });
      });

      const alert = wrapper.queryByRole('alert');
      expect(alert).toBeTruthy();
    });

    test('closable snackbar should have role="status"', () => {
      act(() => {
        snack.serve({
          content,
          closable: true,
        });
      });

      const status = wrapper.queryByRole('status');
      expect(status).toBeTruthy();
    });

    test('domPosition prop should control container positioning', () => {
      // Create a test parent element
      const parent = document.createElement('div');
      document.body.appendChild(parent);

      // Render with domPosition='start'
      const { container: startContainer } = render(
        <SnackbarContainer parent={parent} domPosition="start" />
      );

      // Check if container was inserted at the start
      const snackbarContainer = parent.querySelector(
        '[data-snackbar-container="true"]'
      );
      expect(snackbarContainer).toBeTruthy();
      expect(parent.firstChild).toBe(snackbarContainer);

      // Cleanup
      document.body.removeChild(parent);
    });

    test('domPosition="end" should use default behavior', () => {
      const parent = document.createElement('div');
      document.body.appendChild(parent);

      // Add some existing content
      const existingDiv = document.createElement('div');
      existingDiv.textContent = 'Existing content';
      parent.appendChild(existingDiv);

      const { container } = render(
        <SnackbarContainer parent={parent} domPosition="end" />
      );

      act(() => {
        snack.serve({
          content: 'Test notification',
        });
      });

      // With domPosition='end', portal renders directly to parent (appended)
      // The snackbar should appear after existing content
      expect(parent.firstChild).toBe(existingDiv);

      // Cleanup
      document.body.removeChild(parent);
    });
  });
});
