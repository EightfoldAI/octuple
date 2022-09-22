import { OcBaseProps } from '../OcBase';

export enum LoaderSize {
    Large = 'large',
    Medium = 'medium',
    Small = 'small',
}

export interface LoaderProps extends OcBaseProps<HTMLDivElement> {
    /**
     * The size of the loader.
     * @default LoaderSize.Small
     */
    size?: LoaderSize;
}
