import { OcBaseProps } from '../OcBase';

export enum SkeletonVariant {
    circular = 'circular',
    rectangular = 'rectangular',
    pill = 'pill',
}

type Dimension = number | string;

export interface SkeletonProps extends OcBaseProps<HTMLDivElement> {
    height?: Dimension;
    width?: Dimension;
    animating?: boolean;
    variant?: SkeletonVariant;
}
