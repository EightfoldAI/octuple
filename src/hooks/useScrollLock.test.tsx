import { renderHook } from '@testing-library/react-hooks';

import { useScrollLock } from './useScrollLock';
import { useState } from 'react';

describe('useScrollLock hook', () => {
  it('set overflow to hidden and reset', () => {
    renderHook(() => {
      const [visible, setVisible] = useState<boolean>(false);
      useScrollLock(document.documentElement, visible);
      expect(document.documentElement.style.overflow).toBe('hidden');
      setVisible(false);
      expect(document.documentElement.style.overflow).toBe('');
    });
  });
});
