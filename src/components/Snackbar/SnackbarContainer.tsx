'use client';

import React, { FC, useEffect, useState } from 'react';
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

  const addSnack = (e: CustomEvent<SnackbarProps>): void =>
    setSnacks((s) => [...s, e.detail]);

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
    Object.keys(positionToClassMap).map((position: SnackbarPosition) => (
      <div
        key={position}
        className={mergeClasses([
          styles.snackbarContainer,
          positionToClassMap[position],
        ])}
      >
        {getPositionSnacks(position).map((snack) => (
          <Snackbar
            {...snack}
            key={snack.id}
            onClose={() => {
              eat(snack.id);
              snack.onClose?.();
            }}
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
    ));

  return <Portal getContainer={() => parent}>{getSnackContainers()}</Portal>;
};
