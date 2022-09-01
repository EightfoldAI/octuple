import React from 'react';
import { QuarterHeaderProps } from './Quarter.types';
import { Header } from '../Header';
import PartialContext from '../../PartialContext';
import { formatValue } from '../../Utils/dateUtil';
import { ButtonSize, NeutralButton } from '../../../../Button';
import { Size } from '../../../../ConfigProvider';
import { DatePickerSize } from '../../OcPicker.types';

function QuarterHeader<DateType>(props: QuarterHeaderProps<DateType>) {
    const {
        generateConfig,
        locale,
        viewDate,
        onNextYear,
        onPrevYear,
        onYearClick,
        size = DatePickerSize.Medium,
    } = props;
    const { hideHeader } = React.useContext(PartialContext);

    const datePickerSizeToButtonSizeMap = new Map<
        DatePickerSize | Size,
        ButtonSize | Size
    >([
        [DatePickerSize.Flex, ButtonSize.Flex],
        [DatePickerSize.Large, ButtonSize.Large],
        [DatePickerSize.Medium, ButtonSize.Medium],
        [DatePickerSize.Small, ButtonSize.Small],
    ]);

    if (hideHeader) {
        return null;
    }

    return (
        <Header {...props} onSuperPrev={onPrevYear} onSuperNext={onNextYear}>
            <NeutralButton
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

export default QuarterHeader;
