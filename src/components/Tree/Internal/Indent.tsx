import React from 'react';
import { mergeClasses } from '../../../shared/utilities';

import styles from './octree.module.scss';

interface IndentProps {
    level: number;
    isStart: boolean[];
    isEnd: boolean[];
}

const Indent = ({ level, isStart, isEnd }: IndentProps) => {
    const baseClassName = styles.treeIndentUnit;
    const list: React.ReactElement[] = [];
    for (let i = 0; i < level; i += 1) {
        list.push(
            <span
                key={i}
                className={mergeClasses([
                    baseClassName,
                    { [`${baseClassName}-start`]: isStart[i] },
                    { [`${baseClassName}-end`]: isEnd[i] },
                ])}
            />
        );
    }

    return (
        <span aria-hidden="true" className={styles.treeIndent}>
            {list}
        </span>
    );
};

export default React.memo(Indent);
