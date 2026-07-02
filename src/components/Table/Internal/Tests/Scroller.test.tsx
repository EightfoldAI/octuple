import React from 'react';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Scroller } from '../Body/Scroller';
import { Button } from '../../../Button';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Table.Scroller arrow navigation', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  // Three unfixed 128px columns => the Scroller builds stop-points
  // scrollOffsets = [0, 128, 256, 384].
  const columns: any = [
    { title: 'C1', dataIndex: 'c1', key: 'c1', width: 128 },
    { title: 'C2', dataIndex: 'c2', key: 'c2', width: 128 },
    { title: 'C3', dataIndex: 'c3', key: 'c3', width: 128 },
  ];

  const makeScrollBody = (scrollLeft: number): any => ({
    scrollLeft,
    clientWidth: 100,
    scrollWidth: 384,
    scrollTo: jest.fn(),
    getBoundingClientRect: () => ({ top: 0, height: 0 }),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });

  const createScroller = (
    scrollBody: any,
    direction: string = 'ltr'
  ): ReactWrapper => {
    const scrollBodyRef = { current: scrollBody };
    const stickyOffsets: any = { left: [0, 0, 0, 0], right: [0, 0, 0, 0] };
    const titleRef: any = { current: null };
    return mount(
      <Scroller
        columns={columns}
        flattenColumns={columns}
        scrollBodyRef={scrollBodyRef}
        stickyOffsets={stickyOffsets}
        direction={direction}
        titleRef={titleRef}
        scrollLeftAriaLabelText="Scroll left"
        scrollRightAriaLabelText="Scroll right"
      />
    );
  };

  const clickArrow = (wrapper: ReactWrapper, ariaLabel: string): void => {
    const onClick = wrapper
      .find(Button)
      .filterWhere((node) => node.prop('ariaLabel') === ariaLabel)
      .first()
      .prop('onClick') as () => void;
    onClick();
  };

  it('right arrow advances to the next column from the start', () => {
    const scrollBody = makeScrollBody(0);
    const wrapper = createScroller(scrollBody);

    clickArrow(wrapper, 'Scroll right');

    expect(scrollBody.scrollTo).toHaveBeenCalledWith({
      left: 128,
      behavior: 'smooth',
    });
  });

  it('right arrow advances past a fractionally-snapped scroll position (IMPL-203300)', () => {
    // At <100% browser zoom the browser snaps a declared 128px column to a
    // slightly smaller rendered value (measured ~127.78px), so the body settles
    // at 127.78 after a click that targeted 128. Without the 1px tolerance,
    // find(offset > 127.78) returns 128 again -> scrolling snaps right back and
    // the arrow is stuck at the first column. With the tolerance it must skip
    // to the next stop-point (256).
    const scrollBody = makeScrollBody(127.78);
    const wrapper = createScroller(scrollBody);

    clickArrow(wrapper, 'Scroll right');

    expect(scrollBody.scrollTo).toHaveBeenCalledWith({
      left: 256,
      behavior: 'smooth',
    });
  });

  it('left arrow returns to the previous column from a fractionally-snapped position', () => {
    const scrollBody = makeScrollBody(256.22);
    const wrapper = createScroller(scrollBody);

    clickArrow(wrapper, 'Scroll left');

    expect(scrollBody.scrollTo).toHaveBeenCalledWith({
      left: 128,
      behavior: 'smooth',
    });
  });

  it('applies the same tolerance in RTL (negative stop-points)', () => {
    // In RTL the stop-points are negated: [0, -128, -256, -384]. The right
    // arrow moves toward 0, the left arrow toward -384.
    const scrollBody = makeScrollBody(-127.78);
    const wrapper = createScroller(scrollBody, 'rtl');

    // RTL "left" arrow => scroll further negative, must skip -128 (already
    // snapped) and reach -256.
    clickArrow(wrapper, 'Scroll left');

    expect(scrollBody.scrollTo).toHaveBeenCalledWith({
      left: -256,
      behavior: 'smooth',
    });
  });
});
