import ItemsMap from '../ItemsMap';
import type { IntersectionObserverItem, Item } from '../Carousel.types';

const separatorString: string = '-separator';

describe('ItemsMap', () => {
    const data: Item[] = [
        [
            'test1',
            { index: '0', key: 'test1' } as unknown as IntersectionObserverItem,
        ],
        [
            'test2',
            { index: '1', key: 'test2' } as unknown as IntersectionObserverItem,
        ],
        [
            'test3',
            { index: '2', key: 'test3' } as unknown as IntersectionObserverItem,
        ],
    ];
    const updateDataIndex = (data: Item[]): Item[] =>
        data.map((el, ind) => [el[0], { ...el[1], index: String(ind) }]);

    const dataWithSeparators: Item[] = [
        [
            'test1',
            { index: '0', key: 'test1' } as unknown as IntersectionObserverItem,
        ],
        [
            `test1${separatorString}`,
            {
                index: '0.1',
                key: `test1${separatorString}`,
            } as unknown as IntersectionObserverItem,
        ],
        [
            'test2',
            { index: '1', key: 'test2' } as unknown as IntersectionObserverItem,
        ],
        [
            `test2${separatorString}`,
            {
                index: '1.1',
                key: `test2${separatorString}`,
            } as unknown as IntersectionObserverItem,
        ],
        [
            'test3',
            { index: '2', key: 'test3' } as unknown as IntersectionObserverItem,
        ],
    ];

    describe('set and get', () => {
        test('set single value and get', () => {
            const map = new ItemsMap();

            data.forEach(([key, value]) => {
                map.set(key, value);
            });
            data.forEach(([key, value]) => {
                expect(map.get(key)).toEqual(value);
            });

            data.forEach(([key, value]) => {
                map.set(key, value);
            });
            data.forEach(([key, value]) => {
                expect(map.get(key)).toEqual(value);
            });

            expect(map.toArr()).toEqual(data);
        });

        test('should convert key to string', () => {
            const map = new ItemsMap();
            const data: Item[] = [
                [
                    1 as unknown as string,
                    {
                        index: '0',
                        key: 'test1',
                    } as unknown as IntersectionObserverItem,
                ],
                [
                    '2',
                    {
                        index: '1',
                        key: 'test2',
                    } as unknown as IntersectionObserverItem,
                ],
            ];

            data.forEach(([key, value]) => {
                map.set(key, value);
            });
            expect(map.toArr()).toEqual([
                [
                    '1',
                    {
                        index: '0',
                        key: 'test1',
                    } as unknown as IntersectionObserverItem,
                ],
                [
                    '2',
                    {
                        index: '1',
                        key: 'test2',
                    } as unknown as IntersectionObserverItem,
                ],
            ]);
        });

        describe('sort and set array of values and get via toArr', () => {
            test('sorted array', () => {
                const map = new ItemsMap();

                map.set(data);

                data.forEach(([key, value]) => {
                    expect(map.get(key)).toEqual(value);
                });

                expect(map.toArr()).toEqual(data);
            });

            test('unsorted array', () => {
                const map = new ItemsMap();

                map.set(data.reverse());

                data.forEach(([key, value]) => {
                    expect(map.get(key)).toEqual(value);
                });

                expect(map.toArr()).toEqual(data);
            });
        });

        describe('toItems', () => {
            test('should return keys of items', () => {
                const map = new ItemsMap();

                map.set(dataWithSeparators);

                expect(map.toItems()).toEqual(
                    dataWithSeparators.map((el) => el[0])
                );
            });
        });

        describe('toItemsWithoutSeparators', () => {
            test('should return keys of items', () => {
                const map = new ItemsMap();

                map.set(dataWithSeparators);

                expect(map.toItemsWithoutSeparators()).toEqual(
                    data.map((el) => el[0])
                );
            });
        });
    });

    describe('first element', () => {
        test('should work', () => {
            const map = new ItemsMap();

            map.set(data);

            expect(map.first()).toEqual(data[0][1]);
        });

        test('after add element to an end', () => {
            const map = new ItemsMap();

            map.set(data);
            const newItem = [
                'test4',
                {
                    index: '3',
                    key: 'test4',
                } as unknown as IntersectionObserverItem,
            ] as Item;
            expect(map.first()).toEqual(data[0][1]);

            map.set([...data, newItem]);
            expect(map.first()).toEqual(data[0][1]);
        });

        test('after add element to start', () => {
            const map = new ItemsMap();

            expect(updateDataIndex(data)).toEqual(data);
            map.set(data);
            const newData = updateDataIndex([
                [
                    'test4',
                    {
                        index: '0',
                        key: 'test4',
                    } as unknown as IntersectionObserverItem,
                ],
                ...data,
            ]);
            expect(map.first()).toEqual(data[0][1]);

            map.set(newData);
            expect(map.first()).toEqual(newData[0][1]);
        });
    });

    describe('last element', () => {
        test('should work', () => {
            const map = new ItemsMap();

            map.set(data);

            expect(map.last()).toEqual(data.slice(-1)[0][1]);
        });

        test('after add element to an end', () => {
            const map = new ItemsMap();

            map.set(data);
            const newItem = [
                'test4',
                {
                    index: '3',
                    key: 'test4',
                } as unknown as IntersectionObserverItem,
            ] as Item;
            expect(map.last()).toEqual(data.slice(-1)[0][1]);

            map.set([...data, newItem]);
            expect(map.last()).toEqual(newItem[1]);
        });

        test('after add element to start', () => {
            const map = new ItemsMap();

            expect(updateDataIndex(data)).toEqual(data);
            map.set(data);
            const newItem = [
                'test4',
                {
                    index: '3',
                    key: 'test4',
                } as unknown as IntersectionObserverItem,
            ] as Item;
            const newData: Item[] = [newItem, ...data];
            expect(map.last()).toEqual(data.slice(-1)[0][1]);

            map.set(newData);
            expect(map.last()).toEqual(newItem[1]);
        });
    });

    test('filter', () => {
        const map = new ItemsMap();

        map.set(data);

        expect(map.filter((el) => el[1] === data[0][1])).toEqual([data[0]]);
    });

    test('getVisible', () => {
        const map = new ItemsMap();

        const dataWithVisible: Item[] = data.map((el, ind) => [
            el[0],
            {
                ...el[1],
                visible: ind < 2,
            } as unknown as IntersectionObserverItem,
        ]);
        map.set(dataWithVisible);

        expect(map.getVisible()).toEqual(
            dataWithVisible.filter((el) => el[1].visible)
        );
    });

    // without separators
    test('getVisibleElements', () => {
        const map = new ItemsMap();

        map.set(
            dataWithSeparators.map((el) => [
                el[0],
                {
                    ...el[1],
                    visible: true,
                } as unknown as IntersectionObserverItem,
            ])
        );

        const result = map.getVisibleElements();
        expect(result).toHaveLength(3);
        expect(result).toEqual([
            ['test1', { index: '0', key: 'test1', visible: true }],
            ['test2', { index: '1', key: 'test2', visible: true }],
            ['test3', { index: '2', key: 'test3', visible: true }],
        ]);
    });

    test('findIndex', () => {
        const map = new ItemsMap();

        map.set(data);

        expect(map.findIndex((el) => el[0] === 'test1')).toEqual(0);
        expect(map.findIndex((el) => el[0] === 'test2')).toEqual(1);
    });

    test('find', () => {
        const map = new ItemsMap();

        map.set(data);

        expect(map.find((el) => el[1] === data[0][1])).toEqual(data[0]);
        expect(map.find((el) => el[0] === 'test1')).toEqual(data[0]);
    });

    describe('getItemPos', () => {
        test('should return all items and item pos', () => {
            const map = new ItemsMap();
            const onlyItems = false;

            map.set(dataWithSeparators);
            expect(
                map.getCurrentPos(dataWithSeparators[0][0], onlyItems)
            ).toEqual([dataWithSeparators, 0]);

            expect(
                map.getCurrentPos(dataWithSeparators[2][0], onlyItems)
            ).toEqual([dataWithSeparators, 2]);

            expect(
                map.getCurrentPos(dataWithSeparators[4][0], onlyItems)
            ).toEqual([dataWithSeparators, 4]);
        });

        test('when onlyItems true should return all items without separators and item pos', () => {
            const map = new ItemsMap();
            const onlyItems = true;

            map.set(dataWithSeparators);
            const withoutSeparators = dataWithSeparators.filter(
                (el) => !el[0].includes(separatorString)
            );
            expect(
                map.getCurrentPos(dataWithSeparators[0][0], onlyItems)
            ).toEqual([withoutSeparators, 0]);
            expect(
                map.getCurrentPos(dataWithSeparators[2][0], onlyItems)
            ).toEqual([withoutSeparators, 1]);
            expect(
                map.getCurrentPos(dataWithSeparators[4][0], onlyItems)
            ).toEqual([withoutSeparators, 2]);
        });
    });

    describe('previous item', () => {
        describe('by key', () => {
            describe('with separators', () => {
                test('have previous item', () => {
                    const map = new ItemsMap();

                    map.set(data);

                    expect(map.next(data[2][1])).toEqual(data[1][1]);
                    expect(map.next(data[1][1])).toEqual(data[0][1]);
                });

                test('does not have prev item', () => {
                    const map = new ItemsMap();

                    map.set(data);

                    const key = data[1][0];

                    expect(map.prev(key)).toEqual(undefined);
                });
            });

            describe('without separators', () => {
                const onlyItems = true;

                test('have previous item', () => {
                    const map = new ItemsMap();

                    map.set(dataWithSeparators);

                    expect(
                        map.next(dataWithSeparators[4][1], onlyItems)
                    ).toEqual(dataWithSeparators[2][1]);
                    expect(
                        map.next(dataWithSeparators[2][1], onlyItems)
                    ).toEqual(dataWithSeparators[0][1]);
                });

                test('does not have prev item', () => {
                    const map = new ItemsMap();

                    map.set(dataWithSeparators);

                    expect(
                        map.prev(dataWithSeparators[1][0], onlyItems)
                    ).toEqual(undefined);
                });
            });
        });

        test('invalid item', () => {
            const map = new ItemsMap();

            map.set(data);

            const item = 'aaa';

            expect(map.prev(item)).toEqual(undefined);
            expect(map.prev('')).toEqual(undefined);
        });

        describe('by value', () => {
            describe('with separators', () => {
                test('have previous item', () => {
                    const map = new ItemsMap();

                    map.set(data);

                    expect(map.next(data[2][1])).toEqual(data[1][1]);
                    expect(map.next(data[1][1])).toEqual(data[0][1]);
                });

                test('does not have prev item', () => {
                    const map = new ItemsMap();

                    map.set(data);

                    const item = data[2][1];

                    expect(map.prev(item)).toEqual(undefined);
                });
            });

            describe('without separators', () => {
                const onlyItems = true;

                test('have previous item', () => {
                    const map = new ItemsMap();

                    map.set(dataWithSeparators);

                    expect(
                        map.next(dataWithSeparators[4][1], onlyItems)
                    ).toEqual(dataWithSeparators[2][1]);
                    expect(
                        map.next(dataWithSeparators[2][1], onlyItems)
                    ).toEqual(dataWithSeparators[0][1]);
                });

                test('does not have prev item', () => {
                    const map = new ItemsMap();

                    map.set(dataWithSeparators);

                    expect(
                        map.prev(dataWithSeparators[2][1], onlyItems)
                    ).toEqual(undefined);
                });
            });
        });
    });

    describe('next item', () => {
        describe('by key', () => {
            describe('with separators', () => {
                test('have next item', () => {
                    const map = new ItemsMap();

                    map.set(data);

                    expect(map.next(data[1][1])).toEqual(data[0][1]);
                    expect(map.next(data[2][1])).toEqual(data[1][1]);
                });

                test('does not have next item', () => {
                    const map = new ItemsMap();

                    map.set(data);

                    const key = data[0][0];

                    expect(map.next(key)).toEqual(undefined);
                });
            });

            describe('without separators', () => {
                const onlyItems = true;

                test('have next item', () => {
                    const map = new ItemsMap();

                    map.set(dataWithSeparators);

                    expect(
                        map.next(dataWithSeparators[4][1], onlyItems)
                    ).toEqual(dataWithSeparators[2][1]);
                    expect(
                        map.next(dataWithSeparators[2][1], onlyItems)
                    ).toEqual(dataWithSeparators[0][1]);
                });

                test('does not have next item', () => {
                    const map = new ItemsMap();

                    map.set(dataWithSeparators);

                    expect(
                        map.next(dataWithSeparators[1][0], onlyItems)
                    ).toEqual(undefined);
                });
            });
        });

        test('invalid item', () => {
            const map = new ItemsMap();

            map.set(data);

            const item = 'aaa';

            expect(map.next(item)).toEqual(undefined);
            expect(map.next('')).toEqual(undefined);
        });

        describe('by value', () => {
            describe('without separators', () => {
                test('have next item', () => {
                    const map = new ItemsMap();

                    map.set(data);

                    expect(map.next(data[1][1])).toEqual(data[0][1]);
                    expect(map.next(data[2][1])).toEqual(data[1][1]);
                });

                test('does not have next item', () => {
                    const map = new ItemsMap();

                    map.set(data);

                    const item = data.slice(-3)[0][1];

                    expect(map.next(item)).toEqual(undefined);
                });
            });

            describe('without separators', () => {
                const onlyItems = true;

                test('have next item', () => {
                    const map = new ItemsMap();

                    map.set(dataWithSeparators);

                    console.log(dataWithSeparators);

                    expect(
                        map.next(dataWithSeparators[4][1], onlyItems)
                    ).toEqual(dataWithSeparators[2][1]);
                    expect(
                        map.next(dataWithSeparators[2][1], onlyItems)
                    ).toEqual(dataWithSeparators[0][1]);
                });

                test('does not have next item', () => {
                    const map = new ItemsMap();

                    map.set(dataWithSeparators);

                    const item = dataWithSeparators.slice(-2)[0][1];

                    expect(map.next(item, onlyItems)).toEqual(undefined);
                });
            });
        });
    });
});
