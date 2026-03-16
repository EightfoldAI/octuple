import React, { useEffect, useState } from 'react';
import { useMergedState } from '../../../../hooks/useMergedState';
import { useEvent } from '../../../../hooks/useEvent';
import { requestAnimationFrameWrapper } from '../../../../shared/utilities';

export type SourceType =
  | 'open'
  | 'blur'
  | 'confirm'
  | 'cancel'
  | 'clear'
  | 'preset';

export default function useRangeOpen(
  defaultOpen: boolean,
  open: boolean,
  activePickerIndex: 0 | 1 | undefined,
  changeOnBlur: boolean,
  startInputRef: React.RefObject<HTMLInputElement>,
  endInputRef: React.RefObject<HTMLInputElement>,
  startSelectedValue: any,
  endSelectedValue: any,
  disabled: [boolean, boolean],
  readonly: [boolean, boolean],
  onOpenChange?: (open: boolean) => void
): [
  open: boolean,
  activeIndex: 0 | 1,
  firstTimeOpen: boolean,
  triggerOpen: (
    open: boolean,
    activeIndex: 0 | 1 | false,
    source: SourceType
  ) => void
] {
  const [firstTimeOpen, setFirstTimeOpen] = useState(false);

  const [directionalOpen, setDirectionalOpen] = useMergedState(
    defaultOpen || false,
    {
      value: open,
    }
  );

  const [mergedOpen, setMergedOpen] = useMergedState(defaultOpen || false, {
    value: open,
    onChange: (nextOpen) => {
      onOpenChange?.(nextOpen);
    },
  });

  const [mergedActivePickerIndex, setMergedActivePickerIndex] = useMergedState<
    0 | 1
  >(0, {
    value: activePickerIndex,
  });

  const [nextActiveIndex, setNextActiveIndex] = useState<0 | 1>(null);

  useEffect((): void => {
    if (mergedOpen) {
      setFirstTimeOpen(true);
    }
  }, [mergedOpen]);

  const queryNextIndex: (index: number) => 0 | 1 = (index: number) =>
    index === 0 ? 1 : 0;

  const triggerOpen = useEvent(
    (nextOpen: boolean, index: 0 | 1 | false, source: SourceType): void => {
      if (index === false) {
        // Only when `nextOpen` is false and no need open to next index
        setMergedOpen(nextOpen);
      } else if (nextOpen && !disabled[index] && !readonly[index]) {
        setMergedActivePickerIndex(index);
        setMergedOpen(nextOpen);

        const nextIndex: 0 | 1 = queryNextIndex(index);

        // Record next open index
        if (
          !mergedOpen ||
          // Also set next index if next is empty
          ![startSelectedValue, endSelectedValue][nextIndex]
        ) {
          setNextActiveIndex(nextIndex);
        } else {
          setFirstTimeOpen(false);

          if (nextActiveIndex !== null) {
            setNextActiveIndex(null);
          }
        }
      } else if (source === 'confirm' || (source === 'blur' && changeOnBlur)) {
        const customNextActiveIndex = directionalOpen
          ? queryNextIndex(index)
          : nextActiveIndex;

        if (customNextActiveIndex !== null) {
          setFirstTimeOpen(false);
          setMergedActivePickerIndex(customNextActiveIndex);
        }

        setNextActiveIndex(null);

        // Focus back
        if (
          customNextActiveIndex !== null &&
          !disabled[customNextActiveIndex] &&
          !readonly[customNextActiveIndex]
        ) {
          requestAnimationFrameWrapper(() => {
            const ref = [startInputRef, endInputRef][customNextActiveIndex];
            ref.current?.focus();
          });
        } else {
          setMergedOpen(false);
          requestAnimationFrameWrapper(() => {
            const ref =
              index === 0 || index === 1
                ? [startInputRef, endInputRef][index]
                : null;
            ref?.current?.focus();
          });
        }
      } else {
        setMergedOpen(false);
        setDirectionalOpen(false);
      }
    }
  );

  return [mergedOpen, mergedActivePickerIndex, firstTimeOpen, triggerOpen];
}
