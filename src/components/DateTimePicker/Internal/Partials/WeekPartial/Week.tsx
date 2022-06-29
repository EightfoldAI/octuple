import React from 'react';
import { WeekPartialProps } from './Week.types';
import { mergeClasses } from '../../../../../shared/utilities';
import DatePartial from '../DatePartial/Date';
import { isSameWeek } from '../../Utils/dateUtil';

import styles from '../../picker.module.scss';

function WeekPartial<DateType>(props: WeekPartialProps<DateType>) {
    const { generateConfig, locale, value } = props;

    // Render additional column
    const prefixColumn = (date: DateType): JSX.Element => (
        <td
            key="week"
            className={mergeClasses([styles.pickerCell, styles.pickerCellWeek])}
        >
            {generateConfig.locale.getWeek(locale.locale, date)}
        </td>
    );

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
            prefixColumn={prefixColumn}
            rowClassNames={rowClassNames}
            keyboardConfig={{
                onLeftRight: null,
            }}
        />
    );
}

export default WeekPartial;
