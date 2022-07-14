import React from 'react';
import { WeekPartialProps } from './Week.types';
import { mergeClasses } from '../../../../../shared/utilities';
import DatePartial from '../DatePartial/Date';
import { isSameWeek } from '../../Utils/dateUtil';

import styles from '../../ocpicker.module.scss';

function WeekPartial<DateType>(props: WeekPartialProps<DateType>) {
    const { generateConfig, locale, value, size = 'Small' } = props;

    // Add row classNames
    const rowClassNames = (date: DateType): string =>
        mergeClasses([
            styles.pickerWeekPartialRow,
            {
                [styles.pickerWeekPartialRowSelected]: isSameWeek(
                    generateConfig,
                    locale.locale,
                    value,
                    date
                ),
            },
        ]);

    return (
        <DatePartial
            {...props}
            partialName="week"
            rowClassNames={rowClassNames}
            keyboardConfig={{
                onLeftRight: null,
            }}
            size={size}
        />
    );
}

export default WeekPartial;
