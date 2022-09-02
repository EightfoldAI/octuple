import React from 'react';
import { DateBodyProps } from './Date.types';
import {
    WEEK_DAY_COUNT,
    getWeekStartDate,
    isSameDate,
    isSameMonth,
    formatValue,
} from '../../Utils/dateUtil';
import RangeContext from '../../RangeContext';
import useCellClassNames from '../../Hooks/useCellClassNames';
import PartialBody from '../PartialBody';
import { DatePickerSize } from '../../OcPicker.types';

function DateBody<DateType>(props: DateBodyProps<DateType>) {
    const {
        generateConfig,
        locale,
        rowCount,
        viewDate,
        value,
        dateRender,
        size = DatePickerSize.Medium,
    } = props;

    const { rangedValue, hoverRangedValue } = React.useContext(RangeContext);

    const baseDate: DateType = getWeekStartDate(
        locale.locale,
        generateConfig,
        viewDate
    );
    const weekFirstDay: number = generateConfig.locale.getWeekFirstDay(
        locale.locale
    );
    const today: DateType = generateConfig.getNow();

    const headerCells: React.ReactNode[] = [];
    const weekDaysLocale: string[] =
        locale.shortWeekDays ||
        (generateConfig.locale.getShortWeekDays
            ? generateConfig.locale.getShortWeekDays(locale.locale)
            : []);

    for (let i = 0; i < WEEK_DAY_COUNT; i += 1) {
        headerCells.push(
            <th key={i}>
                {weekDaysLocale[(i + weekFirstDay) % WEEK_DAY_COUNT]}
            </th>
        );
    }

    const getCellClassNames = useCellClassNames({
        today,
        value,
        generateConfig,
        rangedValue: rangedValue,
        hoverRangedValue: hoverRangedValue,
        isSameCell: (current, target) =>
            isSameDate(generateConfig, current, target),
        isInView: (date) => isSameMonth(generateConfig, date, viewDate),
        offsetCell: (date, offset) => generateConfig.addDate(date, offset),
    });

    const getCellNode: (date: DateType) => React.ReactNode = dateRender
        ? (date: DateType) => dateRender(date, today)
        : undefined;

    return (
        <PartialBody
            {...props}
            rowNum={rowCount}
            colNum={WEEK_DAY_COUNT}
            baseDate={baseDate}
            getCellNode={getCellNode}
            getCellText={generateConfig.getDate}
            getCellClassNames={getCellClassNames}
            getCellDate={generateConfig.addDate}
            titleCell={(date) =>
                formatValue(date, {
                    locale,
                    format: 'YYYY-MM-DD',
                    generateConfig,
                })
            }
            headerCells={headerCells}
            size={size}
        />
    );
}

export default DateBody;
