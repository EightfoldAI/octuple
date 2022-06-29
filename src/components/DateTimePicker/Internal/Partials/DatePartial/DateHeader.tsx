import React from 'react';
import { DateHeaderProps } from './Date.types';
import { Header } from '../Header';
import PartialContext from '../../PartialContext';
import { formatValue } from '../../Utils/dateUtil';
import { ButtonSize, NeutralButton } from '../../../../Button';

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

    const yearNode: React.ReactNode = (
        <NeutralButton
            classNames={'picker-year-btn'}
            key="year"
            onClick={onYearClick}
            size={ButtonSize.Small}
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
            size={ButtonSize.Small}
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
        >
            {monthYearNodes}
        </Header>
    );
}

export default DateHeader;
