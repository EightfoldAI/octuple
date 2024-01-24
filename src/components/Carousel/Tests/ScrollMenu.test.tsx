import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { ScrollMenu, VisibilityContext } from '../ScrollMenu';
import {
  itemClassName,
  ItemType,
  ScrollMenuProps,
  separatorClassName,
} from '../Carousel.types';
import { autoScrollApiType } from '../autoScrollApi';
import { useIntersectionObserver } from '../Hooks/useIntersectionObserver';
import { act, fireEvent, render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

jest.mock('../Hooks/useIntersectionObserver');

const scrollContainerClassName: string = 'carousel-auto-scroll-container';
const wrapperClassName: string = 'carousel-auto-scroll';
const defaultItems = ['test1', 'test2'];
// eslint-disable-next-line radar/no-duplicate-string
const defaultItemsWithSeparators = ['test1', 'item1-separator', 'test2'];
const scrollContainerClassNames = 'scroll-class';
const getContext = (context: autoScrollApiType) => {
  const { items: _1, scrollContainer: _2, ...rest } = context;
  return rest;
};
function Child({ itemId }: { itemId: string }) {
  const context = React.useContext(VisibilityContext);

  const text = getContext(context);
  return (
    <div data-testid={itemId} key={itemId}>
      {JSON.stringify({ itemId, ...text })}
    </div>
  );
}
const defaultChildren = defaultItems.map((itemId) => (
  <Child key={itemId} itemId={itemId} />
));

const PreviousButton = () => {
  const context = React.useContext(VisibilityContext);
  return (
    <div className="left-arrow" data-testid="left-arrow">
      {JSON.stringify(getContext(context))}
    </div>
  );
};
const NextButton = () => {
  const context = React.useContext(VisibilityContext);
  return (
    <div className="right-arrow" data-testid="right-arrow">
      {JSON.stringify(getContext(context))}
    </div>
  );
};

interface SetupProps extends Omit<ScrollMenuProps, 'children'> {
  rerender?: Function;
  children?: ItemType | ItemType[];
}
const setup = ({
  children = defaultChildren,
  rerender,
  ...props
}: SetupProps = {}) => {
  if (rerender) {
    rerender(<ScrollMenu {...props}>{children}</ScrollMenu>);
    return render(<div />);
  }
  return render(<ScrollMenu {...props}>{children}</ScrollMenu>);
};

const options = {
  ratio: 0.9,
  root: null as any,
  rootMargin: '8px',
  threshold: [0, 0.25, 0.5, 0.75, 1],
  throttle: 100,
};

describe('ScrollMenu', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });
  beforeEach(() => {
    jest.resetAllMocks();
    jest.resetAllMocks();
  });
  afterEach(() => {
    matchMedia.clear();
  });

  test('should render without props', () => {
    (useIntersectionObserver as jest.Mock).mockReturnValue({
      visibleElementsWithSeparators: defaultItemsWithSeparators,
    });
    const { container } = setup();

    expect(container.firstChild).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  describe('', () => {
    test('should pass props to it', () => {
      (useIntersectionObserver as jest.Mock).mockReturnValue({
        visibleElementsWithSeparators: defaultItemsWithSeparators,
      });
      const { container } = setup();

      expect(container.firstChild).toBeTruthy();
      expect(useIntersectionObserver).toHaveBeenCalled();
      const call = (useIntersectionObserver as jest.Mock).mock.calls[0].slice(
        -1
      )[0];
      expect(call).toMatchObject({
        items: expect.any(Object),
        itemsChanged: '',
        options,
        refs: Object.fromEntries(
          defaultItems.map((_, ind: number) => [
            String(ind),
            { current: expect.any(Element) },
          ])
        ),
      });
    });
  });

  describe('onInit', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    // eslint-disable-next-line radar/no-duplicate-string
    test('should fire with publicApi', () => {
      (useIntersectionObserver as jest.Mock).mockReturnValue({
        visibleElementsWithSeparators: defaultItemsWithSeparators,
      });
      const onInit = jest.fn();
      const { container } = setup({ onInit });

      expect(container.firstChild).toBeTruthy();

      expect(onInit).toHaveBeenCalledTimes(1);
      const call = onInit.mock.calls[0][0];
      comparePublicApi(call);
    });

    test.skip('should return initComplete false on first render(when visibleElementsWithSeparators empty)', () => {
      (useIntersectionObserver as jest.Mock)
        .mockReturnValueOnce({
          visibleElementsWithSeparators: [],
        })
        .mockReturnValueOnce({
          visibleElementsWithSeparators: [],
        })
        .mockReturnValueOnce({
          visibleElementsWithSeparators: defaultItemsWithSeparators,
        })
        .mockReturnValueOnce({
          visibleElementsWithSeparators: defaultItemsWithSeparators,
        });
      const onInit = jest.fn();

      const { container, rerender } = setup({ onInit });

      expect(onInit).not.toHaveBeenCalled();
      const textContent1 = container.firstChild!.textContent;
      expect(textContent1!.includes('"initComplete":false')).toBeTruthy();

      setup({ onInit, rerender });

      expect(onInit).toHaveBeenCalledTimes(1);
      const call = onInit.mock.calls[0][0];
      expect(call.initComplete).toEqual(true);
      const textContent2 = container.firstChild!.textContent;
      expect(textContent2!.includes('"initComplete":true')).toBeTruthy();
    });
  });

  describe('apiRef', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    test('should fire with publicApi', () => {
      (useIntersectionObserver as jest.Mock).mockReturnValue({
        visibleElementsWithSeparators: defaultItemsWithSeparators,
      });
      const apiRef = {
        current: {},
      } as React.MutableRefObject<autoScrollApiType>;

      const { container } = setup({ apiRef });

      expect(container.firstChild).toBeTruthy();

      comparePublicApi(apiRef.current);
    });
  });

  describe('onUpdate', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    test('should fire with publicApi', () => {
      (useIntersectionObserver as jest.Mock).mockReturnValue({
        visibleElementsWithSeparators: defaultItemsWithSeparators,
      });
      const onInit = jest.fn();
      const onUpdate = jest.fn();

      const { container } = setup({ onInit, onUpdate });

      expect(container.firstChild).toBeTruthy();

      expect(onInit).toHaveBeenCalledTimes(1);
      expect(onUpdate).toHaveBeenCalledTimes(1);
      const call = onUpdate.mock.calls[0][0];
      comparePublicApi(call);
    });

    test.skip('should not fire if init not complete (when visibleElementsWithSeparators empty)', () => {
      (useIntersectionObserver as jest.Mock)
        .mockReturnValueOnce({
          visibleElementsWithSeparators: [],
        })
        .mockReturnValueOnce({
          visibleElementsWithSeparators: [],
        })
        .mockReturnValueOnce({
          visibleElementsWithSeparators: defaultItemsWithSeparators,
        })
        .mockReturnValueOnce({
          visibleElementsWithSeparators: defaultItemsWithSeparators,
        });
      const onInit = jest.fn();
      const onUpdate = jest.fn();

      const { container, rerender } = setup({ onInit, onUpdate });

      expect(onInit).not.toHaveBeenCalled();
      expect(onUpdate).not.toHaveBeenCalled();
      const textContent1 = container.firstChild!.textContent;
      expect(textContent1!.includes('"initComplete":false')).toBeTruthy();

      setup({ onInit, onUpdate, rerender });

      expect(onInit).toHaveBeenCalledTimes(1);
      expect(onUpdate).toHaveBeenCalledTimes(1);
      const call = onUpdate.mock.calls[0][0];
      comparePublicApi(call);
      expect(call.initComplete).toEqual(true);
      const textContent2 = container.firstChild!.textContent;
      expect(textContent2!.includes('"initComplete":true')).toBeTruthy();
    });
  });

  describe('Children and buttons', () => {
    test('LeftArrow, ScrollContainer, MenuItems, RightArrow', () => {
      (useIntersectionObserver as jest.Mock).mockReturnValue({
        visibleElementsWithSeparators: defaultItemsWithSeparators,
      });

      const { container, getByTestId } = setup({
        previousButton: PreviousButton,
        nextButton: NextButton,
        scrollContainerClassNames,
      });

      const LeftArrow = getByTestId('left-arrow');
      const RightArrow = getByTestId('right-arrow');
      const ScrollContainer = container.getElementsByClassName(
        scrollContainerClassName
      )?.[0];

      const context = {
        initComplete: true,
        isFirstItemVisible: false,
        isLastItemVisible: false,
        visibleElementsWithSeparators: ['test1', 'item1-separator', 'test2'],
        visibleItems: ['test1', 'item1-separator', 'test2'],
        visibleElements: ['test1', 'test2'],
        visibleItemsWithoutSeparators: ['test1', 'test2'],
      };

      expect(ScrollContainer.classList.contains(scrollContainerClassName)).toBe(
        true
      );
      expect(LeftArrow.classList.contains('left-arrow')).toBe(true);
      expect(JSON.parse(LeftArrow.textContent!)).toEqual(context);
      expect(RightArrow.classList.contains('right-arrow')).toBe(true);
      expect(JSON.parse(RightArrow.textContent!)).toEqual(context);

      const MenuItems = ScrollContainer.firstChild!;

      defaultItems.forEach((item) =>
        expect(MenuItems.textContent).toContain(item)
      );

      expect(container).toMatchSnapshot();
    });

    test('Hides LeftArrow, RightArrow', () => {
      (useIntersectionObserver as jest.Mock).mockReturnValue({
        visibleElementsWithSeparators: defaultItemsWithSeparators,
      });

      const { container } = setup({
        previousButton: PreviousButton,
        nextButton: NextButton,
        controls: false,
      });

      expect(container.querySelector('.left-arrow')).toBeFalsy();
      expect(container.querySelector('.right-arrow')).toBeFalsy();

      expect(container).toMatchSnapshot();
    });

    test('overlayControls is false', () => {
      (useIntersectionObserver as jest.Mock).mockReturnValue({
        visibleElementsWithSeparators: defaultItemsWithSeparators,
      });

      const { container } = setup({
        previousButton: PreviousButton,
        nextButton: NextButton,
        overlayControls: false,
      });

      expect(container.querySelector('.carousel-next-mask')).toBeFalsy();
      expect(container.querySelector('.carousel-previous-mask')).toBeFalsy();

      expect(container).toMatchSnapshot();
    });
  });

  describe('Events', () => {
    test.skip('should fire onScroll', () => {
      (useIntersectionObserver as jest.Mock).mockReturnValue({
        visibleElementsWithSeparators: defaultItemsWithSeparators,
      });
      const onScroll = jest.fn();
      const { container } = setup({ onScroll });

      act(() => {
        fireEvent.scroll(container.firstChild as Element);
      });

      expect(onScroll).toHaveBeenCalledTimes(1);
      const call = onScroll.mock.calls[0][0];
      comparePublicApi(call);
    });

    test('should fire onWheel', () => {
      (useIntersectionObserver as jest.Mock).mockReturnValue({
        visibleElementsWithSeparators: defaultItemsWithSeparators,
      });
      const onWheel = jest.fn();
      const { container } = setup({ onWheel });

      act(() => {
        fireEvent.wheel(container.firstChild as Element);
      });

      expect(onWheel).toHaveBeenCalledTimes(1);
      const call = onWheel.mock.calls[0][0];
      comparePublicApi(call);
    });

    test('should fire onMouseDown', () => {
      (useIntersectionObserver as jest.Mock).mockReturnValue({
        visibleElementsWithSeparators: defaultItemsWithSeparators,
      });
      const onMouseDown = jest.fn();
      const { container } = setup({ onMouseDown });

      act(() => {
        fireEvent.mouseDown(container.firstChild as Element);
      });

      expect(onMouseDown).toHaveBeenCalled();
      const call = onMouseDown.mock.calls[0][0];
      comparePublicApi(call);
    });

    test('should fire onMouseUp', () => {
      (useIntersectionObserver as jest.Mock).mockReturnValue({
        visibleElementsWithSeparators: defaultItemsWithSeparators,
      });
      const onMouseUp = jest.fn();
      const { container } = setup({ onMouseUp });

      act(() => {
        fireEvent.mouseUp(container.firstChild as Element);
      });

      expect(onMouseUp).toHaveBeenCalled();
      const call = onMouseUp.mock.calls[0][0];
      comparePublicApi(call);
    });

    test('should fire onMouseMove', () => {
      (useIntersectionObserver as jest.Mock).mockReturnValue({
        visibleElementsWithSeparators: defaultItemsWithSeparators,
      });
      const onMouseMove = jest.fn();
      const { container } = setup({ onMouseMove });

      act(() => {
        fireEvent.mouseMove(container.firstChild as Element);
      });

      expect(onMouseMove).toHaveBeenCalled();
      const call = onMouseMove.mock.calls[0][0];
      comparePublicApi(call);
    });

    describe('classNames', () => {
      test('should pass classNames', () => {
        (useIntersectionObserver as jest.Mock).mockReturnValue({
          visibleElementsWithSeparators: defaultItemsWithSeparators,
        });

        const itemClassNames = 'item-class';
        const separatorClassNames = 'sep-class';
        const scrollWrapperClassNames = 'wrapper-class';

        const { container } = setup({
          itemClassNames,
          separatorClassNames,
          scrollContainerClassNames,
          scrollWrapperClassNames,
        });

        const Wrapper = container.getElementsByClassName(wrapperClassName)?.[0];

        const ScrollContainer = container.getElementsByClassName(
          scrollContainerClassName
        )?.[0];

        expect(Wrapper.getAttribute('class')).toEqual(
          `${wrapperClassName} ${scrollWrapperClassNames}`
        );

        expect(ScrollContainer.getAttribute('class')).toEqual(
          `${scrollContainerClassName} ${scrollContainerClassNames}`
        );

        const item = ScrollContainer.firstChild as HTMLElement;
        expect(item.getAttribute('class')).toEqual(
          `${itemClassName} ${itemClassNames}`
        );

        const separator = ScrollContainer.childNodes[1] as HTMLElement;
        expect(separator.getAttribute('class')).toEqual(
          `${separatorClassName} ${separatorClassNames}`
        );
      });
    });
  });

  describe('rtl', () => {
    test('should add rtl class', () => {
      (useIntersectionObserver as jest.Mock).mockReturnValue({
        visibleElementsWithSeparators: defaultItemsWithSeparators,
      });

      const itemClassNames = 'item-class';
      const separatorClassNames = 'sep-class';
      const scrollWrapperClassNames = 'wrapper-class';

      const { container } = setup({
        itemClassNames,
        separatorClassNames,
        scrollContainerClassNames,
        scrollWrapperClassNames,
        rtl: true,
      });

      const Wrapper = container.getElementsByClassName(wrapperClassName)?.[0];

      const ScrollContainer = container.getElementsByClassName(
        scrollContainerClassName
      )?.[0];

      expect(Wrapper.getAttribute('class')).toEqual(
        `${wrapperClassName} ${scrollWrapperClassNames}`
      );

      expect(ScrollContainer.getAttribute('class')).toEqual(
        `${scrollContainerClassName} carousel-auto-scroll-container-rtl ${scrollContainerClassNames}`
      );
    });
  });
});

