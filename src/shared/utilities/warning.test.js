import { noteOnce, resetWarned, warning } from './warning';

describe('warning', () => {
    beforeEach(() => {
        resetWarned();
    });

    test('warning', () => {
        const warnSpy = jest
            .spyOn(console, 'warn')
            .mockImplementation(() => {});
        warning(false, '[oc Component] test hello world');
        expect(warnSpy).toHaveBeenCalledWith(
            'Warning: [oc Component] test hello world'
        );

        warning(false, '[oc Component] test hello world');
        expect(warnSpy).toHaveBeenCalledTimes(2);

        resetWarned();

        warning(false, '[oc Component] test hello world');
        expect(warnSpy).toHaveBeenCalledTimes(3);

        warning(true, '[oc Component] test1');
        expect(warnSpy).not.toHaveBeenCalledWith('[oc Component] test1');

        warnSpy.mockRestore();
    });

    test('note', () => {
        const warnSpy = jest
            .spyOn(console, 'info')
            .mockImplementation(() => {});
        noteOnce(false, '[oc Component] test hello world');
        expect(warnSpy).toHaveBeenCalledWith(
            'Note: [oc Component] test hello world'
        );

        noteOnce(false, '[oc Component] test hello world');
        expect(warnSpy).toHaveBeenCalledTimes(1);

        resetWarned();

        noteOnce(false, '[oc Component] test hello world');
        expect(warnSpy).toHaveBeenCalledTimes(2);

        noteOnce(true, '[oc Component] test1');
        expect(warnSpy).not.toHaveBeenCalledWith('[oc Component] test1');

        warnSpy.mockRestore();
    });
});
