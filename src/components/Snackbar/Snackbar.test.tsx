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
      const notification = await wrapper.findByRole('alert');
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

    test('notifications should be wrapped in role="region"', () => {
      act(() => {
        snack.serve({
          content,
        });
      });

      // Only the active position's region is accessible to screen readers;
      // empty regions are hidden via aria-hidden.
      const regions = wrapper.getAllByRole('region', {
        name: /notifications/i,
      });
      expect(regions).toBeTruthy();
      expect(regions.length).toBe(1);
    });

    test('empty position regions have aria-hidden="true"', () => {
      // Before any snack: all 6 position regions are hidden from ATs
      const allRegions = document.querySelectorAll('[role="region"]');
      expect(allRegions.length).toBe(6);
      allRegions.forEach((region) => {
        expect(region.getAttribute('aria-hidden')).toBe('true');
      });
    });

    test('active position region does not have aria-hidden; empty positions do', () => {
      act(() => {
        snack.serve({ content, position: 'top-center' });
      });

      // 5 empty positions remain aria-hidden
      const hiddenRegions = document.querySelectorAll(
        '[role="region"][aria-hidden="true"]'
      );
      expect(hiddenRegions.length).toBe(5);

      // The region containing the active snack is accessible
      const visibleRegions = wrapper.getAllByRole('region', {
        name: /notifications/i,
      });
      expect(visibleRegions.length).toBe(1);
      expect(visibleRegions[0].getAttribute('aria-hidden')).toBeNull();
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
  });
});
