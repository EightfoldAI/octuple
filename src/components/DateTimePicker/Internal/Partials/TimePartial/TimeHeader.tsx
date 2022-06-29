import React, { useContext } from 'react';
import { TimeHeaderProps } from './Time.types';
import { Header } from '../Header';
import PartialContext from '../../PartialContext';
import { formatValue } from '../../Utils/dateUtil';

function TimeHeader<DateType>(props: TimeHeaderProps<DateType>) {
    const { hideHeader } = useContext(PartialContext);

    if (hideHeader) {
        return null;
    }

    const { generateConfig, locale, value, format } = props;

    return (
        <Header>
            {value
                ? formatValue(value, {
                      locale,
                      format,
                      generateConfig,
                  })
                : '\u00A0'}
        </Header>
    );
}

export default TimeHeader;
