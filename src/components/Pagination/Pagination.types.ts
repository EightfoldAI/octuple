import { OcBaseProps } from '../OcBase';

type Locale = {
    /**
     * The Pagination locale.
     */
    locale: string;
    /**
     * The Pagination `Go to` string.
     */
    goToText?: string;
    /**
     * The Pagination `Next` string.
     */
    nextIconButtonAriaLabel?: string;
    /**
     * The Pager `of` string.
     */
    pagerText?: string;
    /**
     * The Pagination `Selected page size` string.
     */
    pageSizeButtonAriaLabel?: string;
    /**
     * The Pagination `page` string.
     */
    pageSizeText?: string;
    /**
     * The Pagination `Previous` string.
     */
    previousIconButtonAriaLabel?: string;
    /**
     * The Pagination `Next 5` string.
     */
    quickNextIconButtonAriaLabel?: string;
    /**
     * The Pagination `Previous 5` string.
     */
    quickPreviousIconButtonAriaLabel?: string;
    /**
     * The Pagination `Total` string.
     */
    totalText?: string;
};

export enum PaginationLayoutOptions {
    Jumper = 'jumper',
    Next = 'next',
    Pager = 'pager',
    Simplified = 'simplified',
    Previous = 'prev',
    Sizes = 'sizes',
    Total = 'total',
    NoLast = 'noLast',
}

export type PaginationLocale = {
    lang: Locale;
};

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
     * Pagination dots mode.
     * @default false
     */
    dots?: boolean;
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
     * The Pagination locale.
     * @default 'enUS'
     */
    locale?: PaginationLocale;
    /**
     * The next icon button aria-label string.
     * @default 'Next'
     */
    nextIconButtonAriaLabel?: string;
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
     * The page size button aria-label string.
     * @default 'Selected page size'
     */
    pageSizeButtonAriaLabel?: string;
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
     * The previous icon button aria-label string.
     * @default 'Previous'
     */
    previousIconButtonAriaLabel?: string;
    /**
     * The quick next icon button aria-label string.
     * @default 'Next 5'
     */
    quickNextIconButtonAriaLabel?: string;
    /**
     * The quick previous icon button aria-label string.
     * @default 'Previous 5'
     */
    quickPreviousIconButtonAriaLabel?: string;
    /**
     * The Page change is controlled internally.
     * @default true
     */
    selfControlled?: boolean;
    /**
     * Show last page or not.
     * @default true
     */
    showLast?: boolean;
    /**
     * Pagination simplified mode.
     * @default false
     */
    simplified?: boolean;
    /**
     * The Pagination total number of pages.
     * @default 1
     */
    total: number;
    /**
     * The 'Total' text string.
     * @default 'Total'
     */
    totalText?: string;
}
