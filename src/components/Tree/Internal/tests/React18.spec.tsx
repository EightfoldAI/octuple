import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Tree from '../';

describe('React 18', () => {
    it('expand work', () => {
        const onExpand = jest.fn();
        const { container } = render(
            <React.StrictMode>
                <Tree
                    defaultExpandAll
                    onExpand={onExpand}
                    treeData={[
                        {
                            title: 'Parent',
                            key: 'parent',
                            children: [
                                {
                                    title: 'Child',
                                    key: 'child',
                                },
                            ],
                        },
                    ]}
                />
            </React.StrictMode>
        );

        // All opened
        expect(onExpand).not.toHaveBeenCalled();
        expect(
            container
                .querySelector('.tree-list-holder')
                .querySelectorAll('.tree-treenode')
        ).toHaveLength(2);

        // Collapse one
        fireEvent.click(container.querySelector('.tree-switcher_open'));
        expect(onExpand).toHaveBeenCalled();
        expect(
            container
                .querySelector('.tree-list-holder')
                .querySelectorAll('.tree-treenode')
        ).toHaveLength(1);
    });

    it('checkable work', () => {
        const onCheck = jest.fn();
        const { container } = render(
            <React.StrictMode>
                <Tree
                    defaultExpandAll
                    onCheck={onCheck}
                    checkable
                    treeData={[
                        {
                            title: 'Parent',
                            key: 'parent',
                        },
                    ]}
                />
            </React.StrictMode>
        );

        expect(onCheck).not.toHaveBeenCalled();
        expect(container.querySelector('.tree-checkbox-checked')).toBeFalsy();

        fireEvent.click(container.querySelector('.tree-checkbox'));
        expect(onCheck).toHaveBeenCalled();
        expect(container.querySelector('.tree-checkbox-checked')).toBeTruthy();
    });
});
