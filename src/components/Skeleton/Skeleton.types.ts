import { OcBaseProps } from '../OcBase';

export enum SkeletonVariant {
    Circular = 'circular',
    Rectangular = 'rectangular',
    Pill = 'pill',
    Rounded = 'rounded',
    ButtonSmall = 'buttonSmall',
    ButtonMedium = 'buttonMedium',
    ButtonLarge = 'buttonLarge',
}

export enum SkeletonAnimation {
    Pulse = 'pulse',
    Wave = 'wave',
}

type Dimension = number | string;

export interface SkeletonProps extends OcBaseProps<HTMLDivElement> {
    /**
     * Is animating or not
     * @default true
     */
    animating?: boolean;
    /**
     * Animation of the skeleton component
     * @default SkeletonAnimation.Wave
     */
    animation?: SkeletonAnimation;
    /**
     * If the skeleton is full width, will ignore the width prop
     */
    fullWidth?: boolean;
    /**
     * Height of the skeleton
     */
    height?: Dimension;
    /**
     * Visible variant of the skeleton
     * @default SkeletonVariant.Rectangular
     */
    variant?: SkeletonVariant;
    /**
     * Width of the skeleton
     */
    width?: Dimension;
}
