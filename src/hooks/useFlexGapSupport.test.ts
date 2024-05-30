import { renderHook } from '@testing-library/react-hooks';
import useFlexGapSupport from './useFlexGapSupport';
import { detectFlexGapSupported } from '../shared/utilities';

jest.mock('../shared/utilities', () => ({
  detectFlexGapSupported: jest.fn(),
}));

describe('useFlexGapSupport', () => {
  test('Should initially return false', () => {
    (detectFlexGapSupported as jest.Mock).mockReturnValue(false);

    const { result } = renderHook(() => useFlexGapSupport());

    expect(result.current).toBe(false);
  });

  test('Should return true if flex gap is supported', () => {
    (detectFlexGapSupported as jest.Mock).mockReturnValue(true);

    const { result, waitForNextUpdate } = renderHook(() => useFlexGapSupport());

    waitForNextUpdate();

    expect(result.current).toBe(true);
  });

  test('Should return false if flex gap is not supported', () => {
    (detectFlexGapSupported as jest.Mock).mockReturnValue(false);

    const { result, waitForNextUpdate } = renderHook(() => useFlexGapSupport());

    waitForNextUpdate();

    expect(result.current).toBe(false);
  });
});
