import React, { FC, Ref, useEffect, useState } from 'react';
import { Pager, PaginationLayoutOptions, PaginationProps } from './index';
import {
    ButtonIconAlign,
    ButtonShape,
    ButtonSize,
    NeutralButton,
} from '../Button';
import { Dropdown } from '../Dropdown';
import { IconName } from '../Icon';
import { Menu, MenuItemButtonProps } from '../Menu';
import { TextInput, TextInputShape } from '../Inputs';
import { mergeClasses } from '../../shared/utilities';
import { useBoolean } from '../../octuple';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';

import styles from './pagination.module.scss';

export const Pagination: FC<PaginationProps> = React.forwardRef(
    (
        {
            classNames,
            currentPage = 1,
            dots = false,
            goToText = 'Go to',
            layout = [
                PaginationLayoutOptions.Previous,
                PaginationLayoutOptions.Pager,
                PaginationLayoutOptions.Next,
            ],
            nextIconButtonAriaLabel = 'Next',
            onCurrentChange,
            onSizeChange,
            pageCount,
            pageSize = 10,
            pageSizeButtonAriaLabel = 'Selected page size',
            pageSizes = [10, 20, 30, 40, 50, 100],
            pageSizeText = 'page',
            previousIconButtonAriaLabel = 'Previous',
            quickNextIconButtonAriaLabel = 'Next 5',
            quickPreviousIconButtonAriaLabel = 'Previous 5',
            total = 1,
            totalText = 'Total',
            selfControlled = true,
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

        const inputRef = React.createRef<HTMLInputElement>();

        useEffect((): void => {
            setTotal(total);
            onSizeChangeHandler?.(
                pageSizes.indexOf(pageSize) > -1 ? pageSize : pageSizes[0]
            );
            jumpToPage?.(currentPage);
        }, []);

        useEffect((): void => {
            setTotal(total);
        }, [total]);

        useEffect((): void => {
            setCurrentPage(currentPage);
        }, [currentPage]);

        const previous = (): void => {
            const oldVal: number = _currentPage;
            const newVal: number = _currentPage - 1;

            setCurrentPage(newVal);

            if (newVal !== oldVal) {
                onCurrentChange?.(newVal);
                const inputVal: string = newVal.toString();

                if (inputRef.current) {
                    inputRef.current.value = inputVal;
                }
            }
        };

        const next = (): void => {
            const oldVal: number = _currentPage;
            const newVal: number = _currentPage + 1;

            setCurrentPage(newVal);

            if (newVal !== oldVal) {
                onCurrentChange?.(newVal);
                const inputVal: string = newVal.toString();

                if (inputRef.current) {
                    inputRef.current.value = inputVal;
                }
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

            if (oldVal !== page) {
                onCurrentChange?.(page);
            }
        };

        const handleCurrentChange = (val: number): void => {
            const oldVal: number = _currentPage;

            setCurrentPage(val);

            if (oldVal !== val) {
                onCurrentChange?.(val);
                const inputVal: string = val.toString();

                if (inputRef.current) {
                    inputRef.current.value = inputVal;
                }
            }
        };

        const onSizeChangeHandler = (val: number): void => {
            setPageSize(val);
            setPageCount(Math.ceil(total / _pageSize));
            onSizeChange && onSizeChange(val);

            // TODO: Improve this to find _currentPage in newly calc'd _pageSize.
            if (selfControlled) {
                handleCurrentChange(1);
            }
        };

        const handleJumpOnChange = (
            _event: React.ChangeEvent<HTMLInputElement>
        ): void => {
            const { target } = _event;
            if (
                !target?.value ||
                isNaN(parseInt(target?.value, 10)) ||
                parseInt(target?.value, 10) > getPageCount() ||
                parseInt(target?.value, 10) < 1
            ) {
                jumpToPage(1);
            } else {
                jumpToPage(parseInt(target?.value, 10));
            }
        };

        const Overlay = (pageSizes?: number[]) => {
            const getItems = (): MenuItemButtonProps[] => {
                return pageSizes.map((item?: number, idx?: number) => ({
                    rowkey: idx,
                    text:
                        htmlDir === 'ltr'
                            ? `${item} / ${pageSizeText}`
                            : `${pageSizeText} / ${item}`,
                    value: item,
                }));
            };
            return <Menu onChange={onSizeChangeHandler} items={getItems()} />;
        };

        const moreThanOnePage: boolean = _total > 1;

        const paginationWrapperClassNames: string = mergeClasses([
            classNames,
            styles.pagination,
            { [styles.dots]: dots },
            { [styles.paginationRtl]: htmlDir === 'rtl' },
        ]);

        return (
            <div
                {...rest}
                ref={ref}
                className={paginationWrapperClassNames}
                data-test-id={dataTestId}
            >
                {_total > 0 && (
                    <>
                        {layout.includes(PaginationLayoutOptions.Sizes) &&
                            moreThanOnePage && (
                                <span className={styles.sizes} key="sizes">
                                    <Dropdown
                                        overlay={Overlay(_pageSizes)}
                                        onVisibleChange={setToggle}
                                    >
                                        <NeutralButton
                                            alignIcon={
                                                htmlDir === 'ltr'
                                                    ? ButtonIconAlign.Right
                                                    : ButtonIconAlign.Left
                                            }
                                            ariaLabel={pageSizeButtonAriaLabel}
                                            shape={ButtonShape.Rectangle}
                                            iconProps={{
                                                role: 'presentation',
                                                path: _toggle
                                                    ? IconName.mdiChevronUp
                                                    : IconName.mdiChevronDown,
                                            }}
                                            size={ButtonSize.Medium}
                                            text={
                                                htmlDir === 'ltr'
                                                    ? `${_pageSize} / ${pageSizeText}`
                                                    : `${pageSizeText} / ${_pageSize}`
                                            }
                                        />
                                    </Dropdown>
                                </span>
                            )}
                        {layout.includes(PaginationLayoutOptions.Total) &&
                        moreThanOnePage ? (
                            <span className={styles.total} key="total">
                                {htmlDir === 'ltr'
                                    ? `${totalText} ${total}`
                                    : `${total} ${totalText}`}
                            </span>
                        ) : (
                            <span />
                        )}
                        {layout.includes(PaginationLayoutOptions.Previous) &&
                            moreThanOnePage && (
                                <NeutralButton
                                    ariaLabel={previousIconButtonAriaLabel}
                                    classNames={mergeClasses([
                                        styles.paginationButton,
                                        styles.paginationPrevious,
                                    ])}
                                    shape={ButtonShape.Rectangle}
                                    key="previous"
                                    disabled={_currentPage <= 1}
                                    iconProps={{
                                        role: 'presentation',
                                        path:
                                            htmlDir === 'rtl'
                                                ? IconName.mdiChevronRight
                                                : IconName.mdiChevronLeft,
                                    }}
                                    onClick={previous}
                                    size={ButtonSize.Medium}
                                />
                            )}
                        {layout.includes(PaginationLayoutOptions.Pager) &&
                        !layout.includes(PaginationLayoutOptions.Simplified) ? (
                            <Pager
                                currentPage={_currentPage}
                                key="pager"
                                onCurrentChange={handleCurrentChange}
                                pageCount={getPageCount()}
                                quickNextIconButtonAriaLabel={
                                    quickNextIconButtonAriaLabel
                                }
                                quickPreviousIconButtonAriaLabel={
                                    quickPreviousIconButtonAriaLabel
                                }
                            />
                        ) : (
                            <Pager
                                currentPage={_currentPage}
                                key="pager"
                                onCurrentChange={handleCurrentChange}
                                pageCount={getPageCount()}
                                quickNextIconButtonAriaLabel={
                                    quickNextIconButtonAriaLabel
                                }
                                quickPreviousIconButtonAriaLabel={
                                    quickPreviousIconButtonAriaLabel
                                }
                                simplified={true}
                            />
                        )}
                        {layout.includes(PaginationLayoutOptions.Next) &&
                            moreThanOnePage && (
                                <NeutralButton
                                    ariaLabel={nextIconButtonAriaLabel}
                                    classNames={mergeClasses([
                                        styles.paginationButton,
                                        styles.paginationNext,
                                    ])}
                                    shape={ButtonShape.Rectangle}
                                    key="next"
                                    disabled={
                                        _currentPage === getPageCount() ||
                                        _pageCount === 0
                                    }
                                    iconProps={{
                                        role: 'presentation',
                                        path:
                                            htmlDir === 'rtl'
                                                ? IconName.mdiChevronLeft
                                                : IconName.mdiChevronRight,
                                    }}
                                    onClick={() => next()}
                                    size={ButtonSize.Medium}
                                />
                            )}
                        {layout.includes(PaginationLayoutOptions.Jumper) &&
                            moreThanOnePage && (
                                <span className={styles.jump} key="jumper">
                                    {goToText}
                                    <TextInput
                                        ref={inputRef}
                                        classNames={styles.editor}
                                        shape={TextInputShape.Pill}
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
                                </span>
                            )}
                    </>
                )}
            </div>
        );
    }
);