function comparePublicApi(call: autoScrollApiType) {
  const {
    getItemById,
    getItemByIndex,
    getNextElement,
    getNextElementGroup,
    getNextItem,
    getNextItemGroup,
    getPrevElement,
    getPrevElementGroup,
    getPrevItem,
    getPrevItemGroup,
    isItemVisible,
    isLastItem,
    scrollNext,
    scrollNextGroup,
    scrollPrev,
    scrollPrevGroup,
    scrollToItem,
    scrollBySingleItem,
    visibleElementsWithSeparators,
    visibleElements,
    initComplete,
    isFirstItemVisible,
    isLastItemVisible,
    items,
    scrollContainer,
  } = call;

  expect(getItemById).toEqual(expect.any(Function));
  expect(getItemByIndex).toEqual(expect.any(Function));
  expect(getNextElement).toEqual(expect.any(Function));
  expect(getNextElementGroup).toEqual(expect.any(Function));
  expect(getNextItem).toEqual(expect.any(Function));
  expect(getNextItemGroup).toEqual(expect.any(Function));
  expect(getPrevElement).toEqual(expect.any(Function));
  expect(getPrevElementGroup).toEqual(expect.any(Function));
  expect(getPrevItem).toEqual(expect.any(Function));
  expect(getPrevItemGroup).toEqual(expect.any(Function));
  expect(isItemVisible).toEqual(expect.any(Function));
  expect(isLastItem).toEqual(expect.any(Function));
  expect(scrollBySingleItem).toEqual(expect.any(Function));
  expect(scrollNext).toEqual(expect.any(Function));
  expect(scrollNextGroup).toEqual(expect.any(Function));
  expect(scrollPrevGroup).toEqual(expect.any(Function));
  expect(scrollPrev).toEqual(expect.any(Function));
  expect(scrollToItem).toEqual(expect.any(Function));
  expect(visibleElementsWithSeparators).toEqual(defaultItemsWithSeparators);
  expect(visibleElements).toEqual(defaultItems);
  expect(initComplete).toEqual(expect.any(Boolean));
  expect(isFirstItemVisible).toEqual(expect.any(Boolean));
  expect(isLastItemVisible).toEqual(expect.any(Boolean));
  expect(items).toEqual(expect.any(Object));
  expect(scrollContainer).toEqual({ current: expect.any(Element) });
}
