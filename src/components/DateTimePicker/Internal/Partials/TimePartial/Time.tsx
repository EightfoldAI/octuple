import React from 'react';
import type { BodyOperationRef } from './Time.types';
import { TimePartialProps } from './Time.types';
import { mergeClasses } from '../../../../../shared/utilities';
import TimeHeader from './TimeHeader';
import TimeBody from './TimeBody';
import { createKeyDownHandler } from '../../Utils/uiUtil';
import { DatePickerSize } from '../../OcPicker.types';

import styles from '../../ocpicker.module.scss';

const countBoolean = (boolList: (boolean | undefined)[]): number =>
  boolList.filter((bool) => bool !== false).length;

function TimePartial<DateType>(props: TimePartialProps<DateType>) {
  const {
    active,
    format = 'HH:mm:ss',
    generateConfig,
    onSelect,
    operationRef,
    showHour,
    showMinute,
    showSecond,
    size = DatePickerSize.Medium,
    use12Hours = false,
    value,
    listboxId,
  } = props;
  const bodyOperationRef: React.MutableRefObject<BodyOperationRef> =
    React.useRef<BodyOperationRef>();

  const [activeColumnIndex, setActiveColumnIndex] = React.useState(-1);
  const columnsCount: number = countBoolean([
    showHour,
    showMinute,
    showSecond,
    use12Hours,
  ]);

  operationRef.current = {
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>): boolean =>
      createKeyDownHandler(event, {
        onLeftRight: (diff: number): void => {
          setActiveColumnIndex(
            (activeColumnIndex + diff + columnsCount) % columnsCount
          );
        },
        onUpDown: (diff: number): void => {
          if (activeColumnIndex === -1) {
            setActiveColumnIndex(0);
          } else if (bodyOperationRef.current) {
            bodyOperationRef.current.onUpDown(diff);
          }
        },
        onEnter: (): void => {
          onSelect(value || generateConfig.getNow(), 'key');
          setActiveColumnIndex(-1);
        },
      }),

    onBlur: (): void => {
      setActiveColumnIndex(-1);
    },
  };

  return (
    <div
      className={mergeClasses([
        styles.pickerTimePartial,
        { [styles.pickerTimePartialActive]: active },
      ])}
    >
      <TimeHeader {...props} format={format} size={size} />
      <TimeBody
        {...props}
        activeColumnIndex={activeColumnIndex}
        operationRef={bodyOperationRef}
        size={size}
        listboxId={listboxId}
      />
    </div>
  );
}

export default TimePartial;
