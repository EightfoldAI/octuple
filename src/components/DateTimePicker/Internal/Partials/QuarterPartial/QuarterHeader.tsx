import React from 'react';
import { QuarterHeaderProps } from './Quarter.types';
import { Header } from '../Header';
import PartialContext from '../../PartialContext';
import { formatValue } from '../../Utils/dateUtil';
import { ButtonSize, NeutralButton } from '../../../../Button';

function QuarterHeader<DateType>(props: QuarterHeaderProps<DateType>) {
    const {
        generateConfig,
        locale,
        viewDate,
        onNextYear,
        onPrevYear,
        onYearClick,
    } = props;
    const { hideHeader } = React.useContext(PartialContext);

    if (hideHeader) {
        return null;
    }

    return (
        <Header {...props} onSuperPrev={onPrevYear} onSuperNext={onNextYear}>
            <NeutralButton
                classNames={'picker-year-btn'}
                onClick={onYearClick}
                size={ButtonSize.Small}
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
