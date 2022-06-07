import { getIndexByStartLoc, findListDiffIndex } from '../utils/algorithmUtil';

describe('Util', () => {
    describe('Algorithm', () => {
        describe('getIndexByStartLoc', () => {
            function test(name, min, max, start, expectList) {
                it(name, () => {
                    const len = max - min + 1;
                    const renderList = new Array(len)
                        .fill(null)
                        .map((_, index) =>
                            getIndexByStartLoc(min, max, start, index)
                        );

                    expect(renderList).toEqual(expectList);
                });
            }

            // Balance
            test('balance - basic', 0, 2, 1, [1, 2, 0]);
            test(
                'balance - moving',
                3,
                13,
                8,
                [8, 9, 7, 10, 6, 11, 5, 12, 4, 13, 3]
            );

            // After less
            test('after less', 3, 9, 7, [7, 8, 6, 9, 5, 4, 3]);

            // Before less
            test('before less', 1, 9, 3, [3, 4, 2, 5, 1, 6, 7, 8, 9]);
        });

        describe('findListDiff', () => {
            describe('remove', () => {
                function test(name, length, diff) {
                    it(name, () => {
                        const originList = new Array(length)
                            .fill(null)
                            .map((_, index) => index);
                        const targetList = originList.slice();
                        targetList.splice(diff, 1);

                        expect(
                            findListDiffIndex(
                                originList,
                                targetList,
                                (num) => num
                            )
                        ).toEqual({
                            index: diff,
                            multiple: false,
                        });
                    });
                }

                for (let i = 0; i < 100; i += 1) {
                    test(`diff index: ${i}`, 100, i);
                }
            });

            describe('add', () => {
                function test(name, length, diff) {
                    it(name, () => {
                        const originList = new Array(length)
                            .fill(null)
                            .map((_, index) => index);
                        const targetList = originList.slice();
                        targetList.splice(diff, 0, 'NEW_ITEM');

                        expect(
                            findListDiffIndex(
                                originList,
                                targetList,
                                (num) => num
                            )
                        ).toEqual({
                            index: diff,
                            multiple: false,
                        });
                    });
                }

                for (let i = 0; i < 100; i += 1) {
                    test(`diff index: ${i}`, 100, i);
                }
            });

            it('both empty', () => {
                expect(findListDiffIndex([], [], (num) => num)).toEqual(null);
            });

            it('same list', () => {
                const list = [1, 2, 3, 4];
                expect(findListDiffIndex(list, list, (num) => num)).toEqual(
                    null
                );
            });

            it('small list', () => {
                expect(findListDiffIndex([0], [], (num) => num)).toEqual({
                    index: 0,
                    multiple: false,
                });
                expect(findListDiffIndex([0, 1], [0], (num) => num)).toEqual({
                    index: 1,
                    multiple: false,
                });
                expect(findListDiffIndex([0, 1, 2], [0], (num) => num)).toEqual(
                    {
                        index: 1,
                        multiple: true,
                    }
                );
                expect(findListDiffIndex([], [0], (num) => num)).toEqual({
                    index: 0,
                    multiple: false,
                });
                expect(findListDiffIndex([0], [0, 1], (num) => num)).toEqual({
                    index: 1,
                    multiple: false,
                });
            });

            it('diff only 1', () => {
                const indexArray = [0, 1, 2];
                expect(findListDiffIndex(indexArray, [], (num) => num)).toEqual(
                    {
                        index: 0,
                        multiple: true,
                    }
                );
                expect(
                    findListDiffIndex(indexArray, [1, 2], (num) => num)
                ).toEqual({
                    index: 0,
                    multiple: false,
                });
                expect(
                    findListDiffIndex(indexArray, [0, 2], (num) => num)
                ).toEqual({
                    index: 1,
                    multiple: false,
                });
                expect(
                    findListDiffIndex(indexArray, [0, 1], (num) => num)
                ).toEqual({
                    index: 2,
                    multiple: false,
                });
                expect(
                    findListDiffIndex(indexArray, [0], (num) => num)
                ).toEqual({
                    index: 1,
                    multiple: true,
                });
                expect(
                    findListDiffIndex(indexArray, [1], (num) => num)
                ).toEqual({
                    index: 0,
                    multiple: true,
                });
                expect(findListDiffIndex([0, 1, 2], [2], (num) => num)).toEqual(
                    {
                        index: 0,
                        multiple: true,
                    }
                );
            });
        });
    });
});
