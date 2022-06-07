import React from 'react';
import { render } from '@testing-library/react';
import Tree, { BasicDataNode } from '../';

describe('Tree.TypeScript', () => {
    it('fieldNames', () => {
        interface DataType extends BasicDataNode {
            label: string;
            value: string;
            list?: DataType[];
        }

        render(
            <Tree<DataType>
                treeData={[
                    {
                        label: 'parent',
                        value: 'parent',
                        list: [],
                    },
                ]}
            />
        );
    });
});
