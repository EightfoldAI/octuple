import React, { FC, useEffect, useState } from 'react';
import { SnackbarContainerProps, SnackbarProps } from './Snackbar.types';
import { Portal } from '../Portal';
import { Snackbar } from './Snackbar';
import { useSnack } from './snack';

import styles from './snackbar.module.scss';

export const SnackbarContainer: FC<SnackbarContainerProps> = ({
    parent = document.body,
}) => {
    const [snacks, setSnacks] = useState<SnackbarProps[]>([]);
    const { eat } = useSnack();

    const addSnack = (e: CustomEvent<SnackbarProps>): void => {
        setSnacks((s) => [...s, e.detail]);
    };

    const removeSnack = (e: CustomEvent<string>): void => {
        setSnacks((s) => s.filter((snack) => snack.id !== e.detail));
    };

    useEffect(() => {
        document.addEventListener('serveSnack', addSnack);
        document.addEventListener('removeSnack', removeSnack);
        return () => {
            document.removeEventListener('serveSnack', addSnack);
            document.removeEventListener('removeSnack', removeSnack);
        };
    }, []);

    const getSnacks = (): JSX.Element => (
        <div className={styles.snackbarContainer}>
            {snacks.map((snack) => (
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
    );

    return <Portal getContainer={() => parent}>{getSnacks()}</Portal>;
};
