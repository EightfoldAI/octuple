import React from 'react';
import { Header } from '../Header';
import { YEAR_DECADE_COUNT, YearHeaderProps } from './Year.types';
import PartialContext from '../../PartialContext';
import { ButtonSize, NeutralButton } from '../../../../Button';
import { DatePickerSize } from '../../OcPicker.types';
import { Size } from '../../../../ConfigProvider';

function YearHeader<DateType>(props: YearHeaderProps<DateType>) {
    const {
        generateConfig,
        viewDate,
        onPrevDecade,
        onNextDecade,
        onDecadeClick,
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

    const yearNumber: number = generateConfig.getYear(viewDate);
    const startYear: number =
        Math.floor(yearNumber / YEAR_DECADE_COUNT) * YEAR_DECADE_COUNT;
    const endYear: number = startYear + YEAR_DECADE_COUNT - 1;

    return (
        <Header
            {...props}
            onSuperPrev={onPrevDecade}
            onSuperNext={onNextDecade}
            size={size}
        >
            <NeutralButton
                classNames={'picker-decade-btn'}
                onClick={onDecadeClick}
                size={datePickerSizeToButtonSizeMap.get(size)}
                text={`${startYear}-${endYear}`}
            />
        </Header>
    );
}

export default YearHeader;
