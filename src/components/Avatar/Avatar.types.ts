import React from 'react';
import { OcBaseProps } from '../OcBase';

export interface ImageProps {
    /**
     * Image source
     */
    src: string;
    /**
     * Image alt text
     */
    alt: string;
}

interface BaseAvatarProps extends OcBaseProps<HTMLSpanElement> {
    /**
     * Fallback image name
     * @default ''
     */
    fallbackText?: string;
    /**
     * Avatar size
     * @default 32
     */
    size?: number;
    /**
     * Avatar fallback font size
     * @default 18
     */
    fontSize?: number;
    /**
     * Type of avatar style
     */
    type?: 'round' | 'square';
}

export interface AvatarFallbackProps extends BaseAvatarProps {}

export interface AvatarProps extends BaseAvatarProps {
    /**
     * Image Props
     * @default {}
     */
    imageProps?: ImageProps;
    /**
     * Should support fallback
     * @default false
     */
    supportFallback?: boolean;
}
