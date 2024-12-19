'use client';

import React, { FC, Ref, useContext, useEffect, useState } from 'react';
import GradientContext, { Gradient } from '../ConfigProvider/GradientContext';
import { OcThemeName } from '../ConfigProvider';
import ThemeContext, {
  ThemeContextProvider,
} from '../ConfigProvider/ThemeContext';
import {
  Pager,
  PaginationLayoutOptions,
  PaginationLocale,
  PaginationProps,
  PaginationVisiblePagerCountSizeOptions,
} from './index';
import {
  Button,
  ButtonIconAlign,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
} from '../Button';
import { Dropdown } from '../Dropdown';
import { IconName } from '../Icon';
import { Menu, MenuItemButtonProps } from '../Menu';
import { TextInput, TextInputShape } from '../Inputs';
import { mergeClasses } from '../../shared/utilities';
import { useBoolean } from '../../octuple';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import LocaleReceiver, {
  useLocaleReceiver,
} from '../LocaleProvider/LocaleReceiver';
import enUS from './Locale/en_US';

import styles from './pagination.module.scss';
import themedComponentStyles from './pagination.theme.module.scss';

export const Pagination: FC<PaginationProps> = React.forwardRef(
  (props: PaginationProps, ref: Ref<HTMLDivElement>) => {
    const {
      classNames,
      configContextProps = {
        noGradientContext: false,
        noThemeContext: false,
      },
      currentPage = 1,
      dots = false,
      goToText: defaultGoToText,
      gradient = false,
      hideWhenSinglePage = false,
      layout = [
        PaginationLayoutOptions.Previous,
        PaginationLayoutOptions.Pager,
        PaginationLayoutOptions.Next,
      ],
      locale = enUS,
      loop = false,
      nextIconButtonAriaLabel: defaultNextIconButtonAriaLabel,
      onCurrentChange,
      onSizeChange,
      pageCount,
      // TODO: Set a default once visiblePagerCountSize is removed
      pagerSize,
      pageSize = 10,
      pageSizeButtonAriaLabel: defaultPageSizeButtonAriaLabel,
      pageSizes = [10, 20, 30, 40, 50, 100],
      pageSizeText: defaultPageSizeText,
      previousIconButtonAriaLabel: defaultPreviousIconButtonAriaLabel,
      quickNextIconButtonAriaLabel: defaultQuickNextIconButtonAriaLabel,
      quickPreviousIconButtonAriaLabel: defaultQuickPreviousIconButtonAriaLabel,
      theme,
      themeContainerId,
      total = 1,
      restrictPageSizesPropToSizesLayout = false,
      totalText: defaultTotalText,
      selfControlled = true,
      visiblePagerCountSize = PaginationVisiblePagerCountSizeOptions.Large,
      'data-test-id': dataTestId,
      ...rest
    } = props;

    const htmlDir: string = useCanvasDirection();
    const [_toggle, { toggle: setToggle }] = useBoolean(false);

    const [_currentPage, setCurrentPage] = useState<number>(currentPage);
    const [_pageCount, setPageCount] = useState<number>(pageCount);
    const [_pageSize, setPageSize] = useState<number>(pageSize);
    const [_pageSizes, setPageSizes] = useState<number[]>(pageSizes);
    const [_total, setTotal] = useState<number>(total);

    const inputRef = React.createRef<HTMLInputElement>();

    const contextualGradient: Gradient = useContext(GradientContext);
    const mergedGradient: boolean = configContextProps.noGradientContext
      ? gradient
      : contextualGradient || gradient;

    const contextualTheme: OcThemeName = useContext(ThemeContext);
    const mergedTheme: OcThemeName = configContextProps.noThemeContext
      ? theme
      : contextualTheme || theme;

    // ============================ Strings ===========================
    const [paginationLocale] = useLocaleReceiver('Pagination');
    let mergedLocale: PaginationLocale;

    if (props.locale) {
      mergedLocale = props.locale;
    } else {
      mergedLocale = paginationLocale || props.locale;
    }

    const [goToText, setGoToText] = useState<string>(defaultGoToText);
    const [nextIconButtonAriaLabel, setNextIconButtonAriaLabel] =
      useState<string>(defaultNextIconButtonAriaLabel);
    const [pageSizeButtonAriaLabel, setPageSizeButtonAriaLabel] =
      useState<string>(defaultPageSizeButtonAriaLabel);
    const [pageSizeText, setPageSizeText] =
      useState<string>(defaultPageSizeText);
    const [previousIconButtonAriaLabel, setPreviousIconButtonAriaLabel] =
      useState<string>(defaultPreviousIconButtonAriaLabel);
    const [quickNextIconButtonAriaLabel, setQuickNextIconButtonAriaLabel] =
      useState<string>(defaultQuickNextIconButtonAriaLabel);
    const [
      quickPreviousIconButtonAriaLabel,
      setQuickPreviousIconButtonAriaLabel,
    ] = useState<string>(defaultQuickPreviousIconButtonAriaLabel);
    const [totalText, setTotalText] = useState<string>(defaultTotalText);

    // Locs: if the prop isn't provided use the loc defaults.
    // If the mergedLocale is changed, update.
    useEffect(() => {
      setGoToText(
        props.goToText ? props.goToText : mergedLocale.lang!.goToText
      );
      setNextIconButtonAriaLabel(
        props.nextIconButtonAriaLabel
          ? props.nextIconButtonAriaLabel
          : mergedLocale.lang!.nextIconButtonAriaLabel
      );
      setPageSizeButtonAriaLabel(
        props.pageSizeButtonAriaLabel
          ? props.pageSizeButtonAriaLabel
          : mergedLocale.lang!.pageSizeButtonAriaLabel
      );
      setPageSizeText(
        props.pageSizeText
          ? props.pageSizeText
          : mergedLocale.lang!.pageSizeText
      );
      setPreviousIconButtonAriaLabel(
        props.previousIconButtonAriaLabel
          ? props.previousIconButtonAriaLabel
          : mergedLocale.lang!.previousIconButtonAriaLabel
      );
      setQuickNextIconButtonAriaLabel(
        props.quickNextIconButtonAriaLabel
          ? props.quickNextIconButtonAriaLabel
          : mergedLocale.lang!.quickNextIconButtonAriaLabel
      );
      setQuickPreviousIconButtonAriaLabel(
        props.quickPreviousIconButtonAriaLabel
          ? props.quickPreviousIconButtonAriaLabel
          : mergedLocale.lang!.quickPreviousIconButtonAriaLabel
      );
      setTotalText(
        props.totalText ? props.totalText : mergedLocale.lang!.totalText
      );
    }, [mergedLocale]);

    useEffect((): void => {
      setTotal(total);
      if (
        restrictPageSizesPropToSizesLayout
          ? layout.includes(PaginationLayoutOptions.Sizes)
          : true
      ) {
        onSizeChangeHandler?.(
          pageSizes.indexOf(pageSize) > -1 ? pageSize : pageSizes[0]
        );
      }
      if (
        restrictPageSizesPropToSizesLayout &&
        !layout.includes(PaginationLayoutOptions.Sizes)
      ) {
        setPageCount(Math.ceil(total / _pageSize));
      }
      jumpToPage?.(currentPage);
    }, []);

    useEffect((): void => {
      setTotal(total);
    }, [total]);

    useEffect((): void => {
      setCurrentPage(currentPage);
    }, [currentPage]);

    useEffect((): void => {
      if (loop) {
        setPageCount(pageCount);
      }
    }, [loop, pageCount]);

    const previous = (): void => {
      const oldVal: number = _currentPage;
      const newVal: number = _currentPage - 1;

      setCurrentPage(newVal);

      if (newVal !== oldVal) {
        let inputVal: string;
        if (loop && oldVal === 1) {
          onCurrentChange?.(getPageCount());
          inputVal = getPageCount().toString();
        } else {
          onCurrentChange?.(newVal);
          inputVal = newVal.toString();
        }

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
        let inputVal: string;
        if (loop && oldVal === getPageCount()) {
          onCurrentChange?.(1);
          inputVal = '1';
        } else {
          onCurrentChange?.(newVal);
          inputVal = newVal.toString();
        }

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

    const moreThanOnePage: boolean = getPageCount() > 1;

    const paginationWrapperClassNames: string = mergeClasses([
      classNames,
      styles.pagination,
      { [themedComponentStyles.theme]: mergedTheme },
      { [styles.gradient]: mergedGradient },
      { [styles.dots]: dots },
      { [styles.paginationRtl]: htmlDir === 'rtl' },
    ]);

    return (
      <LocaleReceiver componentName={'Pagination'} defaultLocale={enUS}>
        {(contextLocale: PaginationLocale) => {
          const locale = { ...contextLocale, ...mergedLocale };

          return (
            <ThemeContextProvider
              componentClassName={themedComponentStyles.theme}
              containerId={themeContainerId}
              theme={mergedTheme}
            >
              <div
                {...rest}
                ref={ref}
                className={paginationWrapperClassNames}
                role="navigation"
                data-test-id={dataTestId}
              >
                {_total > 0 && (
                  <>
                    {layout.includes(PaginationLayoutOptions.Sizes) &&
                      _pageSizes.find(
                        (pageSize) => Math.ceil(total / pageSize) > 1
                      ) && (
                        <span className={styles.sizes} key="sizes">
                          <Dropdown
                            overlay={Overlay(_pageSizes)}
                            onVisibleChange={setToggle}
                          >
                            <Button
                              alignIcon={
                                htmlDir === 'ltr'
                                  ? ButtonIconAlign.Right
                                  : ButtonIconAlign.Left
                              }
                              ariaLabel={pageSizeButtonAriaLabel}
                              classNames={mergeClasses([
                                styles.paginationButton,
                              ])}
                              configContextProps={configContextProps}
                              gradient={mergedGradient}
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
                              theme={mergedTheme}
                              themeContainerId={themeContainerId}
                              variant={ButtonVariant.Neutral}
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
                        <Button
                          ariaLabel={previousIconButtonAriaLabel}
                          classNames={mergeClasses([
                            styles.paginationButton,
                            styles.paginationPrevious,
                          ])}
                          configContextProps={configContextProps}
                          gradient={mergedGradient}
                          shape={ButtonShape.Rectangle}
                          key="previous"
                          disabled={!loop && _currentPage <= 1}
                          iconProps={{
                            role: 'presentation',
                            path:
                              htmlDir === 'rtl'
                                ? IconName.mdiChevronRight
                                : IconName.mdiChevronLeft,
                          }}
                          onClick={previous}
                          size={ButtonSize.Medium}
                          theme={mergedTheme}
                          themeContainerId={themeContainerId}
                          variant={ButtonVariant.Neutral}
                        />
                      )}
                    {layout.includes(PaginationLayoutOptions.Pager) &&
                    !layout.includes(PaginationLayoutOptions.Simplified) ? (
                      <Pager
                        configContextProps={configContextProps}
                        currentPage={_currentPage}
                        gradient={gradient}
                        key="pager"
                        locale={locale}
                        onCurrentChange={handleCurrentChange}
                        pageCount={getPageCount()}
                        pagerSize={pagerSize}
                        quickNextIconButtonAriaLabel={
                          quickNextIconButtonAriaLabel
                        }
                        quickPreviousIconButtonAriaLabel={
                          quickPreviousIconButtonAriaLabel
                        }
                        showLast={
                          !layout.includes(PaginationLayoutOptions.NoLast)
                        }
                        theme={mergedTheme}
                        themeContainerId={themeContainerId}
                        visiblePagerCountSize={visiblePagerCountSize}
                      />
                    ) : (
                      (hideWhenSinglePage ? moreThanOnePage : true) && (
                        <Pager
                          configContextProps={configContextProps}
                          currentPage={_currentPage}
                          gradient={gradient}
                          key="pager"
                          locale={locale}
                          onCurrentChange={handleCurrentChange}
                          pageCount={getPageCount()}
                          pagerSize={pagerSize}
                          quickNextIconButtonAriaLabel={
                            quickNextIconButtonAriaLabel
                          }
                          quickPreviousIconButtonAriaLabel={
                            quickPreviousIconButtonAriaLabel
                          }
                          simplified={true}
                          showLast={
                            !layout.includes(PaginationLayoutOptions.NoLast)
                          }
                          theme={mergedTheme}
                          themeContainerId={themeContainerId}
                          visiblePagerCountSize={visiblePagerCountSize}
                        />
                      )
                    )}
                    {layout.includes(PaginationLayoutOptions.Next) &&
                      moreThanOnePage && (
                        <Button
                          ariaLabel={nextIconButtonAriaLabel}
                          classNames={mergeClasses([
                            styles.paginationButton,
                            styles.paginationNext,
                          ])}
                          configContextProps={configContextProps}
                          gradient={mergedGradient}
                          shape={ButtonShape.Rectangle}
                          key="next"
                          disabled={!loop && _currentPage === getPageCount()}
                          iconProps={{
                            role: 'presentation',
                            path:
                              htmlDir === 'rtl'
                                ? IconName.mdiChevronLeft
                                : IconName.mdiChevronRight,
                          }}
                          onClick={() => next()}
                          size={ButtonSize.Medium}
                          theme={mergedTheme}
                          themeContainerId={themeContainerId}
                          variant={ButtonVariant.Neutral}
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
                            min={1}
                            max={_pageCount}
                            numbersOnly
                            defaultValue={
                              _currentPage > getPageCount() || _currentPage <= 0
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
            </ThemeContextProvider>
          );
        }}
      </LocaleReceiver>
    );
  }
);
