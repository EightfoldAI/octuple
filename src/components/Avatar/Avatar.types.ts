import React from 'react';
import { IconProps } from '../Icon';
import { OcBaseProps } from '../OcBase';

interface BaseAvatarProps extends OcBaseProps<HTMLSpanElement> {
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
     * @default 'square'
     */
    type?: 'round' | 'square';
}

export interface AvatarIconProps extends BaseAvatarProps {
    /**
     * Icon Props
     */
    iconProps?: IconProps;
}

export interface AvatarFallbackProps extends BaseAvatarProps {}

export interface AvatarProps extends BaseAvatarProps, AvatarIconProps {
    /**
     * Image source
     */
    src?: string;
    /**
     * Image alt text
     */
    alt?: string;
}
