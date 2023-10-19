import React from 'react';
import { mergeClasses } from '../../shared/utilities';

import styles from './Styles/table.module.scss';

interface DefaultExpandIconProps<RecordType> {
  expandable: boolean;
  expanded: boolean;
  onExpand: (record: RecordType, e: React.MouseEvent<HTMLElement>) => void;
  record: RecordType;
  disabled?: boolean;
}

function renderExpandIcon(collapseText: string, expandText: string) {
  return function expandIcon<RecordType>({
    onExpand,
    record,
    expanded,
    expandable,
    disabled,
  }: DefaultExpandIconProps<RecordType>) {
    return (
      <button
        aria-label={expanded ? collapseText : expandText}
        className={mergeClasses([
          styles.tableRowExpandIcon,
          { [styles.tableRowExpandIconSpaced]: !expandable },
          { [styles.tableExpandedRow]: expandable && expanded },
          {
            [styles.tableRowExpandIconCollapsed]: expandable && !expanded,
          },
          { [styles.tableRowExpandIconDisabled]: !!disabled },
        ])}
        disabled={disabled}
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          if (disabled) {
            return;
          }
          onExpand(record, e!);
          e?.stopPropagation();
        }}
        type="button"
      />
    );
  };
}

export default renderExpandIcon;
