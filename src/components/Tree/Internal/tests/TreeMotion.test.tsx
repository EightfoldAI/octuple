import React from 'react';
import { render } from '@testing-library/react';
import Tree from '..';
import MotionTreeNode from '../MotionTreeNode';
import { TreeContext } from '../contextTypes';
import { getMinimumRangeTransitionRange } from '../NodeList';

jest.mock('../../../Motion', () => {
    const origin = jest.requireActual('../../../Motion');

    return {
        ...origin,
    };
});

describe('Tree Motion', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    it('getMinimumRangeTransitionRange', () => {
        const visibleList = getMinimumRangeTransitionRange(
            new Array(100).fill(null).map((_, index) => index) as any,
            true,
            100,
            20
        );

        expect(visibleList.length < 10).toBeTruthy();
    });

    it('not crash', () => {
        const renderTree = (props?: any) => (
            <Tree
                treeData={[{ key: '0-0', children: [{ key: '0-0-0' }] }]}
                expandedKeys={['0-0']}
                motion={{}}
                {...props}
            />
        );
        const { rerender } = render(renderTree());

        rerender(renderTree({ treeData: [] }));
    });

    describe('MotionTreeNode should always trigger motion end', () => {
        it('without motionNodes', () => {
            const onMotionStart = jest.fn();
            const onMotionEnd = jest.fn();
            const { unmount } = render(
                <TreeContext.Provider
                    value={
                        {
                            keyEntities: {},
                            dropIndicatorRender: (): any => null,
                        } as any
                    }
                >
                    <MotionTreeNode
                        onMotionStart={onMotionStart}
                        onMotionEnd={onMotionEnd}
                        isEnd={[false]}
                        {...({} as any)} // Ignore TS warning
                    />
                </TreeContext.Provider>
            );

            expect(onMotionStart).not.toHaveBeenCalled();
            expect(onMotionEnd).not.toHaveBeenCalled();

            unmount();
            expect(onMotionStart).not.toHaveBeenCalled();
            expect(onMotionEnd).not.toHaveBeenCalled();
        });
    });
});
