import React from 'react';
import { render } from '@testing-library/react';
import { getMotion } from '../Utils/util';
import MockTrigger from '../mock';

/**
 * dom-align internal default position is `-999`.
 * We do not need to simulate full position, check offset only.
 */
describe('Trigger.Util', () => {
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

    describe('getMotion', () => {
        const motion = {
            motionName: 'motion',
        };

        it('motion', () => {
            expect(
                getMotion({
                    motion,
                })
            ).toEqual({
                motionName: 'motion',
            });
        });
    });

    describe('mock', () => {
        it('close', () => {
            const { container } = render(
                <MockTrigger
                    action={['click']}
                    popupAlign={{ points: ['cr', 'cl'] }}
                    popup={<div>bamboo</div>}
                >
                    <div>light</div>
                </MockTrigger>
            );

            expect(container.innerHTML).toEqual('<div>light</div>');
        });

        it('open', () => {
            const { container } = render(
                <MockTrigger
                    action={['click']}
                    popupAlign={{ points: ['cr', 'cl'] }}
                    popup={<div>bamboo</div>}
                    motion={{
                        motionName: 'motion',
                    }}
                    popupVisible
                >
                    <div>light</div>
                </MockTrigger>
            );

            expect(container.innerHTML).toEqual(
                '<div>light</div><div><div class="trigger-popup" style="opacity: 0;"><div>bamboo</div></div></div>'
            );
        });
    });
});
