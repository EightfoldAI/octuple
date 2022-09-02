import { get } from './get';

describe('get', () => {
    test('basic', () => {
        // Empty path
        expect(get(null, [])).toEqual(null);
        expect(get(undefined, [])).toEqual(undefined);
        expect(get(1, [])).toEqual(1);

        // Part path
        expect(get([1, 2], ['0'])).toEqual(1);
        expect(get([1, 2], ['0', '1'])).toEqual(undefined);
        expect(get({ a: { b: { c: 93 } } }, ['a', 'b'])).toEqual({ c: 93 });
        expect(get({ a: { b: { c: 93 } } }, ['a', 'b', 'c'])).toEqual(93);
        expect(get({ a: { b: { c: 93 } } }, ['a', 'b', 'c', 'd'])).toEqual(
            undefined
        );
    });
});
