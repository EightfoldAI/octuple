import React from 'react';
import { act } from 'react-dom/test-utils';
import { mergeClasses } from '../../../shared/utilities';
import { render, fireEvent } from '@testing-library/react';
import type { CSSMotionProps } from '../CSSMotion.types';
import RefCSSMotion, { genCSSMotion } from '../CSSMotion';

describe('CSSMotion', () => {
  const CSSMotion = genCSSMotion();

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe('animation', () => {
    const actionList = [
      {
        name: 'appear',
        props: { motionAppear: true },
        visibleQueue: [true],
      },
      {
        name: 'enter',
        props: { motionEnter: true },
        visibleQueue: [false, true],
      },
      {
        name: 'leave',
        props: { motionLeave: true },
        visibleQueue: [true, false],
      },
    ];
  });

  it('forwardRef', () => {
    const domRef = React.createRef();
    render(
      <RefCSSMotion motionName="transition" ref={domRef}>
        {({ style, className }, ref) => (
          <div
            ref={ref}
            style={style}
            className={mergeClasses(['motion-box', className])}
          />
        )}
      </RefCSSMotion>
    );

    expect(domRef.current instanceof HTMLElement).toBeTruthy();
  });

  it("onMotionEnd shouldn't be fired by inner element", () => {
    const onLeaveEnd = jest.fn();

    const genMotion = (props?: CSSMotionProps) => (
      <CSSMotion
        visible
        motionName="bamboo"
        onLeaveEnd={onLeaveEnd}
        removeOnLeave={false}
        {...props}
      >
        {(_, ref) => (
          <div className="outer-block" ref={ref}>
            <div className="inner-block" />
          </div>
        )}
      </CSSMotion>
    );
    const { container, rerender } = render(genMotion());

    function resetLeave() {
      rerender(genMotion({ visible: true }));
      act(() => {
        jest.runAllTimers();
      });

      rerender(genMotion({ visible: false }));
      act(() => {
        jest.runAllTimers();
      });
    }

    // Outer
    resetLeave();
    fireEvent.transitionEnd(container.querySelector('.outer-block'));
    expect(onLeaveEnd).toHaveBeenCalledTimes(1);

    // Outer
    resetLeave();
    fireEvent.transitionEnd(container.querySelector('.outer-block'));
    expect(onLeaveEnd).toHaveBeenCalledTimes(2);

    // Inner
    resetLeave();
    fireEvent.transitionEnd(container.querySelector('.inner-block'));
    expect(onLeaveEnd).toHaveBeenCalledTimes(2);
  });

  it('switch dom should work', () => {
    const onLeaveEnd = jest.fn();

    const genMotion = (Component: any, visible: boolean) => (
      <CSSMotion
        visible={visible}
        onLeaveEnd={onLeaveEnd}
        motionDeadline={233}
        motionName="bamboo"
      >
        {({ style, classNames }) => (
          <Component
            style={style}
            className={mergeClasses(['motion-box', classNames])}
          />
        )}
      </CSSMotion>
    );

    const { rerender } = render(genMotion('div', true));

    // Active
    act(() => {
      jest.runAllTimers();
    });

    // Hide
    rerender(genMotion('p', false));

    // Active
    act(() => {
      jest.runAllTimers();
    });

    // Deadline
    act(() => {
      jest.runAllTimers();
    });

    expect(onLeaveEnd).toHaveBeenCalled();
  });

  // React 19 removed `ReactDOM.findDOMNode`, so `CSSMotion` no longer relies
  // on it. These cases now assert on the DOM shape directly: a plain
  // function component child (no ref support) falls back to `DomWrapper`'s
  // hidden marker node, while a ref-able child (a host element) renders
  // without any extra marker node.
  describe('dom resolution without findDOMNode', () => {
    it('falls back to DomWrapper marker when no refs are passed', () => {
      const Div = () => <div className="target" />;
      const { container } = render(
        <CSSMotion motionName="transition" visible>
          {() => <Div />}
        </CSSMotion>
      );

      act(() => {
        jest.runAllTimers();
      });

      // Hidden marker precedes the un-refable child.
      expect(container.querySelector('span[hidden]')).toBeTruthy();
      expect(container.querySelector('.target')).toBeTruthy();
    });

    it('renders without a marker when ref is passed internally', () => {
      const { container } = render(
        <CSSMotion motionName="transition" visible>
          {(props, ref) => <div ref={ref} {...props} className="target" />}
        </CSSMotion>
      );

      act(() => {
        jest.runAllTimers();
      });

      expect(container.querySelector('span[hidden]')).toBeFalsy();
      expect(container.querySelector('.target')).toBeTruthy();
    });

    it('falls back to DomWrapper marker when refs are forwarded but not assigned', () => {
      const domRef = React.createRef();
      const Div = () => <div className="target" />;

      const { container } = render(
        <CSSMotion motionName="transition" visible ref={domRef}>
          {() => <Div />}
        </CSSMotion>
      );

      act(() => {
        jest.runAllTimers();
      });

      expect(container.querySelector('span[hidden]')).toBeTruthy();
    });

    it('renders without a marker when refs are forwarded and assigned', () => {
      const domRef = React.createRef();

      const { container } = render(
        <CSSMotion motionName="transition" visible ref={domRef}>
          {(props, ref) => <div ref={ref} {...props} className="target" />}
        </CSSMotion>
      );

      act(() => {
        jest.runAllTimers();
      });

      expect(container.querySelector('span[hidden]')).toBeFalsy();
      expect(domRef.current instanceof HTMLElement).toBeTruthy();
    });
  });
});
