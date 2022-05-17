import React, { FC, useEffect, useCallback, useState, Ref } from 'react';
import { PagerProps } from './Pagination.types';
import { ButtonSize, DefaultButton } from '../Button';
import { IconName } from '../Icon';
import { mergeClasses } from '../../shared/utilities';

import styles from './pagination.module.scss';

export const Pager: FC<PagerProps> = React.forwardRef(
    (
        { currentPage = 1, onCurrentChange, pageCount, ...rest },
        ref: Ref<HTMLUListElement>
    ) => {
        const [_pagers, setPagers] = useState<number[]>([0]);
        const [_quickNextActive, setQuickNextActive] = useState<boolean>(false);
        const [_quickPreviousActive, setQuickPreviousActive] =
            useState<boolean>(false);

        const getVisiblePageRange = useCallback((): Array<number> => {
            const pagerCount: number = 7;
            let array: number[] = [];

            if (currentPage > 5 && !(currentPage < pageCount - 5)) {
                const startPage = pageCount - (pagerCount - 2);

                for (let i: number = startPage; i < pageCount; ++i) {
                    array.push(i);
                }
            } else if (!(currentPage > 5) && currentPage < pageCount - 5) {
                for (let i: number = 2; i < pagerCount; ++i) {
                    array.push(i);
                }
            } else if (currentPage > 5 && currentPage < pageCount - 5) {
                const offset = Math.floor(pagerCount / 2) - 1;

                for (
                    let i: number = currentPage - offset;
                    i <= currentPage + offset;
                    ++i
                ) {
                    array.push(i);
                }
            } else {
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
                        <DefaultButton
                            checked={currentPage === 1}
                            classNames={mergeClasses([
                                styles.paginationButton,
                                { [styles.active]: currentPage === 1 },
                            ])}
                            onClick={() => onCurrentChange(1)}
                            size={ButtonSize.Small}
                            text={'1'.toLocaleString()}
                            toggle
                        />
                    </li>
                )}
                {currentPage > 5 && (
                    <li>
                        <DefaultButton
                            classNames={mergeClasses([
                                styles.paginationButton,
                                'quickprevious',
                            ])}
                            iconProps={{
                                path: _quickPreviousActive
                                    ? IconName.mdiChevronDoubleLeft
                                    : IconName.mdiDotsHorizontal,
                            }}
                            onBlur={() => setQuickPreviousActive(false)}
                            onFocus={() => setQuickPreviousActive(true)}
                            onMouseEnter={() => setQuickPreviousActive(true)}
                            onMouseLeave={() => setQuickPreviousActive(false)}
                            onClick={() => onCurrentChange(currentPage - 5)}
                            size={ButtonSize.Small}
                        />
                    </li>
                )}
                {_pagers?.map((pager, idx) => {
                    return (
                        <li key={idx}>
                            <DefaultButton
                                checked={currentPage === pager}
                                classNames={mergeClasses([
                                    styles.paginationButton,
                                    { [styles.active]: currentPage === pager },
                                ])}
                                onClick={() => onCurrentChange(pager)}
                                size={ButtonSize.Small}
                                text={pager.toLocaleString()}
                                toggle
                            />
                        </li>
                    );
                })}
                {currentPage < pageCount - 5 && (
                    <li>
                        <DefaultButton
                            classNames={mergeClasses([
                                styles.paginationButton,
                                'quicknext',
                            ])}
                            iconProps={{
                                path: _quickNextActive
                                    ? IconName.mdiChevronDoubleRight
                                    : IconName.mdiDotsHorizontal,
                            }}
                            onBlur={() => setQuickNextActive(false)}
                            onFocus={() => setQuickNextActive(true)}
                            onMouseEnter={() => setQuickNextActive(true)}
                            onMouseLeave={() => setQuickNextActive(false)}
                            onClick={() => onCurrentChange(currentPage + 5)}
                            size={ButtonSize.Small}
                        />
                    </li>
                )}
                {pageCount > 1 && (
                    <li>
                        <DefaultButton
                            checked={currentPage === pageCount}
                            classNames={mergeClasses([
                                styles.paginationButton,
                                { [styles.active]: currentPage === pageCount },
                            ])}
                            onClick={() => onCurrentChange(pageCount)}
                            size={ButtonSize.Small}
                            text={pageCount.toLocaleString()}
                            toggle
                        />
                    </li>
                )}
            </ul>
        );
    }
);
