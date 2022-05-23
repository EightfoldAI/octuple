import { Ref } from 'react';
import { IconProps } from '../Icon';
import { OcBaseProps } from '../OcBase';

interface BaseAvatarProps extends OcBaseProps<HTMLSpanElement> {
    /**
     * Avatar size
     * @default 32
     */
    size?: string;
    /**
     * Avatar fallback font size
     * @default 18
     */
    fontSize?: string;
    /**
     * Type of avatar style
     * @default 'square'
     */
    type?: 'round' | 'square';
    /**
     * Ref of the container div
     */
    ref?: Ref<HTMLDivElement>;
}

export interface AvatarIconProps extends BaseAvatarProps {
    /**
     * Icon Props
     */
    iconProps?: IconProps;
}

export interface AvatarFallbackProps extends BaseAvatarProps {}

export interface AvatarProps
    extends AvatarIconProps,
        Omit<BaseAvatarProps, 'ref'> {
    /**
     * Image source
     */
    src?: string;
    /**
     * Image alt text
     */
    alt?: string;
}
