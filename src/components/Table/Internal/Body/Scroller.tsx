import React, {
  ForwardedRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { ButtonShape, ButtonSize, SecondaryButton } from '../../../Button';
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
    const [leftButtonVisible, setLeftButtonVisible] = useState<boolean>(false);
    const [rightButtonVisible, setRightButtonVisible] = useState<boolean>(true);
    const [hoveredRowBoundingRect, setHoveredRowBoundingRect] =
      useState<DOMRect>(null);
    // todo @yash: handle rtl

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

    const leftButtonOffset: number = useMemo(
      () =>
        stickyOffsets.left[flattenColumns.findIndex((column) => !column.fixed)],
      [stickyOffsets, flattenColumns]
    );

    const rightButtonOffset: number = useMemo(
      () =>
        stickyOffsets.right[
          flattenColumns.findIndex((column) => column.fixed === 'right') - 1
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
          (leftOffset: number) => leftOffset > scrollBodyRef.current.scrollLeft
        );
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

    const onBodyScroll = (): void => {
      const bodyScrollLeft: number = scrollBodyRef.current.scrollLeft;
      const bodyWidth: number = scrollBodyRef.current.clientWidth;
      const bodyScrollWidth: number = scrollBodyRef.current.scrollWidth;

      if (bodyScrollLeft === 0) {
        setLeftButtonVisible(false);
        setRightButtonVisible(true);
      } else {
        setLeftButtonVisible(true);
        if (bodyScrollWidth - bodyScrollLeft - bodyWidth === 0) {
          setRightButtonVisible(false);
        } else {
          setRightButtonVisible(true);
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
        <SecondaryButton
          classNames={styles.scrollerButton}
          style={{
            left: leftButtonOffset + BUTTON_PADDING,
            opacity: leftButtonVisible && visible ? 1 : 0,
            top: getButtonTop(),
          }}
          shape={ButtonShape.Round}
          size={ButtonSize.Medium}
          iconProps={{
            path: IconName.mdiChevronLeft,
          }}
          onClick={() => onClick('left')}
          ariaLabel={scrollLeftAriaLabelText}
        />
        <SecondaryButton
          classNames={styles.scrollerButton}
          style={{
            right:
              rightButtonOffset +
              (verticalScroll ? VERTICAL_SCROLL_OFFSET : 0) +
              BUTTON_PADDING,
            opacity: rightButtonVisible && visible ? 1 : 0,
            top: getButtonTop(),
          }}
          shape={ButtonShape.Round}
          size={ButtonSize.Medium}
          iconProps={{
            path: IconName.mdiChevronRight,
          }}
          onClick={() => onClick('right')}
          ariaLabel={scrollRightAriaLabelText}
        />
      </>
    );
  }
);
