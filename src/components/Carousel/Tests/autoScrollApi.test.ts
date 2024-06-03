import { autoScrollApi } from '../autoScrollApi';
import ItemsMap from '../ItemsMap';
import {
  getItemElementById,
  getItemElementByIndex,
  observerEntriesToItems,
} from '../Utilities';
import * as utilities from '../Utilities';
import { observerOptions } from '../Settings';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';

jest.mock('smooth-scroll-into-view-if-needed');

jest.mock('../Utilities', () => {
  return {
    __esModule: true,
    ...jest.requireActual('../Utilities'),
  };
});

const setup = (ratio = [0.3, 1, 0.7]) => {
  const items = new ItemsMap();

  const scrollIntoView = jest.fn();
  const newItems = [
    {
      intersectionRatio: 0,
      target: { dataset: { index: '0', key: 'test1' } },
    },
    {
      intersectionRatio: 0,
      target: { dataset: { index: '0.1', key: 'test1-separator' } },
    },
    {
      intersectionRatio: 0,
      target: { dataset: { index: '1', key: 2 } },
    },
  ].map((el, ind) => ({
    ...el,
    intersectionRatio: ratio[ind],
    target: { ...el.target, scrollIntoView },
  }));

  const nodes = observerEntriesToItems(
    newItems as unknown as IntersectionObserverEntry[],
    { ...observerOptions, ratio: 0.5 }
  );
  items.set(nodes);
  const visibleElementsWithSeparators = items
    .getVisible()
    .map((el) => el[1].key);

  return {
    items,
    nodes: nodes.map((el) => el[1]),
    visibleElementsWithSeparators,
  };
};

