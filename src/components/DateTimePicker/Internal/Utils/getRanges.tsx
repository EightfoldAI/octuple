import React from 'react';
import { Size } from '../../../ConfigProvider';
import { Components, DatePickerSize, RangeList } from '../OcPicker.types';
import {
  Button,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from '../../../Button';

import styles from '../ocpicker.module.scss';

export type RangesProps = {
  /**
   * Custom items.
   */
  components?: Components;
  /**
   * Whether or not to display to 'OK' button.
   */
  needConfirmButton: boolean;
  /**
   * The 'Now' button props.
   */
  nowButtonProps?: ButtonProps;
  /**
   * The `Now`button text.
   * @default 'Now'
   */
  nowText?: string;
  /**
   * The 'OK' button props.
   */
  okButtonProps?: ButtonProps;
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
   * Show 'OK' button in partial when `showTime` is set.
   */
  showOk?: boolean;
  /**
   * The DatePicker size.
   * @default DatePickerSize.Medium
   */
  size?: DatePickerSize | Size;
};

export default function getRanges({
  components = {},
  needConfirmButton,
  nowButtonProps,
  nowText,
  okButtonProps,
  okDisabled,
  okText,
  onNow,
  onOk,
  rangeList = [],
  showNow,
  showOk,
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
          <Button
            classNames={'picker-now-btn'}
            text={nowText}
            variant={ButtonVariant.SystemUI}
            {...nowButtonProps}
            onClick={onNow}
            size={datePickerSizeToButtonSizeMap.get(size)}
          />
        </li>
      );
    }

    okNode = needConfirmButton && showOk !== false && (
      <li className={styles.pickerOk}>
        <Button
          disabled={okDisabled}
          text={okText}
          variant={ButtonVariant.SystemUI}
          {...okButtonProps}
          onClick={onOk as () => void}
          size={datePickerSizeToButtonSizeMap.get(size)}
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
