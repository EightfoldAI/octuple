import { AnchorHTMLAttributes } from 'react';
import { OcBaseProps } from '../OcBase';

export interface LinkProps
    extends OcBaseProps<HTMLAnchorElement>,
        AnchorHTMLAttributes<HTMLAnchorElement> {
    /**
     * Custom class for the modal
     * @default 'row'
     */
    stackOrder?: 'row' | 'column';
    /**
     * Link Variant
     * @default 'default'
     */
    variant?: 'default' | 'primary';
}
