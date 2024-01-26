import React from 'react';
import { Button, ButtonShape, ButtonVariant } from '../Button';
import { IconName } from '../Icon';
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
      <Button
        ariaLabel={expanded ? collapseText : expandText}
        classNames={mergeClasses([
          styles.tableRowExpandIcon,
          { [styles.tableRowExpandIconVisuallyHidden]: !expandable },
          { [styles.tableExpandedRow]: expandable && expanded },
        ])}
        disabled={disabled}
        htmlType="button"
        iconProps={{
          path: expanded ? IconName.mdiChevronUp : IconName.mdiChevronDown,
        }}
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          if (disabled) {
            return;
          }
          onExpand(record, e!);
          e?.stopPropagation();
        }}
        shape={ButtonShape.Round}
        variant={ButtonVariant.Neutral}
      />
    );
  };
}

export default renderExpandIcon;
