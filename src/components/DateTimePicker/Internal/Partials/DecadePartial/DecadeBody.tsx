import React from 'react';
import { DECADE_COL_COUNT, YearBodyProps } from './Decade.types';
import { DECADE_DISTANCE_COUNT, DECADE_UNIT_DIFF } from './Decade.types';
import PartialBody from '../PartialBody';
import { DatePickerSize } from '../../OcPicker.types';

import styles from '../../ocpicker.module.scss';

const DECADE_ROW_COUNT: number = 4;

function DecadeBody<DateType>(props: YearBodyProps<DateType>) {
    const DECADE_UNIT_DIFF_DES: number = DECADE_UNIT_DIFF - 1;
    const { viewDate, generateConfig, size = DatePickerSize.Medium } = props;

    const yearNumber: number = generateConfig.getYear(viewDate);
    const decadeYearNumber: number =
        Math.floor(yearNumber / DECADE_UNIT_DIFF) * DECADE_UNIT_DIFF;

    const startDecadeYear: number =
        Math.floor(yearNumber / DECADE_DISTANCE_COUNT) * DECADE_DISTANCE_COUNT;
    const endDecadeYear: number = startDecadeYear + DECADE_DISTANCE_COUNT - 1;

    const baseDecadeYear: DateType = generateConfig.setYear(
        viewDate,
        startDecadeYear -
            Math.ceil(
                (DECADE_COL_COUNT * DECADE_ROW_COUNT * DECADE_UNIT_DIFF -
                    DECADE_DISTANCE_COUNT) /
                    2
            )
    );

    const getCellClassNames = (date: DateType) => {
        const startDecadeNumber = generateConfig.getYear(date);
        const endDecadeNumber = startDecadeNumber + DECADE_UNIT_DIFF_DES;

        return {
            [styles.pickerCellInView]:
                startDecadeYear <= startDecadeNumber &&
                endDecadeNumber <= endDecadeYear,
            [styles.pickerCellSelected]: startDecadeNumber === decadeYearNumber,
        };
    };

    return (
        <PartialBody
            {...props}
            rowNum={DECADE_ROW_COUNT}
            colNum={DECADE_COL_COUNT}
            baseDate={baseDecadeYear}
            getCellText={(date: DateType) => {
                const startDecadeNumber: number = generateConfig.getYear(date);
                return `${startDecadeNumber}-${
                    startDecadeNumber + DECADE_UNIT_DIFF_DES
                }`;
            }}
            getCellClassNames={getCellClassNames}
            getCellDate={(date: DateType, offset: number) =>
                generateConfig.addYear(date, offset * DECADE_UNIT_DIFF)
            }
            size={size}
        />
    );
}

export default DecadeBody;
