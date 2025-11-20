'use client';

import React, { FC, useEffect, useRef, useState } from 'react';
import {
  SnackbarContainerProps,
  SnackbarLocale,
  SnackbarPosition,
  SnackbarProps,
} from './Snackbar.types';
import { Portal } from '../Portal';
import { Snackbar } from './Snackbar';
import { eat, SNACK_EVENTS } from './snack';
import { canUseDocElement, mergeClasses } from '../../shared/utilities';
import enUS from './Locale/en_US';
import { useLocaleReceiver } from '../../locale';

import styles from './snackbar.module.scss';

export const SnackbarContainer: FC<SnackbarContainerProps> = ({
  parent = typeof document !== 'undefined' ? document.body : null,
  locale = enUS,
}) => {
  const [snacks, setSnacks] = useState<SnackbarProps[]>([]);
  const closeButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const [snackbarLocale] = useLocaleReceiver('Snackbar');
  let mergedLocale: SnackbarLocale;

  if (locale) {
    mergedLocale = locale;
  } else {
    mergedLocale = snackbarLocale || locale;
  }

  const addSnack = (e: CustomEvent<SnackbarProps>): void => {
    setSnacks((s) => [...s, e.detail]);
  };

  const removeSnack = (e: CustomEvent<string>): void =>
    setSnacks((s) => s.filter((snack) => snack.id !== e.detail));

  useEffect(() => {
    if (canUseDocElement()) {
      document.addEventListener(SNACK_EVENTS.SERVE, addSnack);
      document.addEventListener(SNACK_EVENTS.EAT, removeSnack);
    }
    return () => {
      if (canUseDocElement()) {
        document.removeEventListener(SNACK_EVENTS.SERVE, addSnack);
        document.removeEventListener(SNACK_EVENTS.EAT, removeSnack);
      }
    };
  }, []);

  // Keyboard navigation: first tab interception and arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      const closableSnacks = snacks.filter((snack) => snack.closable);

      if (closableSnacks.length === 0) {
        return;
      }

      // Handle tab interception
      if (e.key === 'Tab') {
        e.preventDefault();
        // Move focus to the first closable snackbar's close button
        const firstSnack = closableSnacks[0];
        const firstButton = closeButtonRefs.current.get(firstSnack.id!);
        firstButton?.focus();
        return;
      }

      // Arrow key navigation between close buttons
      const activeElement = document.activeElement as HTMLElement;
      const focusedSnackId = Array.from(closeButtonRefs.current.entries()).find(
        ([, button]) => button === activeElement
      )?.[0];

      if (focusedSnackId && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        e.preventDefault();
        const focusedIndex = closableSnacks.findIndex(
          (snack) => snack.id === focusedSnackId
        );

        let nextIndex: number;
        if (e.key === 'ArrowDown') {
          nextIndex = (focusedIndex + 1) % closableSnacks.length;
        } else {
          nextIndex =
            (focusedIndex - 1 + closableSnacks.length) % closableSnacks.length;
        }

        const nextSnack = closableSnacks[nextIndex];
        const nextButton = closeButtonRefs.current.get(nextSnack.id!);
        nextButton?.focus();
      }
    };

    if (canUseDocElement()) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (canUseDocElement()) {
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [snacks]);

  const positionToClassMap: Record<SnackbarPosition, string> = {
    'top-left': styles.topLeft,
    'top-right': styles.topRight,
    'top-center': styles.topCenter,
    'bottom-left': styles.bottomLeft,
    'bottom-right': styles.bottomRight,
    'bottom-center': styles.bottomCenter,
  };

  const getPositionSnacks = (position: SnackbarPosition): SnackbarProps[] => {
    const positionSnacks = [
      ...snacks.filter((snack) => snack.position === position),
    ];
    if (position.includes('bottom')) {
      positionSnacks.reverse();
    }
    return positionSnacks;
  };

  const getSnackContainers = (): JSX.Element[] =>
    Object.keys(positionToClassMap).map((position: SnackbarPosition) => {
      const positionSnacks = getPositionSnacks(position);

      return (
        <div
          role="region"
          aria-label={mergedLocale.lang!.notificationsRegionAriaLabelText}
          key={position}
          className={mergeClasses([
            styles.snackbarContainer,
            positionToClassMap[position],
          ])}
        >
          {positionSnacks.map((snack) => (
            <Snackbar
              {...snack}
              key={snack.id}
              contentId={snack.contentId || `snackbar-content-${snack.id}`}
              closeButtonRef={(ref: HTMLButtonElement | null) => {
                if (ref && snack.id) {
                  closeButtonRefs.current.set(snack.id, ref);
                } else if (!ref && snack.id) {
                  closeButtonRefs.current.delete(snack.id);
                }
              }}
              onClose={() => {
                // Find next/previous closable snack for focus
                const closableSnacks = snacks.filter((s) => s.closable);
                const currentIndex = closableSnacks.findIndex(
                  (s) => s.id === snack.id
                );

                if (currentIndex !== -1) {
                  const nextSnack =
                    closableSnacks[currentIndex + 1] ||
                    closableSnacks[currentIndex - 1];
                  if (nextSnack) {
                    const nextButton = closeButtonRefs.current.get(
                      nextSnack.id!
                    );
                    nextButton?.focus();
                  }
                }

                eat(snack.id);
                snack.onClose?.();
              }}
              moveFocusToSnackbar={false}
              {...(snack.actionButtonProps
                ? {
                    actionButtonProps: {
                      ...snack.actionButtonProps,
                      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                        eat(snack.id);
                        snack.actionButtonProps?.onClick?.(e);
                      },
                    },
                  }
                : {})}
            />
          ))}
        </div>
      );
    });

  return <Portal getContainer={() => parent}>{getSnackContainers()}</Portal>;
};
