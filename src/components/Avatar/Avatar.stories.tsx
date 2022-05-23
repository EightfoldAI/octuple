import React from 'react';
import { Avatar } from './';

export default {
    title: 'Avatar',
    component: Avatar,
};

const imageProps = {
    src: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
    alt: 'random profile image',
};

const fallbackTexts = ['John Doe', 'Adams Baker'];

export const Default = () => (
    <>
        <h2>Avatar</h2>
        <Avatar imageProps={imageProps} size={40} />
        <br />
        <h2>Avatar Fallback</h2>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
            {fallbackTexts.map((fallbackText) => (
                <Avatar
                    key={fallbackText}
                    supportFallback
                    fallbackText={fallbackText}
                    size={40}
                />
            ))}
        </div>
        <h2>Round Avatar</h2>
        <Avatar imageProps={imageProps} size={40} type="round" />
        <br />
        <h2>Round Avatar Fallback</h2>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
            {fallbackTexts.map((fallbackText) => (
                <Avatar
                    key={fallbackText}
                    supportFallback
                    fallbackText={fallbackText}
                    size={40}
                    type="round"
                />
            ))}
        </div>
    </>
);
