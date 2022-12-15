import React from 'react';
import { mergeClasses } from '../../shared/utilities';

import styles from './Styles/table.module.scss';

interface DefaultExpandIconProps<RecordType> {
  onExpand: (record: RecordType, e: React.MouseEvent<HTMLElement>) => void;
  record: RecordType;
  expanded: boolean;
  expandable: boolean;
}

function renderExpandIcon(collapseText: string, expandText: string) {
  return function expandIcon<RecordType>({
    onExpand,
    record,
    expanded,
    expandable,
  }: DefaultExpandIconProps<RecordType>) {
    return (
      <button
        type="button"
        onClick={(e) => {
          onExpand(record, e!);
          e.stopPropagation();
        }}
        className={mergeClasses([
          styles.tableRowExpandIcon,
          { [styles.tableRowExpandIconSpaced]: !expandable },
          { [styles.tableExpandedRow]: expandable && expanded },
          {
            [styles.tableRowExpandIconCollapsed]: expandable && !expanded,
          },
        ])}
        aria-label={expanded ? collapseText : expandText}
      />
    );
  };
}

export default renderExpandIcon;
