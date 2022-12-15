import React from 'react';
import { Size } from '../../../ConfigProvider';
import { Components, DatePickerSize, RangeList } from '../OcPicker.types';
import { ButtonSize, SystemUIButton } from '../../../Button';

import styles from '../ocpicker.module.scss';

export type RangesProps = {
  components?: Components;
  needConfirmButton: boolean;
  /**
   * The `Now`button text.
   * @default 'Now'
   */
  nowText?: string;
  /**
   * Whether the `OK` button is disabled.
   */
  okDisabled?: boolean;
  /**
   * The `OK` button text.
   * @default 'OK'
   */
  okText?: string;
  /**
   * Callback executed onNow event.
   */
  onNow?: null | (() => void) | false;
  /**
   * Callback executed onOk event.
   */
  onOk?: null | (() => void) | false;
  /**
   * List of Preset range buttons.
   */
  rangeList?: RangeList;
  /**
   * Show 'Now' button in partial when `showTime` is set.
   */
  showNow?: boolean;
  /**
   * The DatePicker size.
   * @default DatePickerSize.Medium
   */
  size?: DatePickerSize | Size;
};

export default function getRanges({
  components = {},
  needConfirmButton,
  nowText,
  okDisabled,
  okText,
  onNow,
  onOk,
  rangeList = [],
  showNow,
  size = DatePickerSize.Medium,
}: RangesProps) {
  let presetNode: React.ReactNode;
  let okNode: React.ReactNode;

  const datePickerSizeToButtonSizeMap: Map<
    DatePickerSize | Size,
    Size | ButtonSize
  > = new Map<DatePickerSize | Size, ButtonSize | Size>([
    [DatePickerSize.Flex, ButtonSize.Flex],
    [DatePickerSize.Large, ButtonSize.Large],
    [DatePickerSize.Medium, ButtonSize.Medium],
    [DatePickerSize.Small, ButtonSize.Small],
  ]);

  if (rangeList.length) {
    const Item = (components.rangeItem || 'span') as any;

    presetNode = (
      <>
        {rangeList.map(({ label, onClick, onMouseEnter, onMouseLeave }) => (
          <li key={label} className={styles.pickerPreset}>
            <Item
              onClick={onClick}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              size={datePickerSizeToButtonSizeMap.get(size)}
              text={label}
            />
          </li>
        ))}
      </>
    );
  }

  if (needConfirmButton) {
    if (onNow && !presetNode && showNow !== false) {
      presetNode = (
        <li className={'picker-now'}>
          <SystemUIButton
            classNames={'picker-now-btn'}
            onClick={onNow}
            size={datePickerSizeToButtonSizeMap.get(size)}
            text={nowText}
          />
        </li>
      );
    }

    okNode = needConfirmButton && (
      <li className={styles.pickerOk}>
        <SystemUIButton
          disabled={okDisabled}
          onClick={onOk as () => void}
          size={datePickerSizeToButtonSizeMap.get(size)}
          text={okText}
        />
      </li>
    );
  }

  if (!presetNode && !okNode) {
    return null;
  }

  return (
    <ul className={styles.pickerRanges}>
      {presetNode}
      {okNode}
    </ul>
  );
}
