import { AnchorHTMLAttributes } from 'react';
import { OcBaseProps } from '../OcBase';

export interface LinkProps
    extends OcBaseProps<HTMLAnchorElement>,
        AnchorHTMLAttributes<HTMLAnchorElement> {
    /**
     * Link Variant
     * @default 'default'
     */
    variant?: 'default' | 'primary';
}
