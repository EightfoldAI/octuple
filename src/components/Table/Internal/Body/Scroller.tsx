import React, {
  ForwardedRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {
  Button,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
} from '../../../Button';
import { IconName } from '../../../Icon';
import { ColumnType } from '../../Table.types';
import {
  ScrollerProps,
  ScrollerRef,
  VERTICAL_SCROLL_OFFSET,
} from '../OcTable.types';

import styles from '../octable.module.scss';

const BUTTON_HEIGHT: number = 36;
const BUTTON_PADDING: number = 2;

export const Scroller = React.forwardRef(
  <RecordType,>(
    {
      columns,
      direction,
      flattenColumns,
      scrollBodyRef,
      stickyOffsets,
      scrollHeaderRef,
      scrollLeftAriaLabelText,
      scrollRightAriaLabelText,
      titleRef,
      verticalScroll = false,
    }: ScrollerProps<RecordType>,
    ref: ForwardedRef<ScrollerRef>
  ) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [startButtonVisible, setStartButtonVisible] =
      useState<boolean>(false);
    const [endButtonVisible, setEndButtonVisible] = useState<boolean>(true);
    const [hoveredRowBoundingRect, setHoveredRowBoundingRect] =
      useState<DOMRect>(null);

    const scrollOffsets: number[] = useMemo(
      () =>
        columns.reduce(
          (acc, column: ColumnType<RecordType>) => {
            if (!column.fixed) {
              acc.widths += column.width as number;
              acc.columns.push(acc.widths);
            }
            return acc;
          },
          {
            widths: 0,
            columns: [0],
          }
        ).columns,
      [columns]
    );

    const startButtonLtrOffset: number = useMemo(
      () =>
        stickyOffsets.left[flattenColumns.findIndex((column) => !column.fixed)],
      [stickyOffsets, flattenColumns]
    );

    const endButtonLtrOffset: number = useMemo(
      () =>
        stickyOffsets.right[
          flattenColumns.findIndex((column) => column.fixed === 'right') - 1
        ] ?? 0,
      [stickyOffsets, flattenColumns]
    );

    const startButtonRtlOffset: number = useMemo(
      () =>
        stickyOffsets.right[
          flattenColumns.findIndex((column) => !column.fixed)
        ],
      [stickyOffsets, flattenColumns]
    );

    const endButtonRtlOffset: number = useMemo(
      () =>
        stickyOffsets.left[
          flattenColumns.findIndex((column) => column.fixed === 'left') - 1
        ] ?? 0,
      [stickyOffsets, flattenColumns]
    );

    const getButtonTop = (): number => {
      if (!scrollBodyRef.current) {
        return 0;
      }
      const { top: scrollBodyTop } =
        scrollBodyRef.current.getBoundingClientRect();
      const { height: titleHeight = 0 } =
        titleRef.current?.getBoundingClientRect?.() || {};

      const { top: rowTop, height: rowHeight } = hoveredRowBoundingRect ?? {};
      const { height: stickyHeaderHeight = 0 } =
        scrollHeaderRef?.current?.getBoundingClientRect?.() || {};
      return (
        (rowTop -
          scrollBodyTop +
          stickyHeaderHeight +
          rowHeight / 2 -
          BUTTON_HEIGHT / 2 +
          titleHeight) |
        0
      );
    };

    const onMouseEnter = useCallback((): void => {
      setVisible(true);
    }, []);

    const onMouseLeave = useCallback((): void => setVisible(false), []);

    const onClick = (scrollDirection: 'left' | 'right'): void => {
      let scrollLeft: number;
      if (direction === 'rtl') {
        if (scrollDirection === 'right') {
          scrollLeft = scrollOffsets
            .map((offset) => -offset)
            .slice()
            .reverse()
            .find(
              (leftOffset: number) =>
                leftOffset > scrollBodyRef.current.scrollLeft
            );
        } else {
          scrollLeft = scrollOffsets
            .map((offset) => -offset)
            .find(
              (leftOffset: number) =>
                leftOffset < scrollBodyRef.current.scrollLeft
            );
        }
      } else {
        if (scrollDirection === 'left') {
          scrollLeft = scrollOffsets
            .slice()
            .reverse()
            .find(
              (leftOffset: number) =>
                leftOffset < scrollBodyRef.current.scrollLeft
            );
        } else {
          scrollLeft = scrollOffsets.find(
            (leftOffset: number) =>
              leftOffset > scrollBodyRef.current.scrollLeft
          );
        }
      }
      scrollBodyRef.current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    };

    const noHorizontalScroller = (): boolean => {
      return (
        scrollBodyRef?.current?.clientWidth >=
        scrollBodyRef?.current?.scrollWidth
      );
    };

    const onBodyScroll = () => {
      const bodyScrollLeft: number = scrollBodyRef.current?.scrollLeft || 0;
      const bodyScrollWidth: number = scrollBodyRef.current?.scrollWidth || 0;
      const bodyWidth: number = scrollBodyRef.current?.clientWidth || 0;
      const offset: 1 | -1 = direction === 'rtl' ? -1 : 1;
      const threshold: number = offset * (bodyScrollWidth - bodyWidth);

      if (bodyScrollLeft === 0) {
        setStartButtonVisible(false);
        setEndButtonVisible(true);
      } else {
        setStartButtonVisible(true);
        if (bodyScrollLeft === threshold) {
          setEndButtonVisible(false);
        } else {
          setEndButtonVisible(true);
        }
      }
    };

    useImperativeHandle(ref, () => ({
      onBodyScroll,
      onRowHover: setHoveredRowBoundingRect,
    }));

    useEffect(() => {
      scrollBodyRef.current?.addEventListener?.('mouseenter', onMouseEnter);
      scrollBodyRef.current?.addEventListener?.('mouseleave', onMouseLeave);
      return () => {
        scrollBodyRef.current?.removeEventListener?.(
          'mouseenter',
          onMouseEnter
        );
        scrollBodyRef.current?.removeEventListener?.(
          'mouseleave',
          onMouseLeave
        );
      };
    }, []);

    if (noHorizontalScroller()) return null;

    return (
      <>
        <Button
          ariaLabel={
            direction === 'rtl'
              ? scrollRightAriaLabelText
              : scrollLeftAriaLabelText
          }
          classNames={styles.scrollerButton}
          iconProps={{
            path:
              direction === 'rtl'
                ? IconName.mdiChevronRight
                : IconName.mdiChevronLeft,
          }}
          onClick={() => onClick(direction === 'rtl' ? 'right' : 'left')}
          shape={ButtonShape.Round}
          size={ButtonSize.Medium}
          style={{
            left:
              direction === 'rtl'
                ? 'unset'
                : startButtonLtrOffset + BUTTON_PADDING,
            opacity: startButtonVisible && visible ? 1 : 0,
            right:
              direction === 'rtl'
                ? startButtonRtlOffset + BUTTON_PADDING
                : 'unset',
            top: getButtonTop(),
          }}
          variant={ButtonVariant.Secondary}
        />
        <Button
          ariaLabel={
            direction === 'rtl'
              ? scrollLeftAriaLabelText
              : scrollRightAriaLabelText
          }
          classNames={styles.scrollerButton}
          iconProps={{
            path:
              direction === 'rtl'
                ? IconName.mdiChevronLeft
                : IconName.mdiChevronRight,
          }}
          onClick={() => onClick(direction === 'rtl' ? 'left' : 'right')}
          shape={ButtonShape.Round}
          size={ButtonSize.Medium}
          style={{
            left:
              direction === 'rtl'
                ? endButtonRtlOffset +
                  (verticalScroll ? VERTICAL_SCROLL_OFFSET : 0) +
                  BUTTON_PADDING
                : 'unset',
            opacity: endButtonVisible && visible ? 1 : 0,
            right:
              direction === 'rtl'
                ? 'unset'
                : endButtonLtrOffset +
                  (verticalScroll ? VERTICAL_SCROLL_OFFSET : 0) +
                  BUTTON_PADDING,
            top: getButtonTop(),
          }}
          variant={ButtonVariant.Secondary}
        />
      </>
    );
  }
);
