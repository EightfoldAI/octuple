import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Trigger from '../Trigger';
import CSSMotion from '../../Motion/CSSMotion';
import { placementAlignMap } from './util';
import '@testing-library/jest-dom';

describe('Trigger.Mask', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('mask should support motion', () => {
        const cssMotionSpy = jest.spyOn(CSSMotion, 'render');
        const { container } = render(
            <Trigger
                action={['click']}
                popupAlign={placementAlignMap.left}
                popup={<strong className="x-content" />}
                mask
                maskMotion={{
                    motionName: 'bamboo',
                }}
            >
                <div className="target">click</div>
            </Trigger>
        );

        const target = container.querySelector('.target');
        fireEvent.click(target);

        expect(cssMotionSpy).toHaveBeenCalledWith(
            expect.objectContaining({ motionName: 'bamboo' }),
            null
        );
    });
});
