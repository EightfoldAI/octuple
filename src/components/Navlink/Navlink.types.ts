import { OcBaseProps } from '../OcBase';

export enum StackOrder {
    row = 'row',
    column = 'column',
}

export enum LinkTarget {
    blank = '_blank',
    self = '_self',
    parent = '_parent',
    top = '_top',
}

export interface NavlinkProps extends OcBaseProps<HTMLAnchorElement> {
    /**
     * Url to be redirected to
     */
    url: string;
    /**
     * Custom class for the modal
     * @default StackOrder.row
     */
    stackOrder?: StackOrder;
    /**
     * Where to open the linked document
     * @default LinkTarget.self
     */
    target?: LinkTarget;
    /**
     * Link Variant
     * @default 'default'
     */
    variant?: 'default' | 'primary';
}
