import React from 'react';
import { Spinner, SpinnerSize } from './';

export default {
    title: 'Spinner',
    component: Spinner,
};

export const Default = () => (
    <>
        <h1>Spinner</h1>
        <p>Small</p>
        <Spinner size={SpinnerSize.Small} />
        <p>Default</p>
        <Spinner />
        <p>Large</p>
        <Spinner size={SpinnerSize.Large} />
    </>
);
