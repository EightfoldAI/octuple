import React from 'react';
import { YEAR_COL_COUNT, YEAR_DECADE_COUNT, YearBodyProps } from './Year.types';
import useCellClassNames from '../../Hooks/useCellClassNames';
import { formatValue, isSameYear } from '../../Utils/dateUtil';
import RangeContext from '../../RangeContext';
import PartialBody from '../PartialBody';
import { DatePickerSize } from '../../OcPicker.types';

const YEAR_ROW_COUNT: number = 4;

function YearBody<DateType>(props: YearBodyProps<DateType>) {
    const {
        value,
        viewDate,
        locale,
        generateConfig,
        size = DatePickerSize.Medium,
    } = props;
    const { rangedValue, hoverRangedValue } = React.useContext(RangeContext);

    const yearNumber: number = generateConfig.getYear(viewDate);
    const startYear: number =
        Math.floor(yearNumber / YEAR_DECADE_COUNT) * YEAR_DECADE_COUNT;
    const endYear: number = startYear + YEAR_DECADE_COUNT - 1;
    const baseYear: DateType = generateConfig.setYear(
        viewDate,
        startYear -
            Math.ceil((YEAR_COL_COUNT * YEAR_ROW_COUNT - YEAR_DECADE_COUNT) / 2)
    );

    const isInView = (date: DateType): boolean => {
        const currentYearNumber: number = generateConfig.getYear(date);
        return startYear <= currentYearNumber && currentYearNumber <= endYear;
    };

    const getCellClassNames = useCellClassNames<DateType>({
        value,
        generateConfig,
        rangedValue,
        hoverRangedValue,
        isSameCell: (current, target) =>
            isSameYear(generateConfig, current, target),
        isInView,
        offsetCell: (date: DateType, offset: number) =>
            generateConfig.addYear(date, offset),
    });

    return (
        <PartialBody
            {...props}
            rowNum={YEAR_ROW_COUNT}
            colNum={YEAR_COL_COUNT}
            baseDate={baseYear}
            getCellText={generateConfig.getYear}
            getCellClassNames={getCellClassNames}
            getCellDate={generateConfig.addYear}
            titleCell={(date) =>
                formatValue(date, {
                    locale,
                    format: 'YYYY',
                    generateConfig,
                })
            }
            size={size}
        />
    );
}

export default YearBody;
