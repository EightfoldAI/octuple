import { OcBaseProps } from '../OcBase';

export enum PaginationLayoutOptions {
    Jumper = 'jumper',
    Next = 'next',
    Pager = 'pager',
    Previous = 'prev',
    Sizes = 'sizes',
    Total = 'total',
}

export interface PagerProps
    extends Omit<
        PaginationProps,
        | 'goToText'
        | 'layout'
        | 'onSizeChange'
        | 'pageSize'
        | 'pageSizes'
        | 'pageSizeText'
        | 'dots'
        | 'total'
        | 'totalText'
    > {}

export interface PaginationProps extends OcBaseProps<HTMLElement> {
    /**
     * The current page.
     * @default 1
     */
    currentPage?: number;
    /**
     * The 'Go to' text string.
     * @default 'Go to'
     */
    goToText?: string;
    /**
     * The Pagination layout options.
     * @default {PaginationLayoutOptions.Previous, PaginationLayoutOptions.Pager, PaginationLayoutOptions.Next}
     */
    layout?: PaginationLayoutOptions[];
    /**
     * The Pagination onCurrentChange event.
     */
    onCurrentChange?: (currentPage: number) => void;
    /**
     * The Pagination onSizeChange event.
     */
    onSizeChange?: (size: number) => void;
    /**
     * The Pagination pageCount (use when pageSizes are not necessary).
     */
    pageCount?: number;
    /**
     * The Pagination pageSize.
     * @default 10
     */
    pageSize?: number;
    /**
     * The Pagination pageSizes array.
     * @default {[10, 20, 30, 40, 50, 100]}
     */
    pageSizes?: number[];
    /**
     * The '/page' text string.
     * @default '/page'
     */
    pageSizeText?: string;
    /**
     * Pagination dots mode.
     * @default false
     */
    dots?: boolean;
    /**
     * The Pagination total number of pages.
     */
    total?: number;
    /**
     * The 'Total' text string.
     * @default 'Total'
     */
    totalText?: string;
}
