'use client';

import React, { FC, useEffect } from 'react';
import { TruncateProps } from './Truncate.types';
import { useTruncate } from '../../hooks/useTruncate';
import { usePreviousState } from '../../hooks/usePreviousState';

export const Truncate: FC<TruncateProps> = (props: TruncateProps) => {
  const { text, lineClamp = 1, id, onTruncateChange, ...rest } = props;
  const { TruncateText, isTextTruncated } = useTruncate({
    lineClamp,
  });
  const prevIsTextTruncated: boolean = usePreviousState(isTextTruncated);
  useEffect(() => {
    if (onTruncateChange && isTextTruncated !== prevIsTextTruncated) {
      onTruncateChange(id, isTextTruncated);
    }
  }, [id, isTextTruncated, onTruncateChange, prevIsTextTruncated]);
  return <TruncateText {...rest}>{text}</TruncateText>;
};
