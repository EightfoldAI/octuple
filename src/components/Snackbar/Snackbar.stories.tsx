import React from 'react';
import { Snackbar, SnackbarContainer, SnackbarType } from './';
import { useSnack } from './snack';
import { DefaultButton } from '../Button';

export default {
    title: 'Snackbar',
    component: Snackbar,
};

export const Default = () => {
    let snackIndex = 1;
    const { serve } = useSnack();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h1>Snackbar</h1>
            <DefaultButton
                text={'Serve snack'}
                onClick={() => {
                    serve({
                        content: `My first snack ${snackIndex}`,
                        type: SnackbarType.neutral,
                        closable: true,
                        onClose: () => {
                            console.log('closed');
                        },
                    });
                    serve({
                        content: `My first snack ${snackIndex}`,
                        type: SnackbarType.positive,
                        position: 'top',
                    });
                    serve({
                        content: `My first snack ${snackIndex}`,
                        type: SnackbarType.warning,
                    });
                    serve({
                        content: `My first snack ${snackIndex}`,
                        type: SnackbarType.disruptive,
                    });
                    snackIndex += 1;
                }}
            />
            <SnackbarContainer />
        </div>
    );
};
