import React from 'react';
import { mount as originMount, ReactWrapper } from 'enzyme';
import dayjs, { Dayjs, OpUnitType } from 'dayjs';
import OcPicker from '../../OcPicker';
import OcPickerPartial from '../../OcPickerPartial';
import { OcPickerProps } from '../../OcPicker.types';
import dayjsGenerateConfig from '../../Generate/dayjs';
import enUS from '../../Locale/en_US';
import {
  OcPickerBaseProps,
  OcPickerDateProps,
  OcPickerTimeProps,
  OcPickerPartialBaseProps,
  OcPickerPartialDateProps,
  OcPickerPartialTimeProps,
  OcRangePickerBaseProps,
  OcRangePickerDateProps,
  OcRangePickerTimeProps,
} from '../../OcPicker.types';
import OcRangePicker from '../../OcRangePicker';
import { fireEvent } from '@testing-library/react';

const FULL_FORMAT: string = 'YYYY-MM-DD HH:mm:ss';

// TODO: Remove in favor of export functions.
export type Wrapper = ReactWrapper & {
  confirmOK: () => void;
  openPicker: (index?: number) => void;
  closePicker: (index?: number) => void;
  isClosed: () => boolean;
  isOpen: () => boolean;
  findCell: (text: number | string, index?: number) => Wrapper;
  selectCell: (text: number | string, index?: number) => Wrapper;
  clearValue: (index?: number) => void;
  keyDown: (key: string, info?: object, index?: number) => void;
  clickButton: (type: 'prev' | 'next' | 'super-prev' | 'super-next') => Wrapper;
  inputValue: (text: string, index?: number) => Wrapper;
};

export const mount = originMount as (
  ...args: Parameters<typeof originMount>
) => Wrapper;

export function getDayjs(str: string): Dayjs {
  const formatList: string[] = [FULL_FORMAT, 'YYYY-MM-DD', 'HH:mm:ss', 'YYYY'];
  for (let i = 0; i < formatList.length; i += 1) {
    const date = dayjs(str, formatList[i], true);
    if (date.isValid()) {
      return date;
    }
  }
  throw new Error(`Format doesn't match with: ${str}`);
}

export function isSame(
  date: Dayjs | null,
  dateStr: string,
  type: OpUnitType = 'date'
): boolean {
  if (!date) {
    return false;
  }

  if (date.isSame(getDayjs(dateStr), type)) {
    return true;
  }

  throw new Error(
    `${date.format(FULL_FORMAT)} is not same as expected: ${dateStr}`
  );
}

interface DayjsDefaultProps {
  locale?: OcPickerProps<Dayjs>['locale'];
  generateConfig?: OcPickerProps<Dayjs>['generateConfig'];
}

type InjectDefaultProps<Props> = Omit<Props, 'locale' | 'generateConfig'> &
  DayjsDefaultProps;

// Dayjs Picker
export type DayjsPickerProps =
  | InjectDefaultProps<OcPickerBaseProps<Dayjs>>
  | InjectDefaultProps<OcPickerDateProps<Dayjs>>
  | InjectDefaultProps<OcPickerTimeProps<Dayjs>>;

export class DayjsPicker extends React.Component<DayjsPickerProps> {
  pickerRef: React.RefObject<OcPicker<dayjs.Dayjs>> =
    React.createRef<OcPicker<Dayjs>>();

  render() {
    return (
      <OcPicker<Dayjs>
        generateConfig={dayjsGenerateConfig}
        locale={enUS}
        ref={this.pickerRef}
        {...this.props}
      />
    );
  }
}

// Dayjs Partial Picker
export type DayjsPickerPartialProps =
  | InjectDefaultProps<OcPickerPartialBaseProps<Dayjs>>
  | InjectDefaultProps<OcPickerPartialDateProps<Dayjs>>
  | InjectDefaultProps<OcPickerPartialTimeProps<Dayjs>>;

export const DayjsPickerPartial = (
  props: DayjsPickerPartialProps
): JSX.Element => (
  <OcPickerPartial<Dayjs>
    generateConfig={dayjsGenerateConfig}
    locale={enUS}
    {...props}
  />
);

// Dayjs Range Picker
export type DayjsRangePickerProps =
  | InjectDefaultProps<OcRangePickerBaseProps<Dayjs>>
  | InjectDefaultProps<OcRangePickerDateProps<Dayjs>>
  | InjectDefaultProps<OcRangePickerTimeProps<Dayjs>>;

export class DayjsRangePicker extends React.Component<DayjsRangePickerProps> {
  rangePickerRef: React.RefObject<OcRangePicker<dayjs.Dayjs>> =
    React.createRef<OcRangePicker<Dayjs>>();

  render() {
    return (
      <OcRangePicker<Dayjs>
        generateConfig={dayjsGenerateConfig}
        locale={enUS}
        ref={this.rangePickerRef}
        {...this.props}
      />
    );
  }
}

export function openPicker(container: HTMLElement, index: number = 0): void {
  const input: HTMLInputElement = container.querySelectorAll('input')[index];
  fireEvent.mouseDown(input);
  fireEvent.click(input);
  fireEvent.focus(input);
}

export function closePicker(container: HTMLElement, index: number = 0): void {
  const input: HTMLInputElement = container.querySelectorAll('input')[index];
  fireEvent.blur(input);
}

export function isOpen(): boolean {
  const dropdown: Element = document?.querySelector('.trigger-popup');
  return dropdown && !dropdown.classList.contains('trigger-popup-hidden');
}

export function findCell(
  text: string | number,
  index: number = 0
): HTMLElement {
  let matchCell: HTMLElement;

  const table: HTMLTableElement = document?.querySelectorAll('table')[index];

  Array.from(table.querySelectorAll('td')).forEach(
    (td: HTMLTableCellElement): void => {
      if (
        td.textContent === String(text) &&
        td.className.includes('-in-view')
      ) {
        matchCell = td;
      }
    }
  );
  if (!matchCell) {
    throw new Error('Cell not match in picker partial.');
  }

  return matchCell;
}

export function selectCell(
  text: string | number,
  index: number = 0
): HTMLElement {
  const td: HTMLElement = findCell(text, index);
  fireEvent.click(td);

  return td;
}

export function clickButton(type: string): HTMLButtonElement {
  let matchBtn: HTMLButtonElement;

  Array.from(document?.querySelectorAll('button') || []).forEach((btn) => {
    if (btn.className.includes(`-header-${type}-btn`)) {
      matchBtn = btn;
    }
  });

  fireEvent.click(matchBtn);

  return matchBtn;
}

export function confirmOK(): void {
  fireEvent.click(document?.querySelector('.picker-ok > *'));
}

export function clearValue(): void {
  const clearBtn = document?.querySelector('.picker-clear');
  fireEvent.mouseDown(clearBtn);
  fireEvent.mouseUp(clearBtn);
}

export function inputValue(text: string, index: number = 0): void {
  fireEvent.change(document?.querySelectorAll('input')[index], {
    target: { value: text },
  });
}
