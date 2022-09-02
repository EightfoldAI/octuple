import React from 'react';
import { YearHeaderProps } from './Decade.types';
import { Header } from '../Header';
import { DECADE_DISTANCE_COUNT } from './Decade.types';
import PartialContext from '../../PartialContext';
import { DatePickerSize } from '../../OcPicker.types';

function DecadeHeader<DateType>(props: YearHeaderProps<DateType>) {
    const {
        generateConfig,
        viewDate,
        onPrevDecades,
        onNextDecades,
        size = DatePickerSize.Medium,
    } = props;
    const { hideHeader } = React.useContext(PartialContext);

    if (hideHeader) {
        return null;
    }

    const yearNumber: number = generateConfig.getYear(viewDate);
    const startYear: number =
        Math.floor(yearNumber / DECADE_DISTANCE_COUNT) * DECADE_DISTANCE_COUNT;
    const endYear: number = startYear + DECADE_DISTANCE_COUNT - 1;

    return (
        <Header
            {...props}
            onSuperPrev={onPrevDecades}
            onSuperNext={onNextDecades}
            size={size}
        >
            {startYear}-{endYear}
        </Header>
    );
}

export default DecadeHeader;
