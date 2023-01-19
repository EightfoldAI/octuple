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
import { ScrollerProps, ScrollerRef } from '../OcTable.types';
import { useDebounce } from '../../../../hooks/useDebounce';

import styles from '../octable.module.scss';

const BUTTON_HEIGHT: number = 36;

export const Scroller = React.forwardRef(
  <RecordType,>(
    {
      columns,
      flattenColumns,
      scrollBodyRef,
      stickyOffsets,
      scrollHeaderRef,
      scrollLeftAriaLabel,
      scrollRightAriaLabel,
    }: ScrollerProps<RecordType>,
    ref: ForwardedRef<ScrollerRef>
  ) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [leftButtonVisible, setLeftButtonVisible] = useState<boolean>(false);
    const [rightButtonVisible, setRightButtonVisible] = useState<boolean>(true);
    const [buttonStyle, setButtonStyle] = useState<React.CSSProperties>({});

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

    const leftButtonLeft: number = useMemo(
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

    const computePosition = useCallback((): void => {
      if (!scrollBodyRef.current) {
        return;
      }
      const {
        height: scrollBodyHeight,
        top: scrollBodyTop,
        bottom: scrollBodyBottom,
      } = scrollBodyRef.current.getBoundingClientRect();
      const { height: stickyHeaderHeight = 0 } =
        scrollHeaderRef?.current?.getBoundingClientRect?.() || {};
      const { height: viewportHeight } = document.body.getBoundingClientRect();

      let buttonTop: number = 0;

      if (scrollBodyTop > 0) {
        // When the top of the table is in the viewport

        if (scrollBodyBottom > viewportHeight) {
          // When bottom of the table is out of the viewport
          buttonTop = (viewportHeight - scrollBodyTop) / 2;
        } else if (scrollBodyBottom < viewportHeight) {
          // When full table is in the viewport
          buttonTop = scrollBodyHeight / 2;
        }
      } else if (scrollBodyTop < 0) {
        // When the top of the table is out the viewport

        if (scrollBodyBottom > viewportHeight) {
          // When bottom of the table is out of the viewport
          buttonTop = Math.abs(scrollBodyTop) + viewportHeight / 2;
        } else if (scrollBodyBottom < viewportHeight) {
          // When bottom of the table is in the viewport
          buttonTop =
            Math.abs(scrollBodyTop) +
            (viewportHeight - (viewportHeight - scrollBodyBottom)) / 2;
        }
      }
      setButtonStyle({
        top: buttonTop + stickyHeaderHeight - BUTTON_HEIGHT / 2,
      });
    }, []);

    const debouncedComputePosition = useDebounce(computePosition, 500);

    const onMouseEnter = useCallback((): void => {
      setVisible(true);
      computePosition();
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
    }));

    useEffect(() => {
      document.addEventListener('scroll', debouncedComputePosition);
      scrollBodyRef.current?.addEventListener?.('mouseenter', onMouseEnter);
      scrollBodyRef.current?.addEventListener?.('mouseleave', onMouseLeave);
      return () => {
        document.removeEventListener('scroll', debouncedComputePosition);
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

    return (
      <>
        <SecondaryButton
          classNames={styles.scrollerButton}
          style={{
            left: leftButtonOffset,
            opacity: leftButtonVisible && visible ? 1 : 0,
            ...buttonStyle,
          }}
          shape={ButtonShape.Round}
          size={ButtonSize.Medium}
          iconProps={{
            path: IconName.mdiChevronLeft,
          }}
          onClick={() => onClick('left')}
          ariaLabel={scrollLeftAriaLabel}
        />
        <SecondaryButton
          classNames={styles.scrollerButton}
          style={{
            right: rightButtonOffset,
            opacity: rightButtonVisible && visible ? 1 : 0,
            ...buttonStyle,
          }}
          shape={ButtonShape.Round}
          size={ButtonSize.Medium}
          iconProps={{
            path: IconName.mdiChevronRight,
          }}
          onClick={() => onClick('right')}
          ariaLabel={scrollRightAriaLabel}
        />
      </>
    );
  }
);
