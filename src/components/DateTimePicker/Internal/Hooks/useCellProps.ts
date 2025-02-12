import { formatValue } from '../Utils/dateUtil';
import type { GenerateConfig } from '../Generate';
import type { NullableDateType, Locale, RangeValue } from '../OcPicker.types';

type UseCellPropsArgs<DateType> = {
  generateConfig: GenerateConfig<DateType>;
  value?: NullableDateType<DateType>;
  isSameCell: (
    current: NullableDateType<DateType>,
    target: NullableDateType<DateType>
  ) => boolean;
  today?: NullableDateType<DateType>;
  locale: Locale;
  rangedValue?: RangeValue<DateType>;
};

export default function useCellProps<DateType>({
  today,
  value,
  isSameCell,
  locale,
  generateConfig,
  rangedValue,
}: UseCellPropsArgs<DateType>) {
  function getCellProps(currentDate: DateType) {
    return {
      buttonProps: {
        tabIndex:
          isSameCell(value, currentDate) || isSameCell(today, currentDate)
            ? 0
            : -1,
        'aria-label': formatValue(currentDate, {
          locale,
          format: 'dddd D MMMM YYYY',
          generateConfig,
        }),
      },
      isCellFocused: isSameCell(value, currentDate),
    };
  }
  return rangedValue ? undefined : getCellProps;
}
