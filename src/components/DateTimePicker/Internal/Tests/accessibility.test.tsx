import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DayjsPicker } from './util/commonUtil';

Enzyme.configure({ adapter: new Adapter() });

describe('DatePicker Accessibility Announcements', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    // Clean up any announcement divs
    const announcements = document.querySelectorAll('[aria-live="polite"]');
    announcements.forEach(el => el.remove());
  });

  describe('announceArrowKeyNavigation prop', () => {
    test('should not render announcement div when announceArrowKeyNavigation is false/undefined', () => {
      const { container } = render(<DayjsPicker />);

      // Open the picker
      const input = container.querySelector('input')!;
      fireEvent.mouseDown(input);
      fireEvent.click(input);

      // Should not have any announcement div
      const announcementDiv = document.querySelector('[aria-live="polite"]');
      expect(announcementDiv).toBeNull();
    });

    test('should render announcement div when announceArrowKeyNavigation is true', () => {
      const { container } = render(
        <DayjsPicker announceArrowKeyNavigation={true} />
      );

      const input = container.querySelector('input')!;
      fireEvent.mouseDown(input);
      fireEvent.click(input);

      // Should have announcement div (look in document since popup is in Portal)
      const announcementDiv = document.querySelector('[aria-live="polite"]');
      expect(announcementDiv).toBeInTheDocument();
      expect(announcementDiv).toHaveAttribute('aria-atomic', 'true');
      expect(announcementDiv).toHaveClass('sr-only');
    });

    test('should render announcement div when announceArrowKeyNavigation is a custom string', () => {
      const customMessage = 'Navigate using arrow keys for better accessibility';
      const { container } = render(
        <DayjsPicker announceArrowKeyNavigation={customMessage} />
      );

      const input = container.querySelector('input')!;
      fireEvent.mouseDown(input);
      fireEvent.click(input);

      // Should have announcement div
      const announcementDiv = document.querySelector('[aria-live="polite"]');
      expect(announcementDiv).toBeInTheDocument();
    });
  });

  describe('announcement content and timing', () => {
    test('should announce default locale text when announceArrowKeyNavigation is true', () => {
      const { container } = render(
        <DayjsPicker announceArrowKeyNavigation={true} />
      );

      const input = container.querySelector('input')!;
      fireEvent.mouseDown(input);
      fireEvent.click(input);

      // Wait for useEffect to run
      act(() => {
        jest.runOnlyPendingTimers();
      });

      const announcementDiv = document.querySelector('[aria-live="polite"]') as HTMLElement;
      expect(announcementDiv.textContent).toBe('Use arrow keys to navigate the calendar');
    });

    test('should announce custom message when announceArrowKeyNavigation is a string', () => {
      const customMessage = 'Custom navigation instructions for screen readers';
      const { container } = render(
        <DayjsPicker announceArrowKeyNavigation={customMessage} />
      );

      const input = container.querySelector('input')!;
      fireEvent.mouseDown(input);
      fireEvent.click(input);

      // Wait for useEffect to run
      act(() => {
        jest.runOnlyPendingTimers();
      });

      const announcementDiv = document.querySelector('[aria-live="polite"]') as HTMLElement;
      expect(announcementDiv.textContent).toBe(customMessage);
    });

    test('should clear announcement text after 1 second', () => {
      const { container } = render(
        <DayjsPicker announceArrowKeyNavigation={true} />
      );

      const input = container.querySelector('input')!;
      fireEvent.mouseDown(input);
      fireEvent.click(input);

      // Wait for useEffect to run
      act(() => {
        jest.runOnlyPendingTimers();
      });

      const announcementDiv = document.querySelector('[aria-live="polite"]') as HTMLElement;

      // Initially should have the announcement text
      expect(announcementDiv.textContent).toBe('Use arrow keys to navigate the calendar');

      // After 1 second, should be cleared
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(announcementDiv.textContent).toBe('');
    });

    test('should not announce when picker is closed', () => {
      const { container } = render(
        <DayjsPicker announceArrowKeyNavigation={true} />
      );

      // Don't open the picker
      const announcementDiv = document.querySelector('[aria-live="polite"]');

      // Should not have announcement div since picker isn't open
      expect(announcementDiv).toBeNull();
    });
  });

  describe('integration with focus trap', () => {
    test('should work with focus trap enabled', () => {
      const { container } = render(
        <DayjsPicker announceArrowKeyNavigation={true} trapFocus={true} />
      );

      const input = container.querySelector('input')!;
      fireEvent.mouseDown(input);
      fireEvent.click(input);

      // Wait for useEffect to run
      act(() => {
        jest.runOnlyPendingTimers();
      });

      // Should have announcement initially
      const announcementDiv = document.querySelector('[aria-live="polite"]') as HTMLElement;
      expect(announcementDiv.textContent).toBe('Use arrow keys to navigate the calendar');

      // Focus trap container should be present
      const focusTrapContainer = document.querySelector('[data-testid="picker-dialog"]');
      expect(focusTrapContainer).toBeInTheDocument();
    });

    test('should work when only trapFocus is enabled without announcement', () => {
      const { container } = render(
        <DayjsPicker trapFocus={true} />
      );

      const input = container.querySelector('input')!;
      fireEvent.mouseDown(input);
      fireEvent.click(input);

      // Should not have announcement div
      const announcementDiv = document.querySelector('[aria-live="polite"]');
      expect(announcementDiv).toBeNull();

      // Focus trap should still work
      const focusTrapContainer = document.querySelector('[data-testid="picker-dialog"]');
      expect(focusTrapContainer).toBeInTheDocument();
    });
  });

  describe('cleanup and edge cases', () => {
    test('should cleanup timer when component unmounts', () => {
      const { container, unmount } = render(
        <DayjsPicker announceArrowKeyNavigation={true} />
      );

      const input = container.querySelector('input')!;
      fireEvent.mouseDown(input);
      fireEvent.click(input);

      // Unmount before timer completes
      unmount();

      // Should not throw any errors when timer tries to execute
      expect(() => {
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }).not.toThrow();
    });

    test('should handle rapid open/close cycles gracefully', () => {
      const { container } = render(
        <DayjsPicker announceArrowKeyNavigation={true} />
      );

      const input = container.querySelector('input')!;

      // Rapidly open and close picker multiple times
      for (let i = 0; i < 3; i++) {
        fireEvent.mouseDown(input);
        fireEvent.click(input);
        fireEvent.keyDown(input, { key: 'Escape' });
      }

      // Should not throw errors when timers execute
      expect(() => {
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }).not.toThrow();
    });
  });

  describe('accessibility attributes', () => {
    test('should have correct ARIA attributes on announcement div', () => {
      const { container } = render(
        <DayjsPicker announceArrowKeyNavigation={true} />
      );

      const input = container.querySelector('input')!;
      fireEvent.mouseDown(input);
      fireEvent.click(input);

      const announcementDiv = document.querySelector('[aria-live="polite"]');
      expect(announcementDiv).toHaveAttribute('aria-live', 'polite');
      expect(announcementDiv).toHaveAttribute('aria-atomic', 'true');
      expect(announcementDiv).toHaveClass('sr-only');
    });
  });

  describe('integration with existing DatePicker functionality', () => {
    test('should not interfere with normal picker operation', () => {
      const onChange = jest.fn();
      const { container } = render(
        <DayjsPicker announceArrowKeyNavigation={true} onChange={onChange} />
      );

      const input = container.querySelector('input')!;
      fireEvent.mouseDown(input);
      fireEvent.click(input);

      // Select a date
      const dateCell = document.querySelector('.picker-cell-inner');
      if (dateCell) {
        fireEvent.click(dateCell);
      }

      // Should trigger onChange as normal
      expect(onChange).toHaveBeenCalled();
    });

    test('should not interfere with keyboard navigation', () => {
      const { container } = render(
        <DayjsPicker announceArrowKeyNavigation={true} />
      );

      const input = container.querySelector('input')!;
      fireEvent.mouseDown(input);
      fireEvent.click(input);

      // Should be able to navigate with arrow keys without errors
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'ArrowRight' });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(input).toBeInTheDocument();
    });

    test('should not interfere with changeOnBlur functionality', () => {
      const onChange = jest.fn();
      const { container } = render(
        <>
          <DayjsPicker
            announceArrowKeyNavigation={true}
            changeOnBlur
            onChange={onChange}
          />
          <button className="outside" />
        </>
      );

      const input = container.querySelector('input')!;
      fireEvent.mouseDown(input);
      fireEvent.click(input);
      fireEvent.focus(input);

      // Select a date
      const dateCell = document.querySelector('.picker-cell-inner');
      if (dateCell) {
        fireEvent.click(dateCell);
      }

      // Blur to trigger changeOnBlur
      container.querySelector<HTMLButtonElement>('.outside')!.focus();
      fireEvent.blur(input);

      // Should trigger onChange on blur
      expect(onChange).toHaveBeenCalled();
    });
  });
});