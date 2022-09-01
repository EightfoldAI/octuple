import React from 'react';
import { QUARTER_COL_COUNT, QuarterBodyProps } from './Quarter.types';
import { formatValue, isSameQuarter } from '../../Utils/dateUtil';
import RangeContext from '../../RangeContext';
import useCellClassNames from '../../Hooks/useCellClassNames';
import PartialBody from '../PartialBody';
import { DatePickerSize } from '../../OcPicker.types';

const QUARTER_ROW_COUNT: number = 1;

function QuarterBody<DateType>(props: QuarterBodyProps<DateType>) {
    const {
        locale,
        value,
        viewDate,
        generateConfig,
        size = DatePickerSize.Medium,
    } = props;

    const { rangedValue, hoverRangedValue } = React.useContext(RangeContext);

    const getCellClassNames = useCellClassNames({
        value,
        generateConfig,
        rangedValue,
        hoverRangedValue,
        isSameCell: (current, target) =>
            isSameQuarter(generateConfig, current, target),
        isInView: () => true,
        offsetCell: (date, offset) => generateConfig.addMonth(date, offset * 3),
    });

    const baseQuarter = generateConfig.setDate(
        generateConfig.setMonth(viewDate, 0),
        1
    );

    return (
        <PartialBody
            {...props}
            rowNum={QUARTER_ROW_COUNT}
            colNum={QUARTER_COL_COUNT}
            baseDate={baseQuarter}
            getCellText={(date) =>
                formatValue(date, {
                    locale,
                    format: locale.quarterFormat || '[Q]Q',
                    generateConfig,
                })
            }
            getCellClassNames={getCellClassNames}
            getCellDate={(date: DateType, offset: number) =>
                generateConfig.addMonth(date, offset * 3)
            }
            titleCell={(date) =>
                formatValue(date, {
                    locale,
                    format: 'YYYY-[Q]Q',
                    generateConfig,
                })
            }
            size={size}
        />
    );
}

export default QuarterBody;
