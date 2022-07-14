import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import Trigger from '../Trigger';
import CSSMotion from '../../Motion/CSSMotion';
import { placementAlignMap } from './util';
import '@testing-library/jest-dom';

describe('Trigger.Motion', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(), // Deprecated
                removeListener: jest.fn(), // Deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
    });

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        cleanup();
        jest.useRealTimers();
    });

    it('popup should support motion', async () => {
        const { container } = render(
            <Trigger
                action={['click']}
                popupAlign={placementAlignMap.left}
                popup={<strong className="x-content" />}
                popupMotion={{
                    motionName: 'bamboo',
                }}
            >
                <div className="target">click</div>
            </Trigger>
        );
        const target = container.querySelector('.target');

        fireEvent.click(target);

        expect(document.querySelector('.trigger-popup')).toHaveClass('bamboo');

        expect(
            document.querySelector('.trigger-popup').style.pointerEvents
        ).toEqual('');
    });

    it('use correct leave motion', () => {
        const cssMotionSpy = jest.spyOn(CSSMotion, 'render');
        const { container } = render(
            <Trigger
                action={['click']}
                popupAlign={placementAlignMap.left}
                popup={<strong className="x-content" />}
                popupMotion={{
                    motionName: 'bamboo',
                    leavedClassName: 'light',
                }}
            >
                <div className="target">click</div>
            </Trigger>
        );
        const target = container.querySelector('.target');

        fireEvent.click(target);

        expect(cssMotionSpy).toHaveBeenLastCalledWith(
            expect.objectContaining({ leavedClassName: 'light' }),
            expect.anything()
        );
    });

    it('not lock on appear', () => {
        const genTrigger = (props) => (
            <Trigger
                popup={<strong className="x-content" />}
                popupMotion={{
                    motionName: 'bamboo',
                }}
                popupVisible
                {...props}
            >
                <span />
            </Trigger>
        );

        const { rerender } = render(genTrigger());

        expect(document.querySelector('.trigger-popup')).not.toHaveStyle({
            pointerEvents: 'none',
        });

        rerender(genTrigger({ popupVisible: false }));
        expect(document.querySelector('.trigger-popup')).toHaveStyle({
            pointerEvents: 'none',
        });
    });
});
