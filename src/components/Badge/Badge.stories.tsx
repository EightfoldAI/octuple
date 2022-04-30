import React from 'react';
import { Badge } from './';

export default {
    title: 'Badge',
    component: Badge,
};

export const Default = () => (
    <>
        <h2>Badge</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
            <Badge active={true}>8</Badge>
            <Badge active={false}>10</Badge>
        </div>
    </>
);
