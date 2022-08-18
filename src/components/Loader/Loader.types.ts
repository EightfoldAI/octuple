import { OcBaseProps } from '../OcBase';

export enum LoaderSize {
    Large = 'large',
    Medium = 'medium',
    Small = 'small',
}

export interface LoaderProps extends OcBaseProps<HTMLDivElement> {
    size?: LoaderSize;
}
