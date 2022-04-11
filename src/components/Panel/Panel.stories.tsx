import React, { useState } from 'react';
import { Panel } from './';
import { PrimaryButton } from '../Button';

export default {
    title: 'Panel',
    component: Panel,
};

export const Default = () => {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <>
            <h1>Panel</h1>
            <PrimaryButton
                text={'Open panel'}
                onClick={() => setVisible(true)}
            />
            <Panel visible={visible} onClose={() => setVisible(false)} />
        </>
    );
};
