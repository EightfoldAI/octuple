import React, { FC, useState } from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Truncate } from './Truncate';
import { Tooltip } from '../Tooltip';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

const fireResize = (width: number) => {
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
};

describe('Truncate', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('short text where truncate is disabled', () => {
    const handleTruncateChangeEvent = jest.fn();
    const TestComponent: FC = () => {
      return (
        <Truncate
          id="truncate1"
          onTruncateChange={handleTruncateChangeEvent}
          text="Short content"
        />
      );
    };
    render(<TestComponent />);
    expect(handleTruncateChangeEvent).toHaveBeenCalledWith('truncate1', false);
  });

  test('long text where truncate is enabled', async () => {
    // Mock clientWidth and scrollWidth
    Object.defineProperties(HTMLElement.prototype, {
      clientWidth: {
        get() {
          return 100;
        }, // Mock clientWidth to be 100
        configurable: true,
      },
      scrollWidth: {
        get() {
          return 200;
        }, // Mock scrollWidth to be larger than clientWidth to simulate truncation
        configurable: true,
      },
    });
    const handleTruncateChangeEvent = jest.fn();
    const TestComponent: FC = () => {
      return (
        <div style={{ width: 100 }}>
          <Truncate
            id="truncate2"
            onTruncateChange={handleTruncateChangeEvent}
            text="Very long content that will definitely be truncated"
          />
        </div>
      );
    };
    await waitFor(() => {
      fireResize(100);
    });
    render(<TestComponent />);
    await waitFor(() => {
      expect(handleTruncateChangeEvent).toHaveBeenCalledWith('truncate2', true);
    });
  });

  test('text is not truncated and its tooltip is disabled, then is truncated on window resize and the Tooltip is enabled', async () => {
    const handleTruncateChangeEvent = jest.fn();
    const TestComponent: FC = () => {
      const [truncationStatus, setTruncationStatus] = useState<
        Record<string, boolean>
      >({});
      const handleTruncationChange = (id: string, isTruncated: boolean) => {
        setTruncationStatus((prev: Record<string, boolean>) => ({
          ...prev,
          [id]: isTruncated,
        }));
        handleTruncateChangeEvent(id, isTruncated);
      };
      return (
        <Tooltip
          content="Some content that may be truncated"
          disabled={!truncationStatus['truncate3']}
        >
          <Truncate
            id="truncate3"
            onTruncateChange={handleTruncationChange}
            text="Some content that may be truncated"
          />
        </Tooltip>
      );
    };
    const { getByText, rerender } = render(<TestComponent />);
    expect(getByText('Some content that may be truncated')).toBeInTheDocument();
    expect(handleTruncateChangeEvent).toHaveBeenCalledWith('truncate3', false);
    Object.defineProperties(HTMLElement.prototype, {
      clientWidth: {
        get() {
          return 100;
        },
        configurable: true,
      },
      scrollWidth: {
        get() {
          return 200;
        },
        configurable: true,
      },
    });
    await waitFor(() => {
      fireResize(100);
    });
    rerender(<TestComponent />);
    expect(handleTruncateChangeEvent).toHaveBeenCalledWith('truncate3', true);
  });
});
