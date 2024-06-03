import React from 'react';
import { mergeClasses } from '../../../shared/utilities';
import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '@testing-library/react';
import { genCSSMotionList } from '../CSSMotionList';
import type { CSSMotionListProps } from '../CSSMotion.types';
import { genCSSMotion } from '../CSSMotion';

describe('CSSMotionList', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('diff should work', () => {
    function testMotion(
      CSSMotionList: React.ComponentType<CSSMotionListProps>,
      injectLeave?: (wrapper: HTMLElement) => void
    ) {
      let leaveCalled = 0;
      function onLeaveEnd() {
        leaveCalled += 1;
      }

      const Demo = ({ keys }: { keys: string[] }) => (
        <CSSMotionList
          motionName="transition"
          keys={keys}
          onLeaveEnd={onLeaveEnd}
        >
          {({ key, style, classNames }) => (
            <div
              key={key}
              style={style}
              className={mergeClasses(['motion-box', classNames])}
            >
              {key}
            </div>
          )}
        </CSSMotionList>
      );

      const { container, rerender } = render(<Demo keys={['a', 'b']} />);

      function checkKeys(targetKeys: React.Key[]) {
        const nodeList = Array.from(
          container.querySelectorAll<HTMLDivElement>('.motion-box')
        );
        const keys = nodeList.map((node) => node.textContent);
        expect(keys).toEqual(targetKeys);
      }

      checkKeys(['a', 'b']);

      // Change to ['c', 'd']
      act(() => {
        jest.runAllTimers();
      });

      rerender(<Demo keys={['c', 'd']} />);
      act(() => {
        jest.runAllTimers();
      });

      // Inject leave event
      if (injectLeave) {
        act(() => {
          injectLeave(container);
        });
      }

      act(() => {
        jest.runAllTimers();
      });
      checkKeys(['c', 'd']);

      if (injectLeave) {
        expect(leaveCalled).toEqual(2);
      }
    }

    it('motion', () => {
      const CSSMotion = genCSSMotion();
      const CSSMotionList = genCSSMotionList(CSSMotion);
      testMotion(CSSMotionList, (container) => {
        const nodeList = Array.from(container.querySelectorAll('.motion-box'));
        nodeList.slice(0, 2).forEach((node) => {
          fireEvent.transitionEnd(node);
        });
      });
    });
  });

  it('onVisibleChanged true', () => {
    const onVisibleChanged = jest.fn();
    const onAllRemoved = jest.fn();
    const CSSMotionList = genCSSMotionList();

    const Demo = ({ keys, visible }: { keys: string[]; visible: boolean }) => (
      <CSSMotionList
        motionName="transition"
        keys={keys}
        onVisibleChanged={onVisibleChanged(visible, { key: keys[0] })}
        onAllRemoved={onAllRemoved}
      >
        {({ key, style, classNames }) => (
          <div
            key={key}
            style={style}
            className={mergeClasses(['motion-box', classNames])}
          >
            {key}
          </div>
        )}
      </CSSMotionList>
    );

    render(<Demo keys={['a']} visible={true} />);

    act(() => {
      jest.runAllTimers();
    });

    expect(onVisibleChanged).toHaveBeenCalledWith(true, { key: 'a' });
  });

  it('onVisibleChanged false', () => {
    const onVisibleChanged = jest.fn();
    const onAllRemoved = jest.fn();
    const CSSMotionList = genCSSMotionList();

    const Demo = ({ keys, visible }: { keys: string[]; visible: boolean }) => (
      <CSSMotionList
        motionName="transition"
        keys={keys}
        onVisibleChanged={onVisibleChanged(visible, { key: keys[0] })}
        onAllRemoved={onAllRemoved}
      >
        {({ key, style, classNames }) => (
          <div
            key={key}
            style={style}
            className={mergeClasses(['motion-box', classNames])}
          >
            {key}
          </div>
        )}
      </CSSMotionList>
    );

    render(<Demo keys={['a']} visible={false} />);

    act(() => {
      jest.runAllTimers();
    });

    expect(onVisibleChanged).toHaveBeenCalledWith(false, { key: 'a' });
  });
});
