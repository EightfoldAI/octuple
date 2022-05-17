import React, { FC, Ref, useState } from 'react';
import { Pager, PaginationLayoutOptions, PaginationProps } from './index';
import { ButtonIconAlign, ButtonSize, DefaultButton } from '../Button';
import { Dropdown } from '../Dropdown';
import { IconName } from '../Icon';
import { Menu, MenuItem } from '../Menu';
import { TextInput } from '../Inputs';
import { mergeClasses } from '../../shared/utilities';
import { useBoolean } from '../../octuple';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { useSingleton } from '../../hooks/useSingleton';

import styles from './pagination.module.scss';

export const Pagination: FC<PaginationProps> = React.forwardRef(
    (
        {
            classNames,
            currentPage = 1,
            goToText = 'Go to',
            layout = [
                PaginationLayoutOptions.Previous,
                PaginationLayoutOptions.Pager,
                PaginationLayoutOptions.Next,
            ],
            onCurrentChange,
            onSizeChange,
            pageCount,
            pageSize = 10,
            pageSizes = [10, 20, 30, 40, 50, 100],
            pageSizeText = 'page',
            dots = false,
            total,
            totalText = 'Total',
            'data-test-id': dataTestId,
            ...rest
        },
        ref: Ref<HTMLDivElement>
    ) => {
        const htmlDir: string = useCanvasDirection();
        const [_toggle, { toggle: setToggle }] = useBoolean(false);

        const [_currentPage, setCurrentPage] = useState<number>(currentPage);
        const [_pageCount, setPageCount] = useState<number>(pageCount);
        const [_pageSize, setPageSize] = useState<number>(pageSize);
        const [_pageSizes, setPageSizes] = useState<number[]>(pageSizes);
        const [_total, setTotal] = useState<number>(total);

        useSingleton((): void => {
            if (pageSizes) {
                setPageSize(
                    pageSizes.indexOf(pageSize) > -1 ? pageSize : pageSizes[0]
                );
            }

            setTotal(total);

            setCurrentPage(_currentPage ? _currentPage : 1);
        });

        const previous = (): void => {
            const oldVal: number = _currentPage;
            const newVal: number = _currentPage - 1;

            setCurrentPage(newVal);

            if (newVal !== oldVal) {
                onCurrentChange && onCurrentChange(newVal);
            }
        };

        const next = (): void => {
            const oldVal: number = _currentPage;
            const newVal: number = _currentPage + 1;

            setCurrentPage(newVal);

            if (newVal !== oldVal) {
                onCurrentChange && onCurrentChange(newVal);
            }
        };

        const getPageCount = (): number => {
            let pages: number;

            if (total) {
                pages = Math.ceil(total / _pageSize);
            } else if (pageCount) {
                pages = pageCount;
            }

            return pages;
        };

        const jumpToPage = (page: number): void => {
            const oldVal: number = _currentPage;

            setCurrentPage(page);

            if (oldVal !== _currentPage) {
                onCurrentChange && onCurrentChange(_currentPage);
            }
        };

        const handleCurrentChange = (val: number): void => {
            const oldVal: number = _currentPage;

            setCurrentPage(val);

            if (oldVal !== val) {
                onCurrentChange && onCurrentChange(val);
            }
        };

        const onSizeChangeHandler = (val: number): void => {
            setPageSize(val);
            setPageCount(Math.ceil(total / _pageSize));
            onSizeChange && onSizeChange(val);

            // TODO: Improve this to find _currentPage in newly calc'd _pageSize.
            handleCurrentChange(1);
        };

        const handleJumpOnChange = (
            _event: React.ChangeEvent<HTMLInputElement>
        ): void => {
            const { target } = _event;
            if (
                !target?.value ||
                isNaN(parseInt(target?.value, 10)) ||
                parseInt(target?.value, 10) > getPageCount()
            ) {
                jumpToPage(1);
            } else {
                jumpToPage(parseInt(target?.value, 10));
            }
        };

        const Overlay = (pageSizes?: number[]) => {
            const getItems = (): MenuItem[] => {
                const sizes = pageSizes.map((item?: number, idx?: number) => {
                    return {
                        rowkey: idx,
                        text:
                            htmlDir === 'ltr'
                                ? `${item}/${pageSizeText}`
                                : `${pageSizeText}/${item}`,
                        value: item,
                    };
                });
                return sizes;
            };
            return <Menu onChange={onSizeChangeHandler} items={getItems()} />;
        };

        const paginationWrapperClassNames: string = mergeClasses([
            classNames,
            styles.pagination,
            { [styles.dots]: dots },
        ]);

        return (
            <div
                {...rest}
                ref={ref}
                className={paginationWrapperClassNames}
                data-test-id={dataTestId}
            >
                {layout.includes(PaginationLayoutOptions.Sizes) && (
                    <span className={styles.sizes} key="sizes">
                        {/** TODO: Replace with Select component when available */}
                        <Dropdown
                            overlay={Overlay(_pageSizes)}
                            onVisibleChange={setToggle}
                        >
                            <DefaultButton
                                alignIcon={
                                    htmlDir === 'ltr'
                                        ? ButtonIconAlign.Right
                                        : ButtonIconAlign.Left
                                }
                                iconProps={{
                                    path: _toggle
                                        ? IconName.mdiChevronDown
                                        : IconName.mdiChevronUp,
                                }}
                                size={ButtonSize.Small}
                                text={
                                    htmlDir === 'ltr'
                                        ? `${_pageSize}/${pageSizeText}`
                                        : `${pageSizeText}/${_pageSize}`
                                }
                            />
                        </Dropdown>
                    </span>
                )}
                {layout.includes(PaginationLayoutOptions.Total) && total > 0 ? (
                    <span className={styles.total} key="total">
                        {htmlDir === 'ltr'
                            ? `${totalText} ${total}`
                            : `${total} ${totalText}`}
                    </span>
                ) : (
                    <span />
                )}
                {layout.includes(PaginationLayoutOptions.Previous) && (
                    <DefaultButton
                        classNames={styles.paginationButton}
                        key="previous"
                        disabled={_currentPage <= 1 ? true : false}
                        iconProps={{
                            path: IconName.mdiChevronLeft,
                        }}
                        onClick={previous}
                        size={ButtonSize.Small}
                    />
                )}
                {layout.includes(PaginationLayoutOptions.Pager) && (
                    <Pager
                        key="pager"
                        currentPage={_currentPage}
                        pageCount={getPageCount()}
                        onCurrentChange={handleCurrentChange}
                    />
                )}
                {layout.includes(PaginationLayoutOptions.Next) && (
                    <DefaultButton
                        classNames={styles.paginationButton}
                        key="next"
                        disabled={
                            _currentPage === getPageCount() || _pageCount === 0
                                ? true
                                : false
                        }
                        iconProps={{
                            path: IconName.mdiChevronRight,
                        }}
                        onClick={() => next()}
                        size={ButtonSize.Small}
                    />
                )}
                {layout.includes(PaginationLayoutOptions.Jumper) && (
                    <span className={styles.jump} key="jumper">
                        {htmlDir === 'ltr' && goToText}
                        <TextInput
                            classNames={styles.editor}
                            minlength={1}
                            maxlength={_pageCount}
                            numbersOnly
                            defaultValue={
                                _currentPage > getPageCount() ||
                                _currentPage <= 0
                                    ? 1
                                    : _currentPage
                            }
                            onChange={handleJumpOnChange}
                        />
                        {htmlDir === 'rtl' && goToText}
                    </span>
                )}
            </div>
        );
    }
);
