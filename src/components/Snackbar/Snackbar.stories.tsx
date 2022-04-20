import React from 'react';
import { Snackbar, SnackbarType } from './';

export default {
    title: 'Snackbar',
    component: Snackbar,
};

export const Default = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h1>Snackbar</h1>
        <Snackbar
            message={
                'Body 2 is used in this snackbar. This should be straight forward but can wrap up to two lines if needed.'
            }
        />
        <Snackbar
            message={
                'Body 2 is used in this snackbar. This should be straight forward but can wrap up to two lines if needed.'
            }
            type={SnackbarType.positive}
        />
        <Snackbar
            message={
                'Body 2 is used in this snackbar. This should be straight forward but can wrap up to two lines if needed.'
            }
            type={SnackbarType.warning}
        />
        <Snackbar
            message={
                'Body 2 is used in this snackbar. This should be straight forward but can wrap up to two lines if needed.'
            }
            type={SnackbarType.disruptive}
        />
    </div>
);
