import { set } from './set';

describe('set', () => {
    test('basic', () => {
        expect(set(null, [], 233)).toEqual(233);
        expect(set({}, ['mia'], 'lola')).toEqual({ mia: 'lola' });
        expect(set({}, ['mia', 'lola'], 'generate')).toEqual({
            mia: { lola: 'generate' },
        });
        expect(
            set({ other: { next: 233 } }, ['mia', 'lola'], 'generate')
        ).toEqual({
            other: { next: 233 },
            mia: { lola: 'generate' },
        });

        expect(set([0, 1, 2], [1, 'mia', 'lola'], 'next')).toEqual([
            0,
            { mia: { lola: 'next' } },
            2,
        ]);
        expect(
            set({ mia: 'lola', list: [0, 1, 2] }, ['list', '1'], 233)
        ).toEqual({
            mia: 'lola',
            list: [0, 233, 2],
        });
        expect(set([[[[[0]]]]], [0, 0, 0, 0, 0], 'mia')).toEqual([
            [[[['mia']]]],
        ]);
        expect(set([[[[[0]]]]], [0, 0, 0, 0, 0, 0], 'lola')).toEqual([
            [[[[['lola']]]]],
        ]);
    });

    test('remove if undefined', () => {
        // Skip not exist path
        expect(set({}, ['notExist'], undefined, true)).toEqual({});

        // Delete value
        const target = set(
            { keep: { mia: 2333 } },
            ['keep', 'mia'],
            undefined,
            true
        );
        expect(target).toEqual({ keep: {} });
        expect('mia' in target.keep).toBeFalsy();

        // Mid path not exist
        const midTgt = set(
            { lv1: { lv2: {} } },
            ['lv1', 'lv2', 'lv3'],
            undefined,
            true
        );
        expect(midTgt).toEqual({ lv1: { lv2: {} } });
        expect('lv3' in midTgt.lv1.lv2).toBeFalsy();

        // Long path not exist
        const longNotExistTgt = set(
            { lv1: { lv2: {} } },
            ['lv1', 'lv2', 'lv3', 'lv4'],
            undefined,
            true
        );
        expect(longNotExistTgt).toEqual({ lv1: { lv2: {} } });
        expect('lv3' in longNotExistTgt.lv1.lv2).toBeFalsy();

        // Long path remove
        const longTgt = set(
            { lv1: { lv2: { lv3: { lv4: { lv: 5 } } } } },
            ['lv1', 'lv2', 'lv3', 'lv4'],
            undefined,
            true
        );
        expect(longTgt).toEqual({ lv1: { lv2: { lv3: {} } } });
        expect('lv4' in longTgt.lv1.lv2.lv3).toBeFalsy();
    });
});
