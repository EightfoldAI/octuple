import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DayjsPicker } from './util/commonUtil';
import { clearAnnouncementRegions } from '../../../../shared/utilities/announceToScreenReader';

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
    // Clean up announcement regions using the utility function
    clearAnnouncementRegions();
  });

  describe('announceArrowKeyNavigation prop', () => {
    test('should not create announcement region when announceArrowKeyNavigation is false/undefined', () => {
      const { container } = render(<DayjsPicker />);

      // Open the picker
      const input = container.querySelector('input')!;
      fireEvent.mouseDown(input);
      fireEvent.click(input);

      // Should not have any announcement region created
      const announcementRegions = document.querySelectorAll('[aria-live]');
      expect(announcementRegions).toHaveLength(0);
    });

    test('should create announcement region when announceArrowKeyNavigation is true', async () => {
      const { container } = render(
        <DayjsPicker announceArrowKeyNavigation={true} />
      );

      const input = container.querySelector('input')!;
      fireEvent.mouseDown(input);
      fireEvent.click(input);

      // Wait for announcement utility to create region and populate content
      await act(async () => {
        jest.advanceTimersByTime(200); // Wait for delay
      });

      // Should have NVDA-optimized announcement region with assertive priority
      const announcementDiv = document.querySelector('[aria-live="assertive"]');
      expect(announcementDiv).toBeInTheDocument();
      expect(announcementDiv).toHaveAttribute('aria-atomic', 'true');
      expect(announcementDiv).toHaveAttribute('role', 'status');
      expect(announcementDiv).toHaveAttribute('aria-relevant', 'additions text');
    });

    test('should create announcement region with custom message', async () => {
      const customMessage = 'Navigate using arrow keys for better accessibility';
      const { container } = render(
        <DayjsPicker announceArrowKeyNavigation={customMessage} />
      );

      const input = container.querySelector('input')!;
      fireEvent.mouseDown(input);
      fireEvent.click(input);

      // Wait for announcement utility to create region and populate content
      await act(async () => {
        jest.advanceTimersByTime(200); // Wait for delay
      });

      // Should have announcement region with custom message
      const announcementDiv = document.querySelector('[aria-live="assertive"]');
      expect(announcementDiv).toBeInTheDocument();
      expect(announcementDiv?.textContent).toBe(customMessage);
    });
  });

  describe('NVDA-optimized announcement content and timing', () => {
    test('should announce default locale text with NVDA-optimized attributes', async () => {
      const { container } = render(
        <DayjsPicker announceArrowKeyNavigation={true} />
      );

      const input = container.querySelector('input')!;
      fireEvent.mouseDown(input);
      fireEvent.click(input);

      // Wait for announcement utility to create and populate region
      await act(async () => {
        jest.advanceTimersByTime(200); // Wait for 150ms delay + buffer
      });

      // Should have NVDA-optimized announcement region
      const announcementDiv = document.querySelector('[aria-live="assertive"]') as HTMLElement;
      expect(announcementDiv).toBeInTheDocument();
      expect(announcementDiv).toHaveAttribute('aria-live', 'assertive'); // Better NVDA support
      expect(announcementDiv).toHaveAttribute('aria-atomic', 'true');
      expect(announcementDiv).toHaveAttribute('role', 'status');
      expect(announcementDiv).toHaveAttribute('aria-relevant', 'additions text');
    });

    test('should announce custom message with NVDA optimizations', async () => {
      const customMessage = 'Custom navigation instructions for screen readers';
      const { container } = render(
        <DayjsPicker announceArrowKeyNavigation={customMessage} />
      );

      const input = container.querySelector('input')!;
      fireEvent.mouseDown(input);
      fireEvent.click(input);

      // Wait for announcement utility to create and populate region
      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      // Should have NVDA-optimized announcement region with custom message
      const announcementDiv = document.querySelector('[aria-live="assertive"]') as HTMLElement;
      expect(announcementDiv).toBeInTheDocument();
      expect(announcementDiv).toHaveAttribute('aria-live', 'assertive'); // Better NVDA support
      expect(announcementDiv).toHaveAttribute('aria-atomic', 'true');
      expect(announcementDiv).toHaveAttribute('role', 'status');
      expect(announcementDiv?.textContent).toBe(customMessage);
    });

    test('should handle NVDA-optimized timing and cleanup', async () => {
      const { container } = render(
        <DayjsPicker announceArrowKeyNavigation={true} />
      );

      const input = container.querySelector('input')!;
      fireEvent.mouseDown(input);
      fireEvent.click(input);

      // Wait for announcement with NVDA-optimized delay
      await act(async () => {
        jest.advanceTimersByTime(200); // 150ms delay + buffer
      });

      // Should have announcement region
      const announcementDiv = document.querySelector('[aria-live="assertive"]') as HTMLElement;
      expect(announcementDiv).toBeInTheDocument();

      // Should not throw errors when timer executes
      expect(() => {
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }).not.toThrow();
    });

    test('should not create announcement region when picker is closed', () => {
      const { container } = render(
        <DayjsPicker announceArrowKeyNavigation={true} />
      );

      // Don't open the picker - should not trigger announcement
      const announcementRegions = document.querySelectorAll('[aria-live]');

      // Should not have any announcement regions since picker isn't open
      expect(announcementRegions).toHaveLength(0);
    });
  });

  describe('integration with focus trap', () => {
    test('should work with focus trap enabled', async () => {
      const { container } = render(
        <DayjsPicker announceArrowKeyNavigation={true} trapFocus={true} />
      );

      const input = container.querySelector('input')!;
      fireEvent.mouseDown(input);
      fireEvent.click(input);

      // Wait for announcement with NVDA-optimized delay
      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      // Should have NVDA-optimized announcement region
      const announcementDiv = document.querySelector('[aria-live="assertive"]') as HTMLElement;
      expect(announcementDiv).toBeInTheDocument();
      expect(announcementDiv).toHaveAttribute('aria-live', 'assertive');

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

      // Should not have any announcement regions
      const announcementRegions = document.querySelectorAll('[aria-live]');
      expect(announcementRegions).toHaveLength(0);

      // Focus trap should still work
      const focusTrapContainer = document.querySelector('[data-testid="picker-dialog"]');
      expect(focusTrapContainer).toBeInTheDocument();
    });
  });

  describe('NVDA-optimized cleanup and edge cases', () => {
    test('should cleanup announcement utility when component unmounts', async () => {
      const { container, unmount } = render(
        <DayjsPicker announceArrowKeyNavigation={true} />
      );

      const input = container.querySelector('input')!;
      fireEvent.mouseDown(input);
      fireEvent.click(input);

      // Wait for announcement utility to create region
      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      // Should have announcement region
      expect(document.querySelector('[aria-live="assertive"]')).toBeInTheDocument();

      // Unmount before any pending timers complete
      unmount();

      // Should not throw any errors when timers execute
      expect(() => {
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }).not.toThrow();
    });

    test('should handle rapid open/close cycles with NVDA optimizations gracefully', async () => {
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

      // Wait for all NVDA-optimized announcement delays to process
      await act(async () => {
        jest.advanceTimersByTime(500);
      });

      // Should not throw errors when timers execute
      expect(() => {
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }).not.toThrow();
    });
  });

  describe('NVDA-optimized accessibility attributes', () => {
    test('should have correct ARIA attributes for NVDA compatibility', async () => {
      const { container } = render(
        <DayjsPicker announceArrowKeyNavigation={true} />
      );

      const input = container.querySelector('input')!;
      fireEvent.mouseDown(input);
      fireEvent.click(input);

      // Wait for announcement region to be created and populated
      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      const announcementDiv = document.querySelector('[aria-live="assertive"]');
      expect(announcementDiv).toHaveAttribute('aria-live', 'assertive'); // Better NVDA support
      expect(announcementDiv).toHaveAttribute('aria-atomic', 'true');
      expect(announcementDiv).toHaveAttribute('role', 'status'); // Enhanced compatibility
      expect(announcementDiv).toHaveAttribute('aria-relevant', 'additions text');
      // Should use visually hidden styles for better cross-screen reader support
      expect(announcementDiv).toHaveStyle('position: absolute');
      expect(announcementDiv).toHaveStyle('width: 1px');
      expect(announcementDiv).toHaveStyle('height: 1px');
    });
  });

  describe('integration with existing DatePicker functionality', () => {
    test('should not interfere with normal picker operation', async () => {
      const onChange = jest.fn();
      const { container } = render(
        <DayjsPicker announceArrowKeyNavigation={true} onChange={onChange} />
      );

      const input = container.querySelector('input')!;
      fireEvent.mouseDown(input);
      fireEvent.click(input);

      // Wait for announcement utility processing
      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      // Select a date
      const dateCell = document.querySelector('.picker-cell-inner');
      if (dateCell) {
        fireEvent.click(dateCell);
      }

      // Should trigger onChange as normal - announcement utility should not interfere
      expect(onChange).toHaveBeenCalled();
    });

    test('should not interfere with keyboard navigation', async () => {
      const { container } = render(
        <DayjsPicker announceArrowKeyNavigation={true} />
      );

      const input = container.querySelector('input')!;
      fireEvent.mouseDown(input);
      fireEvent.click(input);

      // Wait for announcement utility processing
      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      // Should be able to navigate with arrow keys without errors
      expect(() => {
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'ArrowRight' });
        fireEvent.keyDown(input, { key: 'Enter' });
      }).not.toThrow();

      expect(input).toBeInTheDocument();
    });

    test('should not interfere with changeOnBlur functionality', async () => {
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

      // Wait for announcement utility processing
      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      // Select a date
      const dateCell = document.querySelector('.picker-cell-inner');
      if (dateCell) {
        fireEvent.click(dateCell);
      }

      // Blur to trigger changeOnBlur
      container.querySelector<HTMLButtonElement>('.outside')!.focus();
      fireEvent.blur(input);

      // Should trigger onChange on blur - announcement utility should not interfere
      expect(onChange).toHaveBeenCalled();
    });
  });
});