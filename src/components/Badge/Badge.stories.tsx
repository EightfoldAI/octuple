import React from 'react';
import { Badge } from './';

export default {
    title: 'Badge',
    component: Badge,
};

const badges = [1, 2, 100, 1000];

export const Default = () => (
    <>
        <h2>Badge</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {badges.map((badge) => (
                <Badge key={badge}>{badge}</Badge>
            ))}
        </div>
        <h2>Badge (active)</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {badges.map((badge) => (
                <Badge key={badge} active={true}>
                    {badge}
                </Badge>
            ))}
        </div>
        <h2>Badge disruptive (active)</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {badges.map((badge) => (
                <Badge key={badge} active={true} disruptive={true}>
                    {badge}
                </Badge>
            ))}
        </div>
    </>
);
