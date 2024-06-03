'use client';

import React from 'react';
import {
  MIN_SCROLL_BAR_SIZE,
  ScrollBarProps,
  ScrollBarState,
} from './VirtualList.types';
import {
  canUseDom,
  mergeClasses,
  requestAnimationFrameWrapper,
} from '../../shared/utilities';

function getPageY(e: React.MouseEvent | MouseEvent | TouchEvent) {
  return 'touches' in e ? e.touches[0].pageY : e.pageY;
}

export class ScrollBar extends React.Component<ScrollBarProps, ScrollBarState> {
  moveRaf: number = null;

  scrollbarRef = React.createRef<HTMLDivElement>();

  thumbRef = React.createRef<HTMLDivElement>();

  visibleTimeout: ReturnType<typeof setTimeout> = null;

  state: ScrollBarState = {
    dragging: false,
    pageY: null,
    startTop: null,
    visible: false,
  };

  componentDidMount() {
    this.scrollbarRef.current.addEventListener(
      'touchstart',
      this.onScrollbarTouchStart
    );
    this.thumbRef.current.addEventListener('touchstart', this.onMouseDown);
  }

  componentDidUpdate(prevProps: ScrollBarProps) {
    if (prevProps.scrollTop !== this.props.scrollTop) {
      this.delayHidden();
    }
  }

  componentWillUnmount() {
    this.removeEvents();
    clearTimeout(this.visibleTimeout);
  }

  delayHidden = () => {
    clearTimeout(this.visibleTimeout);

    this.setState({ visible: true });
    this.visibleTimeout = setTimeout(() => {
      this.setState({ visible: false });
    }, 2000);
  };

  onScrollbarTouchStart = (e: TouchEvent) => {
    e.preventDefault();
  };

  onContainerMouseDown: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  // ======================= Clean =======================
  patchEvents = () => {
    if (canUseDom()) {
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
    }

    this.thumbRef.current?.addEventListener('touchmove', this.onMouseMove);
    this.thumbRef.current?.addEventListener('touchend', this.onMouseUp);
  };

  removeEvents = () => {
    if (canUseDom()) {
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('mouseup', this.onMouseUp);
    }

    this.scrollbarRef.current?.removeEventListener(
      'touchstart',
      this.onScrollbarTouchStart
    );

    if (this.thumbRef.current) {
      this.thumbRef.current.removeEventListener('touchstart', this.onMouseDown);
      this.thumbRef.current.removeEventListener('touchmove', this.onMouseMove);
      this.thumbRef.current.removeEventListener('touchend', this.onMouseUp);
    }

    requestAnimationFrameWrapper.cancel(this.moveRaf);
  };

  // ======================= Thumb =======================
  onMouseDown = (e: React.MouseEvent | TouchEvent) => {
    const { onStartMove } = this.props;

    this.setState({
      dragging: true,
      pageY: getPageY(e),
      startTop: this.getTop(),
    });

    onStartMove();
    this.patchEvents();
    e.stopPropagation();
    e.preventDefault();
  };

  onMouseMove = (e: MouseEvent | TouchEvent) => {
    const { dragging, pageY, startTop } = this.state;
    const { onScroll } = this.props;

    requestAnimationFrameWrapper.cancel(this.moveRaf);

    if (dragging) {
      const offsetY = getPageY(e) - pageY;
      const newTop = startTop + offsetY;

      const enableScrollRange = this.getEnableScrollRange();
      const enableHeightRange = this.getEnableHeightRange();

      const ptg = enableHeightRange ? newTop / enableHeightRange : 0;
      const newScrollTop = Math.ceil(ptg * enableScrollRange);
      this.moveRaf = requestAnimationFrameWrapper(() => {
        onScroll(newScrollTop);
      });
    }
  };

  onMouseUp = () => {
    const { onStopMove } = this.props;
    this.setState({ dragging: false });

    onStopMove();
    this.removeEvents();
  };

  // ===================== Calculate =====================
  getSpinHeight = () => {
    const { height, count } = this.props;
    let baseHeight = (height / count) * 10;
    baseHeight = Math.max(baseHeight, MIN_SCROLL_BAR_SIZE);
    baseHeight = Math.min(baseHeight, height / 2);
    return Math.floor(baseHeight);
  };

  getEnableScrollRange = () => {
    const { scrollHeight, height } = this.props;
    return scrollHeight - height || 0;
  };

  getEnableHeightRange = () => {
    const { height } = this.props;
    const spinHeight = this.getSpinHeight();
    return height - spinHeight || 0;
  };

  getTop = () => {
    const { scrollTop } = this.props;
    const enableScrollRange = this.getEnableScrollRange();
    const enableHeightRange = this.getEnableHeightRange();
    if (scrollTop === 0 || enableScrollRange === 0) {
      return 0;
    }
    const ptg = scrollTop / enableScrollRange;
    return ptg * enableHeightRange;
  };

  // Not show scrollbar when height is large than scrollHeight
  showScroll = (): boolean => {
    const { height, scrollHeight } = this.props;
    return scrollHeight > height;
  };

  // ====================== Render =======================
  render() {
    const { dragging, visible } = this.state;
    const spinHeight = this.getSpinHeight();
    const top = this.getTop();

    const canScroll = this.showScroll();
    const mergedVisible = canScroll && visible;

    return (
      <div
        ref={this.scrollbarRef}
        className={mergeClasses([
          'virtual-list-scrollbar',
          { [`virtual-list-scrollbar-show`]: canScroll },
        ])}
        style={{
          width: 8,
          top: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: mergedVisible ? null : 'none',
        }}
        onMouseDown={this.onContainerMouseDown}
        onMouseMove={this.delayHidden}
      >
        <div
          ref={this.thumbRef}
          className={mergeClasses([
            'virtual-list-scrollbar-thumb',
            { ['virtual-list-scrollbar-thumb-moving']: dragging },
          ])}
          style={{
            width: '100%',
            height: spinHeight,
            top,
            left: 0,
            position: 'absolute',
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 99,
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onMouseDown={this.onMouseDown}
        />
      </div>
    );
  }
}
