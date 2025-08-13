'use client';

import React, { FC, useEffect, useRef, useState } from 'react';
import {
  SnackbarContainerProps,
  SnackbarPosition,
  SnackbarProps,
} from './Snackbar.types';
import { Portal } from '../Portal';
import { Snackbar } from './Snackbar';
import { eat, SNACK_EVENTS } from './snack';
import { canUseDocElement, mergeClasses } from '../../shared/utilities';

import styles from './snackbar.module.scss';

export const SnackbarContainer: FC<SnackbarContainerProps> = ({
  parent = typeof document !== 'undefined' ? document.body : null,
}) => {
  const [snacks, setSnacks] = useState<SnackbarProps[]>([]);
  const snackContainerRef = useRef<(HTMLDivElement | null)[]>([]);

  const addSnack = (e: CustomEvent<SnackbarProps>): void => {
    setSnacks((s) => {
      const newSnacks = [...s, e.detail];
      setTimeout(() => {
        const newSnackIndex = newSnacks.length - 1;
        snackContainerRef.current[newSnackIndex]?.focus();
      }, 0);
      return newSnacks;
    });
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
      const hasClosableSnack = positionSnacks.some((snack) => snack.closable);

      return (
        <div
          key={position}
          className={mergeClasses([
            styles.snackbarContainer,
            positionToClassMap[position],
          ])}
        >
          {positionSnacks.map((snack, index) => (
            <Snackbar
              ref={(ref) => {
                if (ref) {
                  snackContainerRef.current[index] = ref;
                }
              }}
              {...snack}
              key={snack.id}
              onClose={() => {
                const index = snackContainerRef.current.findIndex(
                  (ref) => ref?.id === snack.id
                );
                if (index !== -1) {
                  snackContainerRef.current.splice(index, 1);
                  const nextElement =
                    snackContainerRef.current[index] ||
                    snackContainerRef.current[index - 1];
                  nextElement?.focus();
                }
                eat(snack.id);
                snack.onClose?.();
              }}
              {...(hasClosableSnack ? { tabIndex: 0 } : {})}
              role={hasClosableSnack ? 'status' : 'alert'}
              moveFocusToSnackbar={hasClosableSnack}
              {...(snack.actionButtonProps
                ? {
                    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                      eat(snack.id);
                      snack.actionButtonProps?.onClick?.(e);
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