describe('autoScrollApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('visibleElementsWithSeparators', () => {
    const { items, visibleElementsWithSeparators } = setup([0.3, 1, 0.7]);

    expect(
      autoScrollApi(items, visibleElementsWithSeparators).visibleItems
    ).toEqual(visibleElementsWithSeparators);
  });

  test('visibleElements', () => {
    const { items, visibleElementsWithSeparators } = setup([0.3, 1, 0.7]);
    const expected = items
      .toArr()
      .filter((el) => el[1].visible)
      .filter((el) => !/separator/.test(String(el)))
      .map((el) => el[1].key);

    expect(
      autoScrollApi(items, visibleElementsWithSeparators).visibleElements
    ).toEqual(expected);
    expect(
      autoScrollApi(items, visibleElementsWithSeparators)
        .visibleItemsWithoutSeparators
    ).toEqual(expected);

    expect(autoScrollApi(items, []).visibleElements).toEqual([]);
    expect(autoScrollApi(items, []).visibleItemsWithoutSeparators).toEqual([]);
  });

  describe('helpers', () => {
    describe('scrollToItem', () => {
      test('should call scrollIntoView', () => {
        const { items, visibleElementsWithSeparators } = setup([0.7, 0, 0]);

        const boundary = { current: document.createElement('div') };
        autoScrollApi(
          items,
          visibleElementsWithSeparators,
          boundary
        ).scrollToItem(document.createElement('div'));
        expect(scrollIntoView).toHaveBeenCalledTimes(1);
        expect(scrollIntoView).toHaveBeenNthCalledWith(1, boundary.current, {
          behavior: 'smooth',
          inline: 'end',
          block: 'nearest',
          boundary: boundary.current,
          ease: undefined,
          duration: undefined,
        });
      });

      test('with transitionOptions', () => {
        const { items, visibleElementsWithSeparators } = setup([0.7, 0, 0]);

        const boundary = { current: document.createElement('div') };
        const transitionOptions = {
          duration: 500,
          ease: (t: number) => t,
          behavior: () => false,
        };

        autoScrollApi(
          items,
          visibleElementsWithSeparators,
          boundary,
          transitionOptions
        ).scrollToItem(document.createElement('div'));

        expect(scrollIntoView).toHaveBeenCalledTimes(1);
        expect(scrollIntoView).toHaveBeenNthCalledWith(1, boundary.current, {
          behavior: transitionOptions.behavior,
          inline: 'end',
          block: 'nearest',
          boundary: boundary.current,
          ease: transitionOptions.ease,
          duration: transitionOptions.duration,
        });
      });

      test('arguments should have priority over transitionOptions', () => {
        const { items, visibleElementsWithSeparators } = setup([0.7, 0, 0]);

        const boundary = { current: document.createElement('div') };
        const transitionOptions = {
          duration: 500,
          ease: (t: number) => t,
          behavior: () => false,
        };

        autoScrollApi(
          items,
          visibleElementsWithSeparators,
          boundary,
          transitionOptions
        ).scrollToItem(
          document.createElement('div'),
          'auto',
          'center',
          'center'
        );

        expect(scrollIntoView).toHaveBeenCalledTimes(1);
        expect(scrollIntoView).toHaveBeenNthCalledWith(1, boundary.current, {
          behavior: 'auto',
          inline: 'center',
          block: 'center',
          boundary: boundary.current,
          ease: transitionOptions.ease,
          duration: transitionOptions.duration,
        });
      });
    });

    describe('scrollBySingleItem', () => {
      test('should call scrollBy', () => {
        const scrollBySingleItemSpy = jest.spyOn(
          utilities,
          'scrollBySingleItem'
        );
        const { items, visibleElementsWithSeparators } = setup([0.7, 0, 0]);
        const boundary = { current: document.createElement('div') };
        autoScrollApi(
          items,
          visibleElementsWithSeparators,
          boundary
        ).scrollBySingleItem(
          document.createElement('div'),
          'smooth',
          'next',
          8
        );
        expect(scrollBySingleItemSpy).toHaveBeenCalledTimes(1);
      });
    });

    test('getItemElementById', () => {
      const { items, visibleElementsWithSeparators } = setup([0.7, 0, 0]);

      expect(
        autoScrollApi(items, visibleElementsWithSeparators).getItemElementById
      ).toEqual(getItemElementById);
    });

    test('getItemElementByIndex', () => {
      const { items, visibleElementsWithSeparators } = setup([0.7, 0, 0]);

      expect(
        autoScrollApi(items, visibleElementsWithSeparators)
          .getItemElementByIndex
      ).toEqual(getItemElementByIndex);
    });
  });

  describe('isFirstItemVisible', () => {
    test('first item visible', () => {
      const { items, visibleElementsWithSeparators } = setup([0.7, 0, 0]);

      expect(
        autoScrollApi(items, visibleElementsWithSeparators).isFirstItemVisible
      ).toEqual(true);
    });

    test('first item not visible', () => {
      const { items, visibleElementsWithSeparators } = setup([0.3, 1, 1]);

      expect(
        autoScrollApi(items, visibleElementsWithSeparators).isFirstItemVisible
      ).toEqual(false);
    });

    test('empty items', () => {
      const items = new ItemsMap();

      expect(autoScrollApi(items).isFirstItemVisible).toEqual(false);
    });
  });

  describe('isLastItemVisible', () => {
    test('last item visible', () => {
      const { items, visibleElementsWithSeparators } = setup([0.3, 0.9, 0.9]);

      expect(
        autoScrollApi(items, visibleElementsWithSeparators).isLastItemVisible
      ).toEqual(true);
    });

    test('last item not visible', () => {
      const { items, visibleElementsWithSeparators } = setup([1, 1, 0.3]);

      expect(
        autoScrollApi(items, visibleElementsWithSeparators).isLastItemVisible
      ).toEqual(false);
    });

    test('empty items', () => {
      const items = new ItemsMap();

      expect(autoScrollApi(items).isLastItemVisible).toEqual(false);
    });
  });

  describe('getItemById', () => {
    test('item exist', () => {
      const { items, nodes } = setup([0.1, 1, 0.9]);

      expect(autoScrollApi(items).getItemById('test1')).toEqual(nodes[0]);

      expect(autoScrollApi(items).getItemById('2')).toEqual(nodes[2]);
      expect(autoScrollApi(items).getItemById(2 as unknown as string)).toEqual(
        nodes[2]
      );
    });

    // eslint-disable-next-line radar/no-duplicate-string
    test('item not exist', () => {
      const { items } = setup([0.1, 1, 0.9]);

      expect(autoScrollApi(items).getItemById('test123')).toEqual(undefined);
      expect(autoScrollApi(items).getItemById('')).toEqual(undefined);
    });
  });

  describe('getItemByIndex', () => {
    test('item exist', () => {
      const { items, nodes, visibleElementsWithSeparators } = setup([
        0.1, 1, 0.9,
      ]);

      expect(
        autoScrollApi(items, visibleElementsWithSeparators).getItemByIndex(0)
      ).toEqual(nodes[0]);

      expect(
        autoScrollApi(items, visibleElementsWithSeparators).getItemByIndex(0)
      ).toEqual(nodes[0]);
    });

    test('item not exist', () => {
      const { items } = setup([0.1, 1, 0.9]);

      expect(autoScrollApi(items).getItemByIndex(5.1)).toEqual(undefined);
    });
  });

  describe('isItemVisible', () => {
    test('should return visibility', () => {
      const { items, visibleElementsWithSeparators } = setup([0.1, 1, 0.9]);
      expect(
        autoScrollApi(items, visibleElementsWithSeparators).isItemVisible(
          'test1'
        )
      ).toBeFalsy();
      expect(
        autoScrollApi(items, visibleElementsWithSeparators).isItemVisible('2')
      ).toBeTruthy();
      expect(
        autoScrollApi(items, visibleElementsWithSeparators).isItemVisible(
          2 as unknown as string
        )
      ).toBeTruthy();
    });

    test('item not exist', () => {
      const { items, visibleElementsWithSeparators } = setup([0.1, 1, 0.9]);
      expect(
        autoScrollApi(items, visibleElementsWithSeparators).isItemVisible(
          'test3'
        )
      ).toBeFalsy();
      expect(
        autoScrollApi(items, visibleElementsWithSeparators).isItemVisible('')
      ).toBeFalsy();
    });
  });

  describe('getPrevItem', () => {
    test('have previous item', () => {
      const { items, nodes, visibleElementsWithSeparators } = setup([
        0.1, 1, 0.9,
      ]);

      expect(
        autoScrollApi(items, visibleElementsWithSeparators).getPrevItem()
      ).toEqual(nodes[0]);
    });

    test('does not have previous item', () => {
      const { items, visibleElementsWithSeparators } = setup([1, 0.1, 0.3]);

      expect(
        autoScrollApi(items, visibleElementsWithSeparators).getPrevItem()
      ).toEqual(undefined);
    });
  });

  describe('getPrevItemGroup', () => {
    test('have previous item group', () => {
      const { items, nodes, visibleElementsWithSeparators } = setup([
        0.1, 1, 0.9,
      ]);

      expect(
        autoScrollApi(items, visibleElementsWithSeparators).getPrevItemGroup()
      ).toEqual(nodes[0.1]);
    });

    test('does not have previous item group', () => {
      const { items, visibleElementsWithSeparators } = setup([0, 0.1, 1]);

      expect(
        autoScrollApi(items, visibleElementsWithSeparators).getPrevItemGroup()
      ).toEqual(undefined);
    });
  });

  describe('getPrevElement', () => {
    test('have previous element', () => {
      const { items, nodes, visibleElementsWithSeparators } = setup([
        0.1, 1, 0.9,
      ]);

      expect(
        autoScrollApi(items, visibleElementsWithSeparators).getPrevElement()
      ).toEqual(nodes[0]);
    });

    test('does not have previous element', () => {
      const { items, visibleElementsWithSeparators } = setup([1, 0.1, 0.3]);

      expect(
        autoScrollApi(items, visibleElementsWithSeparators).getPrevElement()
      ).toEqual(undefined);
    });
  });

  describe('getPrevElementGroup', () => {
    test('have previous element group', () => {
      const { items, nodes, visibleElementsWithSeparators } = setup([
        0.1, 1, 0.9,
      ]);

      expect(
        autoScrollApi(
          items,
          visibleElementsWithSeparators
        ).getPrevElementGroup()
      ).toEqual(nodes[0.1]);
    });

    test('does not have previous element group', () => {
      const { items, visibleElementsWithSeparators } = setup([1, 0.1, 0.3]);

      expect(
        autoScrollApi(
          items,
          visibleElementsWithSeparators
        ).getPrevElementGroup()
      ).toEqual(undefined);
    });
  });

  describe('getNextItem', () => {
    test('have next item', () => {
      const { items, nodes, visibleElementsWithSeparators } = setup([
        1, 1, 0.3,
      ]);
      expect(
        autoScrollApi(items, visibleElementsWithSeparators).getNextItem()
      ).toEqual(nodes[2]);
    });

    test('does not have next item', () => {
      const { items, visibleElementsWithSeparators } = setup([0, 0.1, 0.9]);

      expect(
        autoScrollApi(items, visibleElementsWithSeparators).getNextItem()
      ).toEqual(undefined);
    });
  });

  describe('getNextItemGroup', () => {
    test('have next item group', () => {
      const { items, nodes, visibleElementsWithSeparators } = setup([
        1, 1, 1.1,
      ]);
      expect(
        autoScrollApi(items, visibleElementsWithSeparators).getNextItemGroup()
      ).toEqual(nodes[1]);
    });

    test('does not have next item group', () => {
      const { items, visibleElementsWithSeparators } = setup([0, 0.1]);

      expect(
        autoScrollApi(items, visibleElementsWithSeparators).getNextItemGroup()
      ).toEqual(undefined);
    });
  });

  describe('getNextElement', () => {
    test('have next element', () => {
      const { items, nodes, visibleElementsWithSeparators } = setup([
        1, 1, 0.1,
      ]);
      expect(
        autoScrollApi(items, visibleElementsWithSeparators).getNextElement()
      ).toEqual(nodes[2]);
    });

    test('does not have next element', () => {
      const { items, visibleElementsWithSeparators } = setup([0, 0.1, 0.9]);

      expect(
        autoScrollApi(items, visibleElementsWithSeparators).getNextElement()
      ).toEqual(undefined);
    });
  });

  describe('getNextElementGroup', () => {
    test('have next element group', () => {
      const { items, nodes, visibleElementsWithSeparators } = setup([
        0, 0.1, 1, 1.1, 2,
      ]);
      expect(
        autoScrollApi(
          items,
          visibleElementsWithSeparators
        ).getNextElementGroup()
      ).toEqual(nodes[0]);
    });

    test('does not have next element group', () => {
      const { items, visibleElementsWithSeparators } = setup([0, 0.1]);

      expect(
        autoScrollApi(
          items,
          visibleElementsWithSeparators
        ).getNextElementGroup()
      ).toEqual(undefined);
    });
  });

  describe('isLastItem', () => {
    test('item is last', () => {
      const { items, visibleElementsWithSeparators } = setup([0.1, 1, 0.9]);
      expect(
        autoScrollApi(items, visibleElementsWithSeparators).isLastItem('2')
      ).toEqual(true);
      expect(
        autoScrollApi(items, visibleElementsWithSeparators).isLastItem(
          2 as unknown as string
        )
      ).toEqual(true);
    });

    test('do not have previous item', () => {
      const { items, visibleElementsWithSeparators } = setup([1, 0.1, 0.3]);

      expect(
        autoScrollApi(items, visibleElementsWithSeparators).isLastItem('test1')
      ).toEqual(false);
    });
  });

  describe('scrollPrev', () => {
    test('have previous item', () => {
      const { items, nodes, visibleElementsWithSeparators } = setup([0, 1, 1]);

      const boundary = { current: document.createElement('li') };
      autoScrollApi(
        items,
        visibleElementsWithSeparators,
        boundary
      ).scrollPrev();

      expect(scrollIntoView).toHaveBeenCalledTimes(1);
      expect(scrollIntoView).toHaveBeenNthCalledWith(1, nodes[0].entry.target, {
        behavior: 'smooth',
        block: 'nearest',
        inline: 'end',
        duration: undefined,
        ease: undefined,
        boundary: boundary.current,
      });
    });

    describe('scrollPrevGroup', () => {
      test('have previous group', () => {
        const { items, nodes, visibleElementsWithSeparators } = setup([
          1, 2, 3,
        ]);

        const boundary = { current: document.createElement('li') };
        autoScrollApi(
          items,
          visibleElementsWithSeparators,
          boundary
        ).scrollPrevGroup();

        expect(scrollIntoView).toHaveBeenCalledTimes(1);
        expect(scrollIntoView).toHaveBeenNthCalledWith(
          1,
          nodes[2].entry.target,
          {
            behavior: 'smooth',
            block: 'nearest',
            inline: 'end',
            duration: undefined,
            ease: undefined,
            boundary: boundary.current,
          }
        );
      });
    });

    test('no prev item', () => {
      const { items, visibleElementsWithSeparators } = setup([1, 1, 1]);

      autoScrollApi(items, visibleElementsWithSeparators).scrollPrev();

      expect(scrollIntoView).not.toHaveBeenCalled();
    });

    test('should pass rtl to scrollToItem', () => {
      const { items, visibleElementsWithSeparators } = setup([0, 1, 1]);
      const scrollToItemSpy = jest.spyOn(utilities, 'scrollToItem');

      const rtl = true;
      const api = autoScrollApi(
        items,
        visibleElementsWithSeparators,
        undefined,
        undefined,
        rtl
      );
      api.scrollPrev();
      expect(scrollToItemSpy).toHaveBeenCalled();
      const RTLProp = scrollToItemSpy.mock.calls[0][5];
      expect(RTLProp).toEqual(rtl);
    });

    test('should pass noPolyfill to scrollToItem', () => {
      const { items, visibleElementsWithSeparators } = setup([0, 1, 1]);
      const scrollToItemSpy = jest.spyOn(utilities, 'scrollToItem');

      const noPolyfill = true;
      const api = autoScrollApi(
        items,
        visibleElementsWithSeparators,
        undefined,
        undefined,
        undefined,
        noPolyfill
      );
      api.scrollPrev();
      expect(scrollToItemSpy).toHaveBeenCalled();
      const noPolyfillrop = scrollToItemSpy.mock.calls[0][5];
      expect(noPolyfillrop).toEqual(noPolyfill);
    });

    test('group with transition options', () => {
      const { items, nodes, visibleElementsWithSeparators } = setup([1, 2, 3]);

      const boundary = { current: document.createElement('div') };
      const transitionOptions = {
        duration: 400,
        ease: (t: number) => t,
        behavior: () => false,
      };
      autoScrollApi(
        items,
        visibleElementsWithSeparators,
        boundary,
        transitionOptions
      ).scrollPrevGroup();

      expect(scrollIntoView).toHaveBeenCalledTimes(1);
      expect(scrollIntoView).toHaveBeenNthCalledWith(1, nodes[2].entry.target, {
        behavior: transitionOptions.behavior,
        block: 'nearest',
        inline: 'end',
        duration: transitionOptions.duration,
        ease: transitionOptions.ease,
        boundary: boundary.current,
      });
    });

    test('default with transition options', () => {
      const { items, nodes, visibleElementsWithSeparators } = setup([0, 1, 1]);

      const boundary = { current: document.createElement('div') };
      const transitionOptions = {
        duration: 400,
        ease: (t: number) => t,
        behavior: () => false,
      };
      autoScrollApi(
        items,
        visibleElementsWithSeparators,
        boundary,
        transitionOptions
      ).scrollPrev();

      expect(scrollIntoView).toHaveBeenCalledTimes(1);
      expect(scrollIntoView).toHaveBeenNthCalledWith(1, nodes[0].entry.target, {
        behavior: transitionOptions.behavior,
        block: 'nearest',
        inline: 'end',
        duration: transitionOptions.duration,
        ease: transitionOptions.ease,
        boundary: boundary.current,
      });
    });

    test('group arguments should have priority over transitionOptions', () => {
      const { items, nodes, visibleElementsWithSeparators } = setup([1, 2, 3]);

      const boundary = { current: document.createElement('div') };
      const transitionOptions = {
        duration: 500,
        ease: (t: number) => t,
        behavior: () => false,
      };
      autoScrollApi(
        items,
        visibleElementsWithSeparators,
        boundary,
        transitionOptions
      ).scrollPrevGroup('auto', 'center', 'center');

      expect(scrollIntoView).toHaveBeenCalledTimes(1);
      expect(scrollIntoView).toHaveBeenNthCalledWith(1, nodes[2].entry.target, {
        behavior: 'auto',
        block: 'center',
        inline: 'center',
        duration: transitionOptions.duration,
        ease: transitionOptions.ease,
        boundary: boundary.current,
      });
    });
  });

  test('default arguments should have priority over transitionOptions', () => {
    const { items, nodes, visibleElementsWithSeparators } = setup([0, 1, 1]);

    const boundary = { current: document.createElement('div') };
    const transitionOptions = {
      duration: 500,
      ease: (t: number) => t,
      behavior: () => false,
    };
    autoScrollApi(
      items,
      visibleElementsWithSeparators,
      boundary,
      transitionOptions
    ).scrollPrev('auto', 'center', 'center');

    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    expect(scrollIntoView).toHaveBeenNthCalledWith(1, nodes[0].entry.target, {
      behavior: 'auto',
      block: 'center',
      inline: 'center',
      duration: transitionOptions.duration,
      ease: transitionOptions.ease,
      boundary: boundary.current,
    });
  });

  describe('scrollNext', () => {
    test('have next item', () => {
      const { items, nodes, visibleElementsWithSeparators } = setup([1, 1, 0]);

      const boundary = { current: document.createElement('li') };
      autoScrollApi(
        items,
        visibleElementsWithSeparators,
        boundary
      ).scrollNext();

      expect(scrollIntoView).toHaveBeenCalledTimes(1);
      expect(scrollIntoView).toHaveBeenNthCalledWith(1, nodes[2].entry.target, {
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
        duration: undefined,
        ease: undefined,
        boundary: boundary.current,
      });
    });

    describe('scrollNextGroup', () => {
      test('have next group', () => {
        const { items, nodes, visibleElementsWithSeparators } = setup([
          1, 2, 3, 4,
        ]);

        const boundary = { current: document.createElement('li') };
        autoScrollApi(
          items,
          visibleElementsWithSeparators,
          boundary
        ).scrollNextGroup();

        expect(scrollIntoView).toHaveBeenCalledTimes(1);
        expect(scrollIntoView).toHaveBeenNthCalledWith(
          1,
          nodes[1].entry.target,
          {
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start',
            duration: undefined,
            ease: undefined,
            boundary: boundary.current,
          }
        );
      });
    });

    test('no next item', () => {
      const { items, visibleElementsWithSeparators } = setup([0, 0.1]);

      autoScrollApi(items, visibleElementsWithSeparators).scrollNext();

      expect(scrollIntoView).not.toHaveBeenCalled();
    });

    test('should pass RTL to scrollToItem', () => {
      const { items, visibleElementsWithSeparators } = setup([0, 1, 1]);
      const scrollToItemSpy = jest.spyOn(utilities, 'scrollToItem');

      const rtl = true;
      const api = autoScrollApi(
        items,
        visibleElementsWithSeparators,
        undefined,
        undefined,
        rtl
      );
      api.scrollNext();
      expect(scrollToItemSpy).toHaveBeenCalled();
      const RTLProp = scrollToItemSpy.mock.calls[0][5];
      expect(RTLProp).toEqual(rtl);
    });

    test('should pass noPolyfill to scrollToItem', () => {
      const { items, visibleElementsWithSeparators } = setup([0, 1, 1]);
      const scrollToItemSpy = jest.spyOn(utilities, 'scrollToItem');

      const noPolyfill = true;
      const api = autoScrollApi(
        items,
        visibleElementsWithSeparators,
        undefined,
        undefined,
        undefined,
        noPolyfill
      );
      api.scrollNext();
      expect(scrollToItemSpy).toHaveBeenCalled();
      const noPolyfillrop = scrollToItemSpy.mock.calls[0][5];
      expect(noPolyfillrop).toEqual(noPolyfill);
    });

    test('group with transition options', () => {
      const { items, nodes, visibleElementsWithSeparators } = setup([1, 1, 0]);

      const boundary = { current: document.createElement('li') };
      const transitionOptions = {
        duration: 400,
        ease: (t: number) => t,
        behavior: () => false,
      };
      autoScrollApi(
        items,
        visibleElementsWithSeparators,
        boundary,
        transitionOptions
      ).scrollNextGroup();

      expect(scrollIntoView).toHaveBeenCalledTimes(1);
      expect(scrollIntoView).toHaveBeenNthCalledWith(1, nodes[0].entry.target, {
        behavior: transitionOptions.behavior,
        block: 'nearest',
        inline: 'start',
        duration: transitionOptions.duration,
        ease: transitionOptions.ease,
        boundary: boundary.current,
      });
    });

    test('default with transition options', () => {
      const { items, nodes, visibleElementsWithSeparators } = setup([1, 1, 0]);

      const boundary = { current: document.createElement('li') };
      const transitionOptions = {
        duration: 400,
        ease: (t: number) => t,
        behavior: () => false,
      };
      autoScrollApi(
        items,
        visibleElementsWithSeparators,
        boundary,
        transitionOptions
      ).scrollNext();

      expect(scrollIntoView).toHaveBeenCalledTimes(1);
      expect(scrollIntoView).toHaveBeenNthCalledWith(1, nodes[2].entry.target, {
        behavior: transitionOptions.behavior,
        block: 'nearest',
        inline: 'start',
        duration: transitionOptions.duration,
        ease: transitionOptions.ease,
        boundary: boundary.current,
      });
    });

    test('group arguments should have priority over transitionOptions', () => {
      const { items, nodes, visibleElementsWithSeparators } = setup([1, 1, 0]);

      const boundary = { current: document.createElement('div') };
      const transitionOptions = {
        duration: 400,
        ease: (t: number) => t,
        behavior: () => false,
      };
      autoScrollApi(
        items,
        visibleElementsWithSeparators,
        boundary,
        transitionOptions
      ).scrollNextGroup('auto', 'center', 'center');

      expect(scrollIntoView).toHaveBeenCalledTimes(1);
      expect(scrollIntoView).toHaveBeenNthCalledWith(1, nodes[0].entry.target, {
        behavior: 'auto',
        block: 'center',
        inline: 'center',
        duration: transitionOptions.duration,
        ease: transitionOptions.ease,
        boundary: boundary.current,
      });
    });

    test('default arguments should have priority over transitionOptions', () => {
      const { items, nodes, visibleElementsWithSeparators } = setup([1, 1, 0]);

      const boundary = { current: document.createElement('div') };
      const transitionOptions = {
        duration: 400,
        ease: (t: number) => t,
        behavior: () => false,
      };
      autoScrollApi(
        items,
        visibleElementsWithSeparators,
        boundary,
        transitionOptions
      ).scrollNext('auto', 'center', 'center');

      expect(scrollIntoView).toHaveBeenCalledTimes(1);
      expect(scrollIntoView).toHaveBeenNthCalledWith(1, nodes[2].entry.target, {
        behavior: 'auto',
        block: 'center',
        inline: 'center',
        duration: transitionOptions.duration,
        ease: transitionOptions.ease,
        boundary: boundary.current,
      });
    });
  });
});
