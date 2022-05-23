import React from 'react';
import { Breakpoints } from '../../hooks/useMatchMedia';
import { Stack } from './Stack';

export default {
    title: 'Stack',
    component: Stack,
};

export const Default = () => (
    <Stack gap="m" style={{ backgroundColor: 'aquamarine' }}>
        <div
            style={{
                height: '200px',
                width: '200px',
                backgroundColor: 'mediumpurple',
            }}
        />
        <div
            style={{
                height: '200px',
                width: '200px',
                backgroundColor: 'mediumpurple',
            }}
        />
        <div
            style={{
                height: '200px',
                width: '200px',
                backgroundColor: 'mediumpurple',
            }}
        />
    </Stack>
);

export const Horizontal = () => (
    <Stack
        direction="vertical"
        gap="l"
        style={{ backgroundColor: 'aquamarine' }}
    >
        <div
            style={{
                height: '200px',
                width: '200px',
                backgroundColor: 'mediumpurple',
            }}
        />
        <div
            style={{
                height: '200px',
                width: '200px',
                backgroundColor: 'mediumpurple',
            }}
        />
        <div
            style={{
                height: '200px',
                width: '200px',
                backgroundColor: 'mediumpurple',
            }}
        />
    </Stack>
);

export const Responsive = () => (
    <Stack
        direction="vertical"
        gap="l"
        breakpoints={{
            xsmall: {
                gap: 'xxxs',
                direction: 'vertical',
            },
            small: {
                gap: 's',
                direction: 'vertical',
            },
            medium: {
                gap: 'xl',
                direction: 'horizontal',
            },
            large: {
                gap: 'xxxl',
                direction: 'horizontal',
            },
        }}
    >
        <div
            style={{
                height: '200px',
                width: '200px',
                backgroundColor: 'mediumpurple',
            }}
        />
        <div
            style={{
                height: '200px',
                width: '200px',
                backgroundColor: 'mediumpurple',
            }}
        />
        <div
            style={{
                height: '200px',
                width: '200px',
                backgroundColor: 'mediumpurple',
            }}
        />
    </Stack>
);
