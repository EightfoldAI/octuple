import React from 'react';
import { Stack } from './Stack';
import styles from './stack.stories.module.scss';

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

export const SampleNavList = () => (
    <Stack
        direction="horizontal"
        classNames={styles.navListContainer}
        wrap="wrap"
        breakpoints={{
            small: {
                direction: 'vertical',
            },
        }}
    >
        <Stack direction="vertical" gap="m" classNames={styles.group}>
            <h3>Title</h3>
            <Stack direction="vertical" gap="xs">
                <p>subheading</p>
                <p>subheading</p>
            </Stack>
        </Stack>
        <Stack direction="vertical" gap="m" classNames={styles.group}>
            <h3>Title</h3>
            <Stack direction="vertical" gap="xs">
                <p>subheading</p>
                <p>subheading</p>
                <p>subheading</p>
                <p>subheading</p>
            </Stack>
        </Stack>
        <Stack direction="vertical" gap="m" classNames={styles.group}>
            <h3>Title</h3>
            <Stack direction="vertical" gap="xs">
                <p>subheading</p>
                <p>subheading</p>
            </Stack>
        </Stack>
        <Stack direction="vertical" gap="m" classNames={styles.group}>
            <h3>Title</h3>
            <Stack direction="vertical" gap="xs">
                <p>subheading</p>
                <p>subheading</p>
                <p>subheading</p>
            </Stack>
        </Stack>
        <Stack direction="vertical" gap="m" classNames={styles.group}>
            <h3>Title</h3>
            <Stack direction="vertical" gap="xs">
                <p>subheading</p>
                <p>subheading</p>
                <p>subheading</p>
                <p>subheading</p>
            </Stack>
        </Stack>
        <Stack direction="vertical" gap="m" classNames={styles.group}>
            <h3>Title</h3>
            <Stack direction="vertical" gap="xs">
                <p>subheading</p>
                <p>subheading</p>
                <p>subheading</p>
            </Stack>
        </Stack>
    </Stack>
);
