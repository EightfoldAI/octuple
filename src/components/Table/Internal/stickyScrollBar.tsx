import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StickyScrollBarProps } from './OcTable.types';
import { useLayoutState } from './Hooks/useFrame';
import {
  canUseDocElement,
  canUseDom,
  getOffset,
  getScrollBarSize,
  mergeClasses,
} from '../../../shared/utilities';

import styles from './octable.module.scss';

const StickyScrollBar: React.ForwardRefRenderFunction<
  unknown,
  StickyScrollBarProps
> = ({ scrollBodyRef, onScroll, offsetScroll, container }, ref) => {
  const bodyScrollWidth = scrollBodyRef.current?.scrollWidth || 0;
  const bodyWidth = scrollBodyRef.current?.clientWidth || 0;
  const scrollBarWidth =
    bodyScrollWidth && bodyWidth * (bodyWidth / bodyScrollWidth);

  const scrollBarRef = useRef<HTMLDivElement>();
  const [scrollState, setScrollState] = useLayoutState<{
    scrollLeft: number;
    isHiddenScrollBar: boolean;
  }>({
    scrollLeft: 0,
    isHiddenScrollBar: false,
  });
  const refState = useRef<{
    delta: number;
    x: number;
  }>({
    delta: 0,
    x: 0,
  });
  const [isActive, setActive] = useState(false);

  const onMouseUp = (_event: MouseEvent): void => {
    setActive(false);
  };

  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (_event) => {
    _event.persist();
    refState.current.delta = _event.pageX - scrollState.scrollLeft;
    refState.current.x = 0;
    setActive(true);
    _event.preventDefault();
  };

  const onMouseMove = (_event: MouseEvent): void => {
    const { buttons } = _event || (canUseDom() ? window.event : ({} as any));
    if (!isActive || buttons === 0) {
      // If out body mouse up, we can set isActive false when mouse move
      if (isActive) {
        setActive(false);
      }
      return;
    }
    let left: number =
      refState.current.x +
      _event.pageX -
      refState.current.x -
      refState.current.delta;

    if (left <= 0) {
      left = 0;
    }

    if (left + scrollBarWidth >= bodyWidth) {
      left = bodyWidth - scrollBarWidth;
    }

    onScroll({
      scrollLeft: (left / bodyWidth) * (bodyScrollWidth + 2),
    });

    refState.current.x = _event.pageX;
  };

  const onContainerScroll = () => {
    if (!scrollBodyRef.current) {
      return;
    }
    const tableOffsetTop: number = getOffset(scrollBodyRef.current).top;
    const tableBottomOffset: number =
      tableOffsetTop + scrollBodyRef.current.offsetHeight;
    let currentClientOffset: number = 0;
    if (canUseDom() && canUseDocElement()) {
      currentClientOffset =
        container === window
          ? document.documentElement.scrollTop + window.innerHeight
          : getOffset(container as HTMLElement).top +
            (container as HTMLElement).clientHeight;
    }

    if (
      tableBottomOffset - getScrollBarSize() <= currentClientOffset ||
      tableOffsetTop >= currentClientOffset - offsetScroll
    ) {
      setScrollState((state) => ({
        ...state,
        isHiddenScrollBar: true,
      }));
    } else {
      setScrollState((state) => ({
        ...state,
        isHiddenScrollBar: false,
      }));
    }
  };

  const setScrollLeft = (left: number) => {
    setScrollState((state) => {
      return {
        ...state,
        scrollLeft: (left / bodyScrollWidth) * bodyWidth || 0,
      };
    });
  };

  useImperativeHandle(ref, () => ({
    setScrollLeft,
  }));

  useEffect(() => {
    if (canUseDocElement()) {
      document?.body.addEventListener('mouseup', onMouseUp);
      document?.body.addEventListener('mousemove', onMouseMove);
    }
    onContainerScroll();
    return () => {
      if (canUseDocElement()) {
        document?.body.removeEventListener('mouseup', onMouseUp);
        document?.body.removeEventListener('mousemove', onMouseMove);
      }
    };
  }, [scrollBarWidth, isActive]);

  useEffect(() => {
    container?.addEventListener('scroll', onContainerScroll);
    if (canUseDom()) {
      window?.addEventListener('resize', onContainerScroll);
    }
    return () => {
      container?.removeEventListener('scroll', onContainerScroll);
      if (canUseDom()) {
        window?.removeEventListener('resize', onContainerScroll);
      }
    };
  }, [container]);

  useEffect(() => {
    if (!scrollState.isHiddenScrollBar) {
      setScrollState((state) => {
        const bodyNode = scrollBodyRef.current;
        if (!bodyNode) {
          return state;
        }
        return {
          ...state,
          scrollLeft:
            (bodyNode.scrollLeft / bodyNode.scrollWidth) * bodyNode.clientWidth,
        };
      });
    }
  }, [scrollState.isHiddenScrollBar]);

  if (
    bodyScrollWidth <= bodyWidth ||
    !scrollBarWidth ||
    scrollState.isHiddenScrollBar
  ) {
    return null;
  }

  return (
    <div
      style={{
        height: getScrollBarSize(),
        width: bodyWidth,
        bottom: offsetScroll,
      }}
      className={styles.tableStickyScroll}
    >
      <div
        onMouseDown={onMouseDown}
        ref={scrollBarRef}
        className={mergeClasses([
          styles.tableStickyScrollBar,
          { [styles.tableStickyScrollBarActive]: isActive },
        ])}
        style={{
          width: `${scrollBarWidth}px`,
          transform: `translate3d(${scrollState.scrollLeft}px, 0, 0)`,
        }}
      />
    </div>
  );
};

export default forwardRef(StickyScrollBar);
