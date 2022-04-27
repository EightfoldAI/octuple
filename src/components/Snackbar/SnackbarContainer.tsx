import React, { FC, useEffect, useState } from 'react';
import {
    SnackbarContainerProps,
    SnackbarPosition,
    SnackbarProps,
} from './Snackbar.types';
import { Portal } from '../Portal';
import { Snackbar } from './Snackbar';
import { eat, SNACK_EVENTS } from './snack';
import { classNames } from '../../shared/utilities';

import styles from './snackbar.module.scss';

export const SnackbarContainer: FC<SnackbarContainerProps> = ({
    parent = document.body,
}) => {
    const [snacks, setSnacks] = useState<SnackbarProps[]>([]);

    const addSnack = (e: CustomEvent<SnackbarProps>): void =>
        setSnacks((s) => [...s, e.detail]);

    const removeSnack = (e: CustomEvent<string>): void =>
        setSnacks((s) => s.filter((snack) => snack.id !== e.detail));

    useEffect(() => {
        document.addEventListener(SNACK_EVENTS.SERVE, addSnack);
        document.addEventListener(SNACK_EVENTS.EAT, removeSnack);
        return () => {
            document.removeEventListener(SNACK_EVENTS.SERVE, addSnack);
            document.removeEventListener(SNACK_EVENTS.EAT, removeSnack);
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
                className={classNames([
                    styles.snackbarContainer,
                    positionToClassMap[position],
                ])}
            >
                {getPositionSnacks(position).map((snack) => (
                    <Snackbar
                        key={snack.id}
                        {...snack}
                        onClose={() => {
                            eat(snack.id);
                            snack.onClose?.();
                        }}
                    />
                ))}
            </div>
        ));

    return <Portal getContainer={() => parent}>{getSnackContainers()}</Portal>;
};
