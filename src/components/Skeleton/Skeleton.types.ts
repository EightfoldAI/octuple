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
     * Height of the skeleton
     */
    height?: Dimension;
    /**
     * Width of the skeleton
     */
    width?: Dimension;
    /**
     * If the skeleton is full width, will ignore the width prop
     */
    fullWidth?: boolean;
    /**
     * Is animating or not
     * @default true
     */
    animating?: boolean;
    /**
     * Visible variant of the skeleton
     * @default SkeletonVariant.Rectangular
     */
    variant?: SkeletonVariant;
    /**
     *
     * @default SkeletonAnimation.Wave
     */
    animation?: SkeletonAnimation;
}
