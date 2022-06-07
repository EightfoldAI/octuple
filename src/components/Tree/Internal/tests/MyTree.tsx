import React from 'react';
import Tree from '../';

const MyTree = (props: {
    treeData: any;
    checkable: any;
    checkedKeys: any;
    onCheck: any;
}) => {
    const { treeData, checkable, checkedKeys, onCheck } = props;
    return (
        <Tree
            data-testid="tree"
            classNames="my-tree"
            checkable={checkable}
            checkedKeys={checkedKeys}
            onCheck={onCheck}
            treeData={treeData}
        />
    );
};

export default MyTree;
