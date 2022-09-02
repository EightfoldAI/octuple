import { move, isSimilar, setValues } from '../Utils/valueUtil';
import NameMap from '../Utils/NameMap';
import cloneDeep from '../Utils/cloneDeep';

describe('Utils', () => {
    describe('arrayMove', () => {
        test('move', () => {
            expect(move([0, 1, 2, 3], 0, 2)).toEqual([1, 2, 0, 3]);
            expect(move([0, 1, 2, 3], 3, 1)).toEqual([0, 3, 1, 2]);
            expect(move([0, 1, 2, 3], 1, 1)).toEqual([0, 1, 2, 3]);
            expect(move([0, 1, 2, 3], -1, 3)).toEqual([0, 1, 2, 3]);
            expect(move([0, 1, 2, 3], -1, 5)).toEqual([0, 1, 2, 3]);
            expect(move([0, 1, 2, 3], 1, 5)).toEqual([0, 1, 2, 3]);
            expect(move([0, 1, 2, 3], 0, 0)).toEqual([0, 1, 2, 3]);
            expect(move([0, 1, 2, 3], 0, 1)).toEqual([1, 0, 2, 3]);
            expect(move([0, 1, 2, 3], 1, 0)).toEqual([1, 0, 2, 3]);
            expect(move([0, 1, 2, 3], 2, 3)).toEqual([0, 1, 3, 2]);
            expect(move([0, 1, 2, 3], 3, 3)).toEqual([0, 1, 2, 3]);
            expect(move([0, 1, 2, 3], 3, 2)).toEqual([0, 1, 3, 2]);
        });
    });
    describe('valueUtil', () => {
        test('isSimilar', () => {
            expect(isSimilar(1, 1)).toBeTruthy();
            expect(isSimilar(1, 2)).toBeFalsy();
            expect(isSimilar({}, {})).toBeTruthy();
            expect(isSimilar({ a: 1 }, { a: 2 })).toBeFalsy();
            expect(isSimilar({ a() {} }, { a() {} })).toBeTruthy();
            expect(isSimilar({ a: 1 }, {})).toBeFalsy();
            expect(isSimilar({}, { a: 1 })).toBeFalsy();
            expect(isSimilar({}, null)).toBeFalsy();
            expect(isSimilar(null, {})).toBeFalsy();
        });

        describe('setValues', () => {
            test('basic', () => {
                expect(setValues({}, { a: 1 }, { b: 2 })).toEqual({
                    a: 1,
                    b: 2,
                });
                expect(setValues([], [123])).toEqual([123]);
            });

            test('Correct handle class instance', () => {
                const out = setValues({}, { a: 1, b: { c: new Date() } });
                expect(out.a).toEqual(1);
                expect(out.b.c instanceof Date).toBeTruthy();
            });
        });
    });

    describe('NameMap', () => {
        test('update should clean if empty', () => {
            const map = new NameMap();
            map.set(['user', 'name'], 'Mia');
            map.set(['user', 'age'], 14);

            expect(map.toJSON()).toEqual({
                'user.name': 'Mia',
                'user.age': 14,
            });

            map.update(['user', 'age'], (prevValue) => {
                expect(prevValue).toEqual(14);
                return null;
            });

            expect(map.toJSON()).toEqual({
                'user.name': 'Mia',
            });

            map.set(['user', 'name'], 'Lola');
            expect(map.toJSON()).toEqual({
                'user.name': 'Lola',
            });
        });
    });

    describe('clone deep', () => {
        test('should not deep clone Class', () => {
            const data = { a: new Date() };
            const clonedData = cloneDeep(data);
            expect(data.a === clonedData.a).toBeTruthy();
        });
    });
});
