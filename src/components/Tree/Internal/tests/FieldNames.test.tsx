import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Tree from '..';

describe('FieldNames', () => {
    it('checkable should work', () => {
        const onCheck = jest.fn();

        const { container } = render(
            <Tree
                checkable
                onCheck={onCheck}
                fieldNames={{ key: 'val', children: 'child' }}
                treeData={
                    [
                        {
                            val: 'parent',
                            child: [
                                {
                                    val: 'child',
                                },
                            ],
                        },
                    ] as any
                }
            />
        );

        fireEvent.click(container.querySelector('.tree-checkbox'));
        expect(onCheck).toHaveBeenCalledWith(
            ['parent', 'child'],
            expect.anything()
        );
    });
});
