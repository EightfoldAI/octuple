import React, { FC, useEffect, useCallback, useState, Ref } from 'react';
import {
  PagerProps,
  PagerSizeOptions,
  PaginationVisiblePagerCountSizeOptions,
} from './Pagination.types';
import { Button, ButtonShape, ButtonSize, ButtonVariant } from '../Button';
import { IconName } from '../Icon';
import { mergeClasses } from '../../shared/utilities';

import styles from './pagination.module.scss';

/** Represents the number of list items (pages) visible at any given time. */
const VISIBLE_PAGER_COUNT = {
  [PaginationVisiblePagerCountSizeOptions.Small]: 3,
  [PaginationVisiblePagerCountSizeOptions.Medium]: 5,
  [PaginationVisiblePagerCountSizeOptions.Large]: 7,
};

const PAGER_SIZE_COUNT = {
  [PagerSizeOptions.Small]: 5,
  [PagerSizeOptions.Medium]: 7,
};

export const Pager: FC<PagerProps> = React.forwardRef(
  (
    {
      configContextProps,
      currentPage = 1,
      gradient,
      locale,
      onCurrentChange,
      pageCount,
      quickNextIconButtonAriaLabel,
      quickPreviousIconButtonAriaLabel,
      simplified = false,
      showLast = true,
      theme,
      themeContainerId,
      pagerSize,
      visiblePagerCountSize = PaginationVisiblePagerCountSizeOptions.Large,
      ...rest
    },
    ref: Ref<HTMLDivElement | HTMLUListElement>
  ) => {
    /** Represents the number of pages from each edge of the list before we show quick buttons. */
    let edgeBufferThreshold: number = 5;
    /** Represents a list too short to display meaningful quick buttons. */
    let shortListThreshold: number = 10;

    if (pagerSize) {
      edgeBufferThreshold = PAGER_SIZE_COUNT[pagerSize] - 2;
      shortListThreshold = PAGER_SIZE_COUNT[pagerSize] + 3;
    }
    const [_pagers, setPagers] = useState<number[]>([0]);
    const [_quickNextActive, setQuickNextActive] = useState<boolean>(false);
    const [_quickPreviousActive, setQuickPreviousActive] =
      useState<boolean>(false);

    // TODO: Remove in Octuple v3.0.0 in favor of pagerSize prop
    let visiblePagerCount = VISIBLE_PAGER_COUNT?.[visiblePagerCountSize] || 7;

    if (pagerSize) {
      visiblePagerCount = PAGER_SIZE_COUNT?.[pagerSize] || 7;
    }

    /**
     * Updates the visible range of pages in the UL based upon list
     * traversal and other actions that trigger currentPage and pageCount updates.
     * The list is limited to 5 visible items plus the first and last items.
     * The array is updated with the props via onCurrentChange.
     */
    const getVisiblePageRange = useCallback((): Array<number> => {
      let array: number[] = [];

      /**
       * The pageCount is greater than 10.
       * Keeping the quick buttons meaningful.
       */
      if (pageCount > shortListThreshold) {
        /**
         * The visible items in the array use a basic threshold.
         * e.g. [1 << 4 5 [6] 7 8 >> 100] where 6 is the currentPage
         * after the quick previous button and before the quick next
         * button, as any items in a long list are not visible beyond
         * the 5 items between the two quick buttons they must represent
         * the correct position in the array.
         */
        const afterQuickPrevious: boolean = currentPage > edgeBufferThreshold;
        const beforeQuickNext: boolean =
          currentPage < pageCount - edgeBufferThreshold;

        /**
         * The currentPage number is greater than the quick previous
         * and the quick next thresholds (near the end of the list).
         * Calculate the position of the currentPage is within the
         * last 5 of the visible array using the current pageCount.
         * Only the quick previous button is visible.
         */
        if (afterQuickPrevious && !beforeQuickNext) {
          const startPage = pageCount - (visiblePagerCount - 2);

          for (let i: number = startPage; i < pageCount; ++i) {
            array.push(i);
          }

          /**
           * The currentPage number is less than the quick previous and
           * the quick next thresholds (near the beginning of the list).
           * Calculate the position of the currentPage is within the
           * first 5 of the visible array using the current pageCount.
           * Only the quick next button is visible.
           */
        } else if (!afterQuickPrevious && beforeQuickNext) {
          for (let i: number = 2; i < visiblePagerCount; ++i) {
            array.push(i);
          }

          /**
           * The currentPage number is greater than the quick previous and
           * less than the quick next thresholds (in the middle of the list).
           * Calcuate the offset position of the currentPage relative to its
           * position in the visible array. Both quick buttons are visible.
           */
        } else if (afterQuickPrevious && beforeQuickNext) {
          const offset = Math.floor(visiblePagerCount / 2) - 1;

          for (
            let i: number = currentPage - offset;
            i <= currentPage + offset;
            ++i
          ) {
            array.push(i);
          }
        }
      } else {
        /**
         * For short lists of 10 or fewer pages, take the full array.
         * Neither of the quick buttons are visible.
         */
        for (let i: number = 2; i < pageCount; ++i) {
          array.push(i);
        }
      }

      return array;
    }, [currentPage, pageCount]);

    useEffect(() => {
      setPagers(getVisiblePageRange());
    }, [getVisiblePageRange]);

    if (simplified) {
      return (
        <div
          {...rest}
          ref={ref as Ref<HTMLDivElement>}
          className={mergeClasses([styles.pager, styles.pageTracker])}
        >
          {pageCount > 0 && (
            <>
              <span>{`${currentPage.toLocaleString()}`}</span>{' '}
              {showLast && <span>{`${locale.lang!.pagerText}`}</span>}{' '}
              {showLast && <span>{`${pageCount.toLocaleString()}`}</span>}
            </>
          )}
        </div>
      );
    }

    return (
      <ul {...rest} ref={ref as Ref<HTMLUListElement>} className={styles.pager}>
        {pageCount > 0 && (
          <li>
            <Button
              aria-current={currentPage === 1}
              classNames={mergeClasses([
                styles.paginationButton,
                { [styles.active]: currentPage === 1 },
              ])}
              configContextProps={configContextProps}
              gradient={gradient}
              shape={ButtonShape.Rectangle}
              onClick={() => onCurrentChange(1)}
              size={ButtonSize.Medium}
              text={'1'.toLocaleString()}
              theme={theme}
              themeContainerId={themeContainerId}
              variant={ButtonVariant.Neutral}
              ariaLabel={
                locale.lang.pageSizeText +
                ' ' +
                '1'.toLocaleString() +
                ' ' +
                locale.lang.pagerText +
                ' ' +
                pageCount.toLocaleString()
              }
            />
          </li>
        )}
        {currentPage > edgeBufferThreshold && pageCount > shortListThreshold && (
          <li>
            <Button
              ariaLabel={quickPreviousIconButtonAriaLabel}
              classNames={mergeClasses([
                styles.paginationButton,
                'quickprevious',
              ])}
              configContextProps={configContextProps}
              gradient={gradient}
              shape={ButtonShape.Rectangle}
              iconProps={{
                role: 'presentation',
                path: _quickPreviousActive
                  ? IconName.mdiChevronDoubleLeft
                  : IconName.mdiDotsHorizontal,
              }}
              onBlur={() => setQuickPreviousActive(false)}
              onFocus={() => setQuickPreviousActive(true)}
              onMouseEnter={() => setQuickPreviousActive(true)}
              onMouseLeave={() => setQuickPreviousActive(false)}
              onClick={() => onCurrentChange(currentPage - edgeBufferThreshold)}
              size={ButtonSize.Medium}
              theme={theme}
              themeContainerId={themeContainerId}
              variant={ButtonVariant.Neutral}
            />
          </li>
        )}
        {_pagers?.map((pager, idx) => (
          <li key={idx}>
            <Button
              aria-current={currentPage === pager}
              classNames={mergeClasses([
                styles.paginationButton,
                {
                  [styles.active]: currentPage === pager,
                },
              ])}
              configContextProps={configContextProps}
              gradient={gradient}
              onClick={() => onCurrentChange(pager)}
              shape={ButtonShape.Rectangle}
              size={ButtonSize.Medium}
              text={pager.toLocaleString()}
              theme={theme}
              themeContainerId={themeContainerId}
              variant={ButtonVariant.Neutral}
              ariaLabel={
                locale.lang.pageSizeText +
                ' ' +
                pager.toLocaleString() +
                ' ' +
                locale.lang.pagerText +
                ' ' +
                pageCount.toLocaleString()
              }
            />
          </li>
        ))}
        {currentPage < pageCount - edgeBufferThreshold &&
          pageCount > shortListThreshold && (
            <li>
              <Button
                ariaLabel={quickNextIconButtonAriaLabel}
                classNames={mergeClasses([
                  styles.paginationButton,
                  'quicknext',
                ])}
                configContextProps={configContextProps}
                gradient={gradient}
                shape={ButtonShape.Rectangle}
                iconProps={{
                  role: 'presentation',
                  path: _quickNextActive
                    ? IconName.mdiChevronDoubleRight
                    : IconName.mdiDotsHorizontal,
                }}
                onBlur={() => setQuickNextActive(false)}
                onFocus={() => setQuickNextActive(true)}
                onMouseEnter={() => setQuickNextActive(true)}
                onMouseLeave={() => setQuickNextActive(false)}
                onClick={() =>
                  onCurrentChange(currentPage + edgeBufferThreshold)
                }
                size={ButtonSize.Medium}
                theme={theme}
                themeContainerId={themeContainerId}
                variant={ButtonVariant.Neutral}
              />
            </li>
          )}
        {pageCount > 1 && showLast && (
          <li>
            <Button
              aria-current={currentPage === pageCount}
              classNames={mergeClasses([
                styles.paginationButton,
                {
                  [styles.active]: currentPage === pageCount,
                },
              ])}
              configContextProps={configContextProps}
              gradient={gradient}
              onClick={() => onCurrentChange(pageCount)}
              shape={ButtonShape.Rectangle}
              size={ButtonSize.Medium}
              text={pageCount.toLocaleString()}
              theme={theme}
              themeContainerId={themeContainerId}
              variant={ButtonVariant.Neutral}
              ariaLabel={
                locale.lang.pageSizeText +
                ' ' +
                pageCount.toLocaleString() +
                ' ' +
                locale.lang.pagerText +
                ' ' +
                pageCount.toLocaleString()
              }
            />
          </li>
        )}
      </ul>
    );
  }
);
