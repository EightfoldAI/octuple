import React from 'react';
import { render } from '@testing-library/react';
import { noteOnce, resetWarned, warning } from './warning';
import unsafeLifecyclesPolyfill from './unsafeLifecyclesPolyfill';

describe('warning', () => {
    beforeEach(() => {
        resetWarned();
    });

    test('warning', () => {
        const warnSpy = jest
            .spyOn(console, 'error')
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
            .spyOn(console, 'warn')
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

    test('should not warning React componentWillReceiveProps', () => {
        const warnSpy = jest
            .spyOn(console, 'warn')
            .mockImplementation(() => {});
        class App extends React.Component {
            state = {};

            render() {
                return null;
            }
        }
        const FixedWarningApp = unsafeLifecyclesPolyfill(App);
        render(<FixedWarningApp />);
        expect(warnSpy).not.toHaveBeenCalledWith(
            expect.stringContaining(
                'componentWillReceiveProps has been renamed'
            )
        );
        warnSpy.mockRestore();
    });
});
