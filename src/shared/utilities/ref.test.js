/* eslint-disable no-eval */
import React from 'react';
import { render } from '@testing-library/react';
import { composeRef, useComposeRef } from './';

describe('ref', () => {
    describe('composeRef', () => {
        it('basic', () => {
            const refFunc1 = jest.fn();
            const refFunc2 = jest.fn();

            const mergedRef = composeRef(refFunc1, refFunc2);
            const testRefObj = {};
            mergedRef(testRefObj);
            expect(refFunc1).toHaveBeenCalledWith(testRefObj);
            expect(refFunc2).toHaveBeenCalledWith(testRefObj);
        });

        it('ignore empty', () => {
            const ref = React.createRef();
            expect(composeRef(undefined, ref, null)).toBe(ref);
            expect(composeRef(undefined, null)).toBeFalsy();
        });

        it('useComposeRef', () => {
            const Demo = ({ ref1, ref2 }) => {
                const mergedRef = useComposeRef(ref1, ref2);
                return <div ref={mergedRef} />;
            };

            const ref1 = React.createRef();
            const ref2 = React.createRef();
            render(<Demo ref1={ref1} ref2={ref2} />);

            expect(ref1.current).toBeTruthy();
            expect(ref1.current).toBe(ref2.current);
        });
    });
});
