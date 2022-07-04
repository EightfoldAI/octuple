import React, { FC, useEffect, useCallback, useState, Ref } from 'react';
import { PagerProps } from './Pagination.types';
import {
    ButtonShape,
    ButtonSize,
    DefaultButton,
    NeutralButton,
} from '../Button';
import { IconName } from '../Icon';
import { mergeClasses } from '../../shared/utilities';

import styles from './pagination.module.scss';

/** Represents the number of pages from each edge of the list before we show quick buttons. */
const EDGE_BUFFER_THRESHOLD: number = 5;

/** Represents that only 7 list items (pages) are visible at any given time. */
const PAGER_COUNT: number = 7;

/** Represents a list too short to display meaningful quick buttons. */
const SHORT_LIST_THRESHOLD: number = 10;

export const Pager: FC<PagerProps> = React.forwardRef(
    (
        {
            currentPage = 1,
            onCurrentChange,
            pageCount,
            quickNextIconButtonAriaLabel,
            quickPreviousIconButtonAriaLabel,
            ...rest
        },
        ref: Ref<HTMLUListElement>
    ) => {
        const [_pagers, setPagers] = useState<number[]>([0]);
        const [_quickNextActive, setQuickNextActive] = useState<boolean>(false);
        const [_quickPreviousActive, setQuickPreviousActive] =
            useState<boolean>(false);

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
            if (pageCount > SHORT_LIST_THRESHOLD) {
                /**
                 * The visible items in the array use a basic threshold.
                 * e.g. [1 << 4 5 [6] 7 8 >> 100] where 6 is the currentPage
                 * after the quick previous button and before the quick next
                 * button, as any items in a long list are not visible beyond
                 * the 5 items between the two quick buttons they must represent
                 * the correct position in the array.
                 */
                const afterQuickPrevious: boolean =
                    currentPage > EDGE_BUFFER_THRESHOLD;
                const beforeQuickNext: boolean =
                    currentPage < pageCount - EDGE_BUFFER_THRESHOLD;

                /**
                 * The currentPage number is greater than the quick previous
                 * and the quick next thresholds (near the end of the list).
                 * Calculate the position of the currentPage is within the
                 * last 5 of the visible array using the current pageCount.
                 * Only the quick previous button is visible.
                 */
                if (afterQuickPrevious && !beforeQuickNext) {
                    const startPage = pageCount - (PAGER_COUNT - 2);

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
                    for (let i: number = 2; i < PAGER_COUNT; ++i) {
                        array.push(i);
                    }

                    /**
                     * The currentPage number is greater than the quick previous and
                     * less than the quick next thresholds (in the middle of the list).
                     * Calcuate the offset position of the currentPage relative to its
                     * position in the visible array. Both quick buttons are visible.
                     */
                } else if (afterQuickPrevious && beforeQuickNext) {
                    const offset = Math.floor(PAGER_COUNT / 2) - 1;

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

        return (
            <ul {...rest} ref={ref} className={styles.pager}>
                {pageCount > 0 && (
                    <li>
                        <NeutralButton
                            checked={currentPage === 1}
                            classNames={mergeClasses([
                                styles.paginationButton,
                                { [styles.active]: currentPage === 1 },
                            ])}
                            shape={ButtonShape.Rectangle}
                            onClick={() => onCurrentChange(1)}
                            size={ButtonSize.Medium}
                            text={'1'.toLocaleString()}
                            toggle
                        />
                    </li>
                )}
                {currentPage > EDGE_BUFFER_THRESHOLD &&
                    pageCount > SHORT_LIST_THRESHOLD && (
                        <li>
                            <NeutralButton
                                ariaLabel={quickPreviousIconButtonAriaLabel}
                                classNames={mergeClasses([
                                    styles.paginationButton,
                                    'quickprevious',
                                ])}
                                shape={ButtonShape.Rectangle}
                                iconProps={{
                                    role: 'presentation',
                                    path: _quickPreviousActive
                                        ? IconName.mdiChevronDoubleLeft
                                        : IconName.mdiDotsHorizontal,
                                }}
                                onBlur={() => setQuickPreviousActive(false)}
                                onFocus={() => setQuickPreviousActive(true)}
                                onMouseEnter={() =>
                                    setQuickPreviousActive(true)
                                }
                                onMouseLeave={() =>
                                    setQuickPreviousActive(false)
                                }
                                onClick={() =>
                                    onCurrentChange(
                                        currentPage - EDGE_BUFFER_THRESHOLD
                                    )
                                }
                                size={ButtonSize.Medium}
                            />
                        </li>
                    )}
                {_pagers?.map((pager, idx) => {
                    return (
                        <li key={idx}>
                            <NeutralButton
                                checked={currentPage === pager}
                                shape={ButtonShape.Rectangle}
                                classNames={mergeClasses([
                                    styles.paginationButton,
                                    { [styles.active]: currentPage === pager },
                                ])}
                                onClick={() => onCurrentChange(pager)}
                                size={ButtonSize.Medium}
                                text={pager.toLocaleString()}
                                toggle
                            />
                        </li>
                    );
                })}
                {currentPage < pageCount - EDGE_BUFFER_THRESHOLD &&
                    pageCount > SHORT_LIST_THRESHOLD && (
                        <li>
                            <NeutralButton
                                ariaLabel={quickNextIconButtonAriaLabel}
                                classNames={mergeClasses([
                                    styles.paginationButton,
                                    'quicknext',
                                ])}
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
                                    onCurrentChange(
                                        currentPage + EDGE_BUFFER_THRESHOLD
                                    )
                                }
                                size={ButtonSize.Medium}
                            />
                        </li>
                    )}
                {pageCount > 1 && (
                    <li>
                        <NeutralButton
                            shape={ButtonShape.Rectangle}
                            checked={currentPage === pageCount}
                            classNames={mergeClasses([
                                styles.paginationButton,
                                { [styles.active]: currentPage === pageCount },
                            ])}
                            onClick={() => onCurrentChange(pageCount)}
                            size={ButtonSize.Medium}
                            text={pageCount.toLocaleString()}
                            toggle
                        />
                    </li>
                )}
            </ul>
        );
    }
);
