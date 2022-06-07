import React from 'react';
import { act } from 'react-dom/test-utils';
import { mergeClasses } from '../../../shared/utilities';
import { render, fireEvent } from '@testing-library/react';
import { genCSSMotion } from '../CSSMotion';

describe('StrictMode', () => {
    const CSSMotion = genCSSMotion({
        transitionSupport: true,
    });

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    it('motion should end', () => {
        const ref = React.createRef();

        const { container } = render(
            <React.StrictMode>
                <CSSMotion
                    motionName="transition"
                    ref={ref}
                    motionAppear
                    visible
                >
                    {({ style, className }) => {
                        return (
                            <div
                                style={style}
                                className={mergeClasses([
                                    'motion-box',
                                    className,
                                ])}
                            />
                        );
                    }}
                </CSSMotion>
            </React.StrictMode>
        );

        const node = container.querySelector('.motion-box');
        expect(node).toHaveClass(
            'transition-appear',
            'transition-appear-start'
        );

        // Active
        act(() => {
            jest.runAllTimers();
        });
        expect(node).not.toHaveClass('transition-appear-start');
        expect(node).toHaveClass('transition-appear-active');

        // Trigger End
        fireEvent.transitionEnd(node);
        expect(node).not.toHaveClass('transition-appear');

        expect(ref.current).toBe(node);
    });
});
