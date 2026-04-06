import React from 'react';
import { MonthHeaderProps } from './Month.types';
import { Header } from '../Header';
import PartialContext from '../../PartialContext';
import { formatValue } from '../../Utils/dateUtil';
import { ButtonSize, SystemUIButton } from '../../../../Button';
import { Size } from '../../../../ConfigProvider';
import { DatePickerSize } from '../../OcPicker.types';

function MonthHeader<DateType>(props: MonthHeaderProps<DateType>) {
  const {
    generateConfig,
    locale,
    onNextYear,
    onPrevYear,
    onYearClick,
    size = DatePickerSize.Medium,
    viewDate,
  } = props;
  const { hideHeader } = React.useContext(PartialContext);

  const datePickerSizeToButtonSizeMap: Map<
    DatePickerSize | Size,
    Size | ButtonSize
  > = new Map<DatePickerSize | Size, ButtonSize | Size>([
    [DatePickerSize.Flex, ButtonSize.Flex],
    [DatePickerSize.Large, ButtonSize.Large],
    [DatePickerSize.Medium, ButtonSize.Medium],
    [DatePickerSize.Small, ButtonSize.Small],
  ]);

  if (hideHeader) {
    return null;
  }

  return (
    <Header
      {...props}
      superPrevAriaLabel={locale.previousYear}
      superNextAriaLabel={locale.nextYear}
      onSuperPrev={onPrevYear}
      onSuperNext={onNextYear}
      size={size}
    >
      <SystemUIButton
        classNames={'picker-year-btn'}
        onClick={onYearClick}
        size={datePickerSizeToButtonSizeMap.get(size)}
        text={formatValue(viewDate, {
          locale,
          format: locale.yearFormat,
          generateConfig,
        })}
      />
    </Header>
  );
}

export default MonthHeader;
