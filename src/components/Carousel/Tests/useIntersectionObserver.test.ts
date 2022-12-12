import { useIntersectionObserver } from '../Hooks/useIntersectionObserver';
import ItemsMap from '../ItemsMap';
import { observerOptions } from '../Settings';
import type { Refs, Item } from '../Carousel.types';
import { observerEntriesToItems } from '../Utilities';
import { renderHook } from '@testing-library/react-hooks';
import { MockedObserver, traceMethodCalls } from './testUtils';
import type { IntersectionObserverCallback } from './testUtils';
import { mocked } from 'ts-jest/utils';

jest.mock('../Utilities', () => ({
    __esModule: true,
    ...jest.requireActual('../Utilities'),
    observerEntriesToItems: jest.fn(),
}));

describe('useIntersectionObserver', () => {
    let observer: any;
    let mockedObserverCalls: { [k: string]: any } = {};
    beforeEach(() => {
        Object.defineProperty(window, 'IntersectionObserver', {
            writable: true,
            value: jest
                .fn()
                .mockImplementation(function TrackMock(
                    cb: IntersectionObserverCallback,
                    options: IntersectionObserverInit
                ) {
                    observer = traceMethodCalls(
                        new MockedObserver(cb, options),
                        mockedObserverCalls
                    );

                    return observer;
                }),
        });
    });
    afterEach(() => {
        observer = null;
        mockedObserverCalls = {};
    });

    test('should observe items from refs', () => {
        const items = new ItemsMap();
        const itemsChanged = '';
        const options = observerOptions;
        const refs: Refs = {
            el1: {
                current: document.createElement(
                    'div'
                ) as unknown as React.RefObject<HTMLElement>[],
            },
            el2: {
                current: document.createElement(
                    'div'
                ) as unknown as React.RefObject<HTMLElement>[],
            },
        };
        const props = { items, itemsChanged, options, refs };

        renderHook(() => useIntersectionObserver(props));

        // called observe on refs
        expect(mockedObserverCalls.observe[0]).toEqual(refs.el1.current);
        expect(mockedObserverCalls.observe[1]).toEqual(refs.el2.current);
    });

    test('should return visible elements', async () => {
        const oeti = mocked(observerEntriesToItems, true);

        const items = new ItemsMap();
        const itemsChanged = '';
        const options = observerOptions;
        const refs: Refs = {};
        const props = { items, itemsChanged, options, refs };

        oeti.mockReturnValueOnce([]);
        const { result, waitForNextUpdate } = renderHook(() =>
            useIntersectionObserver(props)
        );

        expect(result.current.visibleElementsWithSeparators).toEqual([]);

        const itemsToEntries = (items: { key: string; visible: boolean }[]) =>
            items.map(
                (el, index) =>
                    [
                        el.key,
                        {
                            key: el.key,
                            entry: {} as IntersectionObserverEntry,
                            visible: el.visible,
                            index: String(index),
                        },
                    ] as Item
            );

        const visibilityStateHistory = [
            [
                { key: 'item1', visible: true },
                { key: 'item2', visible: true },
            ],
            [
                { key: 'item1', visible: false },
                { key: 'item2', visible: true },
                { key: 'item3', visible: true },
            ],
        ];

        const mockedObserver = observer as unknown as MockedObserver;

        oeti.mockReturnValueOnce(itemsToEntries(visibilityStateHistory[0]));

        mockedObserver.fire([]);
        mockedObserver.fire([]);
        await waitForNextUpdate();
        expect(result.current.visibleElementsWithSeparators).toEqual([
            'item1',
            'item2',
        ]);

        oeti.mockReturnValueOnce(itemsToEntries(visibilityStateHistory[1]));
        mockedObserver.fire([]);
        await waitForNextUpdate();
        expect(result.current.visibleElementsWithSeparators).toEqual([
            'item2',
            'item3',
        ]);
    });

    test('should call disconnect', () => {
        const items = new ItemsMap();
        const itemsChanged = '';
        const options = observerOptions;
        const refs: Refs = {
            el1: {
                current: document.createElement(
                    'div'
                ) as unknown as React.RefObject<HTMLElement>[],
            },
            el2: {
                current: document.createElement(
                    'div'
                ) as unknown as React.RefObject<HTMLElement>[],
            },
        };
        const props = { items, itemsChanged, options, refs };

        const { unmount } = renderHook(() => useIntersectionObserver(props));

        expect(mockedObserverCalls.disconnect).toBeFalsy();
        unmount();
        expect(mockedObserverCalls.disconnect).toEqual([]);
    });
});
