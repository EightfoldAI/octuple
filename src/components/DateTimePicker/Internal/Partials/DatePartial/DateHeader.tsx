import React from 'react';
import { DateHeaderProps } from './Date.types';
import { Header } from '../Header';
import PartialContext from '../../PartialContext';
import { formatValue } from '../../Utils/dateUtil';
import { ButtonSize, NeutralButton } from '../../../../Button';
import { Size } from '../../../../ConfigProvider';
import { DatePickerSize } from '../../OcPicker.types';

function DateHeader<DateType>(props: DateHeaderProps<DateType>) {
    const {
        generateConfig,
        locale,
        viewDate,
        onNextMonth,
        onPrevMonth,
        onNextYear,
        onPrevYear,
        onYearClick,
        onMonthClick,
        size = DatePickerSize.Medium,
    } = props;
    const { hideHeader } = React.useContext(PartialContext);

    if (hideHeader) {
        return null;
    }

    const monthsLocale: string[] =
        locale.shortMonths ||
        (generateConfig.locale.getShortMonths
            ? generateConfig.locale.getShortMonths(locale.locale)
            : []);

    const month = generateConfig.getMonth(viewDate);

    const datePickerSizeToButtonSizeMap = new Map<
        DatePickerSize | Size,
        ButtonSize | Size
    >([
        [DatePickerSize.Flex, ButtonSize.Flex],
        [DatePickerSize.Large, ButtonSize.Large],
        [DatePickerSize.Medium, ButtonSize.Medium],
        [DatePickerSize.Small, ButtonSize.Small],
    ]);

    const yearNode: React.ReactNode = (
        <NeutralButton
            classNames={'picker-year-btn'}
            key="year"
            onClick={onYearClick}
            size={datePickerSizeToButtonSizeMap.get(size)}
            text={formatValue(viewDate, {
                locale,
                format: locale.yearFormat,
                generateConfig,
            })}
        />
    );
    const monthNode: React.ReactNode = (
        <NeutralButton
            classNames={'picker-month-btn'}
            key="month"
            onClick={onMonthClick}
            size={datePickerSizeToButtonSizeMap.get(size)}
            text={
                locale.monthFormat
                    ? formatValue(viewDate, {
                          locale,
                          format: locale.monthFormat,
                          generateConfig,
                      })
                    : monthsLocale[month]
            }
        />
    );

    const monthYearNodes = locale.monthBeforeYear
        ? [monthNode, yearNode]
        : [yearNode, monthNode];

    return (
        <Header
            {...props}
            onSuperPrev={onPrevYear}
            onPrev={onPrevMonth}
            onNext={onNextMonth}
            onSuperNext={onNextYear}
            size={size}
        >
            {monthYearNodes}
        </Header>
    );
}

export default DateHeader;
