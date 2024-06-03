import { OcBaseProps } from '../OcBase';
import { ConfigContextProps, OcThemeName } from '../ConfigProvider';

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

export enum PaginationVisiblePagerCountSizeOptions {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum PagerSizeOptions {
  Small = 'small',
  Medium = 'medium',
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
   * Configure how contextual props are consumed
   */
  configContextProps?: ConfigContextProps;
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
   * Pagination gradient state.
   * @default false
   */
  gradient?: boolean;
  /**
   * Hide pagination when there is a single page.
   * @default false
   */
  hideWhenSinglePage?: boolean;
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
   * Set whether the pagination should cycle continuously or have hard stops.
   * @default false
   */
  loop?: boolean;
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
   * Represents the number of pages visible at any given time apart from
   * Previous, Next, Quick Previous and Quick Next buttons.
   */
  pagerSize?: PagerSizeOptions;
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
   * pageSizes should be defined when layout uses PaginationLayoutOptions.Sizes
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
   * pageSizes should only be defined for Sizes Layout.
   * Recommended to turn this on as this is going to default behavior in future
   * @default false
   */
  restrictPageSizesPropToSizesLayout?: boolean;
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
   * Pagination Theme.
   * Use with configContextProps.noThemeContext to override theme.
   * @default blue
   */
  theme?: OcThemeName;
  /**
   * Pagination Theme container.
   * Use with `theme` to generate a unique container or a common one.
   */
  themeContainerId?: string;
  /**
   * The Pagination total number of items.
   * @default 1
   */
  total: number;
  /**
   * The 'Total' text string.
   * @default 'Total'
   */
  totalText?: string;
  /**
   * @deprecated Use pagerSize instead.
   * Represents the number of list items (pages) are visible at any given time.
   * @default PaginationVisiblePagerCountSizeOptions.Large
   */
  visiblePagerCountSize?: PaginationVisiblePagerCountSizeOptions;
}
