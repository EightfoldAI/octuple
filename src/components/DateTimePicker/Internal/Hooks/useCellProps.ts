import { formatValue } from '../Utils/dateUtil';
import type { GenerateConfig } from '../Generate';
import type { NullableDateType, Locale } from '../OcPicker.types';

type UseCellPropsArgs<DateType> = {
  generateConfig: GenerateConfig<DateType>;
  value?: NullableDateType<DateType>;
  isSameCell: (
    current: NullableDateType<DateType>,
    target: NullableDateType<DateType>
  ) => boolean;
  today?: NullableDateType<DateType>;
  locale: Locale;
};

export default function useCellProps<DateType>({
  today,
  value,
  isSameCell,
  locale,
  generateConfig,
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
  return getCellProps;
}
