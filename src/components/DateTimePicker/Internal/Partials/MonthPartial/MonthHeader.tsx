import React from 'react';
import { MonthHeaderProps } from './Month.types';
import { Header } from '../Header';
import PartialContext from '../../PartialContext';
import { formatValue } from '../../Utils/dateUtil';
import { ButtonSize, NeutralButton } from '../../../../Button';

function MonthHeader<DateType>(props: MonthHeaderProps<DateType>) {
    const {
        generateConfig,
        locale,
        viewDate,
        onNextYear,
        onPrevYear,
        onYearClick,
        size = 'Small',
    } = props;
    const { hideHeader } = React.useContext(PartialContext);

    const datePickerSizeToButtonSizeMap = new Map<typeof size, ButtonSize>([
        ['Large', ButtonSize.Large],
        ['Medium', ButtonSize.Medium],
        ['Small', ButtonSize.Small],
    ]);

    if (hideHeader) {
        return null;
    }

    return (
        <Header
            {...props}
            onSuperPrev={onPrevYear}
            onSuperNext={onNextYear}
            size={size}
        >
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

export default MonthHeader;
