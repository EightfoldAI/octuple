'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { OcBaseProps } from '../components/OcBase';
import { canUseDom, hasOverflow, mergeClasses } from '../shared/utilities';

export interface TruncateTextProps extends OcBaseProps<HTMLSpanElement> {
  children: React.ReactNode;
}

/**
 * A hook to truncate text with ellipsis.
 * Use this to ensure how text will be truncated in a UI element is consistent
 * across implementations and works with Tooltip.
 * @param options lineClamp: number
 * @returns [JSX.Element, boolean]
 */
export const useTruncate = (options?: {
  lineClamp: number;
}): {
  TruncateText: ({ children, ...rest }: TruncateTextProps) => JSX.Element;
  isTextTruncated: boolean;
} => {
  const [isTextTruncated, setIsTextTruncated] = useState<boolean>(false);
  const textRef: React.MutableRefObject<HTMLSpanElement> =
    useRef<HTMLSpanElement>(null);

  const checkTruncation = useCallback((): void => {
    if (!textRef.current) {
      return;
    }
    const isTruncated: boolean = hasOverflow(textRef.current as HTMLElement);
    setIsTextTruncated(isTruncated);
  }, []);

  useEffect(() => {
    // Call checkTruncation immediately to check truncation on initial render
    checkTruncation();
    if (canUseDom()) {
      // Add event listener for window resize
      window?.addEventListener('resize', checkTruncation);
    }
    // Clean up event listener on unmount
    return () => {
      if (canUseDom()) {
        window?.removeEventListener('resize', checkTruncation);
      }
    };
  }, [checkTruncation]);

  const textClassNames: string = mergeClasses([
    { ['text-is-truncated']: isTextTruncated },
    { ['all-text-visible']: !isTextTruncated },
  ]);

  const TruncateText = ({ children, ...rest }: TruncateTextProps) => (
    <span
      {...rest}
      className={mergeClasses([
        textClassNames,
        rest?.className,
        rest?.classNames,
      ])}
      ref={textRef}
      style={{
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: options?.lineClamp || 1,
        overflowY: 'hidden',
        textOverflow: 'ellipsis',
        ...(isTextTruncated && { wordBreak: 'break-all' }),
        ...rest?.style,
      }}
    >
      {children}
    </span>
  );

  return { TruncateText, isTextTruncated };
};
