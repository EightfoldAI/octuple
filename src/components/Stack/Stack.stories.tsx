import React from 'react';
import { Stack } from './Stack';

export default {
    title: 'Stack',
    component: Stack,
};

export const Default = () => (
    <Stack direction="vertical" gap={2} >
        <div style={{ height: "100px", width: "100px", backgroundColor: "red" }} />
        <div style={{ height: "100px", width: "100px", backgroundColor: "red" }} />
        <div style={{ height: "100px", width: "100px", backgroundColor: "red" }} />
    </Stack>
)


export const Horizontal = () => (
    <Stack direction="horizontal" gap={2} >
        <div style={{ height: "100px", width: "100px", backgroundColor: "red" }} />
        <div style={{ height: "100px", width: "100px", backgroundColor: "red" }} />
        <div style={{ height: "100px", width: "100px", backgroundColor: "red" }} />
    </Stack>
)
